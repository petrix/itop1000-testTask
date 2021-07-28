var express = require("express");
var fs = require("fs");
var path = require("path");
var colour = require("colour");
var http = require("http");
var opener = require('opener');
var https = require("https");

var httpsPORT = process.env.PORT || 4000;
var app = express();

var httpServer = http.createServer(app).listen(httpsPORT, function () {
    console.log("HTTP Server Listener Started:".bold, httpsPORT);
});
// var httpsServer = https.createServer(httpsOptions, app).listen(httpsPORT, function () {
// 	console.log("HTTPS Server Listener Started:".bold, httpsPORT);
// });
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/");
});





opener("http://localhost:" + httpsPORT);

// if (process.argv.length < 4) {
//     console.log('Usage: node s3.js <the bucket name> <the AWS Region to use>\n' +
//       'Example: node s3.js my-test-bucket us-east-2');
//     process.exit(1);
//   }






// opener("npm run lint");
// process.on('SIGINT', function () {
//     // if (err) throw err;
//     console.log("TERMINATED".red, httpsPORT.yellow);
//     process.exit(1);
// })


// if (process.argv.length < 4) {
//     console.log('Usage: node s3.js <the bucket name> <the AWS Region to use>\n' +
//       'Example: node s3.js my-test-bucket us-east-2');
//     process.exit(1);
//   }


var AWS = require('aws-sdk'); // To set the AWS credentials and region.
// var async = require('async'); // To call AWS operations asynchronously.
