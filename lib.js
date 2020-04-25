
const parser = require('node-html-parser');

function parsJoyReact(body) {
  var par = parser.parse(body).querySelector('.image');
  var resp = '';
  if (par.childNodes[1] != '') {
    var i = 0;
    if (par.childNodes[0].nodeType == 1 ) {  i = 0;  } else {i = 1;}
    var src = '';
    switch (par.childNodes[i].tagName) {
      case 'a':
        //console.log('a');
        src = par.childNodes[i].rawAttrs;
        //console.log("Ссылка: " + src.split('"'))
        break;
      case 'img':
      //console.log('img');
        src = par.childNodes[i].rawAttrs;
        //console.log("Ссылка: " + src.split('"'))
        break;
      case 'span':
      //  console.log('span');
        src = par.childNodes[i].rawAttrs;
      //  console.log("Ссылка: " + src.split('"'))
        break
      case 'iframe':
      //  console.log('span');
        src = par.childNodes[i].rawAttrs;
        //console.log("Ссылка: " + src.split('"'))
        break
      default:
    }
    var link = src.split('"')
    if (link[0] == 'href=' || link[0] == 'src=') {
      //console.log("[LINK] " + link[1]); Отправка картинки
      resp  = link[1];
    } else {
      console.log(src.split('"'));
      resp  = "мемес сломанный Т_Т "
    }
   }
   return resp;
}


module.exports.parsJoyReact = parsJoyReact;
