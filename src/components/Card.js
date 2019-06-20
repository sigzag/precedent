import React from 'react';
import { useTransform } from '../hooks';
import { G, Rect, Text } from 'react-native-svg';
import styles from '../styles.css';

export default function Card({ transforms = [], style, s, n, stroke, onPress }) {
	const [, transform] = useTransform(transforms);
	const color = s & 1 ? 'red' : 'black';
	return (
		<G style={[styles.card, style]} transform={transform}  onClick={onPress} onPress={onPress}>
			<Rect
				rx="7"
				width="50"
				height="80"
				x="-25"
				y="-40"
				strokeWidth="2"
				stroke={stroke || 'black'}
				fill={s !== undefined ? 'white' : 'url(#pattern)'}
			/>
			{s !== undefined && (
				<>
					<Text x="-10" y="-20" style={[{ fill: color, textAnchor: 'middle' }, styles.number]}>
						{s !== undefined ? values[n] : '?'}
					</Text>
					<Text x="-10" y="-2" style={[{ fill: color, textAnchor: 'middle' }, styles.smallSuit]}>
						{s !== undefined ? suits[s] : '?'}
					</Text>
					<Text y="23" style={[{ fill: color, textAnchor: 'middle' }, styles.suit]}>
						{s !== undefined ? suits[s] : '?'}
					</Text>
				</>
			)}
		</G>
	)
}

const values = [3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2];
const suits = ['⚣', '⚢', '⚤', '♥'];
