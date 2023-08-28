import React, { useEffect, useState } from "react";
import { fetchSingleItem } from "../apis";
import { useNavigate, useParams } from "react-router-dom";

const SingleItem = () => {
	const navigation = useNavigate();
	const {itemId} = useParams();
	const [item, setItem] = useState(null);

	const [Availability, setAvailability] = useState(true);

	async function handleClick() {
		const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
			method: "DELETE",
		});
		if (response.status === 200) {
			navigation("/items");
			setAvailability(false);
		}
	}

	useEffect(() => {
		if (itemId) fetchSingleItem(itemId).then((data) => setItem(data));
	}, [itemId]);

	if (!item) return null;

	return (
			<>
				{Availability && (
						<main className="single-item-container">
							<h3 id>{`${item.name}`}</h3>
							<h2>{`$${item.price}`}</h2>
							<img id="item-mg" src={item.image} alt="item-pic"/>
							<p>{item.description}</p>
							<p><span style={{fontWeight: "bold"}}>Tags:</span> {item.category}</p>
							<button
									id="add-item-button"
									onClick={() =>
											navigation(`/items/${itemId}/edit`, {state: {item}})
									}
							>
								Edit Item
							</button>
							<button id="add-item-button" onClick={handleClick}>Delete Item</button>
						</main>
				)}
			</>
	);
};

export { SingleItem };
