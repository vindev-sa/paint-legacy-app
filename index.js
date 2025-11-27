const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    fs.readFile(__dirname + "/app.html");
}).listen(3000, error => console.log(error || "Server running in http://localhost:3000"));
