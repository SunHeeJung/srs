
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
		inpKeyword.value = "";
	}
}
function onBlur(){
	if(inpKeyword.value == ""){
		inpKeyword.value = "종목명/종목코드를 입력하세요.";
	}
	setTimeout(function(){surgestBox.style.display = "none"}, 500);
}
function onSurgest(){
	var keywordList = '';
		
	for(var i=0; i<3; i++){
		stockNo = "0000";
		keyword = inpKeyword.value;
		searchWord = "엔크린"
		keywordList += '<li onclick="selectKeyword(this)"><span class="stockNo">'+stockNo+'</span><span class="keyword">'+keyword+'</span>'+searchWord+'</li>';
	}
	ulSurgest.innerHTML = keywordList;
	surgestBox.style.display = "block";
}
function selectKeyword(e){
	inpKeyword.value = e.getElementsByTagName("span")[1].innerHTML;
	surgestBox.style.display = "none";
	alert(e.getElementsByTagName("span")[1].innerHTML)
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


//result
function initResult(){
	$("#footer0").mouseover(function(e){
		$("#bg").css("display", "block");
		$("#popup0").css("display", "block");
		$("#bg").animate({
			opacity:.5
		}, 0)
		$("#popup0").animate({
			opacity:1
		}, 0)
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
		}, 0)
		$("#popup1").animate({
			opacity:1
		}, 0)
	});
	
	$("#footer1").mouseout(function(e){
		$("#bg").css("display", "none");
		$("#popup1").css("opacity", "0").css("display", "none");
	});
	
	$("#aText").animate({opacity:0}, 1);
	setTimeout(function(){
		var posX = parseInt($("#appealValue").css("width"))/2 - parseInt($("#aText").css("width"))/2
		$("#aText").css("top", "100px").css("left", posX+"px").animate({opacity:1}, 500);
	}, 500)
	
}

function setAppear(_val, _name){
	var value = _val * 2.03;
		
	if(_val.toString().split(".")[0].length == 3){
		aHun = -1 * _val.toString().substr(0,1) * 40;
		aTen = -1 * _val.toString().substr(1,1) * 40;
		aOne = -1 * _val.toString().substr(2,1) * 40;
	}else{
		aTen = -1 * _val.toString().substr(0,1) * 40;
		aOne = -1 * _val.toString().substr(1,1) * 40;
		$("#aHun").css("display", "none");
	}
	$("#appealTextValue").text(_val);
	$("#aText").text(_name);
	$("#leftGage").animate({
		height:value
	}, 2000);
	
	$("#aHun").css("backgroundPositionX", aHun+"px");
	$("#aTen").css("backgroundPositionX", aTen+"px");
	$("#aOne").css("backgroundPositionX", aOne+"px");
}

function setPosition(_val, _name){
	var value = _val * 2.03;
	if(_val.toString().split(".")[0].length == 2){
		var pTen = -1 * _val.toString().substr(0,1) * 40,
			pOne = -1 * _val.toString().substr(1,1) * 40,
			pFir = -1 * _val.toString().substr(3,1) * 40,
			pSec = -1 * _val.toString().substr(4,1) * 40;
	}else if(_val.toString().split(".")[0].length == 3){
		var pHun = -1 * _val.toString().substr(0,1) * 40,
			pTen = -1 * _val.toString().substr(1,1) * 40,
			pOne = -1 * _val.toString().substr(2,1) * 40;
			$("#pDot").css("display", "none");
			$("#pFir").css("display", "none");
			$("#pSec").css("display", "none");
			$("#positionValue").css("right", "130px")
	}
	$("#positionTextValue").text(_name+"수준");
	$("#pText").text(_name);
	$("#rightGage").animate({
		height:value
	}, 2000);
	
	if(_val.toString().substr(0,1) == "1"){
		$("#pHun").css("backgroundPositionX", pHun+"px");
	}else{
		$("#pHun").css("display", "none");
	}
	$("#pTen").css("backgroundPositionX", pTen+"px");
	$("#pOne").css("backgroundPositionX", pOne+"px");
	$("#pFir").css("backgroundPositionX", pFir+"px");
	$("#pSec").css("backgroundPositionX", pSec+"px");
}