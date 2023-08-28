const request = require("supertest");
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const itemsRouter = require("../routes/items");
const { Item } = require("../models/Item");

const sequelize = new Sequelize("sqlite::memory:", { logging: false });

const app = express();
app.use(express.json());
app.use("/items", itemsRouter);

beforeAll(async () => {
  // Define the Item model
  Item.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  await sequelize.sync();
});

describe("GET /items", () => {
  it("should return a list of items", async () => {
    await Item.bulkCreate([
      { name: "Item 1", description: "Description 1" },
      { name: "Item 2", description: "Description 2" },
    ]);

    const response = await request(app).get("/items");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});

describe("GET /items/:id", () => {
  it("should return a single item by ID", async () => {
    const newItem = await Item.create({
      name: "Test Item",
      description: "Test Description",
    });

    const response = await request(app).get(`/items/${newItem.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Item");
    expect(response.body.description).toBe("Test Description");
  });

  it("should return 404 if the item is not found", async () => {
    const response = await request(app).get("/items/9999");

    expect(response.status).toBe(404);
  });
});

describe("DELETE /items/:id", () => {
  it("should delete an item by ID", async () => {
    const newItem = await Item.create({
      name: "Delete Item",
      description: "Item to be deleted",
    });

    const response = await request(app).delete(`/items/${newItem.id}`);

    expect(response.status).toBe(200);

    const deletedItem = await Item.findByPk(newItem.id);
    expect(deletedItem).toBeNull();
  });

  it("should return 500 if the item is not found", async () => {
    const response = await request(app).delete("/items/9999");

    expect(response.status).toBe(500);
  });
});

describe("POST /items", () => {
  it("should create a new item with valid data", async () => {
    const newItemData = {
      name: "Test Item",
      description: "Test Description",
      price: 10.99,
      category: "Test Category",
    };

    const response = await request(app)
      .post("/items")
      .send(newItemData)
      .expect(200);

    expect(response.body).toBe(newItemData.name);
  });

  it("should return validation error for invalid data", async () => {
    const invalidItemData = {
      name: "",
      description: "Test Description",
      price: 10.99,
      category: "Test Category",
    };

    const response = await request(app)
      .post("/items")
      .send(invalidItemData)
      .expect(200);

    expect(response.body.error).toBeTruthy();
  });
});

describe("PUT /items/:id", () => {
  it("should update an existing item with valid data", async () => {
    const updatedItemData = {
      name: "Updated Item Name",
      description: "Updated Description",
      price: 20.99,
      category: "Updated Category",
    };

    const response = await request(app)
      .put("/items/1")
      .send(updatedItemData)
      .expect(200);

    expect(response.body.name).toBe(updatedItemData.name);
  });

  it("should return validation error for invalid data", async () => {
    const invalidItemData = {
      name: "",
      description: "Updated Description",
      price: 20.99,
      category: "Updated Category",
    };

    const response = await request(app)
      .put("/items/1")
      .send(invalidItemData)
      .expect(200);

    expect(response.body.error).toBeTruthy();
  });
});

afterAll(async () => {
  await sequelize.close();
});
