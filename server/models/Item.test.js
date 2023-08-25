const {describe, it, expect, beforeAll, afterAll} = require("@jest/globals");
const {Item} = require("./Item");
const {db} = require("./index");

let item;

//comment
beforeAll(async () => {
	await db.sync({force: true});
	item = await Item.create({
		name: "Oversize Sweater",
		description: "Very beautiful and gorgeous",
		price: 6.99,
		category: "outwear",
		image: "test.jpg",
	});
});

afterAll(async () => await db.sync({force: true}));
//comment
describe("Item", () => {
	it("has expected properties", async () => {
		expect(item).toHaveProperty("id");
		expect(item).toHaveProperty("name");
		expect(item).toHaveProperty("description");
		expect(item).toHaveProperty("price");
		expect(item).toHaveProperty("category");
		expect(item).toHaveProperty("image");
	});
	it("has correct datatype for properties", () => {
		expect(typeof item.name).toBe("string");
		expect(typeof item.description).toBe("string");
		expect(typeof item.price).toBe("number");
		expect(typeof item.category).toBe("string");
		expect(typeof item.image).toBe("string");
	});
	it("assigns correct values to properties", async () => {
		expect(item.name).toBe("Oversize Sweater");
		expect(item.description).toBe("Very beautiful and gorgeous");
		expect(item.price).toBe(6.99);
		expect(item.category).toBe("outwear");
		expect(item.image).toBe("test.jpg");
	});
	it("can create Item", async () => {
		const allItemsBeforeCreate = await Item.findAll();
		expect(allItemsBeforeCreate.length).toEqual(1);

		const newItem = await Item.create({
			name: "Straw Hat",
			description: "Very gorgeous",
			price: 2.99,
			category: "Hats",
			image: "test2.jpg",
		});

		const allItemAfterCreate = await Item.findAll();
		expect(allItemAfterCreate.length).toEqual(2);
	});
	it("can update Item", async () => {
		item.update({name: "Loafers"});
		expect(item.name).toBe("Loafers");
	});
	it("can delete Item", async () => {
		const allItemsBeforeDelete = await Item.findAll();
		expect(allItemsBeforeDelete.length).toEqual(2);

		await item.destroy();

		const allItemAfterDelete = await Item.findAll();
		expect(allItemAfterDelete.length).toEqual(1);
	});

});
