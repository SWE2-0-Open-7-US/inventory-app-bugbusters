import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';
import { Routes, Route } from 'react-router-dom'

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { ItemList } from './ItemList';

export const App = () => {

	const [sauces, setSauces] = useState([]);


	async function fetchSauces() {
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();

			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	};

	useEffect(() => {
		fetchSauces();
	}, []);

	return (
		<main>
			<Routes>
				{/* <h1>Sauce Store</h1>
				<h2>All things 🔥</h2> */}
				<Route path='/sauceList' element={<SaucesList sauces={sauces} />} />
				<Route path='/items' element={<ItemList />} />
			</Routes>
		</main>
	)
}