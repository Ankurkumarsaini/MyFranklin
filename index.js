const express = require('express')
// will use this later to send requests
const http = require('http')
const https = require('https')
// import env variables
require('dotenv').config()

var indexRouter = require('./routes/index');
var ideasRouter = require('./routes/ideas');
var gcpTasksRouter = require('./routes/gcpTasks');
var demoRouter = require('./routes/demo');

const app = express()
const port = process.env.PORT || 8200


//app.engine('html', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
app.get('/', (req, res) => {
	res.status(200).send('Server is working.')
})
*/

app.use('/', indexRouter);
app.use('/ideas', ideasRouter);
app.use('/gcptasks', gcpTasksRouter);
app.use('/demo',demoRouter);

app.listen(port, () => {
	console.log(`🌏 Server is running at http://localhost:${port}`)
})
