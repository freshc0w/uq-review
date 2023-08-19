import './CourseListPage.css'; // For middle text-alignment
import { useState, useEffect, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	initialiseCourses,
	createCourse,
	removeCourse,
} from '../../reducers/coursesReducer';

import CourseInfoRow from './CourseInfoRow';

const CourseListPage = () => {
	const dispatch = useDispatch();

	// TODO: handle adding, removing and updating courses
	useEffect(() => {
		dispatch(initialiseCourses());
	}, [dispatch]);
	const courses = useSelector(({ courses }) => courses);
  const [searchTerm, setSearchTerm] = useState('');

	// const memoizedCourses = useMemo(() => courses, [courses]);
  const memoizedCourses = useMemo(() => {
    if(!searchTerm) return courses;
    

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return courses.filter(course => {
      const courseCode = course.code.toLowerCase();
      const courseTitle = course.title.toLowerCase();

      return courseCode.includes(lowerCaseSearchTerm) || courseTitle.includes(lowerCaseSearchTerm);
    });

  }, [courses, searchTerm]);

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
  };

	// const heaers = [
	// 	'Course Code',
	// 	'Course Title',
	// 	'Average Rating',
	// 	'Faculty',
	// 	'Professor',
	// 	'Reviews',
	// ];
	const headers = [
		'Course Code',
		'Course Title',
		'Average Rating',
		'Professor',
		'Reviews',
	];
	const listStyle = {
		minWidth: '80vw',
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		marginInline: 'auto',
	};

	// TODO: add more info in the table
	// TODO: add a link to the course's reviews


	return (
		<div style={listStyle}>
			<h1>Course List</h1>

      <input
        type='text'
        placeholder='Search for a course'
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

			<div style={{display: 'flex', justifyContent: 'space-between'}}>
        {headers.map((header, i) => (
          <strong style={{minWidth: '20%', textAlign: 'center'}}key={i}>{header}</strong>
        ))}
      </div>
			<List
				height={1000}
				itemCount={memoizedCourses.length}
				itemSize={35}
				// width={800}
			>
				{({ index, style }) => (
					<CourseInfoRow
						key={memoizedCourses[index].id}
						course={memoizedCourses[index]}
						style={style}
					/>
				)}
			</List>

			{/* {memoizedCourses.map(course => (
						<CourseInfoRow
							key={course.id}
							course={course}
						/>
					))} */}
		</div>
	);
};

export default CourseListPage;
