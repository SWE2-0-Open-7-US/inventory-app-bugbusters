import React, { useEffect, useState } from "react";
import apiURL from "../api";
import { Link } from "react-router-dom";

export function ItemList() {
	const [items, setItems] = useState([]);

	async function fetchAllItems() {
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			setItems(itemsData);
		} catch (err) {
			console.log("Error", err);
		}
	}

	useEffect(() => {
		fetchAllItems();
	}, []);
	return (
			<div style={{display: "flex", flexDirection: "column"}}>
				{items.map((item) => (
						<Link style={{textDecoration: "none", color: "black"}} key={item.id}
									to={`/items/${item.id}`}>{item.name}</Link>
				))}
			</div>
	);
}
