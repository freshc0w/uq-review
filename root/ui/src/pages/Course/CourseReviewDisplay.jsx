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

const CourseReviewDisplay = ({ courseReview, handleRemoveReview }) => {
	const users = useSelector(({ users }) => users);
	const courses = useSelector(({ courses }) => courses);
	const {
		title,
		rating,
		content,
		semester,
		date,
		difficulty,
		lectureQuality,
		tutorialQuality,
		workload,
		likes,
		dislikes,
		reports,
		pros,
		cons,
		user,
		course,
		comments,
	} = courseReview;

	const tempUser = !user.username
		? users.find(u => u.id === user).username
		: user.username;
	const tempCourse = !course.code
		? courses.find(c => c.id === course).code
		: course.code;

	const removeReview = () => {
		if (window.confirm(`Are you sure you want to delete ${title}?`))
			handleRemoveReview(courseReview.id.toString());
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
				label="Difficulty"
				content={difficulty}
			/>
			<Line
				label="Lecture Quality"
				content={lectureQuality}
			/>
			<Line
				label="Tutorial Quality"
				content={tutorialQuality}
			/>
			<Line
				label="Workload"
				content={workload}
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
				label="User"
				content={tempUser}
			/>
			<Line
				label="Course"
				content={tempCourse}
			/>
			{comments.map(c => (
				<Line
					key={c.id}
					label="Comment"
					content={c.comment}
				/>
			))}

			{/* Delete this review */}
			{user.id === courseReview.user.id && (
				<button onClick={removeReview}>Delete Review</button>
			)}
		</li>
	);
};

export default CourseReviewDisplay;
