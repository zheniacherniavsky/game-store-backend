const http = require("http");
const fs = require("fs")

http.createServer((req, res) => {  

  if (req.method === "GET") {
    fs.readFile("./data/games.json", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading data.json");
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(data);
    })
  }
  
}).listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
});