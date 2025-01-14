const express = require("express");
const itemsRoutes = require("./items.routes");

const router = express.Router();

router.use("/items", itemsRoutes);

module.exports = router;
