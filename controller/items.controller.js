const { validationResult } = require("express-validator");
const itemService = require("../services/items.service");

async function addItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { itemName, itemCode, description, sellingPrice, category, brand} =
    req.body;

  try {
    const itemExists = await itemService.findItemByName(itemName);
    if (itemExists) {
      return res.status(400).json({ message: "Item already exists" });
    }

    const newItem = {
      itemName,
      itemCode,
      description,
      sellingPrice,
      category,
      brand,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await itemService.createItem(newItem);

    return res
      .status(201)
      .json({ message: "Item added successfully", itemId: result.insertedId });
  } catch (error) {
    console.error("Error in addItem:", error);
    return res.status(500).json({ message: "Server error while adding item" });
  }
}

async function getAllItems(req, res) {
  try {
    const items = await itemService.getAllItems();
    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error in getAllItems:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving items" });
  }
}

async function getItemById(req, res) {
  const { id } = req.params;

  try {
    const item = await itemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ item });
  } catch (error) {
    console.error("Error in getItemById:", error);
    return res
      .status(500)
      .json({ message: "Server error while retrieving item" });
  }
}

async function updateItem(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await itemService.updateItem(id, updateData);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error in updateItem:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating item" });
  }
}

async function deleteItem(req, res) {
  const { id } = req.params;

  try {
    const result = await itemService.deleteItem(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error in deleteItem:", error);
    return res
      .status(500)
      .json({ message: "Server error while deleting item" });
  }
}

async function getMinimumQuantityItems(req, res) {
  try {
    const items = await itemService.getMinimumQuantityItems();
    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error in getMinimumQuantityItems:", error);
    return res
      .status(500)
      .json({
        message: "Server error while retrieving minimum quantity items",
      });
  }
}

async function getItemCount(req, res) {
  try {
    const count = await itemService.getItemCount();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error in getItemCount:", error);
    return res
      .status(500)
      .json({ message: "Server error while getting item count" });
  }
}

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMinimumQuantityItems,
  getItemCount,
};
