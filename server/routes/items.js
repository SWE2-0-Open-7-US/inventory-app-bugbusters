const express = require("express");
const itemsRouter = express.Router();
const { Item } = require("../models/Item");

// GET / Item
itemsRouter.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    console.log(`Can not find all items!`);
    next(err);
  }
});

// GET / Item:id
itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.send(item);
  } catch (error) {
    next(error);
  }
});

// POST / Item
itemsRouter.post("/", async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.send(item);
  } catch (error) {
    next(error);
  }
});
module.exports = itemsRouter;
