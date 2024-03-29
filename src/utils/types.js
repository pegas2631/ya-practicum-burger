import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']),
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number,
	image: PropTypes.string,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string,
	uuid: PropTypes.string,
	__v: PropTypes.number,
});

export default ingredientType