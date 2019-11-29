const express = require('express');
var github = require('octonode');
const fs = require('fs');
const app = express();
const port = 3000;
var client = github.client('d52e6b70754ebc3a1659cca2cc3edb08abc41b6d');


var languagesArray = {repository_languages:[],contributors_languages:[]}; //JSON written to file 'output.json'
var tmpContributorsLanguageJSON = {contributors_languages:[]};


//---------------------------------------------------

//Rate Limiting monitor

client.limit(function (err, left, max, reset) {
  console.log(left); // 4999
  console.log(max);  // 5000
  console.log(reset);  // 1372700873 (UTC epoch seconds)
});

//---------------------------------------------------


var linuxRepo = client.repo('torvalds/linux');
var reactRepo = client.repo('facebook/react');
var goRepo = client.repo('golang/go');
var nodeRepo = client.repo('nodejs/node');
var vscodeRepo = client.repo('microsoft/vscode');


getMainRepoLanguages();
vscodeRepo.contributorsStats((errors, body, headers) => extractContributorRepos(body));


function getMainRepoLanguages() {
	vscodeRepo.languages((errors, body, headers) => {addMainRepoLanguages(body);});
}

function addMainRepoLanguages(body) {
	if (body !== undefined) {
		for (var key in body) {
    		languagesArray.repository_languages.push({language:key, value:body[key]});
		}
	}
}

//given the body of a repository stats page, will extract all top contributors repos list from this JSON
function extractContributorRepos(body) {
	for (var i = 0; i < body.length; i++) {
		var repo = body[i].author.repos_url;                                       
		var name = parseRepoURL(repo);
		var user = client.user(name);
		user.repos((errors, body, headers) => {getLanguages(name, body);});
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
			userRepo.languages((errors, body, headers) => {languagesArray = addContributorLanguages(body);});
		}
	}
}

//this console log prints the breakdown of languages for each language
function addContributorLanguages(body) {
	if (body !== undefined) {
		for (var key in body) {
    		tmpContributorsLanguageJSON.contributors_languages.push({language:key, value:body[key]});
		}
		var output = mergeSameKeysinJSON();
		if (output !== undefined) {
			for(var i =0; i < languagesArray.contributors_languages.length; i++) {
				 languagesArray.contributors_languages.splice(i); 
			}
			for (var key in output) {
	    		languagesArray.contributors_languages.push({language:key, value:output[key]});
			}
			outputArray();
		}
	}
	return languagesArray;
}

//when adding multiple users to the contributors list in JSON we need to merge overlap
function mergeSameKeysinJSON() {
	var newObj = {};
	for(i in tmpContributorsLanguageJSON.contributors_languages){
	 var item = tmpContributorsLanguageJSON.contributors_languages[i];
	    if(newObj[item.language] === undefined){
	        newObj[item.language] = 0;
	    }
	    newObj[item.language] += item.value;
	}
	return newObj;
}


function outputArray() {
	var toFile = JSON.stringify(languagesArray,null, 4);
	console.log(toFile);
	fs.writeFile('vscodeOutput.json', toFile, (err) => { 
		// In case of a error throw err. 
		if (err) throw err; 
	}) 
}
