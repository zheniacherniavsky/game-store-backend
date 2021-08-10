const express = require("express");
const fs = require("fs");
const database = require("./db/database");
const app = express();
const port = 3000;

app.get('/products', (req, res) => {
  fs.readFile("./data/games.json", (err, data) => {
    if(err) return res.status(500).send("Server error")
    
    database.getAllProducts().then(products => {
      res.status(200).json(products);
    }, err => {
      console.log(err);
      res.status(500).send("Server error");
    });
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  database.connect();
});