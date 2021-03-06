$(document).ready(init);
var pause = false;

function init() {
    var socket = new io.Socket();
    socket.connect();
    socket.on("message", function(data){
        if (pause) return;
        var msg = jQuery.parseJSON(data);
        var i = $("<img>").attr({src: "/images/" + msg.lang + ".png"});
        var a = $("<a>").attr({href: msg.url, title: msg.comment, target: '_new'}).text(msg.page);
        var d = $("<div>").attr({"class": "update " + msg.flag})
                .append(i)
                .append(a)
                .hide();
        $('#updates').prepend(d);
        d.slideDown("fast");
        $('.update').slice(30).detach();
    });

    function toggle_pause() {
        pause = ! pause;
    }

    $(document).bind('keydown', 'p', toggle_pause);
}
