import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSocket } from '../hooks';
import { Row, Column, Text, Play } from '../components';
import styles from '../styles.css';

let id = 0;
export default function MessagesList() {
	const [messages, setMessages] = useState([]);
	useSocket('room', ({ players, game }) => {
		if (!game || !game.turn)
			return;

		const player = (game.turn - 1) % game.size;
		const user = players[player];
		const hand = game.hands[player];
		const cards = Array.isArray(hand) ? hand.length : hand;

		if (['OR_NOTHING', 'REVOLUTION', 'START'].includes(game.play)) {
			setMessages((messages) => [{ id: id++, message: game.play, type: 'event' }, ...messages]);
		} else if (['PASS', 'SKIP'].includes(game.play)) {
			setMessages((messages) => [{ id: id++, message: game.play, type: 'event', user, cards }, ...messages]);
		} else if (Array.isArray(game.play)) {
			setMessages((messages) => [{ id: id++, message: game.play, type: 'play', user, cards }, ...messages]);
		}
		// if (game && game.play)
		// 	setMessages((messages) => [...messages, message]);
	});
	useSocket('message', (message) => setMessages((messages) => [{ ...message, id: id++ }, ...messages]));

	return (
		<View style={{ flex: 1 }}>
		<FlatList
			style={{ flex: 1 }}
			contentContainerStyle={styles.chat}
			data={messages}
			renderItem={MessageItem}
			keyExtractor={keyExtractor}
			inverted
		/>
		</View>
	);
}

function MessageItem({ item: { user, type, message, cards } }) {
	return (
		<Row style={styles.messageItem}>
			{type === 'play' ? (
				<Play cards={message} />
			) : (
				<Text style={[styles.message, type === 'event' && styles.event]}>{message}!</Text>
			)}
			{user && <Text style={[styles.message, styles.info]}>{user.name} {cards !== undefined && `- ${cards}`}</Text>}
		</Row>
	);
}

function keyExtractor({ id }) {
	return id;
}

function equalPlays(a, b) {
	return (
		a && b && (
			a === b || (
				Array.isArray(a) &&
				Array.isArray(b) &&
				a.length === b.length &&
				!a.find((a) => !b.find((b) => equalCards(a, b)))
			)
		)
	);
}
function equalCards(a, b) {
	return (
		a && b &&
		a.s === b.s &&
		a.n === b.n
	);
}
