const http = require("http");
const fs = require("fs");

const port = 3000;

http.createServer((req, res) => {
  req.on('error', err => {
    sendError(res, err)  
  })
  res.on('error', err => {
    console.error(err)
  })

  if (req.url === "/products") {
    if (req.method === 'GET') {
      fs.readFile('./data/games.json', (err, data) => {
        if (err) return sendError(res, err.message, 'Error loading games.json');
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
        let newGame;
        try
        {
          newGame = JSON.parse(body);
        } catch(objError) {
          return objError instanceof SyntaxError
            ? sendError(res, objError.name, 'Syntax error', 400)
            : sendError(res, objError.message);
        }

        if (!validate(newGame))
          return sendError(res, 'Invalid data', 'Invalid data', 400);

        fs.readFile('./data/games.json', (err, data) => {
          if (err)
            return sendError(res, err.name, `Error loading available games`);

          let newData;

          // here we know that we will parse file with .json extension and this file exists
          // but data in this file can be broken
          try
          {
            newData = JSON.parse(data);
          }
          catch(objError) {
            return sendError(res, objError.message, 'Error saving games');
          }
          
          newData.push(newGame);

          fs.writeFile('./data/games.json', JSON.stringify(newData), (err) => {
            if (err) return sendError(res, err, 'Error saving games');
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end(`${newGame.displayName} created`);
          });
        });
      });

      req.on("error", (err) => sendError(res, err, err.message))
    }  
  } else return sendError(res, 'Not Found', 'Not Found', 404);
}).listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// simple validation
function validate(obj) {
  if(!obj || !obj.displayName || !obj.price || !obj.rating)
    return false;
  return true;
};

function sendError(res, err, errorMessage = "Server error", status = 500) {
  console.log(err);
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(`${status}: ${errorMessage}`);
}