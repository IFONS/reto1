$(document).ready(function () {
    if(document.getElementById("manu_auto").value == 0){
        document.getElementById("button_manual").setAttribute("disabled", "disabled");
    }
    if($("#type").width()===0){
        $("#auto_display").hide();
        $("#pause_continue").hide();
        document.getElementById("fade_auto_display").classList.add('disable');
        document.getElementById("fade_manual_display").classList.add('disable');
        document.getElementById("fade_manual_display").classList.add('disable');
    }else{
        document.getElementById("fade_manual_display").classList.add('disable');
    }
    var h = $(window).height();
    var w = $(window).width();
    $("body").height(h);
    $("body").width(w);
    showmsg();
});
$(window).resize(function () {
    var focused = document.getElementById("manual_data");
    if(document.activeElement != focused){
        window.location.reload();
        var h = $(window).height();
        var w = $(window).width();
        $("body").height(h);
        $("body").width(w);
    }

});
function request2server(idform) {
    var data = $("#"+idform).serialize();
    $.ajax({
        type:"POST",
        data: data,
        success: function(data){
            console.log('sent');
        },
        error: function () {
            console.log('error');
        }
    });
    return false;
}
function showmsg(){
    document.getElementById("fullfade").classList.remove('disable');
    document.getElementById("message").classList.remove('disable');
}
function closemsg(idform){
    request2server(idform);
    document.getElementById("fullfade").classList.add('disable');
    document.getElementById("message").classList.add('disable');
    document.getElementById("animation_box").style.margin = "0 0 0 0";
    document.getElementById("manual_data").value = "1";
    return false;
}
function position() {
    var x = parseInt(document.getElementById("manual_data").value);
    if(x >= 1 && x <= 500) {
        var margin = x * 90 / 500;
        document.getElementById("animation_box").style.margin = "0 0 0 " + (margin) + "%";
    }
}
function showhide(tohide, toshow,idform){
    request2server(idform);
    showmsg();
    var chance = $("#type").width();
    if (chance===0) {
        var element = document.getElementById("animation");
        if(element.classList.contains("animation_responsive")||toshow!="auto_display"){
            element.classList.remove("animation_responsive");
            $("#pause_continue").hide();
            document.getElementById("button_manual").setAttribute("disabled","disabled");
            document.getElementById("button_auto").removeAttribute("disabled");
        }else {
            element.classList.add("animation_responsive");
            $("#pause_continue").show();
            document.getElementById("button_manual").removeAttribute("disabled","disabled");
            document.getElementById("button_auto").setAttribute("disabled","disabled");
        }
        $("#"+tohide).hide();
        $("#"+toshow).show();
    } else {
        if (toshow === "control_manual") {
            document.getElementById("fade_manual_display").classList.add("disable");
            document.getElementById("fade_auto_display").classList.remove("disable");
            document.getElementById("button_manual").setAttribute("disabled","disabled");
            document.getElementById("button_auto").removeAttribute("disabled");
        }else {
            document.getElementById("fade_auto_display").classList.add("disable");
            document.getElementById("fade_manual_display").classList.remove("disable");
            document.getElementById("button_manual").removeAttribute("disabled","disabled");
            document.getElementById("button_auto").setAttribute("disabled","disabled");
        }
    }
    return false;
}