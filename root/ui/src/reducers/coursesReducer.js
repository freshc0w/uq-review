import { createSlice } from '@reduxjs/toolkit';
import coursesServices from '../services/courses';

const initialState = [];

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		setCourses(state, action) {
			return action.payload;
		},
		appendCourses(state, action) {
			state.push(action.payload);
		},
		updateCourses(state, action) {
			const changedCourse = action.payload;
			return state.map(course =>
				course.id !== changedCourse.id ? course : changedCourse
			);
		},
	},
});

export const { setCourses, appendCourses, updateCourses } =
	coursesSlice.actions;

export const initialiseCourses = () => {
	return async dispatch => {
		const courses = await coursesServices.getAll();
		dispatch(setCourses(courses));
	};
};

export const createCourse = newCourseObj => {
	return async dispatch => {
		const newCourse = await coursesServices.create(newCourseObj);
		dispatch(appendCourses(newCourse));
	};
};

// TODO: update a course based on the id

export const removeCourse = id => {
	return async dispatch => {
		const courses = await coursesServices.getAll();
		await coursesServices.removeCourse(id);
		dispatch(setCourses(courses.filter(course => course.id !== id)));
	};
};

export default coursesSlice.reducer;
