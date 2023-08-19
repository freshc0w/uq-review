import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import Td from '../../components/Td'; // helper that wraps content into a Link if a link is provided

const CourseInfoRow = memo(({ course }) => {
	console.log('rerendering');
	const navigate = useNavigate();
	const { code, title, avgRating, faculty, professor, reviews } = course;

	const clickableStyle = {
		cursor: 'pointer',
	};

	// onClick goes to a page with the course's reviews
	const handleClick = () => {
		navigate(`/courses/${course.id}`);
	};

	return (
		<tr
			style={clickableStyle}
			onClick={handleClick}
		>
			{[code, title, avgRating, faculty, professor, reviews.length].map(
				(content, i) => (
					<Td
						key={i}
						to={`/courses/${course.id}`}
					>
						{content}
					</Td>
				)
			)}
		</tr>
	);
});

export default CourseInfoRow;
