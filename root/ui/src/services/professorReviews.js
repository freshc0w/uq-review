import axios from 'axios';
const baseUrl = '/api/professorReviews';

let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

// config authorization based on token
const getConfig = () => {
	return {
		headers: { Authorization: token },
	};
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async newObject => {
	const response = await axios.post(baseUrl, newObject, getConfig());
	return response.data;
};

const update = async (id, newObj) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObj, getConfig());
	return response.data;
};

const removeProfessorReview = async id => {
	const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
	return response.data;
};

// Gets all comments on a professor review based on the id
const getComments = async id => {
	const response = await axios.get(`${baseUrl}/${id}/comments`);
	return response.data;
};

// Adds a comment on a professor review based on the id
const appendComment = async (id, comment) => {
	const professorReviews = await getAll();
	const professorReview = professorReviews.find(pr => pr.id === id);

	const response = await axios.post(
		`${baseUrl}/${id}/comments`,
		{
			...professorReview,
			comment,
		},
		getConfig()
	);
	return response.data;
};

// Updates a comment on a professor review based on the id
const updateComment = async (id, commentId, comment) => {
	const response = await axios.put(
		`${baseUrl}/${id}/comments/${commentId}`,
		comment,
		getConfig()
	);
	return response.data;
};

const deleteComment = async (id, commentId) => {
	const response = await axios.delete(
		`${baseUrl}/${id}/comments/${commentId}`,
		getConfig()
	);
	return response.data;
};

export default {
	setToken,
	getAll,
	create,
	update,
	removeProfessorReview,
	getComments,
	appendComment,
	updateComment,
	deleteComment,
};
