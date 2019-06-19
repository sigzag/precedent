const uuid = require('uuid/v4');
const EventConsumer = require('../util/EventConsumer');
const lobby = require('./Lobby');
const Room = require('./Room');

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
		lobby.deregister(this);
	}

	// Events
	register(name) {
		if (this.name)
			throw new Error('You have already registered');
		if (lobby.users.has(name))
			throw new Error('Name already taken :<');

		this.name = name;
		lobby.register(this);
	}
	create({ name, players }) {
		if (this.room)
			throw new Error('You may not create a room in your current state (you absolute mess!)');

		lobby.join(this, new Room({ name, rules: { size: players, game: 'president' }, owner: this }));
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

		lobby.join(this, room);
	}

	// Serialization
	toJSON() {
		return {
			id: this.id,
			name: this.name,
		};
	}
}

module.exports = User;
