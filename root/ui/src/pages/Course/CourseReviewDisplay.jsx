import { useState } from 'react';
import { useSelector } from 'react-redux';

const Line = ({ label, content, other }) => {
	const noSpaceStyle = {
		margin: 0,
		padding: 0,
	};
	return (
		<div style={noSpaceStyle}>
			<strong>{label}:</strong> {content !== null ? content : 'not given'}
			{/* Temporary */}
			{other ? <em>{other}</em> : null}
		</div>
	);
};

const CourseReviewDisplay = ({ courseReview, handleRemoveReview }) => {
	const [currCourseReview, setCurrCourseReview] = useState(courseReview);
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
	} = currCourseReview;

	const incrementLike = () => {};

	const decrementLike = () => {};

	const getUserName = () => {
		return !user.username
			? users.find(u => u.id === user).username
			: user.username;
	};

	const getName = () => {
		return !user.name ? users.find(u => u.id === user).name : user.name;
	};

	const getCourseCode = () => {
		return !course.code ? courses.find(c => c.id === course).code : course.code;
	};

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
				content={likes.length}
			/>
			<Line
				label="Dislikes"
				content={dislikes.length}
			/>
			<Line
				label="Reports"
				content={reports.length}
			/>
			<Line
				label="Pros"
				content={pros.filter(pro => pro !== null).join(', ')}
			/>
			<Line
				label="Cons"
				content={cons.filter(con => con !== null).join(', ')}
			/>
			<Line
				label="User"
				content={getUserName()}
			/>
			<Line
				label="Author name"
				content={getName()}
			/>
			<Line
				label="Course"
				content={getCourseCode()}
			/>
			{comments.map(c => (
				<div key={c.id}>
					<Line
						label="Comment"
						content={c.content}
						other={[c.user, c.date]}
					/>
				</div>
			))}

			{/* Delete this review */}
			{user.id === courseReview.user.id && (
				<button onClick={removeReview}>Delete Review</button>
			)}
		</li>
	);
};

export default CourseReviewDisplay;
