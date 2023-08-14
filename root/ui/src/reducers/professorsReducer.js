import { createSlice } from '@reduxjs/toolkit';
import professorsServices from '../services/professors';

const initialState = [];

const professorsSlice = createSlice({
	name: 'professors',
	initialState,
	reducers: {
		setProfessors(state, action) {
			return action.payload;
		},
		appendProfessors(state, action) {
			state.push(action.payload);
		},
		updateProfessors(state, action) {
			const changedProfessor = action.payload;
			return state.map(professor =>
				professor.id !== changedProfessor.id ? professor : changedProfessor
			);
		},
	},
});

export const { setProfessors, appendProfessors, updateProfessors } =
	professorsSlice.actions;

export const initialiseProfessors = () => {
	return async dispatch => {
		const professors = await professorsServices.getAll();
		dispatch(setProfessors(professors));
	};
};

export const createProfessor = newProfessorObj => {
	return async dispatch => {
		const newProfessor = await professorsServices.create(newProfessorObj);
		dispatch(appendProfessors(newProfessor));
	};
};

// TODO: update a professor based on the id

export const removeProfessor = id => {
	return async dispatch => {
		const professors = await professorsServices.getAll();
		await professorsServices.removeProfessor(id);
		dispatch(
			setProfessors(professors.filter(professor => professor.id !== id))
		);
	};
};

export default professorsSlice.reducer;
