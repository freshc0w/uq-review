const CourseInfo = ({ course }) => {
	const { code, title, avgRating, faculty, professor, reviews } = course;

	return (
		<tr>
			<td>{code}</td>
			<td>{title}</td>
			<td>{avgRating}</td>
			<td>{faculty}</td>
			<td>{professor}</td>
			<td>{reviews.length}</td>
		</tr>
	);
};

export default CourseInfo;
