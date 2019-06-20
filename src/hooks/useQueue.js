import { useState, useEffect, useCallback, useRef } from 'react';

export default function useQueue(interval, initialValue) {
	const [current, setCurrent] = useState(initialValue);
	const queue = useRef([]);
	const timeout = useRef();
	const add = useCallback((item) => {
		if (!queue.current.length)
			timeout.current = setTimeout(shift, interval)
		queue.current.push(item);
	}, [interval]);
	const shift = useCallback(() => {
		if (queue.current.length)
			setCurrent(queue.current.shift());
		if (queue.current.length)
			timeout.current = setTimeout(shift, interval);
	}, [interval]);
	useEffect(() => () => clearTimeout(timeout.current), []);
	return [current, add];
}
