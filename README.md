# CS3012-Data-Visualisation
Student ID: 17328486

For the initial API access see 'testAPI.js'.

makes use of Node.js, Express, EJS and D3.js

## The Concept for this project

For this project, I was interested in seeing if there was a correlation between the languages involved in a large repository such as linux, and the languages that the contributors to the repository used in their other projects. For example, what languages would contributors to Linux use in their other projects stored on github?

This idea was attempting to see if certain languages favour 'specialists' (programmers who mainly develop with one language) versus 'generalists' (programmers who use a wide variety of languages).

## Gathering the data

For this project I selected five repositories:

1) Linux  
2) React  
3) Node.js  
4) Go  
5) VS code

### I first used the extract_data.js file to gather the data below:

Within each repository, it is possible using the Github API to find the breakdown of languages in the repository. I gathered the language breakdown of each of the five. The value for each language is 'bytes of code written in that language', according to the Github API documentation.

For example, Linux language breakdown is found at: https://api.github.com/repos/torvalds/linux/languages

Then, I looked at the contributors to each repository, and iterated through their public repositories, performing the same type of analysis by gathering the languages of each of their projects.

One challenging aspect of this was that I needed to merge the data as it was coming in as the JSON would happily store the same key twice and so there was duplicate keys and the values were distributed. To get around this I would put the JSON into a new object and as I'm inserting the keys, check if the key already exists. This solved the problem.

### I then sorted the data 
I used sort_data.js to generate sorted lists of languages. This allowed me to truncate the less valuable data as some languages were in the dataset and might only contain a few bytes of information. This would be unhelpful in the visualisation as it would mean there was in some cases over a hundred languages on the charts, which made them unreadable.

## Visualising the data

I used a bar chart form of visualisation to show how the 'main' repository measured to the contributors repositories. By sorting the values you can immediately compare the two and get a good sense of how the languages are broken down in both.

The bar chart approach is in my opinion a very good way of comparing the two as you get an immediate sense of how the languages are distributed across the two data sets.

The bar chart was implemented using D3.js, which allowed me to draw axes and also the bars for the barchart. The implementatio of the visualisation was relatively straightforward. You simply scale the values to the height and width specified to keep the data within the axes.

The bar chart I made is interactive in that if you hover over a bar it will change colour, which aids in readibility and also makes the graph overall feel much more responsive.

## D3 and JSON

In order for D3 to be able to read in json from an external source it must be hosted (ie. cannot be a local file on the machine). Therefore, I hosted all the JSON files on the node.js server. The implication of this is that the node.JS server must be running to see the visualisation. The JSON files can be used by visiting http://localhost:3000/api/<repo> where repo is the name of the repository such as 'linux'.

## Where I visualised the data

The data is visualised on a localhost webserver using node.js. By cloning the repository, the webserver can be started by navigating to the /src/ folder and running 'node index.js'. 

It is important to note that many filepaths are hardcoded and would need to be modified for the website to work correctly on a different machine.

## My findings

I was surprised to find such a strong correlation between both the distribution of languages and also the languages themselves within the main repository, and the language breakdown of the contributors. It is not surprising that the language of choice of the contributors would be the same language as the primary language of the repository, but there is a stronger correlation between the two than I anticipated.

Interestingly, Linux appears to be best suited to 'C' specialists:

![C results](https://github.com/davidh234/CS3012-Data-Visualisation/blob/master/src/views/images/results-linux.PNG)

React also seems to be best suited to specialists, this time in javascript:

![React results](https://github.com/davidh234/CS3012-Data-Visualisation/blob/master/src/views/images/results-react.PNG)

Node.js appears to be the most distributed of the five, which is reflected in the contributors repositories and therefore is suited more to 'generalists':

![Node.js results](https://github.com/davidh234/CS3012-Data-Visualisation/blob/master/src/views/images/results-nodejs.PNG)

Go is interesting because the language of choice for the contributors is actually C, not Go. This makes sense since Go is quite similar to C and was heavily influenced by C's design choices:

![Go results](https://github.com/davidh234/CS3012-Data-Visualisation/blob/master/src/views/images/results-go.PNG)

Another interesting result is VS Code, which shows that contributors most use C#, despite it not being in the top languages used in the repository itself. Given C# is a Windows language and VS Code is built by Microsoft this isn't that surprising:

![VS Code results](https://github.com/davidh234/CS3012-Data-Visualisation/blob/master/src/views/images/results-vscode.PNG)


## Conclusion

I found the results of this assignment to be quite interesting and thought that the project offered an interesting insight into how contributors vary from the languages they use in the 'larger' repositories. 