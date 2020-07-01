//const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
//const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const favicon = require('serve-favicon');
const http = require('http');

// set up server
var app = express();
// app.use(favicon(path.join(__dirname, 'imgs', 'favicon.ico'))); -- uncomment this line if u have a favicon for your site
app.use(express.static(__dirname + './public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');
const options = {};
var PORT = 5000;

var mode = 'prod';
if (process.argv.length < 3) mode = 'prod';
if (process.argv[2] != 'prod' & process.argv[2] != 'dev') {
    console.error('Wrong mode - only dev or prod is accepted!');
    return;
};
mode = process.argv[2];
if (mode == 'prod') {
    compiler = webpack(prodConfig);
    PORT = 80;
}
else compiler = webpack(devConfig);

const server = new http.Server(app);
const io = require('socket.io')(server);

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
});
app.use(
    middleware(compiler, options)
);
app.use(require('webpack-hot-middleware')(compiler));

// setup backend data for servicese

/** 
* setup postgres for backend data services
*/
const dbConfig = require('./configs/db-config.js');
const {Pool, Client} = require('pg');
const pool = new Pool(dbConfig);
const client = new Client(dbConfig);
client.connect();

// websocket communication handlers
var count = 0
io.on('connection', function(socket){
    count ++;
    console.log(`${count}th user connected with id: ${socket.id}`);
    socket.on('disconnect', function(){
        count --;
        console.log(`1 user disconnected, rest ${count}`);
    });
    
});

// normal routes with POST/GET 
app.get('*', (req, res, next) => {
    var filename = path.join(compiler.outputPath,'index');
    
    compiler.outputFileSystem.readFile(filename, async (err, data) => {
        if (err) {
            return next(err);
        }
        res.set('content-type','text/html');
        res.send(data);
        res.end();
    });
});

app.post('/post-questions', (req, res) => {
    
    let query = `
        select id from qsoc_questions 
        where valid != 1
        and id <= $1
        order by id desc
        limit $2
    `
    let values = [req.body.startID, req.body.limit]
    if (req.body.startID == 0) {
        console.log(req.body)
        query = `
            select id from qsoc_questions 
            where valid != 1
            order by id desc
            limit $1
        `
        values = [req.body.limit]
    }
    client.query(query, values, (err, response) => {
        if (err) {
            res.json({status: 1, err: err.stack});
        } else {
            res.json({status: 0, questions: response.rows});
        }
    })
})

app.post('/post-question', (req, res) => {
    const query = `
        select * from qsoc_questions 
        where id=$1
        order by date desc
    `
    const values = [req.body.qid]
    client.query(query, values, (err, response) => {
        if (err) {
            res.json({status: 1, err: err.stack});
        } else {
            if (response.rows.length <= 0) 
                res.json({status: 1, err: 'no question matching that id'});
            else
                res.json({status: 0, question: response.rows[0]});
        }
    })
})

app.post('/post-answers', (req, res) => {
    const query = `
        select id from qsoc_answers 
        where qid=$1
        order by date desc
    `
    const values = [req.body.qid]
    client.query(query, values, (err, response) => {
        if (err) {
            res.json({status: 1, err: err.stack});
        } else {
            res.json({status: 0, answers: response.rows});
        }
    })
})

app.post('/post-answer', (req, res) => {
    const query = `
        select * from qsoc_answers 
        where id=$1
        order by date desc
    `
    const values = [req.body.aid]
    client.query(query, values, (err, response) => {
        if (err) {
            res.json({status: 1, err: err.stack});
        } else {
            if (response.rows.length <= 0) 
                res.json({status: 1, err: 'no answer matching that id'});
            else
                res.json({status: 0, answer: response.rows[0]});
        }
    })
})

app.post('/send-answer', (req, res) => {
    // To re-write
    const query = `
        update
    `
    const values = [req.body.qid]
    client.query(query, values, (err, response) => {
        if (err) {
            res.json({status: 1, err: err.stack});
        } else {
            res.json({status: 0, answers: response.rows});
        }
    })
})


// on terminating the process
process.on('SIGINT', _ => {
    console.log('now you quit!');
    process.exit();
})