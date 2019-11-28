const express = require('express')
var github = require('octonode');
const app = express()
const port = 3000
var client = github.client('b24c740b99170487d41248539a4f69b014fb6266');

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);

app.use(express.static('data'));

app.set('view engine', 'ejs');

const fs = require('fs');

var JSONdata;

fs.readFile('Output.json', "utf8", (err, data) => { JSONdata = data; console.log(JSONdata)});

app.get('/', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/Output.json"));


app.listen(port, () => console.log(`Visualisation application listening on port ${port}! Go to http://localhost:3000`))
