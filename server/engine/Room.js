const uuid = require('uuid/v4');
const EventConsumer = require('../util/EventConsumer');
const lobby = require('./Lobby');
const AI = require('./AI');
const Game = require('./Game');

class Room extends EventConsumer {
	constructor({ owner, name, rules }) {
		super(['exit', 'start', 'message']);

		this.id = uuid();
		this.name = name || `${owner.name}'s game`;
		this.rules = rules;
		this.owner = owner;
		this.players = [];
		this.ranks = null;

		lobby.open(this);
	}
	deconstructor() {
		if (this.game) this.game.deconstructor();
		lobby.close(this);
	}

	// broadcasting
	update() {
		this.players
			.filter((user) => !(user instanceof AI))
			.forEach((user) => user.socket.emit('room', this.toJSON(user)));
		lobby.update(this);
	}

	// events
	exit(data, user) {
		if (this.game)
			this.players = this.players.map((other) => user === other ? new AI(user) : other);
		else
			this.players = this.players.filter((other) => user !== other);

		if (user === this.owner)
			this.owner = this.players.find((user) => !(user instanceof AI));

		this.off(user.socket);
		if (this.game)
			this.game.off(user.socket);

		if (!this.owner)
			this.deconstructor();
		else
			this.update();

		lobby.browse(user);
	}
	start(data, user) {
		if (this.game)
			throw new Error('Game already started');
		if (user !== this.owner)
			throw new Error('Only the room owner can start the game');
		
		for (let i = this.players.length; i < this.rules.size; i++)
			this.players.push(new AI());

		new Game(this);
		lobby.close(this);
	}
	message(message, user) {
		this.players
			.filter((user) => !(user instanceof AI))
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

module.exports = Room;
