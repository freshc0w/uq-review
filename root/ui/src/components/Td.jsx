import { Link } from 'react-router-dom';

// Helper component for table data that has a link

const Td = ({ children, to }) => {
	// Conditionally wrapping content into a Link
	const ContentTag = to ? Link : 'div';
	return (
		<td>
			<ContentTag to={to}>{children}</ContentTag>
		</td>
	);
};

export default Td;