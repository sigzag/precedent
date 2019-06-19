const RULES = require('../rules');
const { INIT, COMPLETE, PLAY, SKIP, PASS } = require('../rules/president/actions');
const EventConsumer = require('../util/EventConsumer');
const AI = require('./AI');

class Game extends EventConsumer {
	constructor(room) {
		super(['play']);

		this.state = {
			size: room.rules.size,
			ranks: room.ranks,
		};
		this.rules = RULES[room.rules.game];

		this.room = room;
		this.room.players.forEach((user) => this.on(user.socket, user));
		this.room.game = this;
		this.play(INIT, null);
	}
	deconstructor() {
		this.room.players.forEach((user) => this.off(user.socket));
		this.room.ranks = this.state.ranks;
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
		if (user && !this.rules.isLegalPlay(play, this.state))
			throw new Error('Invalid play');

		while (play !== COMPLETE) {
			this.lastPlay = play;
			this.state = this.rules.nextState(play, this.state);
			this.room.update();
			play = this.rules.nextPlay(play, this.state);
			console.log('intermediate', play);
			if (this.lastPlay === PLAY && play === PLAY) {
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

module.exports = Game;
