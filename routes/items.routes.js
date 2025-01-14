const express = require("express");
const itemController = require("../controller/items.controller");
// const = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/",  itemController.addItem);
router.get("/",  itemController.getAllItems);
router.get("/count",  itemController.getItemCount);
router.get(
  "/minimumQuantity",
  
  itemController.getMinimumQuantityItems
);
router.get("/:id",  itemController.getItemById);
router.put("/:id",  itemController.updateItem);
router.delete("/:id",  itemController.deleteItem);

module.exports = router;
