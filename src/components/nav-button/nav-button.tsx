import React, { CSSProperties, ReactNode } from 'react';
import navButton from './nav-button.module.css';

interface INavButtonProps {
	active?: boolean;
	className?: string;
	customStyle?: CSSProperties;
	children: ReactNode;
	text: string;
}

const NavButton: React.FC<INavButtonProps> = (props) => {
	const textColorClass = props.active ? '' : 'text_color_inactive';

	return (
		<div className={`${props.className} ${navButton.container} p-4`} style={props.customStyle}>
			{props.children}
			<p className={`text text_type_main-default pl-2 ${textColorClass}`}>
				{props.text}
			</p>
		</div>
	);
};

export default NavButton;