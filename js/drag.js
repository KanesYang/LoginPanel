function getByClass(clsName, parent) {
    var oParent = parent ? document.getElementById(parent) : document,
        //target elements
        eles = [],
        //all elements
        elements = oParent.getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className == clsName) {
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = drag;

function drag() {
    var oTitle = getByClass("login_logo_webqq", "loginPanel")[0];

    oTitle.onmousedown = fnDown;

    var oClose = document.getElementById("ui_boxyClose");
    oClose.onclick = function () {
        document.getElementById("loginPanel").style.display = "none";
    }

    //switch
    var loginState = document.getElementById("loginState"),
        stateList = document.getElementById("loginStatePanel"),
        list = stateList.getElementsByTagName("li"),
        stateText = document.getElementById('login2qq_state_txt'),
        loginStateShow = document.getElementById('loginStateShow');

    loginState.onclick = function (e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        stateList.style.display = "block";
    };

    //mouse move click quit list
    for (var i = 0; i < list.length; i++) {
        list[i].onmouseover = function () {
            this.style.background = "#567";
        };
        list[i].onmouseout = function () {
            this.style.background = "#fff";
        };
        list[i].onclick = function (e) {
            e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
            var id = this.id;
            stateList.style.display = "none";
            stateText.innerHTML = getByClass('stateSelect_text', id)[0].innerHTML;

            loginStateShow.className = "";
            loginStateShow.className = 'login-state-show ' + id;

        };
    }

    //close the list when click elsewhere
    document.onclick = function () {
        stateList.style.display = "none";
    };


}

function fnDown(event) {
    event = event || window.event;
    var oDrag = document.getElementById("loginPanel"),
        //the distance between the mouse the topleft
        disX = event.clientX - oDrag.offsetLeft,
        disY = event.clientY - oDrag.offsetTop;
    //move
    document.onmousemove = function (event) {
        event = event || window.event;
        fnMove(event, disX, disY);
    };

    //release

    document.onmouseup = function (event) {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

function fnMove(e, posX, posY) {
    var oDrag = document.getElementById("loginPanel"),
        l = e.clientX - posX,
        t = e.clientY - posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxW = winW - oDrag.offsetWidth - 10,
        maxH = winH - oDrag.offsetHeight - 10;

    if (l < 0) {
        l = 0
    } else if (l > maxW) {
        l = maxW
    }

    if (t < 0) {
        t = 0;
    } else if (t > maxH) {
        t = maxH;
    }


    oDrag.style.left = l + "px";
    oDrag.style.top = t + "px";
}