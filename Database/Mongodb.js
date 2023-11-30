const mongoDb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const Client = new mongoDb.MongoClient(process.env.DB_URL);

const Collection = Client.db(process.env.DB_NAME).collection(
  process.env.DB_COLLECTION_NAME
);
module.exports = { Client, Collection };
