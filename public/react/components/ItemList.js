import React, { useEffect, useState } from "react";
import apiURL from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

// comment

export function ItemList() {
	const navigation = useNavigate();
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
			<div className="items-list">
				{items.map((item) => (
						<Link className="item-list-link" key={item.id}
									to={`/items/${item.id}`}>
							<div className="item-card">
								<img src={item.image} alt="item-pic"/>
								<p>{item.name}</p>
							</div>
						</Link>
				))}
				<div className="add-item-container">
					<button id="add-item-button" onClick={() => navigation(`/items/addItem`)}>Add Item</button>
				</div>
			</div>
	);
}
