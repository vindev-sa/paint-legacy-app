const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    req.url === "/" ? res.end(fs.readFileSync(__dirname + "/app.html")) :
        req.url === "/style" ? res.end(fs.readFileSync(__dirname + "/css/index.css")) :
            req.url === "/script" ? res.end(fs.readFileSync(__dirname + "/js/index.js")) :
                res.end("404 Not Found");
}).listen(3000, error => console.log(error || "Server running in http://localhost:3000"));
