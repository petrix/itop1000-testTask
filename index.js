var express = require("express");
var fs = require("fs");
var path = require("path");
var colour = require("colour");
var opener = require("opener");
var https = require("https");
var http = require("http");
var app = express();
var port = process.env.PORT || 4000;
app.use(express.static("public"));

// app.set("view engine", "ejs");
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/");
});
app.use("/socket", express.static(__dirname + "/node_modules/socket.io/client-dist"));

// app.post("/upload", function (req, res) {
// 	console.log("1", req.body);
// 	var name = "xxx";

// 	res.status(200).send(res);
// });
// const upload = require("./uploadMiddleware");

// app.post("/post", upload.single("image"), async function (req, res) {
// 	const imagePath = path.join(__dirname, "/public/images");
// 	const fileUpload = new Resize(imagePath);
// 	if (!req.file) {
// 		res.status(401).json({ error: "Please provide an image" });
// 	}
// 	const filename = await fileUpload.save(req.file.buffer);
// 	return res.status(200).json({ name: filename });
// });

opener("http://localhost:" + port);

var AWS = require("aws-sdk"); // To set the AWS credentials and region.
// var async = require('async'); // To call AWS operations asynchronously.
// app.listen(port, function () {
// 	console.log("Server is running on PORT", port);
// });
// var secureServer = https.createServer(httpsOptions, app).listen(httpsPORT, function () {
// 	console.log("HTTPS Server Listener Started:".bold, httpsPORT);
// });
var server = http.createServer(app);
server.listen(port, function () {
	console.log("HTTPS Server Listener Started:".bold, port);
});
var io = require("socket.io")(server);
// io.on("connection", socket => {
// 	console.log(socket.handshake);
// });
var firstCh = io;
firstCh.on("connection", function (socket) {
	console.log("connected", socket.id);
	firstCh.emit("x1", new Date().getTime());
	socket.on("uploadData", (e, link) => {
		console.log("uploadData", e.name, e.type, link);
		fs.createWriteStream(__dirname + "/uploads/" + e.name, {
			flags: "a",
		}).write(link);
	});
});
firstCh.on("uploadData", e => {
	console.log("uploadData");
});
// var httpsOptions = {
// 	key: fs.readFileSync("./certs/server-key.pem"),
// 	cert: fs.readFileSync("./certs/server-crt.pem"),
// };
