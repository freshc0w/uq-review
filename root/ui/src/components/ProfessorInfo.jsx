const ProfessorInfo = ({ professor }) => {
	const { name, avgRating, faculty, reviews, coursesTaught } = professor;
	console.log(professor.id);

	const courses = !coursesTaught
		? 'Nothing added yet..'
		: coursesTaught.map(course => course.code).join(', ');

	return (
		<tr>
			<td>{name}</td>
			<td>{avgRating}</td>
			<td>{faculty}</td>
			<td>{reviews.length}</td>
			<td>{courses}</td>
		</tr>
	);
};

export default ProfessorInfo;
