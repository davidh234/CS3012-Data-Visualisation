# CS3012-Data-Visualisation

Using NodeJS to run the project. Currently just accessing the Github API getting back a JSON response for all commits on a different project.

run using 'node testAPI.js' with nodeJS.  


makes use of Node.js, Express, EJS and D3.js


TODO:
1. select large repos:
	1) https://github.com/torvalds/linux
	2) https://github.com/facebook/react
	3) https://github.com/tensorflow/tensorflow
	4) https://github.com/twbs/bootstrap
	5) https://github.com/vuejs/vue
	6) https://github.com/d3/d3
	7) https://github.com/microsoft/vscode
	8) https://github.com/electron/electron
	9) https://github.com/golang/go
   10) https://github.com/nodejs/node

2. Gather top commitors data (curl https://api.github.com/repos/:user/:repo/stats/contributors -o file.json )
3. Extract users repos ( "author": { ... "repos_url" : } )
4. go to languages for each repo ( in repos in step 3., "languages_url": ...)
5. Get stats and visualise 
	5a. Both # of languages p/person
	5b. Most common language vs. largest language used on main project (language specialists working on these repos?)
	5c. 5b on a per language basis, which have more variety vs which requires specialists.


note: The value shown for each language is the number of bytes of code written in that language.
