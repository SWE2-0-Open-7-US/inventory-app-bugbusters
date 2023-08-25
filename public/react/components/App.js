import React, { useEffect, useState } from "react";
import { SaucesList } from "./SaucesList";
import { Route, Routes } from "react-router-dom";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import { ItemList } from "./ItemList";
import { SingleItem } from "./SingleItem";
import { EditItem } from "./EditItem";

export const App = () => {

	const [sauces, setSauces] = useState([]);

	async function fetchSauces() {
		try {
			const response = await fetch(`${apiURL}/sauces`);
			const saucesData = await response.json();

			setSauces(saucesData);
		} catch (err) {
			console.log("Oh no an error! ", err);
		}
	}

	useEffect(() => {
		fetchSauces();
	}, []);

	return (
			<main>
				<Routes>
					<Route path="/sauceList" element={<SaucesList sauces={sauces}/>}/>
					<Route path="/items" element={<ItemList/>}/>
					<Route path="/items/:itemId" element={<SingleItem/>}/>
					<Route path="/items/:itemId/edit" element={<EditItem/>}/>
					<Route path="*" element={<ItemList/>}/>
				</Routes>
			</main>
	);
};
