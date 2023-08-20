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

// Like a course review based on the id and userId
// Assumes that the user has not liked the course review before
export const likeCourseReview = (id, userId) => {
	return async dispatch => {
		const courseReviews = await courseReviewsServices.getAll();
		const courseReviewToChange = courseReviews.find(cr => cr.id === id);
		const changedCourseReview = {
			...courseReviewToChange,

			// Need this to update the ObjectID in the database
			course: courseReviewToChange.course.id,
			likes: [...courseReviewToChange.likes, userId],

			// Remove the user from the dislikes list if they are in it
			dislikes: courseReviewToChange.dislikes.filter(d => d !== userId),
		};
		await courseReviewsServices.update(id, changedCourseReview);
		dispatch(updateCourseReviews(changedCourseReview));
	};
};

// Dislike a course review based on the id and userId
// Assumes that the user has not disliked the course review before
export const dislikeCourseReview = (id, userId) => {
	return async dispatch => {
		const courseReviews = await courseReviewsServices.getAll();
		const courseReviewToChange = courseReviews.find(cr => cr.id === id);
		const changedCourseReview = {
			...courseReviewToChange,

			// Need this to update the ObjectID in the database
			course: courseReviewToChange.course.id,
			dislikes: [...courseReviewToChange.dislikes, userId],

			// Remove the user from the likes list if they are in it
			likes: courseReviewToChange.likes.filter(l => l !== userId),
		};
		await courseReviewsServices.update(id, changedCourseReview);
		dispatch(updateCourseReviews(changedCourseReview));
	};
};

export default courseReviewsSlice.reducer;
