import React from 'react';
import { Svg } from 'react-native-svg';
import Card from './Card';

export default function Play({ cards }) {
	return (
		<Svg width={55} height={40} viewBox={`-25 -40 110 80`}>
			{(cards || []).map((card, i) => {
				return (
					<Card
						{...card}
						key={i}
						transforms={[
							['translate', [i * 20, 0, 0]],
						]}
					/>
				);
			})}
		</Svg>
	);
}
