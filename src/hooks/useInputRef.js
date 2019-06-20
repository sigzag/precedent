import { useRef, useCallback } from 'react';

export default function useInputRef(initialValue) {
	const state = useRef(initialValue);
	const onChangeText = useCallback((value) => state.current = value, []);
	return [state, onChangeText];
}