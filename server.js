const express = require("express");
const database = require("./db/database");
const app = express();
const port = 3000;

database.connect();

app.get('/products', async (req, res) => {
  const products = await database.products.getAll();
  if(products != null) {
    res.status(200).json(products);
  } else {
    res.status(404).send("No products found");
  } 
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  database.init();
});