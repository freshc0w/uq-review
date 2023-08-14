import './CourseListPage.css'; // For middle text-alignment
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	initialiseCourses,
	createCourse,
	removeCourse,
} from '../reducers/coursesReducer';

import CourseInfo from './CourseInfo';

const CourseListPage = () => {
	const dispatch = useDispatch();
	const courses = useSelector(({ courses }) => courses);

	// TODO: handle adding, removing and updating courses
	useEffect(() => {
		dispatch(initialiseCourses());
	}, [dispatch]);

  // TODO: add more info in the table
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
          {[...courses].map(course => (
            <CourseInfo key={course.id} course={course}>
            </CourseInfo>
          ))}
        </tbody>
      </table>
		</div>
	);
};

export default CourseListPage;
