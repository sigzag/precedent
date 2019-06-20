import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles.css';

export default function Button({ children, style, ...props }) {
	return (
		<TouchableOpacity {...props}>
			<Text style={[styles.text, styles.button, style]}>{children}</Text>
		</TouchableOpacity>
	);
}
