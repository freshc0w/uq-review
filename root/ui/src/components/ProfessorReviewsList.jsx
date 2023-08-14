import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	initialiseProfessorReviews,
	createProfessorReview,
	removeProfessorReview,
} from '../reducers/professorReviewsReducer';

const ProfessorReviewsList = () => {
	const dispatch = useDispatch();
	const professorReviews = useSelector(
		({ professorReviews }) => professorReviews
	);

	useEffect(() => {
		dispatch(initialiseProfessorReviews());
	}, [dispatch]);

	return (
		<>
			<h2>ProfessorReviews</h2>
			<ul>
				{[...professorReviews].map(professorReview => (
					<li key={professorReview.id}>
						<strong>{professorReview.title}</strong>: {professorReview.content}
					</li>
				))}
			</ul>
		</>
	);
};

export default ProfessorReviewsList;

