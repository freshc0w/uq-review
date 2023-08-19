import { Link } from 'react-router-dom';

// Helper component for table data that has a link

const Td = ({ children, to }) => {
	// Conditionally wrapping content into a Link
	const ContentTag = to ? Link : 'div';
	return (
		<ContentTag
			style={{
				wordWrap: 'auto',
				maxWidth: '20%',
				minWidth: '20%',
				textAlign: 'center',
				overflow: 'hidden',
			}}
			to={to}
		>
			{children}
		</ContentTag>
	);
};

export default Td;
