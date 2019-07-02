import React, { useState, useCallback } from 'react';
import { useInputRef } from '../hooks';
import { Column, Action, Input } from '../components';
import styles from '../styles.css';

export default function Register() {
	const [name, setName] = useState('');
	return (
		<Column style={styles.centered}>
			<Input value={name} onChangeText={setName} placeholder="Enter your name" />
			<Action disabled={!name} event="register" data={name}>Lets play!</Action>
		</Column>
	);
}
