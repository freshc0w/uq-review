import CustomInput from './CustomInput';
// Higher order fnc of CustomInput that displays the value of the range input

const CustomRangeInput = ({ inputId, label, propsInfo }) => {
	return (
		<div>
			<CustomInput
				inputId={inputId}
				label={label}
				propsInfo={propsInfo}
			/>
			<span>{propsInfo.value === '' ? 50 : propsInfo.value}</span>
		</div>
	);
};

export default CustomRangeInput;
