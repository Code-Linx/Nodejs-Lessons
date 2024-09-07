const fs = require("fs");
//FILE

//blocking, synchrnous;
const textIn = fs.readFileSync("./txt/input.txt", "UTF8");
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}. created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut, `utf-8`);
console.log("File created");

//non blocking asynchronous
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      //   const finalText = "File written";
      //  fs.writeFile("./txt/final.txt", finalText, "utf-8", (err) => {
      //     console.log("file written");
      //   }) ;
      fs.writeFile(
        "./txt/final.txt",
        `${data2} and ${data3}`,
        `utf-8`,
        (err) => {
          console.log(`File written`);
        }
      );
    });
  });
});
//FILE
