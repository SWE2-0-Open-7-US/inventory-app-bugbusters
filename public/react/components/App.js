import React from "react";
import { Route, Routes } from "react-router-dom";

// import and prepend the api url to any fetch calls
import { ItemList } from "./ItemList";
import { SingleItem } from "./SingleItem";
import { EditItem } from "./EditItem";
import { Form } from "./Form";
import { Navbar } from "./Navbar";

export const App = () => {

	return (
			<main>
				<Navbar/>
				<Routes>
					<Route path="/items" element={<ItemList/>}/>
					<Route path="/items/:itemId" element={<SingleItem/>}/>
					<Route path="/items/:itemId/edit" element={<EditItem/>}/>
					<Route path="*" element={<ItemList/>}/>
					<Route path="/items/addItem" element={<Form/>}/>
				</Routes>
			</main>
	);
};
