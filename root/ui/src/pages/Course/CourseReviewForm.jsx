import { useRef } from 'react';
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
	};

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
