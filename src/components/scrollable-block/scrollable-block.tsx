import React, { ReactNode, UIEventHandler } from 'react';
import scrollableBlock from './scrollable-block.module.css';

interface IScrollableBlockProps {
	onScroll?: UIEventHandler<HTMLDivElement>;
	children: ReactNode;
}

const ScrollableBlock: React.FC<IScrollableBlockProps> = ({ onScroll, children }) => {
	return (
		<div className={scrollableBlock.scrollableBlock} onScroll={onScroll}>
			{children}
		</div>
	);
};

export default ScrollableBlock;