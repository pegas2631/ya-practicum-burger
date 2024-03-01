// scrollable-block.js
import React from 'react';
import scrollableBlock from './scrollable-block.module.css'
import PropTypes from "prop-types";

const ScrollableBlock = ({ children }) => {
	return (
		<div className={scrollableBlock.scrollableBlock}>
			{children}
		</div>
	);
}

ScrollableBlock.propTypes = {
	children: PropTypes.node,
};

export default ScrollableBlock;