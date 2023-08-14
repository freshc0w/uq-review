// TODO: get services working
// courseReviews
// courses
// professorReviews
// professors
// user
// login
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import usersServices from './services/users';
import coursesServices from './services/courses';
import professorsServices from './services/professors';
import courseReviewsServices from './services/courseReviews';

// reducers
import {
	initialiseProfessorReviews,
	createProfessorReview,
	removeProfessorReview,
} from './reducers/professorReviewsReducer';
import { setUser } from './reducers/userReducer';

// Components
import TempNav from './components/TempNav';
import LoginForm from './components/LoginForm';
import CourseListPage from './components/CourseListPage';
import ProfessorListPage from './components/ProfessorListPage';
import CourseReviewsList from './components/CourseReviewsList';
import ProfessorReviewsList from './components/ProfessorReviewsList';
import CoursePage from './components/CoursePage';

const LogOutButton = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser');
		dispatch(setUser(null));
	};

	return <button onClick={handleLogout}>Logout</button>;
};

const App = () => {
	const user = useSelector(({ user }) => user);

	useEffect(() => {
		console.log('App initialised');
	}, []);
	console.log('user logged in:', user);

	return (
		<>
			<Router>
				<TempNav />
				{!user ? <LoginForm /> : <LogOutButton />}
				<Routes>
					<Route
						path="/courses"
						element={<CourseListPage />}
					/>
					<Route
						path="/professors"
						element={<ProfessorListPage />}
					/>
					<Route
						path="/courses/:id"
						element={<CoursePage />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
