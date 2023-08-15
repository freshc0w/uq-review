import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	initialiseProfessors,
	createProfessor,
	removeProfessor,
} from '../../reducers/professorsReducer';

import ProfessorReviewForm from './ProfessorReviewForm';
import ProfessorReviewsList from './ProfessorReviewsList';

// Assumes there is a professor with the given id in the params.
const ProfessorPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initialiseProfessors());
	}, [dispatch]);

	const id = useParams().id;
	const professors = useSelector(({ professors }) => professors);
	const professor = professors.find(professor => professor.id === id);

	// If no professor is found return null.
	if (!professor) return null;

	// TODO: handle the CRUD of the professor's reviews

	return (
		<div>
			<h1>ProfessorPage</h1>
			<h2>Professor Info:</h2>
			<p>Professor Name: {professor.name}</p>
			<p>Average Rating: {professor.avgRating}</p>
			<p>Faculty: {professor.faculty}</p>
			<p>Reviews: {professor.reviews.length}</p>

			<p>
				{/* If no courses are found, add the "None added yet..." msg*/}
				Courses taught:{' '}
				{!professor.courses.length ? (
					<em>None added yet...</em>
				) : (
					professor.courses.map((courseName, i) => (
						<div key={i}>{courseName}</div>
					))
				)}
			</p>
			<ProfessorReviewForm />
			<h2>Reviews:</h2>
			<ProfessorReviewsList />
			<Link to="/professors">Back to Professor List</Link>
		</div>
	);
};

export default ProfessorPage;
