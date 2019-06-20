const {
	INIT,
	SHUFFLE,
	DEAL,
	SWAP,
	COMPLETE,
	START,
	REVOLUTION,
	OR_NOTHING,
	SKIP,
	PASS,
	NONE,
	PLAY,
} = require('./actions');
const {
	isTrumpPlay,
	isFourOfAKind,
	isOrNothing,
	getCurrent,
} = require('./util');

function nextPlay(action, state) {
	const { size, turn, player, plays, legal, hands, passed, ranks, orNothing } = state;

	switch (action) {
		case INIT: case SHUFFLE: return DEAL;
		case DEAL: return ~ranks.indexOf(0) ? SWAP : START;
		case SWAP: return START;
		case PASS: if (passed.filter((passed) => !passed).length === 1) return START;
	}

	if (Array.isArray(action)) {
		if (hands.filter((hand) => hand.length).length === 1)
			return COMPLETE;
		if (action.length === 4)
			return REVOLUTION;
		if (isFourOfAKind(plays) || isTrumpPlay(action))
			return START;
		if (isOrNothing(plays))
			return OR_NOTHING;
	}

	if (action === PLAY) {
		if (!getCurrent(hands, turn).length || getCurrent(passed, turn))
			return NONE;
		if (legal && !legal.length && orNothing)
			return SKIP;
		if (legal && !legal.length)
			return PASS;
	}
	
	return PLAY;
}

module.exports = nextPlay;
