import React, { useState } from 'react';
import { useSocket } from '../../hooks';
import { Column, Row, Text, Play } from '../../components';
import styles from '../../styles.css';

export default function Hands({ room }) {
	const [{
		players,
		game: {
			plays,
			hands,
			turn,
			size,
		},
	}, setRoom] = useState(room);
	useSocket('room', setRoom);

	const last = hands.map((hand, i) => {
		if (Array.isArray(hand) ? !hand.length : !hand) return 'DONE';
		const j = (size + turn - i - 1) % size;
		if (plays[j]) return plays[j];
		return 'NONE';
	});
	const active = turn % size;

	return (
		<Row style={styles.handsRow}>
			{players.map(({ name }, i) =>
				<Column key={i} style={[styles.hand, i === active && styles.activeHand]}>
					<Text style={styles.oneLine}>{name}</Text>
					{Array.isArray(last[i]) ? (
						<Play cards={last[i]} />
					) : (
						<Text>{last[i]}</Text>
					)}
				</Column>
			)}
		</Row>
	);
}
