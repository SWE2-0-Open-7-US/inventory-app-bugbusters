const express = require("express");
const itemsRouter = express.Router();
const {Item} = require("../models/Item");
const {validationResult, check} = require("express-validator");

// GET / Item
itemsRouter.get("/", async (req, res, next) => {
	try {
		const items = await Item.findAll();

		if (!items) {
			res.status(404).json({message: "Item not found"});
			return;
		}

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
		if (!item) {
			res.status(404).json({message: "Item not found"});
			return;
		}

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

// POST items
itemsRouter.post("/", [check("name").isLength({min: 4, max: 100}),
	check("description").isLength({min: 4, max: 500}),
	check("price").isLength({min: 4, max: 25}),
	check("category").isLength({min: 4, max: 25}),
	check("name").not().isEmpty(),
	check("description").not().isEmpty(),
	check("price").not().isEmpty(),
	check("category").not().isEmpty(),
], async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json({error: errors.array()});
		} else {
			const newItem = await Item.create(req.body);
			if (!newItem) {
				res.status(500).json({message: "Can not create Item!"});
			}
		}
	} catch (error) {
		next(error);
	}
});

// PUT / Item:id
itemsRouter.put("/:id", [check("name").isLength({min: 4, max: 100}),
			check("description").isLength({min: 4, max: 500}),
			check("price").isLength({min: 4, max: 25}),
			check("category").isLength({min: 4, max: 25}),
			check("name").not().isEmpty(),
			check("description").not().isEmpty(),
			check("price").not().isEmpty(),
			check("category").not().isEmpty()], async (req, res, next) => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					res.json({error: errors.array()});
				} else {
					const item = await Item.findByPk(req.params.id);
					await item.update(req.body);


					res.send(item);
				}
			} catch (error) {
				next(error);
			}
		},
);
module.exports = itemsRouter;
