// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const rp = require('request-promise');

const app = express();

require('dotenv').config()
const mavenKey = process.env.MAVENKEY;



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


app.get('/getErrors/:conv/:acc', (req, res) => {

    const conversationId = req.params.conv;
    const account = req.params.acc;

    console.log("Got request " + conversationId)
    console.log(JSON.stringify(req.params) + " Full Request") 


  
const URL = "https://z1.context.liveperson.net/v1/account/"+ account +"/agentErrors/"+ conversationId +"/properties";

    /**
     * arguments: String array of command arguments.
     * conversationId: The ID of the conversation in which the command was called.
     */

             console.info("CALLING API : " + URL);

        var options = {
            method: 'GET',
            uri: URL,
            headers:{
              'Content-Type': 'application/json',
              'maven-api-key':mavenKey
            }
        };
        
        rp(options)
            .then(function (parsedBody) {
                console.log(parsedBody)
                res.status(200).send(parsedBody);

            })
            .catch(function (err) {
                res.status(500).send(err)
            });

        });
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));