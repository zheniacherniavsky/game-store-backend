const http = require("http");
const fs = require("fs");

const port = 3000;

http.createServer((req, res) => {  
  if (req.url === "/products") {
    if (req.method === 'GET') {
      fs.readFile('./data/games.json', (err, data) => {
        if (err) sendError(res, err, 'Error loading games.json');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }

    if (req.method === 'POST') {
      let body = '';
      req.on("data", chunk => {
        body += chunk;
      });

      req.on("end", () => {
        const newGame = JSON.parse(body);
        if (!validate(newGame))
          return sendError(res, 'Invalid data', 'Invalid data', 400);

        fs.readFile('./data/games.json', (err, data) => {
          if (err) return sendError(res, err, `Error loading available games`); 

          let newData = JSON.parse(data);
          newData.push(newGame);

          fs.writeFile('./data/games.json', JSON.stringify(newData), (err) => {
            if (err) return sendError(res, err, 'Error saving games');
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end(`${newGame.displayName} created`);
          });
        });
      });
    }  
  } else sendError(res, 'Not Found', 'Not Found', 404);
}).listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// simple validation
function validate(obj) {
  if(!obj.displayName || !obj.price || !obj.rating)
    return false;
  return true;
};

function sendError(res, err, errorMessage = "Error", status = 500) {
  console.log(err);
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(`${status}: ${errorMessage}`);
}