import React, { useState, useCallback } from 'react';
import { useToggle, useSocket, useInputRef } from '../hooks';
import { Column, Row, Button, Action, Header, Input, Picker } from '../components'

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

	return (
		<>
			<Row>
				<Header style={{ flex: 1 }}>Rooms</Header>
				<Button onPress={props.toggle}>create room</Button>
			</Row>
			<Column>
				{rooms.map((room) =>
					<Row key={room.id}>
						<Action event="enter" data={room.id}>{room.name} - {room.players.length} / {room.rules.size}</Action>
					</Row>
				)}
			</Column>
		</>
	);
}

function Create(props) {
	const [name, setName] = useInputRef('');
	const [players, setPlayers] = useInputRef(3);
	const data = useCallback(() => ({ name: name.current, players: players.current }), []);

	return (
		<>
			<Row>
				<Header style={{ flex: 1 }}>Create room</Header>
				<Button onClick={props.toggle}>cancel</Button>
			</Row>
			<Column>
				<Input onChangeText={setName} />
				<Picker defaultValue={3} onValueChange={setPlayers}>
					<Picker.Item label="2" value={2} />
					<Picker.Item label="3" value={3} />
					<Picker.Item label="4" value={4} />
					<Picker.Item label="5" value={5} />
				</Picker>
				<Action event="create" data={data}>Create!</Action>
			</Column>
		</>
	);
}
