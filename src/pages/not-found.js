import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound404Page() {
	return (
		<div>
			<div>
				<div>
					<h1>Oops! 404 Error</h1>
					<p>The page you requested does not exist</p>
					<br />
					<br />
					<p>check the address or try <Link to='/'>homepage</Link></p>
				</div>
			</div>
		</div>
	);
}