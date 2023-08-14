import { useState } from 'react';

export const useField = (name, type, settings = {}) => {
  const { min, max } = settings;
	const [value, setValue] = useState('');

	const onChange = e => {
		setValue(e.target.value);
	};

	const reset = () => {
		setValue('');
	};

	return {
		name,
		type,
		value,
		onChange,
		reset,
    min,
    max,
	};
};
