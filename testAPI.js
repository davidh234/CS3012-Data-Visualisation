var github = require('octonode');

var client = github.client();

client.get('/users/davidh234', {}, function (err, status, body, headers) {
  //console.log(body); //json object
});

var ghuser         = client.user('davidh234');
var ghrepo         = client.repo('davidh234/Software-Engineering');

var x = ghrepo.commits(callback);

function callback() { console.log(x); }

var ghsearch = client.search();