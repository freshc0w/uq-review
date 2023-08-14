import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	initialiseProfessorReviews,
	createProfessorReview,
	removeProfessorReview,
} from '../reducers/professorReviewsReducer';

import ProfessorReviewDisplay from './ProfessorReviewDisplay';

const ProfessorReviewsList = () => {
	const dispatch = useDispatch();
	const professorReviews = useSelector(
		({ professorReviews }) => professorReviews
	);

	// TODO: handle adding, removing and updating professor reviews
	useEffect(() => {
		dispatch(initialiseProfessorReviews());
	}, [dispatch]);

	return (
		<>
			<h2>ProfessorReviews</h2>
			<ul>
				{[...professorReviews].map(professorReview => (
					<ProfessorReviewDisplay
						key={professorReview.id}
						professorReview={professorReview}
					/>
				))}
			</ul>
		</>
	);
};

export default ProfessorReviewsList;
