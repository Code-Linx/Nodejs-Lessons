const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replacetemplate");
const slugify = require("slugify");

//NODE FARM PROJECT

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempOverView = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
console.log(slugify("Fresh Avocado", { lower: true }));

const server = http
  .createServer((req, res) => {
    //console.log(req.url);
    // console.log(url.parse(req.url, true));
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === "/" || pathname === "/overview") {
      res.writeHead(200, { "Content-type": "text/html" });
      const cardHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      // console.log(cardHtml);
      const output = tempOverView.replace("{%PRODUCT_CARDS%}", cardHtml);
      res.end(output);
    } else if (pathname === "/product") {
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      // console.log(query);
      // console.log(pathname);

      const product = dataObj[query.id];
      const output = replaceTemplate(tempProduct, product);
      res.end(output);
    } else if (pathname === "/api") {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>Page not found</h1>");
    }
  })
  .listen(8000, "127.0.0.1", () => {
    console.log(`Listening to requests on port 8000✨✨`);
  });
//SERVER
