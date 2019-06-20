import React, { useCallback } from 'react';
import { useSocket } from '../hooks';
import Button from './Button';

export default function Action({ event, data, ...props }) {
	const socket = useSocket();
	const onPress = useCallback(() => {
		const sendData =
			typeof data === 'function'
				? data() || null
				: data;
		if (sendData || sendData === undefined)
			socket.send(event, sendData);
	}, [socket, event, data])
	return <Button {...props} onPress={onPress} />;
}
