import React, { useState, useCallback } from 'react';
import { useSocket } from '../hooks';
import { Column, Row, Button, Text, Input } from '../components';
import styles from '../styles.css';

export default function Chat() {
	return (
		<>
			<Messages />
			<Message />
		</>
	);
}

function Messages() {
	const [messages, setMessages] = useState([]);
	useSocket('message', useCallback((message) => setMessages((messages) => [...messages, message]), []));

	return (
		<Column style={styles.chat}>
			{messages.reverse().map(({ user, message }, i) =>
				<Text key={i}>
					{user.name}:
					<Text style={styles.message}>{message}</Text>
				</Text>
			)}
		</Column>
	);
}

function Message() {
	const [message, setMessage] = useState();
	const socket = useSocket();
	const sendMessage = useCallback(() => {
		if (message)
			socket.send('message', message)
		setMessage('');
	}, [socket, message]);
	
	return (
		<Row>
			<Input style={{ flex: 1 }} value={message} onChangeText={setMessage} />
			<Button style={{ alignSelf: 'stretch' }} onPress={sendMessage}>➜</Button>
		</Row>
	);
}
