const {
	INIT,
	SHUFFLE,
	DEAL,
	SWAP,
	START,
	REVOLUTION,
	OR_NOTHING,
	SKIP,
	PASS,
	PLAY,
	NONE,
} = require('./actions');
const {
	gen,
	shuffle,
	complement,
	sort,
	singles,
	getCurrent,
	updateCurrent,
	isThreeOfClubs,
	isTrumpPlay,
} = require('./util');
const getLegalPlays = require('./getLegalPlays');

function nextState(play, state) {
	if (Array.isArray(play))
		return nextPlayState(play, state);

	switch (play) {
		case INIT:
			return nextPrepState(SHUFFLE, state);
		case SHUFFLE: case DEAL: case SWAP:
			return nextPrepState(play, state);
		case START:
			return { 
				...state,
				draw: state.draw.concat(...state.plays.filter(Array.isArray)),
				plays: [],
				turn: state.player == null ? state.turn : state.player,
				player: null,
				legal: null,
				passed: Array(state.size).fill(false),
				orNothing: false,
				revolution: false,
			};
		case REVOLUTION:
			return {
				...state,
				revolution: !state.revolution,
			};
		case OR_NOTHING:
			return {
				...state,
				orNothing: true,
			};
		case SKIP:
			if (!state.orNothing)
				throw new Error('Invalid play!');
			return {
				...state,
				turn: state.turn + 1,
				plays: [play, ...state.plays],
				player: state.turn % state.size,
				legal: null,
				orNothing: false,
			};
		case PASS:
			if (!state.plays.length)
				throw new Error('Invalid play!');
			return {
				...state,
				turn: state.turn + 1,
				plays: [play, ...state.plays],
				legal: null,
				passed: updateCurrent(state.passed, state.turn, true),
				orNothing: false,
			};
		case NONE:
			return {
				...state,
				turn: state.turn + 1,
			};
		case PLAY:
			return {
				...state,
				legal: getLegalPlays(state),
			};
	}

	throw new Error('Invalid play/state', play, state);
}

function nextPlayState(play, state) {
	const hand = complement(getCurrent(state.hands, state.turn), play);
	const rank =
		hand.length
			? null
			: state.ranks
				.filter((rank) => rank !== null)
				.reduce((ranks, rank) => {
					ranks[rank] = 1;
					return ranks;
				}, new Array(state.size).fill(0))
				[isTrumpPlay(play, state.revolution) ? 'lastIndexOf' : 'indexOf'](0);

	return {
		...state,
		plays: [play, ...state.plays],
		turn: state.turn + 1,
		player: state.turn % state.size,
		legal: null,
		hands: updateCurrent(state.hands, state.turn, hand),
		ranks: updateCurrent(state.ranks, state.turn, rank),
	};
}

function nextPrepState(action, state) {
	const { size, ranks, hands, draw } = state;
	switch (action) {
		case SHUFFLE: {
			return {
				...defaultState(size, ranks),
				draw: shuffle(gen()),
			};
		} case DEAL: {
			const nextHands = hands.map(() => []);
			for (let i = 0; i < 52; i++)
				nextHands[i % size].push(draw[i]);
			return {
				...state,
				draw: [],
				turn: nextHands.findIndex((cards) => cards.find(isThreeOfClubs)),
				hands: nextHands.map(sort),
				passed: Array(size).fill(false),
			};
		} case SWAP: {
			let nextHands = hands;
			for (let i = 0; i < Math.max(2, size / 2); i++) {
				const winner = hands[ranks.indexOf(i)];
				const loser = hands[ranks.indexOf(size - i - 1)];
				const worst = singles(winner).slice(0, 2 - i);
				const best = singles(loser).slice(-(2 - i));
				nextHands = updateCurrent(nextHands, ranks.indexOf(i), (hand) => sort(complement(hand, worst).concat(best)));
				nextHands = updateCurrent(nextHands, ranks.indexOf(size - i - 1), (hand) => sort(complement(hand, best).concat(worst)));
			}
			
			return {
				...state,
				turn: ranks.indexOf(size - 1),
				hands: nextHands,
			};
		}
	}

	return state;
}

function defaultState(size, ranks) {
	return {
		size, // number of players
		draw: [], // cards to be drawn
		plays: [], // plays this round
		turn: null, // current player turn
		player: null, // previous play's player's index (seed for next round's turn after START)
		legal: null, // next legal plays
		hands: Array(size).fill(null).map(() => []), // player hands
		passed: Array(size).fill(false), // player passed status
		ranks: ranks || Array(size).fill(null), // player ranks from previous game
		orNothing: false, // if current state is an or-nothing play
		revolution: false, // if current round has experienced a revolution
	};
}

module.exports = nextState;
