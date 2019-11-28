const express = require('express');
var github = require('octonode');
const fs = require('fs');
const app = express();
const port = 3000;
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

client.limit(function (err, left, max, reset) {
  console.log(left); // 4999
  console.log(max);  // 5000
  console.log(reset);  // 1372700873 (UTC epoch seconds)
});


//given the body of a repository stats page, will extract all top contributors repos list from this JSON
function extractContributorRepos(body) {
	//for (var i = 0; i < body.length; i++) {
		var repo = body[2].author.repos_url;
		var name = parseRepoURL(repo);
		var user = client.user(name);
		user.repos((errors, body, headers) => {getLanguages(name, body);});
	//}
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
			console.log(repoInfo[i].full_name);
			var userRepo = client.repo(repoInfo[i].full_name);
			var languages = userRepo.languages((errors, body, headers) => {printLanguages(body);});
			outputArray();
		}
	}
}

var languagesArray = {repository_languages:[],contributors_languages:[]};
//this console log prints the breakdown of languages for each language
function printLanguages(body) {
	if (body !== undefined) {
		for (var key in body) {
    		console.log("Key: " + key);
    		console.log("Value: " + body[key]);
    		languagesArray.contributors_languages.push({language:key, value:body[key]});
		}
		outputArray();
	}
}

function outputArray() {
	var toFile = JSON.stringify(languagesArray,null, 4);
	fs.writeFile('Output.json', toFile, (err) => { 
		// In case of a error throw err. 
		if (err) throw err; 
	}) 
}
