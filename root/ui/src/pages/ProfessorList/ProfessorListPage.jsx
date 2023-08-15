import './ProfessorListPage.css'; // For middle text-alignment TEMPORARY
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	initialiseProfessors,
	createProfessor,
	removeProfessor,
} from '../../reducers/professorsReducer';
import ProfessorInfoRow from './ProfessorInfoRow';

const ProfessorListPage = () => {
	const dispatch = useDispatch();
	const professors = useSelector(({ professors }) => professors);

	// TODO: handle adding, removing and updating professors
	useEffect(() => {
		dispatch(initialiseProfessors());
	}, [dispatch]);

	console.log(professors);

	// TODO: add more info in the table
	// TODO: add a link to the professor's reviews
	return (
		<div>
			<h1>ProfessorListPage</h1>
			<table>
				<thead>
					<tr>
						<th>Professor Name</th>
						<th>Average Rating</th>
						<th>Faculty</th>
						<th>Reviews</th>
						<th>Courses taught</th>
					</tr>
				</thead>
				<tbody>
					{[...professors].map(professor => (
						<ProfessorInfoRow
							key={professor.id}
							professor={professor}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProfessorListPage;
