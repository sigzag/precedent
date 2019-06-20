import React, { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../../hooks';
import { Svg } from 'react-native-svg';
import { Row, Action, Card } from '../../components';
import styles from '../../styles.css';


export default function Hand({ size, room }) {
	const [{
		game: {
			plays,
			hands,
			legal,
			orNothing,
		},
	}, setRoom] = useState(room);
	useSocket('room', setRoom);

	const cards = hands.find(Array.isArray);

	const [selected, setSelected] = useState([]);
	useEffect(() => setSelected([]), [legal]);
	const legalPlay = (legal || []).find((play) => equalPlays(play, selected));
	// useEffect(() => setSelected((selected) => selected.length ? [] : selected), [legal]);
	const selectable = (legal || []).filter(
		(play) => !selected.find((card) => !play.find((other) => equalCards(card, other)))
	).flat();

	const [height, setHeight] = useState(50);

	return (
		<Row style={styles.playRow}>
			<Svg style={{ flex: 1 }} onLayout={useCallback((event) => {
				setHeight(85 * event.nativeEvent.layout.width / (size * 20 + 40))
			})} height={height} viewBox={`-35 -70 ${size * 20 + 40} 85`}>
				{cards.map((card, i, cards) => {
					return (
						<PlayerCard
							{...card}
							key={i}
							transforms={[
								['translate', [i * size * 20 / cards.length, 0, 0]],
							]}
							select={selectable.find((other) => equalCards(card, other)) && setSelected}
							selected={selected.find((other) => equalCards(card, other))}
						/>
					);
				})}
			</Svg>
			{legalPlay ? (
				<Action style={styles.playAction} event="play" data={legalPlay}>play</Action>
			) : (
				<Action style={styles.playAction} event="play" data={orNothing ? 'SKIP' : 'PASS'}>{orNothing ? 'skip' : 'pass'}</Action>
			)}
		</Row>
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
