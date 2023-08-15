import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfessorReview } from '../../reducers/professorReviewsReducer';
import { initialiseUsers } from '../../reducers/usersReducer';
import { useReviewField } from '../../hooks';
import Togglable from '../../components/Togglable';
import renderField from '../../utils/helper/renderField';

// helper function to get the value of a field
const getFieldValue = field => field.fieldProps.value;

const ProfessorReviewForm = ({ professor }) => {
	const dispatch = useDispatch();
	const courseReviewFormRef = useRef();

  useEffect(() => {
    dispatch(initialiseUsers());
  }, [dispatch])

	// obtain the currently logged in user
	const loggedUser = useSelector(({ user }) => user);
	const users = useSelector(({ users }) => users);

	const user = users.find(user => user.username === loggedUser.username);


	const reviewFields = {
		title: useReviewField('course title: ', 'text'),
		review: useReviewField('your review ', '', { rows: 5, cols: 30 }),
		semester: useReviewField('semester taken: ', 'text'),
		coursesTaken: useReviewField('course taken: ', 'text'),
		rating: useReviewField('rating', 'range', { min: 0, max: 100 }),
		communicationRating: useReviewField('communication rating', 'range', {
			min: 0,
			max: 100,
		}),
		approachabilityRating: useReviewField('approachability rating', 'range', {
			min: 0,
			max: 100,
		}),
		feedbackRating: useReviewField('feedback rating', 'range', {
			min: 0,
			max: 100,
		}),
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
			content: getFieldValue(reviewFields.review),
			semester: getFieldValue(reviewFields.semester),
			coursesTaken: getFieldValue(reviewFields.coursesTaken),
			date: new Date(),
			rating: getFieldValue(reviewFields.rating),
			communicationRating: getFieldValue(reviewFields.communicationRating),
			approachabilityRating: getFieldValue(reviewFields.approachabilityRating),
			feedbackRating: getFieldValue(reviewFields.feedbackRating),
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
			professor: professor.id,
			likes: 0,
			dislikes: 0,
			reports: 0,
			comments: [],
		};

		courseReviewFormRef.current.toggleVisibility();

		// dispatch action to add review
		dispatch(createProfessorReview(newReview));

		// reset the fields
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

export default ProfessorReviewForm;
