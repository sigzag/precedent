const { SKIP, PASS } = require('./actions');

function isLegalPlay(play, state) {
	switch (play) {
		case PASS:
			return !state.orNothing;
		case SKIP:
			return !!state.orNothing;
		default:
			return (
				Array.isArray(play) &&
				!!state.legal
					.filter((legalPlay) => legalPlay.length === play.length)
					.find((legalPlay) => !legalPlay.find((card) => !play.find((other) => card.s === other.s && card.n === other.n)))
			);
	}
}

module.exports = isLegalPlay;
