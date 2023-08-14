import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';

import Togglable from './Togglable';
import CustomTextInput from './CustomTextInput';

const CourseReviewForm = () => {
	const dispatch = useDispatch();
	const courseReviewFormRef = useRef();
	const { reset: resetCourseTitle, ...courseTitle } = useField(
		'course title',
		'text'
	);
	const { reset: resetRating, ...rating } = useField('rating', 'number', {
		min: 0,
		max: 100,
	});
	const { reset: resetCourseCode, ...courseCode } = useField('text');

	// Helper that reset all fields
	const resetFields = (...fields) => {
		fields.forEach(resetFnc => resetFnc());
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
				<CustomTextInput
					inputId="course-title"
					label={'Course Title: '}
					propsInfo={{ ...courseTitle }}
				/>
				<CustomTextInput
					inputId="rating"
					label={'Rating: '}
					propsInfo={{ ...rating }}
				/>
				<button type="submit">Add Review</button>
			</form>
			<button onClick={() => resetFields(resetCourseCode)}>Reset</button>
		</Togglable>
	);
};

export default CourseReviewForm;
