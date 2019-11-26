const express = require('express')
var github = require('octonode');
const app = express()
const port = 3000
var client = github.client('0846ee93fb36d5243c18e7a3a35e0012df633161');

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

app.set('view engine', 'ejs')

app.listen(port, () => console.log(`Visualisation application listening on port ${port}! Go to http://localhost:3000`))
