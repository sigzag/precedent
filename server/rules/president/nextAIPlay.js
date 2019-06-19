const {
	SKIP,
	PASS,
} = require('./actions');

function nextAIPlay(action, { plays, legal, orNothing, revolution }) {
	if (!plays.length) { // play biggest set of the smallest number
		const n = legal.reduce((m, [{ n }]) => Math[revolution ? 'max' : 'min'](m, n), revolution ? -Infinity : Infinity);
		return legal
			.filter((play) => play[0].n === n)
			.reduce((a, b) => a.length >= b.length ? a : b);
	} else { // play the smallest numbere'd equal size set, without breaking up larger sets
		legal = legal.filter((play, i, legal) => legal.find((other) => play !== other && play[0].n === other[0].n));
		if (legal.length)
			return legal.reduce((a, b) => (revolution ? a[0].n >= b[0].n : a[0].n <= b[0].n) ? a : b);
		if (orNothing)
			return SKIP;
		return PASS;
	}
}

module.exports = nextAIPlay;
