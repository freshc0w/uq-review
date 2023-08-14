// Serves as a temporary nav bar for development purposes
import { BrowserRouter as Router, Link } from 'react-router-dom';

const TempNav = () => {
	const tempSpaceStyling = {
		marginRight: '1rem',
	};
	return (
		<div className="temp-nav">
			<Link
				style={tempSpaceStyling}
				to="/"
			>
				Home
			</Link>
			<Link
				style={tempSpaceStyling}
				to="/login"
			>
				Login
			</Link>
			<Link
				style={tempSpaceStyling}
				to="/signup"
			>
				Signup
			</Link>
			<Link
				style={tempSpaceStyling}
				to="/profile"
			>
				Profile
			</Link>
			<Link
				style={tempSpaceStyling}
				to="/courses"
			>
				Courses
			</Link>
			<Link
				style={tempSpaceStyling}
				to="/professors"
			>
				Professors
			</Link>
		</div>
	);
};

export default TempNav;
