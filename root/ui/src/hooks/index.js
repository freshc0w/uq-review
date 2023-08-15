import { useState } from 'react';

export const useField = (name, type, settings = {}) => {
  const { min, max, rows, cols } = settings;
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
    rows,
    cols,
	};
};

// Helper function to create a review field with a reset function
export const useReviewField = (name, type, options = {}) => {
  const { reset, ...fieldProps } = useField(name, type, options);
	return { resetField: reset, fieldProps };
}