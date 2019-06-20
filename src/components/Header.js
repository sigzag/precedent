import React from 'react';
import { Text } from 'react-native';
import styles from '../styles.css';

export default function Header(props) {
	return <Text {...props} style={[styles.text, styles.header, props.style]} />
}
