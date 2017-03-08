var el = document.getElementById("loadAnim"),
    frame = 2,
    speed = 6,
    radius = 1,
    i = 7,
    loaded = false,
    loadTime = 0;

var loadStart = setInterval(
    function(){
        var dot = document.createElement("DIV");
        dot.id = "d"+i;
        dot.className = "dot o"+i;
        el.appendChild(dot);
        i--;
        if (i === -1) {
            clearInterval(loadStart);
        }
    },200
);

var rot = function() {
    setTimeout(function(){
        loadTime += speed;
        if (!loaded || loadTime < 700) {
            radius = radius === 360? 1: radius+frame;
            el.style.transform="rotate(" + radius + "deg)";
            el.style.webkitTransform="rotate(" + radius + "deg)";
            el.style.OTransform="rotate(" + radius + "deg)";
            el.style.MozTransform="rotate(" + radius + "deg)";
            rot();
        } else {
        var parent = el.parentElement;
            addClass(parent, "hide");
        setTimeout(function(){
            document.body.removeChild(parent);
        }, 300);

        }
    },speed);
};
rot();
