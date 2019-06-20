import { useContext, useEffect } from 'react';
import { socketContext } from '../App.js';

export default function useSocket(event, fn) {
	const socket = useContext(socketContext);
	useEffect(() => {
		if (typeof event === 'string' && typeof fn === 'function') {
			socket.on(event, fn);
			return () => socket.removeListener(event, fn);
		}
	}, [event]);
	return socket;
}
