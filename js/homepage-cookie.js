
if (document.all || document.getElementById){

    document.write('<style type="text/css">\n');
    document.write('.CustomerFeature{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.ProspectFeature{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.PropertyManagement{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.OtherTrades{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.Plumbing{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.Mechanical{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.HVAC{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.Electrical{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.Concrete{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.HeavyConstruction{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');

    document.write('<style type="text/css">\n');
    document.write('.GeneralConstruction{display: none; width: 250px; height: 60px;}\n');
    document.write('</style>');
}

var pagecookies = document.cookie;
var maxwellcookie = "ProspectFeature";

if(pagecookies.indexOf("apex__Customer")>-1){
    maxwellcookie="CustomerFeature";
}
if(pagecookies.indexOf("apex__PropertyManagement")>-1){
    maxwellcookie="PropertyManagement";
}
if(pagecookies.indexOf("apex__OtherTrades")>-1){
    maxwellcookie="OtherTrades";
}
if(pagecookies.indexOf("apex__Plumbing")>-1){
    maxwellcookie="Plumbing";
}
if(pagecookies.indexOf("apex__Mechanical")>-1){
    maxwellcookie="Mechanical";
}
if(pagecookies.indexOf("apex__HVAC")>-1){
    maxwellcookie="HVAC";
}
if(pagecookies.indexOf("apex__Electrical")>-1){
    maxwellcookie="Electrical";
}
if(pagecookies.indexOf("apex__Concrete")>-1){
    maxwellcookie="Concrete";
}
if(pagecookies.indexOf("apex__HeavyConstruction")>-1){
    maxwellcookie="HeavyConstruction";
}
if(pagecookies.indexOf("apex__GeneralConstruction")>-1){
    maxwellcookie="GeneralConstruction";
}

var curcontentindex=0;
var messages=new Array();

function getElementByClass(classname){
    var inc=0;
    var alltags=document.all? document.all : document.getElementsByTagName("*");
    for (i=0; i<alltags.length; i++){
        if (alltags[i].className==classname)
            messages[inc++]=alltags[i];
    }
}

function showcontent(){
    curcontentindex=(curcontentindex<messages.length-1)? curcontentindex+1 : 0;
    prevcontentindex=(curcontentindex==0)? messages.length-1 : curcontentindex-1;
    if(messages.length>0){
        messages[prevcontentindex].style.display="none";
        messages[curcontentindex].style.display="block";
    }
}

//function rotatecontent(){
//    curcontentindex=(curcontentindex<messages.length-1)? curcontentindex+1 : 0;
//    prevcontentindex=(curcontentindex==0)? messages.length-1 : curcontentindex-1;
//    if(messages.length>0){
//        messages[prevcontentindex].style.display="none";
//        messages[curcontentindex].style.display="block";
//    }
//}

Shadowbox.init({
    skipSetup: true
});

window.onload=function(){
    if(pagecookies.indexOf("apex__")<0){
        Shadowbox.open({
            player:     "iframe",
            title:      "",
            height:     450,
            width:      800,
            content:'/splash'       
        });
    }  
    if (document.all || document.getElementById){
        getElementByClass(maxwellcookie);
          showcontent();        
//        rotatecontent();        
//        setInterval("rotatecontent()", 45000);
    }   
}
