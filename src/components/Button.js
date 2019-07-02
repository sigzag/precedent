import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../styles.css';

export default function Button({ children, style, disabled, onPress, ...props }) {
	return (
		<TouchableOpacity {...props} onPress={disabled ? null : onPress}>
			<Text style={[styles.text, styles.button, disabled && styles.disabled, style]}>{children}</Text>
		</TouchableOpacity>
	);
}
