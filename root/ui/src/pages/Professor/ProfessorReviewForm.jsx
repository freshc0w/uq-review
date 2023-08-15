import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useReviewField } from '../../hooks';
import Togglable from '../../components/Togglable';
import renderField from '../../utils/helper/renderField';

// helper function to get the value of a field
const getFieldValue = field => field.fieldProps.value;

const CourseReviewForm = () => {
	const dispatch = useDispatch();
	const courseReviewFormRef = useRef();

	const reviewFields = {
		title: useReviewField('course title: ', 'text'),
		review: useReviewField('your review ', '', { rows: 5, cols: 30 }),
		semester: useReviewField('semester taken: ', 'text'),
		coursesTaken: useReviewField('course taken: ', 'text'),
		rating: useReviewField('rating', 'range', { min: 0, max: 100 }),
		communication: useReviewField('communication rating', 'range', {
			min: 0,
			max: 100,
		}),
		approachability: useReviewField('approachability rating', 'range', {
			min: 0,
			max: 100,
		}),
		feedback: useReviewField('feedback rating', 'range', { min: 0, max: 100 }),
		workload: useReviewField('workload', 'range', { min: 0, max: 100 }),
	};

	const resetFields = () => {
		reviewFields.forEach(({ resetField }) => resetField());
	};

	const addReview = e => {
		e.preventDefault();

    const newReview = {
      title: getFieldValue(reviewFields.title),
      content: getFieldValue(reviewFields.review),
      semester: getFieldValue(reviewFields.semester),
      coursesTaken: getFieldValue(reviewFields.coursesTaken),
      date: new Date(),
      rating: getFieldValue(reviewFields.rating),
      communication: getFieldValue(reviewFields.communication),
      approachability: getFieldValue(reviewFields.approachability),
      feedback: getFieldValue(reviewFields.feedback),
      workload: getFieldValue(reviewFields.workload),

    }

		courseReviewFormRef.current.toggleVisibility();
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
