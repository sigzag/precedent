const { floor, random } = Math;
Array.prototype.findLastIndex = function findLastIndex(fn) {
	for (let i = this.length - 1; i > -1; i--)
		if (fn(this[i]))
			return i;
	return -1;
};

const current = ({ players, turn }) => players[turn % players.length];
const defaultState = ({ players }) => ({
	players: players.map((user) => ({
		...user.toJSON(),
		draw: Array(10).fill(null).map((_, i) => ({ i, u: false, player: user.id })),
		pile: [],
	})),
	board: Array(14).fill(null).map(() => []),
	turn: null,
	roll: null,
	legal: null,
});

const lastPiece = (arr) => arr.length ? arr[arr.length - 1] : {};
function legal(state) {
	const { roll, board } = state;
	const { id, draw: [drawPiece] } = current(state);
	const plays = [];
	if (drawPiece)
		plays.push(`-1->${roll - 1}`);
	for (let i = 0; i < board.length; i++) {
		const piece = lastPiece(board[i]);
		if (i < 4 && board[i].find((piece) => piece.player === id))
			plays.push(`${i}->${roll + i}`);
		else if (piece.player === id && roll + i < 14)
			plays.push(`${i}->${roll + i}`);
		else if (piece.u && i - roll > 3)
			plays.push(`${i}->${i - roll}`);
	}
	return plays;
}

function nextAiPlay(state) {
	return state.legal[0];
}
function nextPlay(state) {
	const { players, legal, roll, board } = state;
	const { id, draw: [drawPiece] } = current(state);
	if (!drawPiece && !board.map(lastPiece).find((piece) => piece.player === id))
		return COMPLETE;
	if (!roll || legal && !legal.length)
		return ROLL;
	return PLAY;
}
function nextPlayState(play, state) {
	if (!state.legal.includes(play))
		throw new Error('Illegal play');
	const [a, b] = play.split('->');
	let { turn, board, players } = state;
	const player = current(state);
	const other = current({ ...state, turn: turn + 1 });

	if (a == -1) {
		const piece = player.draw.pop();
		board[b].push(piece);
	} else if (a < 4) {
		const [piece] = board[a].splice(board[a].findLastIndex((piece) => piece.player === player.id), 1);
		board[b].push(piece);
	} else {
		const piece = board[a].pop();
		const stack = board[a].splice(board[a].findLastIndex((piece) => piece.player == player.id) + 1, board[a].length);
		if (b == 13) {
			other.pile.push(...stack);
			board[b].push({ ...piece, u: true });
		} else {
			board[b].push(...stack, piece);
		}
	}

	return nextState(ROLL, state);
}

const { INIT, PLAY, COMPLETE } = require('../actions');
const ROLL = 'ROLL';
function nextState(play, state) {
	if (play.includes('->'))
		return nextPlayState(play, state);
	switch (play) {
		case INIT:
			return defaultState(state);
		case ROLL:
			state.turn++;
			state.roll = floor(random() * 6);
			return state;
		case PLAY:
			return { ...state, legal: legal(state) };
	}
}

module.exports = { nextState, nextPlay, nextAiPlay };
