// Serves as a temporary nav bar for development purposes
import { BrowserRouter as Router, Link } from 'react-router-dom';

const TempNav = () => {
	const tempSpaceStyling = {
		marginRight: '1rem',
	};
	return (
		<div className="temp-nav">
			<Router>
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
          to="/courseReviews"
        >
          Courses
        </Link>
			</Router>
		</div>
	);
};

export default TempNav;
