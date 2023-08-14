import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	initialiseCourses,
	createCourse,
	removeCourse,
} from '../reducers/coursesReducer';

// Assumes there is a course with the given id in the params.
const CoursePage = () => {
	const id = useParams().id;
	const dispatch = useDispatch();
	const courses = useSelector(({ courses }) => courses);
	const course = courses.find(course => course.id === id);

	// If no course is found return null.
	if (!course) return null;

	useEffect(() => {
		dispatch(initialiseCourses());
	}, [dispatch]);

	console.log(course.reviews);

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
			<h2>Reviews:</h2>
			<ul>
				{course.reviews.map(review => (
					<li key={review.id}>
						<p>Title: {review.title}</p>
						<p>Content: {review.content}</p>
						<p>Rating: {review.rating}</p>
						<p>Comment: {review.comment}</p>
					</li>
				))}
			</ul>
			<Link to="/courses">Back to Course List</Link>
		</div>
	);
};

export default CoursePage;
