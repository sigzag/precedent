import React, { useCallback } from 'react';
import { useInputRef } from '../hooks';
import { Action, Input } from '../components';

export default function Register() {
	const [name, setName] = useInputRef('');
	const data = useCallback(() => name.current, []);
	return (
		<>
			<Input onChangeText={setName} />
			<Action event="register" data={data}>Register!</Action>
		</>
	);
}
