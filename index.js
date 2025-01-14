const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/db");
const dotenv = require("dotenv");
const routes = require("./routes/index.routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use("/", routes);

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
