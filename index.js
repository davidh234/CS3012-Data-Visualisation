const express = require('express')
var github = require('octonode');
const app = express()
const port = 3000
var client = github.client();

var ghrepo = client.repo('davidh234/Software-Engineering');

var repoInfo = ghrepo.commits(callback);

function callback() {
	var ResponseBody;
	client.get('/users/davidh234', {}, function (err, status, body, headers) { ResponseBody = body; });
 	app.get('/test', (req, res) => res.json(ResponseBody));
}

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))

app.listen(port, () => console.log(`Visualisation application listening on port ${port}! Go to http://localhost:3000`))
