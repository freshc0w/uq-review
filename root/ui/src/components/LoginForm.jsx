import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from '../reducers/userReducer';

import loginService from '../services/login';
import courseReviewServices from '../services/courseReviews';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	// Firstly, we check if the user is already logged in.
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));

			// TODO: set token for course reviews and professor reviews
			courseReviewServices.setToken(user.token);
		}
	}, [dispatch]);

	const handleLogin = async e => {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedUser', JSON.stringify(user));

			// TODO: set token for course reviews and professor reviews
			courseReviewServices.setToken(user.token);

			dispatch(setUser(user));

			setUsername('');
			setPassword('');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</>
	);
};

export default LoginForm;
