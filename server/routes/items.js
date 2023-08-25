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

// DELETE / Item:id
itemsRouter.delete("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();

    res.send(item);
  } catch (error) {
    next(error);
  }
});

// PUT / Item:id
itemsRouter.put("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.update(req.body);

    res.send(item);
  } catch (error) {
    next(error);
  }
});
module.exports = itemsRouter;
