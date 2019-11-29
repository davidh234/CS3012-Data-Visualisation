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

app.get('/', (req, res) => res.render('index'));

/*
	All API data stored in /data/<file>.json
*/
app.get('/api/linux', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/data/linuxOutput.json"));
app.get('/api/react', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/data/reactOutput.json"));
app.get('/api/go', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/data/goOutput.json"));
app.get('/api/node', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/data/nodeOutput.json"));
app.get('/api/vscode', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/data/vscodeOutput.json"));


/*
	All barcharts stored at /charts/<file>.html 
*/
app.get('/linux', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/charts/linuxChart.html"));
app.get('/react', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/charts/reactChart.html"));
app.get('/go', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/charts/goChart.html"));
app.get('/node', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/charts/nodeChart.html"));
app.get('/vscode', (req, res) => res.sendFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/charts/vscodeChart.html"));


app.listen(port, () => console.log(`Visualisation application listening on port ${port}! Go to http://localhost:3000`))
