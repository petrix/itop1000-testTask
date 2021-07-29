// import { dropZ } from ('./dropZ');
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

function dropZN(ff) {
    var arr = [...ff];
    console.log(arr)
    arr.forEach(elem => {

        const blb = new Blob([elem], {
            type: elem.type
        });
        const url = URL.createObjectURL(blb);
        var ctxWidth = 150;
        var ctxHeight = 150;
        var imgElem = new Image();
        imgElem.src = url;
        imgElem.onload = (img) => {
            console.log(img)
            var props = {}
            props.imgSize = Math.max(imgElem.naturalWidth, imgElem.naturalHeight)

            props.ctxW = (imgElem.naturalWidth / props.imgSize) * 256
            props.ctxH = (imgElem.naturalHeight / props.imgSize) * 256
            props.left = (imgElem.naturalWidth - props.imgSize) / 2;
            props.top = (imgElem.naturalHeight - props.imgSize) / 2;

            var cnv = document.createElement('canvas')
            cnv.width = props.ctxW;
            cnv.style.width = `${props.ctxW}px`
            cnv.height = props.ctxH;
            cnv.style.height = `${props.ctxH}px`
            var ctx = cnv.getContext('2d')

            ctx.drawImage(imgElem, 0, 0, props.ctxW, props.ctxH);
            console.log(elem.name, elem.type, elem.size, imgElem.naturalWidth, imgElem.naturalHeight);
            var div = document.createElement('div')
            div.appendChild(cnv)
            // var titleName = document.createElement('p')
            // titleName.innerText = elem.name;
            div.appendChild(titleMkr(elem.name, 'p'));
            imgElem.naturalWidth < imgElem.naturalHeight ? div.appendChild(titleMkr(`Portrait`, 'span')) : div.appendChild(titleMkr(`Landscape`, 'p'));


            div.appendChild(titleMkr(`Size - ${imgElem.naturalWidth} x ${imgElem.naturalHeight}`, 'p'));
            var resx256 = titleMkr(`x256 - ${(imgElem.naturalWidth/props.imgSize)*256} x ${(imgElem.naturalHeight/props.imgSize)*256}`, 'p')
            resx256.onclick = function () {
console.log('256')
            }
            div.appendChild(resx256);
            div.appendChild(titleMkr(`x512 - ${(imgElem.naturalWidth/props.imgSize)*512} x ${(imgElem.naturalHeight/props.imgSize)*512}`, 'p'));
            div.appendChild(titleMkr(`x2K - ${(imgElem.naturalWidth/props.imgSize)*2048} x ${(imgElem.naturalHeight/props.imgSize)*2048}`, 'p'));


            // var titleMetadata = document.createElement('span')
            // titleMetadata.innerText = `Size - ${imgElem.naturalWidth} x ${imgElem.naturalHeight}`
            // // var dwnld360 = resizeImage(ctx)
            // div.appendChild(titleMetadata)
            document.querySelector('.filelist').appendChild(div);





        }
        // imgElem.style.backgroundImage = `url(${url})`;



    });
}



function titleMkr(text, type) {
    var elem;
    switch (type) {
        case 'p':
            elem = document.createElement('p');

            break;
        case 'span':
            elem = document.createElement('span');

            break;

        default:
            break;
    }
    elem.innerText = text
    return elem;
}