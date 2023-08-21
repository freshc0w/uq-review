import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CourseReviewDisplay from './CourseReviewDisplay';

const CourseReviewsList = ({
	handleRemoveReview,
	course,
	// allCourseReviews,
}) => {
	// TODO: handle adding, removing and updating course reviews
	// TODO: update one review
	const allCourseReviews = useSelector(({ courseReviews }) => courseReviews);

	const courseReviewsList = useMemo(() => {
		const filteredCourseReviews = allCourseReviews.filter(
			courseReview => courseReview.course.id === course.id
		);

    // Newly added courses doesn't have a .id. Their id is .course.
		const newCourses = allCourseReviews.filter(
			courseReview => courseReview.course === course.id
		);

		return !newCourses.length
			? filteredCourseReviews
			: [...filteredCourseReviews, ...newCourses];
	}, [allCourseReviews.length]);

	return (
		<>
			<h2>CourseReviews</h2>
			<ul>
				{[...courseReviewsList].map(courseReview => (
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
