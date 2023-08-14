import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	initialiseCourseReviews,
	createCourseReview,
	removeCourseReview,
} from '../reducers/courseReviewsReducer';

const CourseReviewsList = () => {
  const dispatch = useDispatch();
  const courseReviews = useSelector(({ courseReviews }) => courseReviews);

  useEffect(() => {
    dispatch(initialiseCourseReviews());
  }, [dispatch]);

  return (
    <>
      <h2>CourseReviews</h2>
      <ul>
        {[...courseReviews].map(courseReview => (
          <li key={courseReview.id}>
            <strong>{courseReview.title}</strong>: {courseReview.content}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CourseReviewsList;