const Line = ({ label, content }) => {
	const noSpaceStyle = {
		margin: 0,
		padding: 0,
	};
	return (
		<p style={noSpaceStyle}>
			<strong>{label}:</strong> {content}
		</p>
	);
};

const ProfessorReviewDisplay = ({professorReview}) => {
  console.log(professorReview)
  const {
		title,
		rating,
		content,
		semester,
		date,
		communicationRating,
		approachabilityRating,
		feedbackRating,
		likes,
		dislikes,
		reports,
		pros,
		cons,
		coursesTaken,
		user,
		professor,
		comments,
	} = professorReview;

	return (
		<li>
			<Line
				label="Title"
				content={title}
			/>
			<Line
				label="Rating"
				content={rating}
			/>
			<Line
				label="Content"
				content={content}
			/>
			<Line
				label="Semester"
				content={semester}
			/>
			<Line
				label="Date Created"
				content={date}
			/>
			<Line
				label="Communication Rating"
				content={communicationRating}
			/>
			<Line
				label="Approachability Rating"
				content={approachabilityRating}
			/>
			<Line
				label="Feedback Rating"
				content={feedbackRating}
			/>
			<Line
				label="Likes"
				content={likes}
			/>
			<Line
				label="Dislikes"
				content={dislikes}
			/>
			<Line
				label="Reports"
				content={reports}
			/>
			<Line
				label="Pros"
				content={pros}
			/>
			<Line
				label="Cons"
				content={cons}
			/>
			<Line
				label="Courses Taken"
				content={coursesTaken.code}
			/>
			<Line
				label="User"
				content={user.username}
			/>
			<Line
				label="Professor"
				content={professor.name}
			/>
			{comments.map(c => <Line key={c.id} label="Comment" content={c.comment} />)}
		</li>
	);
}

export default ProfessorReviewDisplay;