const uuid = require('uuid/v4');
const RULES = require('./rules');
const { INIT, COMPLETE, PLAY } = require('./actions');
const generateName = require('./util/name');

class EventConsumer {
	constructor(events) {
		const that = this;
		this.consumer = function(event, data) {
			if (events.includes(event)) try {
				that[event](data, this.user);
			} catch (e) {
				console.error(e);
				console.log(event, data);
				this.emit('alert', e.message);
			}
		};
	}
	on(socket) {
		socket.on('message', this.consumer);
	}
	off(socket) {
		socket.removeListener('message', this.consumer);
	}
}

class User extends EventConsumer {
	constructor(socket) {
		super(['register', 'create', 'enter']);

		this.id = uuid();
		this.socket = socket;
		socket.user = this;
		this.on(this.socket);
		socket.on('disconnect', () => this.deconstructor());
	}
	deconstructor() {
		this.off(this.socket);
		if (this.room) this.room.exit(null, this);
		User.all.delete(this.name);
	}

	// Helpers
	browse() {
		this.socket.emit('rooms', Array.from(Room.all.values()).filter((room) => !room.game));
	}
	join(room) {
		this.room = room;
		this.room.on(this.socket, this);
		this.room.players.push(this);
		this.room.update();
	}

	// Events
	register(name) {
		if (this.name)
			throw new Error('You have already registered');
		if (User.all.has(name))
			throw new Error('Username already taken');

		this.name = name;
		User.all.set(name, this);
		this.browse();
	}
	create({ name, players }) {
		if (this.room)
			throw new Error('You may not create a room in your current state (you absolute mess!)');

		this.join(new Room({ name, rules: { size: players, game: 'president' }, owner: this }));
	}
	enter(id) {
		if (this.room)
			throw new Error('You may not create a room in your current state (you absolute mess!)');
		if (!Room.all.has(id))
			throw new Error('Cannot find room');

		const room = Room.all.get(id);
		if (room.game)
			throw new Error('Game has already started');
		if (room.players.length >= room.rules.size)
			throw new Error('Room is full');

		this.join(room);
	}

	// Serialization
	toJSON() {
		return {
			id: this.id,
			name: this.name,
		};
	}
}

class AI {
	constructor(user) {
		this.id = user ? user.id : uuid();
		this.name = user ? `${user.name}'s AI buddy` : generateName();
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			ai: true,
		};
	}
}

class Room extends EventConsumer {
	constructor({ owner, name, rules }) {
		super(['exit', 'start', 'message']);

		this.id = uuid();
		this.name = name || `${owner.name}'s game`;
		this.rules = rules;
		this.owner = owner;
		this.players = [];
		
		Room.all.set(this.id, this);
		for (const user of User.all.values())
			if (!user.room)
				user.socket.emit('open', this);
	}
	deconstructor() {
		if (this.game) this.game.deconstructor();
		Room.all.delete(this.id);
		for (const user of User.all.values())
			if (!user.room)
				user.socket.emit('close', this);
	}

	// broadcasting
	update() {
		this.players
			.filter((user) => user instanceof User)
			.forEach((user) => user.socket.emit('room', this.toJSON(user)));
		for (const user of User.all.values())
			if (!user.room)
				user.socket.emit('update', this);
	}

	// events
	exit(data, user) {
		if (this.game)
			this.players = this.players.map((other) => user === other ? new AI(user) : other);
		else
			this.players = this.players.filter((other) => user !== other);

		if (user === this.owner)
			this.owner = this.players.find((user) => user instanceof User);

		this.off(user.socket);
		if (this.game)
			this.game.off(user.socket);

		if (!this.owner)
			this.deconstructor();
		else
			this.update();

		user.room = null;
		user.browse();
	}
	start(data, user) {
		if (this.game)
			throw new Error('Game already started');
		if (user !== this.owner)
			throw new Error('Only the room owner can start the game');
		
		for (let i = this.players.length; i < this.rules.size; i++)
			this.players.push(new AI());

		new Game(this);
		for (const user of User.all.values())
			if (!user.room)
				user.socket.emit('close', this);

	}
	message(message, user) {
		this.players
			.filter((user) => user instanceof User)
			.forEach(({ socket }) => socket.emit('message', { user, message }));
	}

	// Serialization
	toJSON(user) {
		return {
			id: this.id,
			name: this.name,
			owner: this.owner,
			mine: this.owner === user,
			players: this.players,
			rules: this.rules,
			game: this.game && this.game.toJSON(user),
		};
	}
}

class Game extends EventConsumer {
	constructor(room) {
		super(['play']);

		this.state = {
			size: room.rules.size,
		};
		this.rules = RULES[room.rules.game];

		this.room = room;
		this.room.players
			.filter((user) => user instanceof User)
			.forEach((user) => this.on(user.socket, user));
		this.room.game = this;
		this.play(INIT, null);
	}
	deconstructor() {
		this.room.players
			.filter((user) => user instanceof User)
			.forEach((user) => this.off(user.socket));
		this.room.game = null;
		this.room.update();
	}

	// Helpers
	current() {
		return this.room.players[this.state.turn % this.room.rules.size];
	}

	// Events
	play(play, user) {
		if (user && this.current() !== user)
			throw new Error('Not your turn!');

		while (play !== COMPLETE) {
			this.lastPlay = play;
			this.state = this.rules.nextState(play, this.state);
			this.room.update();
			const prev = play;
			play = this.rules.nextPlay(play, this.state);
			console.log(this.lastPlay, play);
			if (prev === PLAY && play === PLAY) {
				if (this.current() instanceof AI)
					play = this.rules.nextAIPlay(play, this.state);
				else
					break;
			}
		}
		if (play === COMPLETE)
			this.deconstructor();
	}

	// Serialization
	toJSON(user) {
		return {
			play: this.lastPlay,
			...this.state,
			legal: this.room.players.indexOf(user) === this.state.turn % this.state.size ? this.state.legal : null,
			hands: this.room.players.map((player, i) => player === user ? this.state.hands[i] : this.state.hands[i].length),
		};
	}
}


User.all = new Map();
Room.all = new Map();

module.exports = {
	User,
	Room,
};
