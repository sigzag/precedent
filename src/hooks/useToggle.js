import { useState, useCallback } from 'react';

export default function useToggle() {
	const [state, setState] = useState(false);
	const toggle = useCallback(() => setState((prev) => !prev), []);
	return [state, toggle];
}