// TODO: get services working
// courseReviews
// courses
// professorReviews
// professors
// user
// login
import { useEffect } from 'react';
import usersServices from './services/users';
import coursesServices from './services/courses';
import professorsServices from './services/professors';

// Components
import LoginForm from './components/LoginForm';

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

const App = () => {
	useEffect(() => {
		console.log('App initialised');
		getUserData();
		getCourseData();
		getProfessorData();
	}, []);

	return (
		<>
			<LoginForm />
		</>
	);
};

export default App;
