import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useDispatch } from '../../services/hooks';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import AppHeader from '../app-header/app-header';
import AppRoutes from '../routes/routes';
import { AppDispatch } from '../../services/store';


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
			<BrowserRouter>
				<AppHeader />
				<AppRoutes />
			</BrowserRouter>
	);
}

export default App;