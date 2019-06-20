import React, { createContext } from 'react';

export const context = createContext();

export default function Transform(props) {
	return (
		<context.Provider {...props} />
	);
}
