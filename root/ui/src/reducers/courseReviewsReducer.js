import { createSlice } from '@reduxjs/toolkit';
import courseReviewsServices from '../services/courseReviews';

const initialState = [];

const courseReviewsSlice = createSlice({
	name: 'courseReviews',
	initialState,
	reducers: {
		setCourseReviews(state, action) {
			return action.payload;
		},
		appendCourseReviews(state, action) {
			state.push(action.payload);
		},
		updateCourseReviews(state, action) {
			const changedReview = action.payload;
			return state.map(review =>
				review.id !== changedReview.id ? review : changedReview
			);
		},
	},
});

export const { setCourseReviews, appendCourseReviews, updateCourseReviews } =
	courseReviewsSlice.actions;

export const initialiseCourseReviews = () => {
	return async dispatch => {
		const courseReviews = await courseReviewsServices.getAll();
		dispatch(setCourseReviews(courseReviews));
	};
};

export const createCourseReview = newCourseReviewObj => {
	return async dispatch => {
		const newCourseReview = await courseReviewsServices.create(
			newCourseReviewObj
		);
    
		dispatch(appendCourseReviews(newCourseReview));
	};
};



// TODO: Updates a course review based on the id

export const removeCourseReview = id => {
	return async dispatch => {
		const courseReviews = await courseReviewsServices.getAll();
		await courseReviewsServices.removeCourseReview(id);
		dispatch(setCourseReviews(courseReviews.filter(cr => cr.id !== id)));
	};
};

export default courseReviewsSlice.reducer;
