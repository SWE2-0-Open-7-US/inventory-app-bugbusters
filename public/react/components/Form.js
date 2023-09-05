import React, { useState } from "react";
import apiURL from "../apis/api";
import { useNavigate } from "react-router-dom";

export function Form() {
	const navigation = useNavigate();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");

	async function submitHandler(e) {
		e.preventDefault();
		const newItem = {name, description, price, category, image};

		await fetch(`${apiURL}/items`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newItem),
		});
		navigation("items/");
		setName("");
		setDescription("");
		setPrice("");
		setCategory("");
		setImage("");
	}

	return (
			<div className="form-wrapper">
				<h1>Create New Item</h1>
				<form className="form-container" onSubmit={submitHandler}>
					<section className="form-section">
						<input className="form-input" type="text" placeholder="Name" value={name}
									 onChange={(e) => setName(e.target.value)}/>
					</section>
					<section className="form-section">
                    <textarea className="form-input" type="text" placeholder="Description" value={description}
															onChange={(e) => setDescription(e.target.value)}/>
					</section>
					<section className="form-section">
						<input className="form-input" type="text" placeholder="Price" value={price}
									 onChange={(e) => setPrice(e.target.value)}/>
					</section>
					<section className="form-section">
						<input className="form-input" type="text" placeholder="Category" value={category}
									 onChange={(e) => setCategory(e.target.value)}/>
					</section>
					<section className="form-section">
						<input className="form-input" type="text" placeholder="Image" value={image}
									 onChange={(e) => setImage(e.target.value)}/>
					</section>
					<button className="form-submit" type="submit">Submit</button>
				</form>
			</div>
	);
}
