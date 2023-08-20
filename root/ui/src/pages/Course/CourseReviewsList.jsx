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
    console.log('course reviews changing.')
		const filteredCourseReviews = allCourseReviews.filter(
			courseReview => courseReview.course.id === course.id
		);

    console.log('course.reviews:', course.reviews)
		const newCourse = allCourseReviews.find(
			courseReview => courseReview.course === course.id
		);

    console.log('prior reviews', filteredCourseReviews)
    console.log('newCourse:', newCourse)
		return !newCourse
			? filteredCourseReviews
			: [...filteredCourseReviews, newCourse];
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
