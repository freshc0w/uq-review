import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useReviewField } from '../hooks';
import Togglable from './Togglable';
import CustomInput from './CustomInput';
import CustomRangeInput from './CustomRangeInput';

const renderField = ({ fieldProps }) => {
	switch (fieldProps.type) {
		case 'text':
			return (
				<CustomInput
					inputId={`add-review__${fieldProps.name}`}
					label={fieldProps.name}
					propsInfo={{ ...fieldProps }}
				/>
			);
		case 'range':
			return (
				<CustomRangeInput
					inputId={`add-review__${fieldProps.name}`}
					label={fieldProps.name}
					propsInfo={{ ...fieldProps }}
				/>
			);
		default:
			return (
				<label htmlFor={`add-review__${fieldProps.name}`}>
					{fieldProps.name}:
					<textarea
						id={`add-review__${fieldProps.name}`}
						{...fieldProps}
					></textarea>
				</label>
			);
	}
};

const CourseReviewForm = () => {
	const dispatch = useDispatch();
	const courseReviewFormRef = useRef();

	const reviewFields = [
		useReviewField('course title: ', 'text'),
		useReviewField('your review ', '', { rows: 5, cols: 30 }),
		useReviewField('semester taken: ', 'text'),
		useReviewField('rating', 'range', { min: 0, max: 100 }),
		useReviewField('difficulty', 'range', { min: 0, max: 100 }),
		useReviewField('lecture quality', 'range', { min: 0, max: 100 }),
		useReviewField('tutorial quality', 'range', { min: 0, max: 100 }),
		useReviewField('workload', 'range', { min: 0, max: 100 }),
	];

	const resetFields = () => {
		reviewFields.forEach(({ resetField }) => resetField());
	};

	const addReview = e => {
		e.preventDefault();
		courseReviewFormRef.current.toggleVisibility();
	};

	return (
		<Togglable
			buttonLabel="New Review"
			ref={courseReviewFormRef}
		>
			<h1>Course Review Form</h1>
			<form onSubmit={addReview}>
				{reviewFields.map((field, index) => (
					<div key={index}>{renderField(field)}</div>
				))}
				<button type="submit">Add Review</button>
			</form>
			<button onClick={resetFields}>Reset</button>
		</Togglable>
	);
};

export default CourseReviewForm;
