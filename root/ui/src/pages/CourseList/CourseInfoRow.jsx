import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import Td from '../../components/Td'; // helper that wraps content into a Link if a link is provided

const CourseInfoRow = memo(({ course, style }) => {
	const navigate = useNavigate();
  
	const { code, title, avgRating, faculty, professor, reviews } = course;

	const clickableStyle = {
		cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    ...style,
	};

	// onClick goes to a page with the course's reviews
	const handleClick = () => {
		navigate(`/courses/${course.id}`);
	};

  // ? Removed faculty 
	return (
		<div
			style={clickableStyle}
			onClick={handleClick}
      className='course-info-row'
		>
			{[code, title, avgRating, professor, (reviews.length || 0)].map(
				(content, i) => (
					<Td
						key={i}
						to={`/courses/${course.id}`}
					>
						{content}
					</Td>
				)
			)}
		</div>
	);
});

export default CourseInfoRow;
