import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	initialiseCourseReviews,
	createCourseReview,
	removeCourseReview,
} from '../../reducers/courseReviewsReducer';
import CourseReviewDisplay from './CourseReviewDisplay';

const CourseReviewsList = ({ handleRemoveReview }) => {
	// TODO: handle adding, removing and updating course reviews

	const courseReviews = useSelector(({ courseReviews }) => courseReviews);

	// TODO: update one review

	return (
		<>
			<h2>CourseReviews</h2>
			<ul>
				{[...courseReviews].map(courseReview => (
					<CourseReviewDisplay
						key={courseReview.id}
						courseReview={courseReview}
						handleRemoveReview={() => handleRemoveReview(courseReview)}
					/>
				))}
			</ul>
		</>
	);
};

export default CourseReviewsList;
