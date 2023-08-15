// Helper component for the custom text input in the course and professor review form that
// makes use of the useField hook from uq-connect\root\ui\src\hooks\index.js
const CustomInput = ({ inputId, label, propsInfo }) => {
	return (
		<div>
			<label htmlFor={inputId}>
				{label}
				<input
					id={inputId}
					{...propsInfo}
				/>
			</label>
      
		</div>
	);
};

export default CustomInput;
