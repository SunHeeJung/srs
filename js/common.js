var codeIdx=0;
var nameIdx=1;
var kindIdx=2;
var kind = 0;

var codeList1 = new Array();
var codeList2 = new Array();

var b4 = "";
var row = -1;
var rc = "";

var btnSearch,
	inpKeyword,
	ulSurgest,
	surgestBox,
	keyword;
	
addEvent(window, "load", init);

function init(){
	//btnSearch = document.getElementById("btnSearch");
	inpKeyword = document.getElementById("inpKeyword");
	surgestBox = document.getElementById("surgestBox");
	ulSurgest = document.getElementById("ulSurgest");
	
	//addEvent(btnSearch, "click", onSearch);
	addEvent(inpKeyword, "focus", onFocus);
	addEvent(inpKeyword, "blur", onBlur);
	addEvent(inpKeyword, "keyup", onSurgest);
}

function onFocus(){
	if(inpKeyword.value == "종목명/종목코드를 입력하세요."){
		inpKeyword.value = "";
	}
}

function onBlur(){
	if(inpKeyword.value == ""){
		inpKeyword.value = "종목명/종목코드를 입력하세요.";
	}
	setTimeout(function(){surgestBox.style.display = "none";}, 500);
}

//자동완성기능 추가
function onSurgest(e){
	var key = e.keyCode;
	var str = inpKeyword.value;

	var cnt=0;
	str = str.toUpperCase();
	
	if (str != "") {
		codeList1 = new Array(0);
		codeList2 = new Array(0);
		
		for (var i=0; i < codelist.length / 4;i++) {
			pos1 = codelist[i*4+nameIdx].indexOf(str);
			pos2 = codelist[i*4+codeIdx].indexOf(str);
			
			if ( (pos1 == 0 || pos2 == 0) && (kind == codelist[i*4+kindIdx] || kind == 0)) {
				codeList1[cnt] = codelist[i*4+nameIdx] + "(" + codelist[i*4+codeIdx] + ")";
				codeList2[cnt] = codelist[i*4+codeIdx];
				
				cnt++;
				
				//너무 많으면 10개만 보여준다.
				if (cnt == 10) {
					break;
				}
			}
		}
		
		if ( cnt == 0 ) {
			codeList1 = new Array(0);
			codeList2 = new Array(0);
			surgestBox.style.display = "none";
		} else {
			var keywordList = '';
			
			for(var i=0; i<codeList1.length; i++){
				stockNo = codeList2[i];
				searchWord = codeList1[i];
				keywordList += '<li id="r' + i + '" style="cursor:pointer" onclick="selectKeyword(this)"><span class="searchWord">'+searchWord+'</span></li>';
			}

			if (key == 38) { // up arrow
				if (row > 0) {
					row--;
				}
			} else if (key == 40) { // down arrow
				if (row < codeList1.length - 1) {
					row++;
				}
			} else if (key == 27) { // esc key
				codeList1 = new Array(0);
				codeList2 = new Array(0);

				inpKeyword.value = "";
				keywordList = '';
				surgestBox.style.display = "none";
				
				b4 = "";
				row = -1;
				rc = "";
			} else if (key == 8) { //backspace key
				if (str == "") {
					codeList1 = new Array(0);
					codeList2 = new Array(0);

					keywordList = '';
					surgestBox.style.display = "none";
					
					b4 = "";
					row = -1;
					rc = "";
				}
			} else {
				b4 = "";
				row = -1;
				rc = "";
				
				ulSurgest.innerHTML = keywordList;
				surgestBox.style.display = "block";
			}
			
			bg();
		}
	} else {
		if (key == 8) { //backspace key
			if (str == "") {
				codeList1 = new Array(0);
				codeList2 = new Array(0);

				keywordList = '';
				surgestBox.style.display = "none";
				
				b4 = "";
				row = -1;
				rc = "";
			}
		}
	}
}

function bg() {
	rc = "r" + row;
	
	if (b4 == "") {
		b4 = rc;
	}
	
	if (document.getElementById(b4)) {
		document.getElementById(b4).className = "mouseOut";
	}
	
	if (document.getElementById(rc)) {
		document.getElementById(rc).className = "mouseOver";
	}
	
	b4 = rc;
}

