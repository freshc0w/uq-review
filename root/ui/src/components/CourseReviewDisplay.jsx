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

const CourseReviewDisplay = ({ courseReview }) => {
  console.log(courseReview)
  const {
		title, 
    rating,
    content,
    semster,
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

	return (
		<li>
			<Line label="Title" content={title} />
      <Line label="Rating" content={rating} />
      <Line label="Content" content={content} />
      <Line label="Semester" content={semster} />
      <Line label="Date Created" content={date} />
      <Line label="Difficulty" content={difficulty} />
      <Line label="Lecture Quality" content={lectureQuality} />
      <Line label="Tutorial Quality" content={tutorialQuality} />
      <Line label="Workload" content={workload} />
      <Line label="Likes" content={likes} />
      <Line label="Dislikes" content={dislikes} />
      <Line label="Reports" content={reports} />
      <Line label="Pros" content={pros} />
      <Line label="Cons" content={cons} />
      <Line label="User" content={user.username} />
      <Line label="Course" content={course.code} />
      {comments.map(c => <Line key={c.id} label="Comment" content={c.comment} />)}
		</li>
	);
}

export default CourseReviewDisplay;