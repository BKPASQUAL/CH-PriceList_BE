const { getItemsCollection } = require("../config/db");
const { ObjectId } = require("mongodb");

async function findItemByName(name) {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection.findOne({ itemName: name });
  } catch (error) {
    console.error("Error finding the item by name:", error);
    throw new Error("Database query error");
  }
}

async function createItem(data) {
  try {
    const itemCollection = getItemsCollection();
    const result = await itemCollection.insertOne(data);
    return result;
  } catch (error) {
    console.error("Error creating item:", error);
    throw new Error("Database insertion error");
  }
}

async function getAllItems() {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection.find({}).sort({ createdAt: -1 }).toArray();
  } catch (error) {
    console.error("Error getting all items:", error);
    throw new Error("Database query error");
  }
}

async function getItemById(itemId) {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection.findOne({ _id: new ObjectId(itemId) });
  } catch (error) {
    console.error("Error getting item by ID:", error);
    throw new Error("Database query error");
  }
}

async function updateItem(itemId, updateData) {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection.updateOne(
      { _id: new ObjectId(itemId) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Database update error");
  }
}

async function deleteItem(itemId) {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection.deleteOne({ _id: new ObjectId(itemId) });
  } catch (error) {
    console.error("Error deleting item:", error);
    throw new Error("Database deletion error");
  }
}

async function getMinimumQuantityItems() {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection
      .find({})
      .sort({ quantity: 1 })
      .limit(6)
      .toArray();
  } catch (error) {
    console.error("Error getting minimum quantity items:", error);
    throw new Error("Database query error");
  }
}

async function getItemCount() {
  try {
    const itemCollection = getItemsCollection();
    return await itemCollection.countDocuments({});
  } catch (error) {
    console.error("Error getting item count:", error);
    throw new Error("Database query error");
  }
}

module.exports = {
  findItemByName,
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMinimumQuantityItems,
  getItemCount,
};
