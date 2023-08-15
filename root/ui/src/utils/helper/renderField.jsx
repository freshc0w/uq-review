import CustomInput from "../../components/CustomInput";
import CustomRangeInput from "../../components/CustomRangeInput";

// This function is used to render the fields in the AddReview form. 
// fieldProps is an object that contains the field's name, type, value, onChange, reset, min, max, rows, and cols.
const renderField = ({ fieldProps }) => {
	switch (fieldProps.type) {
		case 'text':
			return (
				<CustomInput
					inputId={`add-review__${fieldProps.name}`}
					label={fieldProps.name}
					propsInfo={{ ...fieldProps }}
				/>
			);
		case 'range':
			return (
				<CustomRangeInput
					inputId={`add-review__${fieldProps.name}`}
					label={fieldProps.name}
					propsInfo={{ ...fieldProps }}
				/>
			);
		default:
			return (
				<label htmlFor={`add-review__${fieldProps.name}`}>
					{fieldProps.name}:
					<textarea
						id={`add-review__${fieldProps.name}`}
						{...fieldProps}
					></textarea>
				</label>
			);
	}
};

export default renderField;