import { useState, useEffect } from 'react';

export default function useFetch(path) {
	const [res, setRes] = useState(null);
	useEffect(() => {
		fetch(`http://localhost:4000/${path}`)
			.then((res) => res.json())
			.then(setRes)
			.catch((e) => console.error(e));
	}, [path]);
	return res;
}