function selectKeyword(e){
	var word = e.getElementsByTagName("span")[0].innerHTML;
	word = word.htmlChars();
	
	var pos1 = word.lastIndexOf("(");
	var pos2 = word.lastIndexOf(")");
	
	var jname = word.substring(0, pos1);
	var jcode = word.substring(pos1 + 1, pos2);
	
	document.getElementById("jcode").value = jcode;
	document.getElementById("jname").value = jname;
	
	inpKeyword.value = word;
	surgestBox.style.display = "none";

	codeList1 = new Array(0);
	codeList2 = new Array(0);
}

function addEvent(obj, type, fn){
	if(obj.addEventListener){
		obj.addEventListener(type, fn, false);
	}else if(obj.attachEvent){
		obj["e"+type+fn] = fn;
		obj[type+fn] = function(){
			obj["e"+type+fn]( window.event );
		};
		obj.attachEvent("on"+type, obj[type+fn]);
	}
}


//result
function initResult(){
	$("#footer0").mouseover(function(e){
		$("#bg").css("display", "block");
		$("#popup0").css("display", "block");
		$("#bg").animate({
			opacity:.5
		}, 500);
		$("#popup0").animate({
			opacity:1
		}, 500);
	});
	
	$("#footer0").mouseout(function(e){
		$("#bg").css("display", "none");
		$("#popup0").css("opacity", "0").css("display", "none");
	});
	
	$("#footer1").mouseover(function(e){
		$("#bg").css("display", "block");
		$("#popup1").css("display", "block");
		$("#bg").animate({
			opacity:.5
		}, 500);
		$("#popup1").animate({
			opacity:1
		}, 500);
	});
	
	$("#footer1").mouseout(function(e){
		$("#bg").css("display", "none");
		$("#popup1").css("opacity", "0").css("display", "none");
	});
	
	

		
	setTimeout("test()", 500);
	
	
/*
	$("#aText").animate({opacity:0}, 1);
	setTimeout(function(){
		var posX = parseInt($("#appealValue").css("width"))/2 - parseInt($("#aText").css("width"))/2;
		$("#aText").css("top", "100px").css("left", posX+"px").animate({opacity:1}, 500);
	}, 500);
*/
}
function test(){
	var posX = parseInt($("#appealValue").width())/2 - parseInt($("#aText").width())/2;
	$("#aText").css("top", "100px").css("left", posX+"px").animate({opacity:1}, 500);
}

function setAppear(_val, _name, isJson){
	var value = _val * 1.9,
		aTen = -1 * _val.toString().substr(0,1) * 52,
		aOne = -1 * _val.toString().substr(1,1) * 52;

	if (isJson == "Y") {
		$("#appealTextValue").fadeOut(800, function () {
			$("#appealTextValue").text(_val).fadeIn(1000);
		});

		$("#aText").fadeOut(800, function () {
			$("#aText").text(_name).fadeIn(1000);
		});
		
		$("#aTen").css("backgroundPositionX", aTen+"px");
		$("#aOne").css("backgroundPositionX", aOne+"px");
	} else {
		$("#appealTextValue").text(_val);
		$("#aText").text(_name);
		
		$("#aTen").css("backgroundPositionX", aTen+"px");
		$("#aOne").css("backgroundPositionX", aOne+"px");
	}

	$("#leftGage").animate({
		height:value
	}, 2000);
}

