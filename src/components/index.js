import React from 'react';
import { View, Text as RNText, TextInput, Picker} from 'react-native';
import styles from '../styles.css';

export { default as Transform } from './Transform';
export { default as Button } from './Button';
export { default as Action } from './Action';
export { default as Header } from './Header';
export { default as Card } from './Card';
export { default as Play } from './Play';

function createStyledComponent(Component, ...styles) {
	return function(props) {
		return <Component {...props} style={[...styles, props.style]} />;
	}
}

export const Row = createStyledComponent(View, styles.row);
export const Column = createStyledComponent(View, styles.column);
export const Text = createStyledComponent(RNText, styles.text);
export const Input = createStyledComponent(TextInput, styles.input);

export { View, Picker };
