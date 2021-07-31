// import { io } from "socket.io-client";
// const socket = io("/socket/socket.io.min.js");
const socket = io();
// const socket = io({
// 	query: {
// 		x: 42,
// 	},
// });
socket.on("connect", () => {
	console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.on("x1", function (e) {
	console.log("x1", e);
	// socket.emit("x2", "timestamp");
});
var dropZone = document.querySelector(".filelist");
var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.multiple = true;
// dropZone.addEventListener("click", function () {
//     fakeInput.click();
// });
fakeInput.addEventListener("change", function () {
	var files = fakeInput.files;
	dropZN(files);
});

function preventDefault(e) {
	e.preventDefault();
	e.stopPropagation();
}
dropZone.addEventListener("dragenter", preventDefault, false);
dropZone.addEventListener("dragleave", preventDefault, false);
dropZone.addEventListener("dragover", preventDefault, false);
dropZone.addEventListener("drop", preventDefault, false);

function holderHandleDrop(e) {
	var dt = e.dataTransfer,
		files = dt.files;
	dropZN(files);
}
dropZone.addEventListener("drop", holderHandleDrop, false);

// import {dropZ} from ('./dropZ')
var elems = [];
function dropZN(ff) {
	var arr = [...ff];
	document.querySelector(".filelist > p").style.opacity = 0;
	document.querySelector(".footer").style.opacity = 1;

	arr.forEach(elem => {
		// console.log(elem.type, elem.name);
		var elemType = elem.type;

		if (elemType.split("/")[0] == "image") {
			const blb = new Blob([elem], {
				type: elem.type,
			});
			const url = URL.createObjectURL(blb);
			var imgElem = new Image();
			imgElem.src = url;
			var props = {};
			imgElem.onload = () => {
				drawImagePlace(imgElem);
			};
			function drawImagePlace(img) {
				var div = document.createElement("div");

				var cnv = makeCanvas(img, 300);
				div.appendChild(cnv);

				div.appendChild(titleMkr(elem.name, "p"));
				img.naturalWidth < img.naturalHeight
					? div.appendChild(titleMkr(`Portrait`, "span"))
					: div.appendChild(titleMkr(`Landscape`, "p"));

				div.appendChild(titleMkr(`Size - ${img.naturalWidth} x ${img.naturalHeight}`, "p"));
				var resArr = [300, 500, 1024, 2048];
				//////////////////////////

				resArr.forEach(e => {
					if (props.imgSize > e) {
						var resx = titleMkr(
							`x${e} - ${(img.naturalWidth / props.imgSize) * e} x ${
								(img.naturalHeight / props.imgSize) * e
							}`,
							"a",
						);
						// resx.href = makeCanvas(img, e).toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
						var link = makeCanvas(img, e).toDataURL("image/png");
						// var link = makeCanvas(img, e);
						resx.href = link;
						var dwnldName = `${elem.name}-x${e}.png`;
						resx.download = dwnldName;

						elems.push({ name: dwnldName, type: elemType, link });
						div.appendChild(resx);
					}
				});
				document.querySelector(".filelist").appendChild(div);
			}
			function makeCanvas(img, size) {
				props.imgSize = Math.max(img.naturalWidth, img.naturalHeight);
				props.ctxW = (img.naturalWidth / props.imgSize) * size;
				props.ctxH = (img.naturalHeight / props.imgSize) * size;
				props.left = (img.naturalWidth - props.imgSize) / 2;
				props.top = (img.naturalHeight - props.imgSize) / 2;
				var cnv = document.createElement("canvas");
				cnv.width = props.ctxW;
				cnv.style.width = `${props.ctxW}px`;
				cnv.height = props.ctxH;
				cnv.style.height = `${props.ctxH}px`;
				var ctx = cnv.getContext("2d");
				ctx.drawImage(img, 0, 0, props.ctxW, props.ctxH);
				return cnv;
			}
		} else if (elemType == "audio") {
		} else if (elemType == "video") {
		}
	});
}

function titleMkr(text, type) {
	var elem;
	switch (type) {
		case "p":
			elem = document.createElement("p");

			break;
		case "a":
			elem = document.createElement("a");

			break;
		case "span":
			elem = document.createElement("span");

			break;

		default:
			break;
	}
	elem.innerText = text;
	return elem;
}

document.querySelector("#upload").addEventListener("click", () => {
	console.log("Upload");
	console.log(elems);
	elems.forEach(el => {
		var data = "data";
		fetch(el.link)
			.then(res => res.blob())
			.then(blob => {
				socket.emit("uploadData", el, blob);
			});
	});
});
