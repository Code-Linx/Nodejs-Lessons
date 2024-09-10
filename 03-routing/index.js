const fs = require("fs");
const http = require("http");
const url = require("url");

//Routing Lessson
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("Overview Page");
  } else if (pathName === "/product") {
    res.end("Product Page");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening to request at port 8000");
});
