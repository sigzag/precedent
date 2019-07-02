import React, { useState, useEffect, useMemo, createContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './components';
import io from 'socket.io-client';
import Register from './screens/Register';
import Lobby from './screens/Lobby';
import Room from './screens/Room';
import Game from './screens/Game';
import styles from './styles.css';

export const socketContext = createContext();
export const navigationContext = createContext();

export default function App() {
	const socket = useMemo(() => io(
		// 'https://sigzag-precedent.glitch.me',
		'http://localhost:4000',
	), []);
	const [navigationState, navigate] = useState({});

	useEffect(() => {
		socket.on('alert', alert);
		socket.on('rooms', (rooms) => navigate({ screen: 'Lobby', data: { rooms } }));
		socket.on('room', (room) => {
			if (room.game)
				navigate({ screen: 'Game', data: { room } });
			else
				navigate({ screen: 'Room', data: { room } });
		});

		socket.send('register', 'sig');
		socket.send('create', { name: 'game', players: 3 });
		socket.send('start');
	}, [socket]);

	return (
		<navigationContext.Provider value={navigate}>
			<socketContext.Provider value={socket}>
				<View style={[styles.body, StyleSheet.absoluteFill]}>
					<Screen {...navigationState} />
					{/* <Game room={{ */}
					{/* 	players: [{ name: 'sig', id: 'sig' }, { name: 'min', id: 'min' }], */}
					{/* 	game: { players: [{ name: 'sig', id: 'sig', cards: new Array(11).fill({}) }, { name: 'min', id: 'min', cards: [] }], pile: [], draw: new Array(10).fill({}) }, */}
					{/* 	rules: { size: 2 }, */}
					{/* }} /> */}
				</View>
			</socketContext.Provider>
		</navigationContext.Provider>
	);  
}

function Screen({ screen, data = {} }) {
	switch (screen) {
	case 'Lobby':
		return <Lobby {...data} />;
	case 'Room':
		return <Room {...data} />;
	case 'Game':
		return <Game {...data} />;
	default:
		return <Register />;
	}
}
