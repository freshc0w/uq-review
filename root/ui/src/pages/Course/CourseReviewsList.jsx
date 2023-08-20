import { useMemo } from 'react';
import CourseReviewDisplay from './CourseReviewDisplay';

const CourseReviewsList = ({ handleRemoveReview, course, allCourseReviews }) => {
	// TODO: handle adding, removing and updating course reviews
	// TODO: update one review

  const courseReviewsList = useMemo(() => {
    const filteredCourseReviews = allCourseReviews.filter(
      courseReview => courseReview.course.id === course.id
    );
    const newCourse = allCourseReviews.find(
      courseReview => courseReview.course === course.id
    );
    return !newCourse ? filteredCourseReviews : [...filteredCourseReviews, newCourse];
  }, [allCourseReviews.length]
  );
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
