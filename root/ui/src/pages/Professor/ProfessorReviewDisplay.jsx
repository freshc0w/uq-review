import { useSelector } from 'react-redux';

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

const ProfessorReviewDisplay = ({ professorReview, handleRemoveReview }) => {
	const users = useSelector(({ users }) => users);
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

	const tempCoursesTaken = !coursesTaken ? 'None added yet...' : coursesTaken;

	const tempUser = !user.username
		? users.find(u => u.id === user).username
		: user.username;

	const tempName = !user.name ? users.find(u => u.id === user).name : user.name;

	const removeReview = () => {
		if (window.confirm(`Are you sure you want to delete ${title}?`))
			handleRemoveReview(professorReview.id.toString());
	};

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
				content={tempCoursesTaken}
			/>
			<Line
				label="UserName"
				content={tempUser}
			/>
			<Line
				label="Author name"
				content={tempName}
			/>
			<Line
				label="Professor"
				content={professor.name}
			/>
			{comments.map(c => (
				<Line
					key={c.id}
					label="Comment"
					content={c.comment}
				/>
			))}

			{/* Delete this review */}
			{user.id === professorReview.user.id && (
				<button onClick={removeReview}>Delete Review</button>
			)}
		</li>
	);
};

export default ProfessorReviewDisplay;
