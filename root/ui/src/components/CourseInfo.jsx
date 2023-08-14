import { useNavigate } from "react-router-dom";
import Td from "./Td"; // helper that wraps content into a Link if a link is provided

const CourseInfo = ({ course }) => {
  const navigate = useNavigate();
	const { code, title, avgRating, faculty, professor, reviews } = course;

  const clickableStyle = {
    cursor: 'pointer',
  }

  // onClick goes to a page with the course's reviews
  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  }

	return (
		<tr style={clickableStyle} onClick={handleClick}>
			<Td to={`/courses/${course.id}`}>{code}</Td>
			<Td to={`/courses/${course.id}`}>{title}</Td>
			<Td to={`/courses/${course.id}`}>{avgRating}</Td>
			<Td to={`/courses/${course.id}`}>{faculty}</Td>
			<Td to={`/courses/${course.id}`}>{professor}</Td>
			<Td to={`/courses/${course.id}`}>{reviews.length}</Td>
		</tr>
	);
};

export default CourseInfo;
