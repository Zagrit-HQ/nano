const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (_, response) => {
  console.log("GET / 200");
  response.json({ endpoints: ["GET /health", "POST /hello", "GET /foo", "GET /echo"] });
});
app.get("/ready", (_, response) => {
  console.log("GET /health 200");
  response.json({ status: "pass" });
});
app.get("/foo", (_, result) => {
  console.log("GET /foo 200");
  result.json({ message: "baz: <value>sSVxV2bf8vtuJZY</value>" });
});
app.get("/echo", (request, response) => {
  console.log("GET /echo 200");
  response.json({ query: request.query });
});
app.post("/hello", (request, response) => {
  console.log("POST /hello 200");
  response.json({ message: `hello, ${request.body.name}` });
});

module.exports = {
  server: http.createServer(app),
};
