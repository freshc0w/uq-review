import axios from 'axios';
const baseUrl = '/api/courseReviews';

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

// Get all course reviews
const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};
// Get course reviews based on id
const getOne = async id => {
	const response = await axios.get(`${baseUrl}/${id}`);
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

const removeCourseReview = async id => {
	const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
	return response.data;
};

// Gets all comments on a course review based on the id
const getComments = async id => {
	const response = await axios.get(`${baseUrl}/${id}/comments`);
	return response.data;
};

// Adds a comment on a course review based on the id
const appendComment = async (id, comment) => {
	const courseReviews = await getAll();
	const courseReview = courseReviews.find(cr => cr.id === id);

	const response = await axios.post(
		`${baseUrl}/${id}/comments`,
		{
			...courseReview,
			comment,
		},
		getConfig()
	);
	return response.data;
};

// Updates a comment on a course review based on the id
const updateComment = async (id, commentId, comment) => {
	const response = await axios.put(
		`${baseUrl}/${id}/comments/${commentId}`,
		{ comment },
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
	removeCourseReview,
	getComments,
	appendComment,
	updateComment,
	deleteComment,
};
