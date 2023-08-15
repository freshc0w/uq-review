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
import LoginForm from './pages/Login/LoginForm';
import CourseListPage from './pages/CourseList/CourseListPage';
import ProfessorListPage from './pages/ProfessorList/ProfessorListPage';
import CoursePage from './pages/Course/CoursePage';
import ProfessorPage from './pages/Professor/ProfessorPage';

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
				<Routes>
					<Route
						path="/"
						element={!user ? <LoginForm /> : <LogOutButton />}
					/>
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
					<Route
						path="/professors/:id"
						element={<ProfessorPage />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
