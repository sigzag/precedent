import React, { useEffect, useState, useCallback } from 'react';
import { useSocket, useTransform, useQueue } from '../../hooks';
import { Circle, Text, G } from 'react-native-svg';
import { Transform, Card, View } from '../../components';
import styles from '../../styles.css';

export default function Table({ room }) {
	const [matrix, transform] = useTransform([
		// ['rotateX', TAU / 5],
		['rotateZ', TAU / 4],
	]);
	const [{
		players,
		game: {
			size,
			turn,
			draw,
			plays,
			hands,
			legal,
			orNothing,
		},
	}, queue] = useQueue(500, room);
	useSocket('room', queue);

	const pile = plays.filter(Array.isArray);
	const index = hands.findIndex(Array.isArray);

	return (
		<Transform value={matrix}>
			<Circle r="250" fill="forestgreen" transform={transform} />
			<Pile cards={draw} transforms={[['translate', [-100, 0, 0]]]} />
			{!!pile.length && (
				<Fan cards={pile[0]} />
			)}
			{pile.slice(1).map((play, i, plays) =>
				<Pile
					key={i}
					cards={play}
					transforms={[['translate', [100, 0, plays.length - i]]]}
				/>
			)}
			{players.map((player, i) =>
				index !== i && <Coplayer
					key={player.id}
					{...player}
					cards={hands[i]}
					action={(turn - 1) % size === i ? plays[0] : null}
					position={(index - i) % size / size}
				/>
			)}
			<Player
				cards={hands[index]}
				legal={legal || []}
				orNothing={orNothing}
			/>
		</Transform>
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
					key={card.s !== undefined ? `${card.s}-${card.n}` : i}
					transforms={[
						['translate', [0, 0, i]],
						['rotateX', card.s !== undefined ? 0 : TAU / 2],
					]}
				/>
			)}
		</Transform>
	);
}

function Fan({ cards }) {
	const theta = TAU / 5 / cards.length;
	return cards.map((card, i) =>
		<Card
			{...card}
			key={card.s !== undefined ? `${card.s}-${card.n}` : i}
			transforms={[
				['translate', [sin(i * theta) * 100, sin(i * theta) * 200, i]],
				['rotateZ', i * theta],
			]}
		/>
	);
}

function Sprite({ transforms = [], ...props }) {
	const [, transform] = useTransform([
		...transforms,
		['removeRotation']
	]);
	return <G {...props} transform={transform} />;
}
function TextSprite({ children, onPress, ...props }) {
	return <Sprite onClick={onPress} onPress={onPress} {...props}><Text textAnchor="middle" fontFamily="Bungee-Regular" fontSize="35" fill="rgb(255, 36, 0)">{children}</Text></Sprite>;
}

function Coplayer({ name, cards, action, position }) {
	const theta = TAU * position;
	const [matrix] = useTransform([
		['translate', [cos(theta) * 250, sin(theta) * 250, 0]],
	]);

	console.log(cards);

	return (
		<Transform value={matrix}>
			<TextSprite transforms={[['translate', [0, 0, 0]]]}>{name}</TextSprite>
			{cards ? (
				<TextSprite transforms={[['translate', [40, 0, 0]]]}>{`${cards} cards left`}</TextSprite>
			) : (
				<TextSprite transforms={[['translate', [40, 0, 0]]]}>finished</TextSprite>
			)}
			{typeof action === 'string' && (
				<TextSprite transforms={[['translate', [80, 0, 0]]]}>{action}</TextSprite>
			)}
		</Transform>
	)
}

function Player({ cards, legal, orNothing }) {
	const [matrix] = useTransform([
		['translate', [200, 0, 0]],
		['rotateZ', -TAU / 4],
	]);

	const [selected, setSelected] = useState([]);
	useEffect(() => setSelected((selected) => selected.length ? [] : selected), [legal]);
	const selectable = legal.filter(
		(play) => !selected.find((card) => !play.find((other) => equalCards(card, other)))
	).flat();

	const socket = useSocket();
	const legalPlay = legal.find((play) => equalPlays(play, selected));
	const play = useCallback(() => legalPlay && socket.send('play', legalPlay), [socket, legalPlay]);
	const skip = useCallback(() => socket.send('play', 'SKIP'), [socket]);
	const pass = useCallback(() => socket.send('play', 'PASS'), [socket]);

	return (
		<Transform value={matrix}>
			{(Array.isArray(cards)
				? cards
				: new Array(cards).fill({})
			).map((card, i, cards) => {
				return (
					<PlayerCard
						{...card}
						key={card.s !== undefined ? `${card.s}-${card.n}` : i}
						transforms={[
							['translate', [i / (cards.length - 1) * 500 - 250, 0, 0]],
						]}
						select={selectable.find((other) => equalCards(card, other)) && setSelected}
						selected={selected.find((other) => equalCards(card, other))}
					/>
				);
			})}
			{!!legal.length && (
				<>
					<TextSprite onPress={play} transforms={[['translate', [0, 90, 0]]]}>play</TextSprite>
					<TextSprite onPress={orNothing ? skip : pass} transforms={[['translate', [0, 120, 0]]]}>{orNothing ? 'skip' : 'pass'}</TextSprite>
				</>
			)}
		</Transform>
	);
}

function PlayerCard({ transforms = [], select, selected, ...props }) {
	const toggle = useCallback(
		() => select && select((prev) =>
			prev.find((card) => equalCards(props, card))
				? prev.filter((card) => !equalCards(props, card))
				: [...prev, props]
		),
		[select],
	);
	const stroke = selected ? 'lime' : select ? 'dodgerblue' : null;
	transforms = [...transforms, ['translate', [0, selected ? -20 : select ? -10 : 0, 0]]];

	return (
		<Card
			{...props}
			stroke={stroke}
			transforms={transforms}
			onPress={toggle}
		/>
	);
}

function equalPlays(a, b) {
	return (
		a && b &&
		a.length === b.length &&
		!a.find((a) => !b.find((b) => equalCards(a, b)))
	);
}
function equalCards(a, b) {
	return (
		a && b &&
		a.s === b.s &&
		a.n === b.n
	);
}
