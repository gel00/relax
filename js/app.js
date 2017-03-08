window.addEventListener("load", function(){
    loaded = true;
});
function load(url,target) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            target.innerHTML = xhttp.responseText;
            var scripts = target.getElementsByTagName("script");
            for (i=0; i< scripts.length; i++) {
                eval(scripts[i].innerHTML);
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function addClass(el, classN) {
    var hasClass = el.className.search(classN)+1;
    if (hasClass) {
        return true
    } else {
        el.className += el.className ? " "+classN : classN;
    }
}

function removeClass(el, classN) {
  var re = new RegExp("\\s*"+classN, "ig");
    el.className = el.className.replace(re, "");
    if (el.className.length === 0) {
        el.removeAttribute("class");
    }
}
function opening(){
    open = true;
    addClass(body, "open");
    load(contentURL, state0);
    $(state0).load(contentURL);
    addClass(state0, "load");
    state1 = state0;
    state0 = contentClone.cloneNode(false);
    contentBox2.appendChild(state0);
    $(state0).appendTo(contentBox2);
}
function closing(){
    open = false;
    removeClass(body, "open");
    addClass(state1, "drop");
    (function(x){
       var drop = state1;
        window.setTimeout(function(){
            drop.parentElement.removeChild(drop);
        },700);
    })(state1)
}
function paging() {
    addClass(state1, "drop");
    (function(x){
       var drop = state1;
        window.setTimeout(function(){
            drop.parentElement.removeChild(drop);
        },700);
    })(state1)
    load(contentURL, state0);
    addClass(state0, "load");
    state1 = state0;
    state0 = contentClone.cloneNode(false);
    contentBox2.appendChild(state0);

}

function routing(e) {
    var hash = window.location.hash;
    hash = hash || "#";
    if (hash !== activeLink.el.getAttribute("href")) {
        var link,
            linkHash,
            opener;
        for (var i=0; i < links.length; i++) {
                if (i === activeLink.i) {
                    continue;
            } else {
                link = links.item(i);
                linkHash = link.getAttribute("href");
                if (linkHash === hash) {
                    removeClass(activeLink.el, "active");
                    activeLink.el = link;
                    activeLink.i = i;
                    addClass(activeLink.el, "active");
                    break;
                }
            }
        }
        hash = hash.slice(1);
        opener = hash? true:false;
        if (opener) {
            contentURL = "content/"+hash+".html";
            if (!open) {        //opening
                opening();
            } else {            //paging
                paging();
            }
        } else {            //closing
            closing();
        }
    }



}

var contentURL = null;
var body = document.body;
var nav = document.getElementById("nav");
var slider= document.getElementById("slider")
var contentBox2 = document.getElementById("content2");
var content = contentBox2.getElementsByClassName("content").item(0);
var contentClone = content.cloneNode(false);
var state0 = content;
var state1 = null;

var open = false;
var links = nav.getElementsByTagName("a");

var activeLink = {
    i: 0 ,
    el : links.item(0)
};
var currentURL = location.hash;


document.getElementById("date").innerHTML = new Date().getFullYear();
window.addEventListener("hashchange", routing ,false);
window.addEventListener("load", routing,false);
