var search;

function initAll() {
	search = document.getElementById("headersearch").childNodes[0];
	defaultValue();
	search.focus();
	displayDate();
	displayTime();
	
	search.onkeydown = function() {
		if (search.value > 99) {
			search.value = "";
		}
	}
	
	search.onkeyup = function() {
		if (search.value.length == 3) {
			gotoPage(); 
		}
	}
}

eventHandler = {

    addEventHandler: function (oNode, sEvt, fnHandler, bCapture) {
        if (typeof (window.event) != "undefined")
            oNode.attachEvent("on" + sEvt, fnHandler);
        else
        oNode.addEventListener(sEvt, fnHandler, bCapture);
    },

    removeEventHandler: function (oNode, sEvt, fnHandler, bCapture) {
        if (typeof (window.event) != "undefined")
            oNode.attachEvent("on" + sEvt, fnHandler);
        else
            oNode.addEventListener(sEvt, fnHandler, bCapture);
    },

    getEventTarget: function (evt) {
        if (window.event) return window.event.srcElement;
        else return evt.target;
    },

    stopEvent: function (evt) {
        if (window.event) window.event.cancelBubble = true;
        else evt.stopPropagation();
    },

    preventDefault: function (evt) {
        if (window.event) window.event.returnValue = false;
        else evt.preventDefault();
    }
}


function numbersOnly(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode;
	if (unicode!=8) { //if the key isn't the backspace key (which we should allow)
	    if (unicode < 48 || unicode > 57) { //if not a number
	        eventHandler.preventDefault(e);   //disable key press
		}
	}
}

function gotoPage() {
	var newLocation = search.value;
	var i = Math.floor(newLocation / 100) * 100;
	changeLocation = setInterval(function() { 
		if (i == newLocation) {
			window.location = "http://www." + window.location.host + "/oldmaninc/" + newLocation + ".html";
			clearInterval(changeLocation);
			search.onkeydown = function() {
				search.value = "";
				return false;
			}
		} 
		search.value = i++;
	}, 70);
}

function defaultValue() {
	search.value = 100;
}

function displayDate() {
	var monthNames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	var date = new Date();
	var currDate = date.getDate();
	var currMonth = date.getMonth();
	document.getElementById("headerdate").childNodes[0].innerHTML = monthNames[currMonth] + currDate;
	// The last two lines above have to placed on a single line */
}

function displayTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	// add a zero in front of numbers<10
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('headertime').childNodes[0].innerHTML=h+":"+m+":"+s;
	t=setTimeout('displayTime()',500);
}

function checkTime(i) {
	if (i<10) {
		i="0" + i;
	}
	return i;
}

function handleSelectAttempt(e) {
    console.log(e);
    var sender = e && e.target || window.event.srcElement;
    if (window.event) {
        eventHandler.preventDefault(e);
    }
    eventHandler.preventDefault(e);
}

window.onload = initAll;
window.onbeforeunload = function () {
    defaultValue();
}

eventHandler.addEventHandler(document.getElementById('headersearch').childNodes[0], "keypress", numbersOnly, false);
eventHandler.addEventHandler(document, "mousedown", handleSelectAttempt, false);
eventHandler.addEventHandler(window, "click", function () { search.focus(); }, false);