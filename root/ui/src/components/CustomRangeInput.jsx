import CustomTextInput from './CustomTextInput';
// Higher order fnc of CustomTextInput that displays the value of the range input

const CustomRangeInput = ({ inputId, label, propsInfo }) => {
	return (
		<div>
			<CustomTextInput
				inputId={inputId}
				label={label}
				propsInfo={propsInfo}
			/>
			<span>{propsInfo.value === '' ? 50 : propsInfo.value}</span>
		</div>
	);
};

export default CustomRangeInput;
