const fs = require('fs');

fs.readFile("C:/Users/david/Documents/College Work/Third Year/Software Engineering/visualisation/data/linuxOutput.json", "utf8", (err, data) => { sortContributorsList(data);});


function sortContributorsList(body) {
	var outputJSON = JSON.parse(body);
	
	var contributors_list = outputJSON.contributors_languages;
	contributors_list.sort(function(a,b){ 
    	var x = a.value < b.value? 1:-1; 
    	return x; 
	});
	outputArray(contributors_list);
}


function outputArray(list) {
	var toFile = JSON.stringify(list,null, 4);
	fs.writeFile('linuxOutputSorted.json', toFile, (err) => { 
		// In case of a error throw err. 
		if (err) throw err; 
	}) 
}