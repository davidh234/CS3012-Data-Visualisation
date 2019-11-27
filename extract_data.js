const express = require('express')
var github = require('octonode');
const app = express()
const port = 3000
var client = github.client('d52e6b70754ebc3a1659cca2cc3edb08abc41b6d');

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

var x;

//given the body of a repository stats page, will extract all top contributors repos list from this JSON
function extractContributorRepos(body) {

	for (var i = 0; i < body.length; i++) {
		var repo = body[i].author.repos_url;
		//make call to this repo
		//console.log(repo);
		var name = parseRepoURL(repo);
		//need to get each repo name 

		var user = client.user(name);

		user.repos((errors, body, headers) => {getLanguages(name, body);});
		//= currentRepo.languages(callback);
		//var languages = currentRepo.languages((errors, body, headers) => { });

		//get back "languages_url"

		//make call to that URL
	}
}

//given the full API URL, extract the username
function parseRepoURL(repoURL) {
	var repoArray = repoURL.split("/");
	return repoArray[4];
}

//given a users public repositories, get the languages for each
function getLanguages(name, repoInfo) {
	for (var i = 0; i <repoInfo.length; i++) {
		if(repoInfo[i] !== undefined) {
			//console.log(repoInfo[i].full_name);
			var userRepo = client.repo(repoInfo[i].full_name);
			var languages = userRepo.languages((errors, body, headers) => {printLanguages(body);});
		}
	}
}

//this console log prints the breakdown of languages for each language
function printLanguages(body) {
	console.log(body);
}
