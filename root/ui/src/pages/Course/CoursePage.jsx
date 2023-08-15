import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	initialiseCourses,
	createCourse,
	removeCourse,
} from '../../reducers/coursesReducer';
import { initialiseCourseReviews } from '../../reducers/courseReviewsReducer';
import { initialiseUsers } from '../../reducers/usersReducer';

import CourseReviewForm from './CourseReviewForm';
import CourseReviewsList from './CourseReviewsList';

// Assumes there is a course with the given id in the params.
const CoursePage = () => {
  const id = useParams().id;
  const courses = useSelector(({ courses }) => courses);
  const course = courses.find(course => course.id === id);
  
  const dispatch = useDispatch();
  
  // TODO: Create reducers for updating course info when a review is added or removed.
  useEffect(() => {
    dispatch(initialiseCourses());
    dispatch(initialiseCourseReviews());
    dispatch(initialiseUsers());
  }, [dispatch]);
  const user = useSelector(({ user }) => user);
  const users = useSelector(({ users }) => users);
  
	// If no course is found return null.
	if (!course) return null;


	// TODO: handle the CRUD of the course's reviews

	return (
		<div>
			<h1>Course Page</h1>
			<h2>Course Info:</h2>
			<p>Course Title: {course.title}</p>
			<p>Course Code: {course.code}</p>
			<p>Average Rating: {course.avgRating}</p>
			<p>Url: {course.url} </p>
			<p>Faculty: {course.faculty}</p>
			<p>Professor: {course.professor}</p>
			<p>Reviews: {course.reviews.length}</p>

			<CourseReviewForm course={course} user={user} users={users}/>
			<h2>Reviews:</h2>
			<CourseReviewsList />
			<Link to="/courses">Back to Course List</Link>
		</div>
	);
};

export default CoursePage;
