// nav-button.js
import React from 'react'
import navButton from './nav-button.module.css'
import PropTypes from "prop-types";

const NavButton = (props) => {
	const textColorClass = props.active ? '' : 'text_color_inactive';

	return (
		<div className={`${props.className} ${navButton.container} p-4`} style={props.customStyle}>
			{props.children}
			<p className={`text text_type_main-default pl-2 ${textColorClass}`}>
				{props.text}
			</p>
		</div>
	);
}

NavButton.propTypes = {
	active: PropTypes.bool,
	className: PropTypes.string,
	customStyle: PropTypes.object,
	children: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
};


export default NavButton