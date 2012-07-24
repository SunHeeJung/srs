
var btnSearch,
	inpKeyword,
	ulSurgest,
	surgestBox,
	keyword;
	
addEvent(window, "load", init);

function init(){
	btnSearch = document.getElementById("btnSearch");
	inpKeyword = document.getElementById("inpKeyword");
	surgestBox = document.getElementById("surgestBox");
	ulSurgest = document.getElementById("ulSurgest");
	
	addEvent(btnSearch, "click", onSearch);
	addEvent(inpKeyword, "focus", onFocus);
	addEvent(inpKeyword, "blur", onBlur);
	addEvent(inpKeyword, "keyup", onSurgest);
}

function onFocus(){
	if(inpKeyword.value == "종목명/종목코드를 입력하세요."){
		inpKeyword.value = ""
	}
}
function onBlur(){
	if(inpKeyword.value == ""){
		inpKeyword.value = "종목명/종목코드를 입력하세요."
	}
	//surgestBox.style.display = "none";
}
function onSurgest(){
	var keywordList = '';
	for(var i=0; i<10; i++){
		keywordList += '<li onclick="selectKeyword(this)">'+inpKeyword.value+'d</li>';
	}
	ulSurgest.innerHTML = keywordList;
	surgestBox.style.display = "block";
}
function selectKeyword(e){
	inpKeyword.value = e.innerHTML;
	surgestBox.style.display = "none";
}
function onSearch(){
	keyword = inpKeyword.value;
}

function addEvent(obj, type, fn){
	if(obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj.attachEvent){
		obj["e"+type+fn] = fn;
		obj[type+fn] = function(){
			obj["e"+type+fn]( window.event );
		}
		obj.attachEvent("on"+type, obj[type+fn]);
	}
}

function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName]
	}
	else {
		return document[movieName]
	}
}

function FlashInsert(FlashIDName, FlashFileName, FlashWidth, FlashHeight, DNSSetting, WMODESetting, FlashBGColor, QSetting, FlashAlign){
	document.write('<OBJECT CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write('CODEBASE="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=8,0,22,0" ');
	document.write(' ID="'+FlashIDName+'" WIDTH="' + FlashWidth + '" HEIGHT="' + FlashHeight + '" ALIGN="'+FlashAlign+'">');
	document.write('<PARAM NAME="movie" VALUE="'+ FlashFileName +'">');
	document.write('<PARAM NAME="quality" VALUE="'+QSetting+'">');
	document.write('<PARAM NAME="bgcolor" VALUE="'+FlashBGColor+'">');
	document.write('<PARAM NAME="wmode" VALUE="'+WMODESetting+'">');
	document.write('<PARAM NAME="allowFullScreen" VALUE="true">');
	document.write('<PARAM NAME="allowScriptAccess" VALUE="'+DNSSetting+'">');
	document.write('<EMBED SRC="'+ FlashFileName +'"  NAME="'+FlashIDName+'"');
	document.write(' WIDTH="' + FlashWidth + '" HEIGHT="' + FlashHeight + '" QUALITY="'+QSetting+'" BGCOLOR="'+FlashBGColor+'"');
	document.write(' ALLOWSCRIPTACCESS="'+DNSSetting+'" ALIGN="'+FlashAlign+'" WMODE="'+WMODESetting+'" TYPE="application/x-shockwave-flash" allowFullScreen="true"');
	document.write(' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer" >');
	document.write('</EMBED>');
	document.write('</OBJECT>');
}