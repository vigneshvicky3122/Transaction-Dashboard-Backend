const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const { Client, Collection } = require("./Database/Mongodb");
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/all/products", async function (req, res) {
  try {
    await Client.connect();

    let data = await Collection.find().toArray();

    if (data) {
      res.status(200).send({ tableData: data });
    } else {
      res.status(400).statusMessage("Not Found");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await Client.close();
  }
});
app.get("/products/:month", async function (req, res) {
  try {
    await Client.connect();

    let find = await Collection.find().toArray();
    let data = find.filter((product) => {
      let date = new Date(product.dateOfSale);
      let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(req.params.month);

      if (date.getUTCMonth() == month) {
        return product;
      }
    });
    if (data) {
      res.status(200).send({ tableData: data });
    } else {
      res.status(400).statusMessage("Not Found");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await Client.close();
  }
});

app.listen(PORT, () => console.log(`Server is Running into port ${PORT}`));
