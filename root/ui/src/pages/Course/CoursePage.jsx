import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	initialiseCourses,
	createCourse,
	removeCourse,
} from '../../reducers/coursesReducer';
import {
	initialiseCourseReviews,
	createCourseReview,
	removeCourseReview,
} from '../../reducers/courseReviewsReducer';
import { initialiseUsers } from '../../reducers/usersReducer';

import CourseReviewForm from './CourseReviewForm';
import CourseReviewsList from './CourseReviewsList';

// Assumes there is a course with the given id in the params.
const CoursePage = () => {
  const dispatch = useDispatch();
  
	const id = useParams().id;
  
	const courses = useSelector(({ courses }) => courses);
	const course = courses.find(course => course.id === id);
  const courseReviews = useSelector(({ courseReviews }) => courseReviews);

	const [courseReviewLength, setCourseReviewLength] = useState(
		course?.reviews?.length || 0
	);

	// TODO: Create reducers for updating course info when a review is added or removed.
	useEffect(() => {
		dispatch(initialiseCourses());
		dispatch(initialiseCourseReviews());
		dispatch(initialiseUsers());
	}, [dispatch]);

	// TODO: handle the CRUD of the course's reviews
	useEffect(() => {
		setCourseReviewLength(course?.reviews?.length || 0);
	}, [course?.reviews?.length]);

	const user = useSelector(({ user }) => user);
	const users = useSelector(({ users }) => users);

	// If no course is found return null.
	if (!course) return null;

	const createOneReview = courseReview => {
		dispatch(createCourseReview(courseReview));
		setCourseReviewLength(() => courseReviewLength + 1);
	};

  const updateOneReview = courseReview => {
    
  }

	const removeOneReview = courseReview => {
		dispatch(removeCourseReview(courseReview.id));
		setCourseReviewLength(() => courseReviewLength - 1);
	};

	return (
		<div>
			<h1>Course Page</h1>
			<h2>Course Info:</h2>
			<p>Course Title: {course.title}</p>
			<p>Course Code: {course.code}</p>
			<p>Average Rating: {course.avgRating}</p>
			<a
				href={`https://my.uq.edu.au/programs-courses/course.html?course_code=${course.code}`}
        target='_blank'
			>
				{`https://my.uq.edu.au/programs-courses/course.html?course_code=${course.code}`}
			</a>
			{/* <p>Url: {course.url} </p> */}
			<p>Faculty: {course.faculty}</p>
			<p>Professor: {course.professor}</p>
			<p>Reviews: {courseReviewLength}</p>

			<CourseReviewForm
				course={course}
				user={user}
				users={users}
				handleCreateCourseReview={createOneReview}
			/>
			<h2>Reviews:</h2>
			<CourseReviewsList handleRemoveReview={removeOneReview} handleUpdateReview={updateOneReview} course={course} allCourseReviews={courseReviews} />
			<Link to="/courses">Back to Course List</Link>
		</div>
	);
};

export default CoursePage;
