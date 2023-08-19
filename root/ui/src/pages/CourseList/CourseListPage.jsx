import './CourseListPage.css'; // For middle text-alignment
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	initialiseCourses,
	createCourse,
	removeCourse,
} from '../../reducers/coursesReducer'

import CourseInfoRow from './CourseInfoRow';

const CourseListPage = () => {
	const dispatch = useDispatch();
  
	// TODO: handle adding, removing and updating courses
	useEffect(() => {
    dispatch(initialiseCourses());
	}, [dispatch]);
  const courses = useSelector(({ courses }) => courses);
  
  const memoizedCourses = useMemo(() => courses, [courses])

	// TODO: add more info in the table
	// TODO: add a link to the course's reviews
	return (
		<div>
			<h1>Course List</h1>
			<table>
				<thead>
					<tr>
						<th>Course Code</th>
						<th>Course Title</th>
						<th>Average Rating</th>
						<th>Faculty</th>
						<th>Professor</th>
						<th>Reviews</th>
					</tr>
				</thead>
				<tbody>
					{memoizedCourses.map(course => (
						<CourseInfoRow
							key={course.id}
							course={course}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CourseListPage;
