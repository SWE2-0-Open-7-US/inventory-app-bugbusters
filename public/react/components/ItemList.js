import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import apiURL from "../api";

export function ItemList() {
    const [items, setItems] = useState([]);

    async function fetchAllItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(itemsData);
        } catch (err) {
            console.log('Error', err);
        }
    };

    useEffect(() => {
        fetchAllItems();
    }, []);
    return (
        <>
            {items.map((item, idx) => (
                <Item item={item} id={item.id} />
            ))}
        </>
    )
}