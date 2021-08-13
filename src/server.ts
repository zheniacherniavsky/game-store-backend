import express from "express"
import database from "./db";
const app = express();
const port = 3000;

database.connect();

app.get('/products', async (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  database.init();
});