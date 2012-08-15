<%@page import="java.util.*"%>
<%@page import="java.text.*"%>
<%@page import="java.io.*"%>
<%@page import="java.net.*"%>
<%@page import="neo.*"%>

<%@page import="java.util.Date"%>
<%@page import="java.sql.*"%>
<%@page import="javax.naming.*"%>
<%@page import="tr.parsing.*"%>
<%@page import="dbutil.*"%>

<%@page import="java.text.SimpleDateFormat"%>
<%@page import="Priden_Beans.member.*"%>
<%@page import="Priden_Beans.StringReplacer"%>


<jsp:useBean id="fileinfo" class="tr.parsing.FileInfo" scope="page"  />
<jsp:useBean id="fileconf" class="tr.parsing.TRFile" scope="application"  />
<jsp:useBean id="neoparseC" class="tr.parsing.NeoParseC" scope="page" />
<jsp:useBean id="util" class="neo.common.Utility" scope="page" />
<jsp:useBean id="EtcFunction" class="Priden_Beans.EtcFunction" scope="page"/>


<%@ include file="/renewal/inc/sql_injection.jsp"%>

<%

String sRootURL = request.getServerName();

String jcode = (request.getParameter("jcode") == null) ? "" : request.getParameter("jcode");
String jname = (request.getParameter("jname") == null) ? "" : request.getParameter("jname");

String jongmok = jname + "(" + jcode + ")";

String totalnum = (request.getParameter("totalnum") == null) ? "" : request.getParameter("totalnum");
String position = (request.getParameter("position") == null) ? "" : request.getParameter("position");
String totalnum_img = (request.getParameter("totalnum_img") == null) ? "" : request.getParameter("totalnum_img");
String position_img = (request.getParameter("position_img") == null) ? "" : request.getParameter("position_img");
String position_text = (request.getParameter("position_text") == null) ? "" : request.getParameter("position_text");
String totalnum_text = (request.getParameter("totalnum_text") == null) ? "" : request.getParameter("totalnum_text");

jname = new String(jname.getBytes("8859_1"), "euc-kr");
position_text = new String(position_text.getBytes("8859_1"), "euc-kr");
jongmok = new String(jongmok.getBytes("8859_1"), "euc-kr");

//sql injection 방지
if( is_sql_injection( jcode ))
{
	out.println("<script>alert('허용된문자가 아닙니다.');history.back();</script>");
	return;
}
%>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=880" />
<title></title>
<link rel="stylesheet" type="text/css" href="../css/style.css"/>
<link href="http://api.mobilis.co.kr/webfonts/css/?fontface=NanumGothicWeb" rel="stylesheet" type="text/css" />
<!--[if IE]><style type="text/css">img, div, input { behavior: url("../css/iepngfix.htc") }</style><![endif]-->


<style type="text/css">
.mouseOut {
background: #f1f1f1;
}
.mouseOver {
background: #e4e4e4;
}
</style>


<script type="text/javascript" src="http://www.sks.co.kr/renewal/js/jquery.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../js/iepngfix_tilebg.js"></script>

<script language="javascript" src="http://www.sks.co.kr/renewal/js/cjmaster.js"></script>

<script type="text/javascript">

function _getSrsData() {
	if ($("#inpKeyword").val() == "종목명/종목코드를 입력하세요.") {
		alert("종목명/종목코드를 입력하세요.");
	} else {
		var jname = $("#jname").val();
		var jcode = $("#jcode").val();

		$("#jname").val(jname);
		$("#jcode").val(jcode);
		
		var url = "srs_intro_json.jsp?jname=" + jname + "&jcode=" + jcode;
		
	    $.getJSON(url, function(data) {
	    	if(data[0].name == "DNF") {
	    		alert("종목명을 정확히 선택해 주십시오.");
	    		return;
	    	} else {
				initResult();

				//투자매력도
				setAppear(data[0].totalnum, data[0].totalnum_text, "Y");
				
				//주가위치
				setPosition(data[0].position, data[0].position_text, "Y");

				_fadeInOut(data[0].totalnum_img, data[0].position_img);

				$("#jongmok").fadeOut(800, function () {
					$("#jongmok").text(jname).fadeIn(1000);
				});
	    	}
	    });
	}
}

$(window).load(function(){
	$("#jname").val("<%=jname%>");
	$("#jcode").val("<%=jcode%>");

	initResult();

	//투자매력도
	setAppear('<%=totalnum%>', "<%=totalnum_text%>", "N");
	
	//주가위치/
	setPosition('<%=position%>', "<%=position_text%>", "N");

	$("#appeal").css('background', "url('../images/<%=totalnum_img%>')");
	$("#position").css('background', "url('../images/<%=position_img%>')");
});



function _fadeInOut(total_imgnm, pos_imgnm) {
	// 날씨 이미지
	$("#appeal").fadeOut(800, function() {
		$("#appeal").css('background', "url('../images/"+total_imgnm+"')");
		$("#appeal").fadeIn(1000);
	});

	
	// 사람 이미지
	$("#position").fadeOut(800, function() {
		$("#position").css('background', "url('../images/"+pos_imgnm+"')");
		$("#position").fadeIn(1000);
	});
}

function micro_popup() {
	window.open('../../micro/html/mn1.html','','location=no,menubar=no,toolbar=no,status=no,resizable=no,scrollbars=no,width=1024,height=768');
}


</script>
</head>

<body>

<form name="form1">
	<input type="hidden" id="jname" name="jname"></input>
	<input type="hidden" id="jcode" name="jcode"></input>
</form>




	<div id="pop">
		<div id="popup0"><img src="../images/pop_img0.png" alt="투자매력도" /></div>
		<div id="popup1"><img src="../images/pop_img1.png" alt="주가위치" /></div>
		<div id="bg"></div>
	</div>

	<div id="resultWrap">

			
			<fieldset>
				<legend>종목명/종목코드 검색</legend>
				<input type="text" id="inpKeyword" onfocus="this.value=''" value="<%=jongmok%>" />
				<button id="btnSearch" onclick="_getSrsData()"></button>
				<div id="surgestBox">
					<ul id="ulSurgest">
					</ul>
					<div class="border"></div>
				</div>
			</fieldset>

		<div id="wrap">
			<div id="appeal"></div>
			<div id="leftGage"><div></div><div class="cap"></div></div>
			<div id="appealValue">
				<p id="aTen"></p>
				<p id="aOne"></p>
				<p id="aText"></p>
			</div>
			<div id="txtAppeal"><span id="jongmok"><%=jname%></span>의 투자매력도는 <span id="appealTextValue"></span> 입니다.</div>
			
			<div id="position"></div>
			<div id="rightGage"><div></div><div class="cap"></div></div>
			<div id="positionValue">
				<p id="pHun"></p>
				<p id="pTen"></p>
				<p id="pOne"></p>
				<p id="pDot"></p>
				<p id="pFir"></p>
				<p id="pSec"></p>
				<p id="pText"></p>
			</div>
			<div id="txtPosition">주가위치는 <span id="positionTextValue"></span>입니다.</div>
			
			<button id="btnJoin" onclick="micro_popup()">SRS 종목검색 체험하기</button>
		</div>
		
		<div id="footer">
			<img src="../images/bnnr0.png" alt="" id="footer0" /><img src="../images/bnnr1.png" alt="" id="footer1" />
		</div>
	</div>



</body>
</html>
