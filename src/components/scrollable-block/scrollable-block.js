// scrollable-block.js
import React from 'react';
import scrollableBlock from './scrollable-block.module.css'
import PropTypes from "prop-types";

const ScrollableBlock = ({onScroll, children }) => {
	return (
		<div className={scrollableBlock.scrollableBlock} onScroll={onScroll}>
			{children}
		</div>
	);
}

ScrollableBlock.propTypes = {
	onScroll: PropTypes.func,
	children: PropTypes.node,
};

export default ScrollableBlock;