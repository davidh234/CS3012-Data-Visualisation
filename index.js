const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))
app.get('/test', (req, res) => res.render('test'))

app.listen(port, () => console.log(`visualisation application listening on port ${port}! Go to http://localhost:3000`))