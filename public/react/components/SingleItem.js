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
			setAvailability(false);
		}
		navigation(`/items`);
	}

	useEffect(() => {
		if (itemId) fetchSingleItem(itemId).then((data) => setItem(data));
	}, [itemId]);

	if (!item) return null;

	return (
			<>
				{Availability && (
						<main>
							<h3>{`${item.name} $${item.price}`}</h3>
							<img src={item.image} alt="item-pic"/>
							<p>{item.description}</p>
							<p>{`Tags: ${item.category}`}</p>
							<button
									onClick={() =>
											navigation(`/items/${itemId}/edit`, {state: {item}})
									}
							>
								Edit Item
							</button>
							<button onClick={handleClick}>Delete Item</button>
						</main>
				)}
			</>
	);
};

export { SingleItem };
