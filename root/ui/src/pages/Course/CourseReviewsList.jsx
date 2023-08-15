import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	initialiseCourseReviews,
	createCourseReview,
	removeCourseReview,
} from '../../reducers/courseReviewsReducer';
import CourseReviewDisplay from './CourseReviewDisplay';

const CourseReviewsList = () => {
	const dispatch = useDispatch();
	const courseReviews = useSelector(({ courseReviews }) => courseReviews);

	// TODO: handle adding, removing and updating course reviews
	useEffect(() => {
		dispatch(initialiseCourseReviews());
	}, [dispatch]);

	return (
		<>
			<h2>CourseReviews</h2>
			<ul>
				{[...courseReviews].map(courseReview => (
					<CourseReviewDisplay
						key={courseReview.id}
						courseReview={courseReview}
					/>
				))}
			</ul>
		</>
	);
};

export default CourseReviewsList;