const { floor, random, max, min } = Math;

const gen = () => Array(52).fill(null).map((_, i) => [i % 13, floor(i / 13)]).map(([n, s]) => ({ n, s }));
const shuffle = (cards) => cards.map((c) => [random(), c]).sort(([a], [b]) => a < b ? 1 : -1).map(([s, c]) => c);
const sort = (cards) => cards.sort((a, b) => a.n > b.n ? 1 : -1);
const complement = (cards, other) => cards.filter((card) => !other.find(({ n, s }) => card.n === n && card.s === s));
const singles = ({ cards }) => cards.filter((card) => !cards.find((other) => other !== card && other.n === card.n));

function isThreeOfClubs(card) {
	return card.n === 0 && card.s === 2;
}

function isTrumpPlay(play, revolution) {
	return play[0].n === (revolution ? 0 : 12);
}

function isFourOfAKind(plays) {
	const lastPlay = plays.find(Array.isArray);
	return plays
		.filter(Array.isArray)
		.reduce((all, play) => all.concat(play), [])
		.slice(0, 4)
		.filter((card) => card.n === lastPlay[0].n)
		.length === 4;
}

function isOrNothing(plays) {
	return (
		Array.isArray(plays[0]) &&
		Array.isArray(plays[1]) &&
		plays[0].length === 1 &&
		plays[0][0].n === plays[1][0].n
	);
}

function getCurrent(arr, turn) {
	return arr[turn % arr.length];
}
function updateCurrent(arr, turn, value) {
	const i = turn % arr.length;
	return [
		...arr.slice(0, i),
		typeof value === 'function' ? value(arr[i]) : value,
		...arr.slice(i + 1),
	];
}

module.exports = {
	gen,
	shuffle,
	sort,
	complement,
	singles,
	isThreeOfClubs,
	isTrumpPlay,
	isFourOfAKind,
	isOrNothing,
	getCurrent,
	updateCurrent,
};
