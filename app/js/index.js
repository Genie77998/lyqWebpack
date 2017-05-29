import _ from 'lodash';
import { m1 } from './mm';
require('../css/app.css');
require('../sass/common.scss');
console.log("11111"); 
// debugger
function content(){
	var el=document.createElement('div');
	el.className = "iconfont icon-jia";
	el.innerHTML = _.join(['Hello','webpack'], ' ');
	return el;
}

document.body.appendChild(content());
