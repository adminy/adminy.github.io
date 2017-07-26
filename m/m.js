/* M Programming Language Goals
  @ Make something simple to use
  @ Take Syntax simplicity From Python
  @ Simplify Javascript Long Naming Syntax
  @ Make It As Preformant as possible hiding away the ugly of the code
  @ Use As Little Syntax as Possible (mini)
  @ Not Just Dom Tools But Also JS Tools and CSS tools && as much py
*/
//dom
  $=function(id){return document.getElementById(id)}
  all=function(name){return document.getElementsByTagName(name)}
  is=function(id){return typeof($(id)) != 'undefined' && $(id) !== null}
  rm=function(id){if(is(id)){return $(id).parentNode.removeChild($(id))}} 
  dir=function(id){return $(id).parentNode.childNodes}
//js
  numeric=function(n) {return !isNaN(parseFloat(n)) && isFinite(n)}
  float=function(x) {return parseFloat(x)}
  int=function(x) {return parseInt(x)}
  max=function(a,b) {return a<b?b:a}
  min=function(a,b) {return a<b?a:b}
//css
  show=function(element){element.style.display=''}
  hide=function(element){element.style.display='none'}



//click listener & other Ideas To add later
//var $_click = function(id, callback) { if($is(id)) $(id).addEventListener('click', callback , false); }
//var $_enter = function(id, callback) { if($is(id)){$(id).onkeypress = function(e) { var event = e || window.event; var charCode = event.which || event.keyCode; if(charCode=='13') { callback(); return false; } } } }
