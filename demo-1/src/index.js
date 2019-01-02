
import './css/index.css';
import imgSrc from './images/AllianceLogo.png';
import './less/a.less';
import * as aJs from './js/a.js';

console.log(aJs.a, aJs.b);
console.log(`It's write in new string grammar :${aJs.a - aJs.b};
                here it is!`);

var root = document.getElementById('root');
root.textContent = 'here is index.js!';

var oImg = new Image();

oImg.src = imgSrc;

oImg.onload = function(){
    document.body.appendChild(oImg)
}