function setPosition(_val, _name, isJson){
	var value = _val * 1.9;
	if(_val.toString().split(".")[0].length == 2){
		var pTen = -1 * _val.toString().substr(0,1) * 52,
			pOne = -1 * _val.toString().substr(1,1) * 52,
			pFir = -1 * _val.toString().substr(3,1) * 52,
			pSec = -1 * _val.toString().substr(4,1) * 52;
		
		if (isJson == "Y") {
			$("#positionTextValue").fadeOut(800, function () {
				$("#positionTextValue").text(_name+"수준").fadeIn(1000);
			});

			$("#pText").fadeOut(800, function () {
				$("#pText").text(_name).fadeIn(1000);
			});
			
			$("#pHun").css("display", "none");
			$("#pTen").css("backgroundPositionX", pTen+"px");
			$("#pOne").css("backgroundPositionX", pOne+"px");
			$("#pFir").css("backgroundPositionX", pFir+"px");
			$("#pSec").css("backgroundPositionX", pSec+"px");
		} else {
			$("#positionTextValue").text(_name+"수준");
			$("#pText").text(_name);
			
			$("#pHun").css("display", "none");
			$("#pTen").css("backgroundPositionX", pTen+"px");
			$("#pOne").css("backgroundPositionX", pOne+"px");
			$("#pFir").css("backgroundPositionX", pFir+"px");
			$("#pSec").css("backgroundPositionX", pSec+"px");
		}
	}else if(_val.toString().split(".")[0].length == 3){
		var pHun = -1 * _val.toString().substr(0,1) * 52,
			pTen = -1 * _val.toString().substr(1,1) * 52,
			pOne = -1 * _val.toString().substr(2,1) * 52,
			pFir = -1 * _val.toString().substr(4,1) * 52,
			pSec = -1 * _val.toString().substr(5,1) * 52;
		
		if (isJson == "Y") {
			$("#positionTextValue").fadeOut(800, function () {
				$("#positionTextValue").text(_name+"수준").fadeIn(1000);
			});

			$("#pText").fadeOut(800, function () {
				$("#pText").text(_name).fadeIn(1000);
			});
			
			$("#pHun").css("display", "block");
			$("#pHun").css("backgroundPositionX", pHun+"px");
			$("#pTen").css("backgroundPositionX", pTen+"px");
			$("#pOne").css("backgroundPositionX", pOne+"px");
			$("#pFir").css("backgroundPositionX", pFir+"px");
			$("#pSec").css("backgroundPositionX", pSec+"px");
		} else {
			$("#positionTextValue").text(_name+"수준");
			$("#pText").text(_name);
			
			$("#pHun").css("display", "block");
			$("#pHun").css("backgroundPositionX", pHun+"px");
			$("#pTen").css("backgroundPositionX", pTen+"px");
			$("#pOne").css("backgroundPositionX", pOne+"px");
			$("#pFir").css("backgroundPositionX", pFir+"px");
			$("#pSec").css("backgroundPositionX", pSec+"px");
		}
	}
	
	$("#rightGage").animate({
		height:value
	}, 2000);
}

function replace(inum) {
    inum = inum.replace(/&/g,"%26"); 
    inum = inum.replace(/\+/g,"%2B"); 
    return inum;
}


String.prototype.htmlChars = function() { 
    var str = ((this.replace('&amp;', '&')).replace('"', '&quot;')).replace('\'', '&#39;'); 
    return (str.replace('&lt;', '<')).replace('&gt;', '>'); 
};

function setStockText(index) {
	if (codeList1.length > 0 && codeList1.length > 1) {
		if (index >= 0) {
			var pos1 = codeList1[index].lastIndexOf("(");
			
			if (pos1 > 0) {
				var jname = codeList1[index].substring(0, pos1);
				var jcode = codeList2[index];
				
				document.getElementById("jcode").value = jcode;
				document.getElementById("jname").value = jname;
				
				inpKeyword.value = codeList1[index];
				surgestBox.style.display = "none";

				codeList1 = new Array(0);
				codeList2 = new Array(0);
				
			}
		} else {
			var jongmok = codeList1[0];
			var pos1 = jongmok.lastIndexOf("(");
			
			if (pos1 > 0) {
				var jname = jongmok.substring(0, pos1);
				var jcode = codeList2[0];

				document.getElementById("jcode").value = jcode;
				document.getElementById("jname").value = jname;
				
				inpKeyword.value = jongmok;
				surgestBox.style.display = "none";

				codeList1 = new Array(0);
				codeList2 = new Array(0);
			}
		}

	} else if (codeList1.length == 1) {
		var pos1 = codeList1[0].lastIndexOf("(");
		
		if (pos1 > 0) {
			var jname = codeList1[0].substring(0, pos1);
			var jcode = codeList2[0];
			
			document.getElementById("jcode").value = jcode;
			document.getElementById("jname").value = jname;
			
			inpKeyword.value = codeList1[0];
			surgestBox.style.display = "none";

			codeList1 = new Array(0);
			codeList2 = new Array(0);
		}
	}
}

document.onkeydown = function() {
	var key = window.event.keyCode;
	
	if (key == 116) {
		window.event.keyCode = 0;
		inpKeyword.value = "종목명/종목코드를 입력하세요.";
		return false;
	} else if (key == 13) { // enter key
		setStockText(row);
	}
};