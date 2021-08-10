const express = require("express");
const fs = require("fs");
const database = require("./db/database");
const app = express();
const port = 3000;

app.get('/products', (req, res) => {
  fs.readFile("./data/games.json", (err, data) => {
    if(err) return res.status(500).send("Server error")
    
    try
    {
    data = JSON.parse(data);
    } catch(objError) {
      console.error(objError.message);
      return res.status(500).send('Server error');
    }

    res.status(200).json(data);
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  database.connect();
});