const bodyParser = require('body-parser');
const express = require('express');
const jiraRouter = express();



jiraRouter.get('/', (req, res) => {
    // Basic index to verify app is serving
    res.send('Hello, World!').end();
});

module.exports = jiraRouter;
