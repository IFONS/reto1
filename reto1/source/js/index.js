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
        var h = $(window).height();
        var w = $(window).width();
        $("body").height(h);
        $("body").width(w);
    }

});
setInterval(function () {
    $("#readvals").load(document.URL + " #readvals");
    aplicarOutput("c_posicion", document.getElementById("c_posicionInput").value);
    positionAnimation();
    aplicarOutput("c_speed", document.getElementById("c_speedInput").value);
    aplicarOutputButton("ready", document.getElementById("readyInput").value);
    aplicarOutputButton("alarm", document.getElementById("alarmInput").value);
    aplicarOutputButton("svre", document.getElementById("svreInput").value);
    aplicarOutputButton("busy", document.getElementById("busyInput").value);
},500);
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
    document.getElementById("rearme").value = "0"; 
    setTimeout(function () { 
        request2server(idform); 
        document.getElementById("rearme").value = "1"; 
    },200); 
    document.getElementById("fullfade").classList.add('disable'); 
    document.getElementById("message").classList.add('disable'); 
    document.getElementById("animation_box").style.margin = "0 0 0 0"; 
    document.getElementById("manual_data").value = "1"; 
    return false; 
} 
function positionAnimation() {
    console.log("ANIMACION "+document.getElementById("c_posicionInput").value); 
    var x = parseInt(document.getElementById("c_posicionInput").value); 
    if(x >= 1 && x <= 500) {     
        var margin = x * 90 / 500; 
        document.getElementById("animation_box").style.margin = "0 0 0 " + (margin) + "%"; 
    } 
    return false; 
}
function positionButton(idform) { 
    var x = parseInt(document.getElementById("manual_data").value); 
    if(x >= 1 && x <= 500) { 
        request2server(idform); 
        document.getElementById("pos_x_mm_aceptar").value = "0"; 
        setTimeout(function () { 
            request2server(idform); 
            document.getElementById("pos_x_mm_aceptar").value = "1"; 
        },200);  
    } 
    return false; 
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

 
//FUNCION DE PULSADOR
function Pulse(idPulsador, namePulsador){
    if(document.getElementById(idPulsador).value != 1){
        document.getElementById(idPulsador).value = 1;
        request2serverPulsador(namePulsador, 1);
    }else{
        document.getElementById(idPulsador).value = 0;
        request2serverPulsador(namePulsador, 0);
    }


}

function request2serverPulsador(nameVariable, value) {
    $.ajax({
        type:"POST",
        data:nameVariable+"="+value,
        success: function(data){
            console.log('sent');
        },
        error: function () {
            console.log('error');
        }
    });
    return false;
}



function aplicarOutput(ID, value){
    document.getElementById(ID).value=value;
}

function aplicarOutputButton(ID, value){
    if (value == 1) {
        document.getElementById(ID).style.backgroundColor = "red";
    }else{
        document.getElementById(ID).style.backgroundColor = "grey";
    }
}
