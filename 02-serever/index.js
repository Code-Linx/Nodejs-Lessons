const http = require("http");
//SERVER
const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("Hello From The Server");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request port 8000");
});
