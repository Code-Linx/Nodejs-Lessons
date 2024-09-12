const fs = require("fs");
const http = require("http");
const url = require("url");

//biilding very simple api
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page not Found!");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request port 8000");
});
