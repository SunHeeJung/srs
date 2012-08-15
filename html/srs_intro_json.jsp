<%@page import="java.util.*"%>
<%@page import="java.text.*"%>
<%@page import="java.io.*"%>
<%@page import="java.net.*"%>
<%@page import="neo.*"%>

<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.*"%>
<%@page import="javax.naming.*"%>
<%@page import="tr.parsing.*"%>

<%@page import="java.lang.*,Priden_Beans.member.*"%>
<%@page import="Priden_Beans.StringReplacer"%>
<%@page import="dbutil.*"%>
<%@page import="java.text.DecimalFormat"%>


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

jname = new String(jname.getBytes("8859_1"), "euc-kr");

//sql injection 방지
if( is_sql_injection( jcode ) )
{
        out.println("<script>alert('허용된문자가 아닙니다.');history.back();</script>");
        return;
}


String userDN = "        ";
String Key = "";
String o_totalnum = "";         //투자매력도
String o_position = "";         //주가위치
String tot_yester = "";         //어제투자매력도
String o_jname = "";            //종목명

Hashtable ht = new Hashtable();

//***********************************************************
//오늘날짜 가지고 오기
String Today    = "";
Date date = new Date();
SimpleDateFormat sdformat  = new SimpleDateFormat("yyyyMMdd");
Today = String.valueOf(sdformat.format(date));
//***********************************************************

try{
        fileinfo = fileconf.MakeValue("/user/conf/40400.conf");
        Key = Today + jcode;
        ht = neoparseC.InputDatatoHash(fileinfo,userDN,Key);
}catch(Exception ex){
        out.println(ex);
}

o_totalnum = (String)ht.get("o_totalnum");
o_position = (String)ht.get("o_position");
tot_yester = (String)ht.get("tot_yester");
o_jname = (String)ht.get("o_jname");

o_totalnum = o_totalnum.trim();
o_position = o_position.trim();
tot_yester = tot_yester.trim();
//o_jname = o_jname.trim();

if ("".equals(o_totalnum)) {
        out.println("[");
                out.println("{");
                        out.println("\"name\"" + ":" + "\"DNF\"");
                out.println("}");
        out.println("]");       
} else {
        //이미지 선택을 위한 분기문들..
        float f_totalnum = Float.parseFloat(o_totalnum);
        float f_position = Float.parseFloat(o_position);

        String totalnum_img = "";      //
        String position_img = "";
        
        String totalnum_text = "";     //투자매력도 텍스트
        String position_text = "";     //주가위치 텍스트
        
        //투자매력도
        if (f_totalnum <= 20) {
                totalnum_img = "img_sun1.png";
                totalnum_text = "Strongly Underperform";
        } else if (f_totalnum > 20 && f_totalnum <= 40) {
                totalnum_img = "img_sun2.png";
                totalnum_text = "Underperform";
        } else if (f_totalnum > 40 && f_totalnum <= 60) {
                totalnum_img = "img_sun3.png";
                totalnum_text = "Marketperform";
        } else if (f_totalnum > 60 && f_totalnum <= 80) {
                totalnum_img = "img_sun4.png";
                totalnum_text = "Outperform";
        } else if (f_totalnum > 80) {
                totalnum_img = "img_sun5.png";
                totalnum_text = "Strongly Outperform";
        }

        //주가위치
        if (f_position <= 5) {
                position_img = "img_human01.png";
				position_text = "바닥";
        } else if (f_position > 5 && f_position <= 10) {
                position_img = "img_human02.png";
				position_text = "바닥";
        } else if (f_position > 10 && f_position <= 15) {
                position_img = "img_human03.png";
				position_text = "무릎";
        } else if (f_position > 15 && f_position <= 20) {
                position_img = "img_human04.png";
				position_text = "무릎";
        } else if (f_position > 20 && f_position <= 25) {
                position_img = "img_human05.png";
				position_text = "무릎";
        } else if (f_position > 25 && f_position <= 30) {
                position_img = "img_human06.png";
				position_text = "무릎";
        } else if (f_position > 30 && f_position <= 35) {
                position_img = "img_human07.png";
				position_text = "허리";
        } else if (f_position > 35 && f_position <= 40) {
                position_img = "img_human08.png";
				position_text = "허리";
        } else if (f_position > 40 && f_position <= 45) {
                position_img = "img_human09.png";
				position_text = "허리";
        } else if (f_position > 45 && f_position <= 50) {
                position_img = "img_human10.png";
				position_text = "허리";
        } else if (f_position > 50 && f_position <= 55) {
                position_img = "img_human11.png";
				position_text = "가슴";
        } else if (f_position > 55 && f_position <= 60) {
                position_img = "img_human12.png";
				position_text = "가슴";
        } else if (f_position > 60 && f_position <= 65) {
                position_img = "img_human13.png";
				position_text = "가슴";
        } else if (f_position > 65 && f_position <= 70) {
                position_img = "img_human14.png";
				position_text = "가슴";
        } else if (f_position > 70 && f_position <= 75) {
                position_img = "img_human15.png";
				position_text = "어깨";
        } else if (f_position > 75 && f_position <= 80) {
                position_img = "img_human16.png";
				position_text = "어깨";
        } else if (f_position > 80 && f_position <= 85) {
                position_img = "img_human17.png";
				position_text = "어깨";
        } else if (f_position > 85 && f_position <= 90) {
                position_img = "img_human18.png";
				position_text = "어깨";
        } else if (f_position > 90 && f_position <= 95) {
                position_img = "img_human19.png";
				position_text = "머리";
        } else if (f_position > 95) {
                position_img = "img_human20.png";
				position_text = "머리";
        }
        
        if (o_totalnum.startsWith("0")) {
                o_totalnum = o_totalnum.substring(1);
        }
        
        if (o_position.startsWith("0")) {
                o_position = o_position.substring(1);
        }
        
        if (tot_yester.startsWith("0")) {
                tot_yester = tot_yester.substring(1);
        }

		int dot_pos = o_totalnum.indexOf(".");

		if (dot_pos > 0) {
			dot_pos = o_totalnum.indexOf(".");
			
			o_totalnum = o_totalnum.substring(0, dot_pos);
		}
        
        out.println("[");
                out.println("{");
                        out.println("\"jname\"" + ":" + "\"" + jname + "\",");
                        out.println("\"jcode\"" + ":" + "\"" + jcode + "\",");
                        out.println("\"totalnum\"" + ":" + "\"" + o_totalnum + "\",");
                        out.println("\"position\"" + ":" + "\"" + o_position + "\",");
                        out.println("\"totalnum_img\"" + ":" + "\"" + totalnum_img + "\",");
                        out.println("\"position_img\"" + ":" + "\"" + position_img + "\",");
                        out.println("\"position_text\"" + ":" + "\"" + position_text + "\",");
                        out.println("\"totalnum_text\"" + ":" + "\"" + totalnum_text + "\",");
                        out.println("\"tot_yester\"" + ":" + "\"" + tot_yester + "\"");
                out.println("}");
        out.println("]");       
}

%>