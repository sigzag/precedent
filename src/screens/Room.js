import React, { useState } from 'react';
import { useSocket } from '../hooks';
import { Column, Row, Action, Header, Text } from '../components';
import { MessageList, MessageInput } from '../containers';
import styles from '../styles.css';

export default function Room(props) {
	const [room, setState] = useState(props.room);
	useSocket('room', setState);

	return (
		<>
			<Row>
				<Header style={{ flex: 1 }}>{room.name}</Header>
				<Header>{room.players.length} / {room.rules.size}</Header>
				<Action event="exit">leave</Action>
			</Row>
			<Row>
				<Text style={styles.players}>{room.players.map(({ name }) => name)}</Text>
			</Row>
			<MessageList />
			{room.mine && (
				<Action event="start">Start game</Action>
			)}
			<MessageInput />
		</>
	);
}
