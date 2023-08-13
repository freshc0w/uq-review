// TODO: get services working
// courseReviews
// courses
// professorReviews
// professors
// user
// login
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import usersServices from './services/users';
import coursesServices from './services/courses';
import professorsServices from './services/professors';
import courseReviewsServices from './services/courseReviews';

// reducers
import {
	initialiseCourseReviews,
	createCourseReview,
	removeCourseReview,
} from './reducers/courseReviewsReducer';
import { setUser } from './reducers/userReducer';

// Components
import LoginForm from './components/LoginForm';

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

const LogOutButton = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		dispatch(setUser(null));
	};

	return <button onClick={handleLogout}>Logout</button>;
};

const getUserData = async () => {
	const response = await usersServices.getAll();
	console.log(response);
};

const getCourseData = async () => {
	const response = await coursesServices.getAll();
	console.log(response);
};

const getProfessorData = async () => {
	const response = await professorsServices.getAll();
	console.log(response);
};

const getCourseReviewData = async () => {
	const response = await courseReviewsServices.getAll();
	console.log(response);
};

const App = () => {
	const user = useSelector(({ user }) => user);

	useEffect(() => {
		console.log('App initialised');
		getUserData();
		getCourseData();
		getProfessorData();
		getCourseReviewData();
	}, []);

	return (
		<>
    {!user ? <LoginForm /> : <LogOutButton />}
			<CourseReviewsList />
		</>
	);
};

export default App;
