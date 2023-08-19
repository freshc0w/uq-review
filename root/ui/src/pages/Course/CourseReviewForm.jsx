import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourseReview } from '../../reducers/courseReviewsReducer';
import { useReviewField } from '../../hooks';
import Togglable from '../../components/Togglable';
import renderField from '../../utils/helper/renderField';
import { useEffect } from 'react';
import { initialiseUsers } from '../../reducers/usersReducer';

// helper function to get the value of a field
const getFieldValue = field =>
	!field.fieldProps.value || field.fieldProps.value === '' ? null : field.fieldProps.value;

const CourseReviewForm = ({ course, handleCreateCourseReview }) => {
	const dispatch = useDispatch();
	const courseReviewFormRef = useRef();

	// obtain the currently logged in user
	const loggedUser = useSelector(({ user }) => user);
	const users = useSelector(({ users }) => users);

	const user = users.find(user => user.username === loggedUser.username);

	const reviewFields = {
		title: useReviewField('review title: ', 'text'),
		content: useReviewField('your review ', '', { rows: 5, cols: 30 }),
		semester: useReviewField('semester taken: ', 'text'),
		rating: useReviewField('rating', 'range', { min: 0, max: 100 }),
		difficulty: useReviewField('difficulty', 'range', { min: 0, max: 100 }),
		lectureQuality: useReviewField('lecture quality', 'range', {
			min: 0,
			max: 100,
		}),
		tutorialQuality: useReviewField('tutorial quality', 'range', {
			min: 0,
			max: 100,
		}),
		workload: useReviewField('workload', 'range', { min: 0, max: 100 }),
		pro1: useReviewField('pro1', 'text'),
		pro2: useReviewField('pro2', 'text'),
		pro3: useReviewField('pro3', 'text'),
		con1: useReviewField('con1', 'text'),
		con2: useReviewField('con2', 'text'),
		con3: useReviewField('con3', 'text'),
	};

	const resetFields = () => {
		Object.values(reviewFields).forEach(({ resetField }) => resetField());
	};

	const addReview = e => {
		e.preventDefault();

		const newReview = {
			title: getFieldValue(reviewFields.title),
			content: getFieldValue(reviewFields.content),
			semester: getFieldValue(reviewFields.semester),
			professor: course.professor,
			date: new Date(),
			rating: getFieldValue(reviewFields.rating),
			difficulty: getFieldValue(reviewFields.difficulty),
			lectureQuality: getFieldValue(reviewFields.lectureQuality),
			tutorialQuality: getFieldValue(reviewFields.tutorialQuality),
			workload: getFieldValue(reviewFields.workload),
			pros: [
				getFieldValue(reviewFields.pro1),
				getFieldValue(reviewFields.pro2),
				getFieldValue(reviewFields.pro3),
			].filter(pro => pro !== ''),
			cons: [
				getFieldValue(reviewFields.con1),
				getFieldValue(reviewFields.con2),
				getFieldValue(reviewFields.con3),
			].filter(con => con !== ''),
			course: course.id,
			likes: [],
			dislikes: [],
			reports: [],
			comments: [],
		};

    // Hide form upon submission
		courseReviewFormRef.current.toggleVisibility();

		// dispatch action to add review
		handleCreateCourseReview(newReview);

		// reset fields
		resetFields();
	};

	return (
		<Togglable
			buttonLabel="New Review"
			ref={courseReviewFormRef}
		>
			<h1>Course Review Form</h1>
			<form onSubmit={addReview}>
				{Object.values(reviewFields).map((field, index) => (
					<div key={index}>{renderField(field)}</div>
				))}
				<button type="submit">Add Review</button>
			</form>
			<button onClick={resetFields}>Reset</button>
		</Togglable>
	);
};

export default CourseReviewForm;
