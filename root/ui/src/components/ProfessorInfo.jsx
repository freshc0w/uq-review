import { useNavigate } from 'react-router-dom';
import Td from './Td'; // helper that wraps content into a Link if a link is provided

const ProfessorInfo = ({ professor }) => {
	const navigate = useNavigate();
	const { name, avgRating, faculty, reviews, coursesTaught } = professor;

	const clickableStyle = {
		cursor: 'pointer',
	};

	const courses = !coursesTaught
		? 'Nothing added yet..'
		: coursesTaught.map(course => course.code).join(', ');

	const handleClick = () => {
		navigate(`/professors/${professor.id}`);
	};

	return (
		<tr
			style={clickableStyle}
			onClick={handleClick}
		>
			{[name, avgRating, faculty, reviews.length, courses].map((content, i) => (
				<Td
					key={i}
					to={`/professors/${professor.id}`}
				>
					{content}
				</Td>
			))}
		</tr>
	);
};

export default ProfessorInfo;
