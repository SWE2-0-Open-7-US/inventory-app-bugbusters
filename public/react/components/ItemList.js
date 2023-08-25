import React, { useEffect, useState } from "react";
import apiURL from "../api";
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
        <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item) => (
                <Link style={{ textDecoration: "none", color: "black" }} key={item.id}
                    to={`/items/${item.id}`}>{item.name}</Link>
            ))}
            <button onClick={() => navigation(`/items/addItem`)}>Add Item</button>

        </div>
    );
}
