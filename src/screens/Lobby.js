import React, { useState, useCallback } from 'react';
import { useToggle, useSocket, useInputRef } from '../hooks';
import { Column, Row, Button, Action, Header, Input, Picker, Text } from '../components'
import styles from '../styles.css';

export default function Lobby(props) {
	const [create, toggle] = useToggle();
	return create ? (
		<Create toggle={toggle} />
	) : (
		<Rooms {...props} toggle={toggle} />
	);
}

function Rooms(props) {
	const [rooms, setRooms] = useState(props.rooms);
	useSocket('open', (next) => setRooms((rooms) =>
		rooms.find((room) => room.id === next.id)
			? rooms
			: [...rooms, next]
	));
	useSocket('update', (next) => setRooms((rooms) =>
		rooms.find((room) => room.id === next.id)
			? rooms.map((room) => room.id === next.id ? next : room)
			: [...rooms, next]
	));
	useSocket('close', (prev) => setRooms((rooms) =>
		rooms.find((room) => room.id === prev.id)
			? rooms.filter((room) => room.id !== prev.id)
			: rooms
	));

	console.log(rooms.length);

	return (
		<>
			<Row>
				<Header style={{ flex: 1 }}>Rooms</Header>
				<Button onPress={props.toggle}>open room</Button>
			</Row>
			<Column style={{ flex: 1 }}>
				{rooms.map((room) =>
					<Row key={room.id}>
						<Action event="enter" data={room.id}>{room.name} - {room.players.length} / {room.rules.size}</Action>
					</Row>
				)}
				{!rooms.length && (
					<Column style={styles.centered}>
						<Text>There are currently no open rooms.</Text>
						<Text>Click "open room" above to open one.</Text>
					</Column>
				)}
			</Column>
		</>
	);
}

function Create(props) {
	const [name, setName] = useState('');
	const [players, setPlayers] = useInputRef(3);
	const data = useCallback(() => ({ name: name.current, players: players.current }), []);

	return (
		<>
			<Row>
				<Header style={{ flex: 1 }}>Open room</Header>
				<Button onClick={props.toggle}>cancel</Button>
			</Row>
			<Column style={styles.centered}>
				<Input onChangeText={setName} value={name} placeholder="Enter room name" />
				<Row>
					<Header>Number of players: </Header>
					<Picker defaultValue={3} onValueChange={setPlayers}>
						<Picker.Item label="2" value={2} />
						<Picker.Item label="3" value={3} />
						<Picker.Item label="4" value={4} />
						<Picker.Item label="5" value={5} />
					</Picker>
				</Row>
				<Action disabled={!name} event="create" data={data}>Create!</Action>
			</Column>
		</>
	);
}
