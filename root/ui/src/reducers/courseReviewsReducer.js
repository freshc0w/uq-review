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

export const { setCourseReviews, appendCourseReviews, updateCourseReviews } = courseReviewsSlice.actions;