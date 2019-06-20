import React from 'react';
import { Row, Action, Header, Text, Play } from '../../components';
import { MessageList, MessageInput } from '../../containers';
import Hand from './Hand';
import styles from '../../styles.css';

export default function Game({ room }) {
	const {
		name,
		players,
		rules: {
			size,
		},
	} = room;

	return (
		<>
			<Row>
				<Header style={{ flex: 1 }}>{name}</Header>
				<Header>{players.length} / {size}</Header>
				<Action event="exit">leave</Action>
			</Row>
			<Row>
				<Text style={styles.players}>{players.map(({ name }) => name).join(', ')}</Text>
			</Row>
			<MessageList />
			<Hand room={room} size={Math.ceil(52 / size)} />
			<MessageInput />
		</>
	);
}
