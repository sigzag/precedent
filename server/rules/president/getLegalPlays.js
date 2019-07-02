const {
	SKIP,
	PASS,
} = require('./actions');
const {
	getCurrent,
	isThreeOfClubs,
} = require('./util');

function getLegalPlays({ turn, plays, hands, orNothing, revolution }) {
	const hand = getCurrent(hands, turn);
	const legal = hand.reduce((legal, card, i, hand) =>
		legal.concat(
			hand
				.slice(i + 1)
				.filter(({ n, s }) => card.n === n)
				.reduce((sets, card) => sets.concat(sets.map((set) => set.concat(card))), [[card]])
		)
	, []);

	// First play of a round
	if (hand.find(isThreeOfClubs)) // && isFirstRound!!!
		return legal.filter((play) => play.find(isThreeOfClubs));
	if (!plays.length)
		return legal;

	const lastPlay = plays.find(Array.isArray);
	return legal
		.filter((set) => set.length === lastPlay.length)
		.filter((set) => {
			if (orNothing) return set[0].n === lastPlay[0].n;
			if (revolution) return set[0].n <= lastPlay[0].n;
			return set[0].n >= lastPlay[0].n;
		})
		.concat(orNothing ? SKIP : PASS);
}

module.exports = getLegalPlays;
