import { useNavigate } from 'react-router-dom';
import Td from './Td'; // helper that wraps content into a Link if a link is provided

const ProfessorInfo = ({ professor }) => {
  const navigate = useNavigate();
	const { name, avgRating, faculty, reviews, coursesTaught } = professor;

  const clickableStyle = {
    cursor: 'pointer',
  }

	const courses = !coursesTaught
		? 'Nothing added yet..'
		: coursesTaught.map(course => course.code).join(', ');

  const handleClick = () => {
    navigate(`/professors/${professor.id}`);
  }

	return (
			<tr style={clickableStyle} onClick={handleClick}>
				<Td to={`/professors/${professor.id}`}>{name}</Td>
				<Td to={`/professors/${professor.id}`}>{avgRating}</Td>
				<Td to={`/professors/${professor.id}`}>{faculty}</Td>
				<Td to={`/professors/${professor.id}`}>{reviews.length}</Td>
				<Td to={`/professors/${professor.id}`}>{courses}</Td>
			</tr>
	);
};

export default ProfessorInfo;
