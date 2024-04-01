import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/slices/ingredients-slice";
import AppHeader from "../app-header/app-header";
import AppRoutes from "../routes/routes";


function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// @ts-ignore
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