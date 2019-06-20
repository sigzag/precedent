import React, { useEffect, useState } from 'react';
import { useSocket, useTransform } from '../../hooks';
import { Transform } from '../../components';

export default function Table({ room }) {
	const [matrix, transform] = useTransform([
		['rotateX', TAU / 5],
		// ['rotateZ', -TAU / 4],
	]);
	const [{
		game: {
			players,
			draw,
			pile,
		},
	}, setState] = useState(room);
	useSocket('room', setState);

	const index = players.indexOf(({ cards }) => Array.isArray(cards));
	return (
		<gameboard style={{ transform }}>
			{[
				...players.slice(index),
				...players.slice(0, index),
			].map((player, i) =>
				<Player key={player.id} {...player} position={i / players.length} />
			)}
			<Pile cards={new Array(10).fill({})} transforms={[['translate', [-100, 0, 0]]]} />
			<Pile cards={pile} transforms={[['translate', [100, 0, 0]]]} />
		</gameboard>
	);
}

const { sin, cos } = Math;
const TAU = 2 * Math.PI;

function Pile({ cards, transforms }) {
	const [matrix] = useTransform(transforms);

	return (
		<Transform value={matrix}>
			{cards.map((card, i) =>
				<Card
					{...card}
					key={card.value ? `${card.suit}-${card.value}` : i}
					transforms={[
						['translate', [0, 0, i]],
						['rotateX', card.value ? 0 : TAU / 2],
					]}
				/>
			)}
		</Transform>
	);
}

function Player({ name, cards, position }) {
	const theta = TAU * position;
	const [matrix, transform] = useTransform([
		['translate', [cos(theta) * 200, sin(theta) * 200, 40]],
		['rotateZ', TAU / 4 - theta],
		['rotateX', -TAU / 4],
		// [TAU/3.5, TAU / 4 - theta, 0],
	]);

	return (
		<Transform value={matrix}>
			{(Array.isArray(cards)
				? cards
				: new Array(cards).fill({})
			).map((card, i, cards) => {
				const theta = -TAU / 4 + (TAU / 12 - TAU / 6 * i / (cards.length - 1));
				return (
					<Card
						{...card}
						key={card.value ? `${card.suit}-${card.value}` : i}
						transforms={[
							['translate', [cos(theta) * 100, sin(theta) * 100 + 70, 0]],
							['rotateZ', theta + TAU / 4],
						]}
					/>
				);
			})}
			<h1 style={{ transform }}>{name}</h1>
		</Transform>
	)
}

function Name({ value }) {
	const [theta, setTheta] = useState(0);
	const [matrix, transform] = useTransform([
		['rotateY', theta],
	]);
	// useEffect(
	// 	() => {
	// 		const interval = setInterval(
	// 			() => setTheta((theta) => theta + TAU / 100),
	// 			16,
	// 		);
	// 		return () => clearInterval(interval);
	// 	},
	// 	[]
	// );
	return <h1 style={{ transform }}>{value}</h1>;
}

function Card({ status, value, suit, transforms }) {
	const [, transform] = useTransform(transforms);

	return (
		<card style={styles[status} style={{ transform, color: suit & 1 ? 'red' : 'black' }}>
			<front>
				<number>{value ? values[value] : '?'}</number>
				<suit>{value ? suits[suit] : '?'}</suit>
			</front>
			<back />
		</card>
	)
}

const values = [3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2];
const suits = ['⚣', '⚢', '⚤', '♥'];
