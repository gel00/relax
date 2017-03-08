var App = function(){};
App.prototype.addClass = function(classN) {
    var hasClass = this.elem.className.search(classN)+1;
    if (hasClass) {
        return this.elem;
    } else {
		this.elem.className += this.elem.className ? " "+classN : classN;
    }
}
var Link = function(elem, url){
    this.elem = elem;
    this.url = url;
};
Link.prototype = Object.create(App.prototype);

var open = false;

var nav = document.getElementById("menu2");
nav.addEventListener("click",route,false);

function route(e){
    var target = e.target;
    if (target.tagName === "A") {
        var targetURL = target.getAttribute("href");
        var current = new Link(target, targetURL);
        current.addClass("active");
    }
    e.stopPropagation();
}
