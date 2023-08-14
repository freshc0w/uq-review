import { createSlice } from '@reduxjs/toolkit';
import professorReviewsServices from '../services/professorReviews';

const initialState = [];

const professorReviewsSlice = createSlice({
	name: 'professorReviews',
	initialState,
	reducers: {
		setProfessorReviews(state, action) {
			return action.payload;
		},
		appendProfessorReviews(state, action) {
			state.push(action.payload);
		},
		updateProfessorReviews(state, action) {
			const changedReview = action.payload;
			return state.map(review =>
				review.id !== changedReview.id ? review : changedReview
			);
		},
	},
});

export const {
	setProfessorReviews,
	appendProfessorReviews,
	updateProfessorReviews,
} = professorReviewsSlice.actions;

export const initialiseProfessorReviews = () => {
	return async dispatch => {
		const professorReviews = await professorReviewsServices.getAll();
		dispatch(setProfessorReviews(professorReviews));
	};
};

export const createProfessorReview = newProfessorReviewObj => {
	return async dispatch => {
		const newProfessorReview = await professorReviewsServices.create(
			newProfessorReviewObj
		);
		dispatch(appendProfessorReviews(newProfessorReview));
	};
};

// TODO: update a professor review based on the id

export const removeProfessorReview = id => {
	return async dispatch => {
		const professorReviews = await professorReviewsServices.getAll();
		await professorReviewsServices.removeProfessorReview(id);
		dispatch(setProfessorReviews(professorReviews.filter(pr => pr.id !== id)));
	};
};

export default professorReviewsSlice.reducer;
