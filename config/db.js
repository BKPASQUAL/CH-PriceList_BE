const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;

let dbClient;
let usersCollection;
let itemCollection;

async function connectToDatabase() {
  try {
    dbClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await dbClient.connect();
    const chDB = dbClient.db("Champika-Hardware");
    usersCollection = chDB.collection("users");
    itemCollection = chDB.collection("items");

    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

function getUsersCollection() {
  return usersCollection;
}

function getItemsCollection() {
  return itemCollection;
}

module.exports = {
  connectToDatabase,
  getUsersCollection,
  getItemsCollection 
};
