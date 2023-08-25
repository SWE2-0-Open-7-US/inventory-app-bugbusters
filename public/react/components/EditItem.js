import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateItem } from "../apis";

const EditItem = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {item} = location.state;

	const [name, setName] = useState(item.name);
	const [description, setDescription] = useState(item.description);
	const [price, setPrice] = useState(item.price);
	const [category, setCategory] = useState(item.category);
	const [image, setImage] = useState(item.image);

	const submitHandler = async (e) => {
		e.preventDefault();
		const updateData = {name, description, price, category, image};
		await updateItem(item.id, updateData)
		setName("");
		setDescription("");
		setPrice("");
		setCategory("");
		setImage("");
		navigate(`/items/${item.id}`)
	}

	return (
			<div>
				<h1>Edit Item</h1>
				<form className="form-container" onSubmit={submitHandler}>
					<section className="form-section">
						<label htmlFor="item-name">Name</label>
						<input id="item-name" className="form-input" type="text" placeholder="Name" value={name}
									 onChange={(e) => setName(e.target.value)}/>
					</section>
					<section className="form-section">
						<label htmlFor="item-description">Description</label>
						<input id="item-description" className="form-input" type="text" placeholder="Description"
									 value={description}
									 onChange={(e) => setDescription(e.target.value)}/>
					</section>
					<section className="form-section">
						<label htmlFor="item-price">Price</label>
						<input id="item-price" className="form-input" type="text" placeholder="Price" value={price}
									 onChange={(e) => setPrice(e.target.value)}/>
					</section>
					<section className="form-section">
						<label htmlFor="item-category">Category</label>
						<input id="item-category" className="form-input" type="text" placeholder="Category" value={category}
									 onChange={(e) => setCategory(e.target.value)}/>
					</section>
					<section className="form-section">
						<label htmlFor="item-image">Image</label>
						<input id="item-image" className="form-input" type="text" placeholder="Image" value={image}
									 onChange={(e) => setImage(e.target.value)}/>
					</section>
					<button className="form-submit" type="submit">Submit</button>
				</form>
			</div>
	)
}

export { EditItem }
