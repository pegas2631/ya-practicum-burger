import React, { ReactNode, UIEventHandler } from 'react';
import scrollableBlock from './scrollable-block.module.css';

interface IScrollableBlockProps {
	onScroll?: UIEventHandler<HTMLDivElement>;
	height?: number;
	children: ReactNode;
}

const ScrollableBlock: React.FC<IScrollableBlockProps> = ({ onScroll, height, children }) => {
	return (
		<div className={scrollableBlock.scrollableBlock} onScroll={onScroll} style={{height}}>
			{children}
		</div>
	);
};

export default ScrollableBlock;