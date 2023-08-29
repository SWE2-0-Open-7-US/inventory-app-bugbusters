import apiURL from "./api";

const fetchSingleItem = async (itemId) => {
	try {
		const response = await fetch(`${apiURL}/items/${itemId}`);
		return await response.json();
	} catch (err) {
		console.error("Error fetching single item.", err);
	}
};

const updateItem = async (itemId, updateData) => {
	try {
		await fetch(`${apiURL}/items/${itemId}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(updateData),
		});

	} catch (err) {
		console.error("Error updating an item.", err);
	}
};


export { fetchSingleItem, updateItem };
