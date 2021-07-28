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
        imgElem.onload = () => {
            var props = {}
            props.imgSize = Math.max(imgElem.naturalWidth, imgElem.naturalHeight)
            props.left = (imgElem.naturalWidth - props.imgSize) / 2;
            props.top = (imgElem.naturalHeight - props.imgSize) / 2;
            // props.scale = props.imgSize / ctxWidth>ctxHeight?ctxWidth:ctxHeight;
            props.scale = props.imgSize / ctxWidth
            // props.scale = Math.min(imgElem.naturalWidth / ctxWidth, imgElem.naturalHeight / ctxHeight);
            // var ratio = Math.min(imgElem.naturalWidth,imgElem.naturalHeight)
            var cnv = document.createElement('canvas')
            cnv.width = ctxWidth;
            cnv.style.width = `${ctxWidth}px`
            cnv.height =  ctxHeight;
            cnv.style.height = `${ctxHeight}px`
            var ctx = cnv.getContext('2d')
            // cnv.style.width = maxWidth;
            // cnv.style.height = maxHeight;
            ctx.translate(ctxWidth / 2, ctxHeight / 2);
            ctx.drawImage(imgElem,
                -(ctxWidth / 2 + props.left / props.scale),
                -(ctxHeight / 2 + props.top / props.scale),
                ctxWidth + (props.left / props.scale) * 2,
                ctxHeight + (props.top / props.scale) * 2);
            console.log(elem.name, elem.type, elem.size, imgElem.naturalWidth, imgElem.naturalHeight, props.scale);
            var div = document.createElement('div')
            div.appendChild(cnv)
            // var titleName = document.createElement('p')
            // titleName.innerText = elem.name;
            div.appendChild(titleMkr(elem.name,'p'));
            imgElem.naturalWidth<imgElem.naturalHeight?div.appendChild(titleMkr(`Portrait`,'span')):div.appendChild(titleMkr(`Landscape`,'p'));

           
            div.appendChild(titleMkr(`Size - ${imgElem.naturalWidth} x ${imgElem.naturalHeight}`,'p'));
            var resx256 = titleMkr(`x256 - ${(imgElem.naturalWidth/props.imgSize)*256} x ${(imgElem.naturalHeight/props.imgSize)*256}`,'p')
            resx256.onclick = function(){
                
            }
            div.appendChild(resx256);
            div.appendChild(titleMkr(`x512 - ${(imgElem.naturalWidth/props.imgSize)*512} x ${(imgElem.naturalHeight/props.imgSize)*512}`,'p'));
            div.appendChild(titleMkr(`x2K - ${(imgElem.naturalWidth/props.imgSize)*2048} x ${(imgElem.naturalHeight/props.imgSize)*2048}`,'p'));

           
            // var titleMetadata = document.createElement('span')
            // titleMetadata.innerText = `Size - ${imgElem.naturalWidth} x ${imgElem.naturalHeight}`
            // // var dwnld360 = resizeImage(ctx)
            // div.appendChild(titleMetadata)
            document.querySelector('.filelist').appendChild(div);





        }
        // imgElem.style.backgroundImage = `url(${url})`;



    });
}



            function titleMkr  (text, type){
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