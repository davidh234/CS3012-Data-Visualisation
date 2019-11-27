const express = require('express')
var github = require('octonode');
const app = express()
const port = 3000
var client = github.client('b24c740b99170487d41248539a4f69b014fb6266');

var linuxRepo = client.repo('torvalds/linux');
//var reactRepo = client.repo('facebook/react');
//var tensorflowRepo = client.repo('tensorflow/tensorflow');
//var bootstrapRepo = client.repo('twbs/bootstrap');
//var vueRepo = client.repo('vuejs/vue');
//var d3Repo = client.repo('d3/d3');
//var vscodeRepo = client.repo('microsoft/vscode');
//var electronRepo = client.repo('electron/electron');
//var goRepo = client.repo('golang/go');
//var nodeRepo = client.repo('nodejs/node');

app.get('/', (req, res) => res.render('index'))
app.get('/linux', (req, res) => { linuxRepo.contributorsStats((errors, body, headers) => res.send(body)) });

linuxRepo.contributorsStats((errors, body, headers) => extractContributorRepos(body));


//given the body of a repository stats page, will extract all top contributors repos list from this JSON
function extractContributorRepos(body) {

	for (var i = 0; i < body.length; i++) {
		console.log(body[i].author.repos_url);
		//var jsonData = JSON.parse(body[i]);
    	//var author = jsonData.author;
    	//console.log(author);
	}
}

app.set('view engine', 'ejs')

app.listen(port, () => console.log(`Visualisation application listening on port ${port}! Go to http://localhost:3000`))
