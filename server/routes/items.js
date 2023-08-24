const express = require('express');
const itemsRouter = express.Router();
const { Item } = require('../models/Item');

itemsRouter.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (err) {
        console.log(`Can not find all items!`);
        next(err);
    }
});

module.exports = itemsRouter
