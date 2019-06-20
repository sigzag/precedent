import React, { useState, useCallback } from 'react';
import { useSocket } from '../hooks';
import { Row, Button, Input } from '../components';

export default function MessageInput() {
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
