var j$ = jQuery.noConflict();		
var count=0;
var dialogExcludedPages = ["/myaccount","/myaccount_goldpartnerplan"]; // Make sure all values are in lower case for pgLocation comparision
var subEnd = (window.location.href.indexOf('?') > 0 ? window.location.href.indexOf('?') : (window.location.href.indexOf('#') > 0 ? window.location.href.indexOf('#') : window.location.href.length));		 
var pgLocation = window.location.href.substring( window.location.href.indexOf('.com/') + 4, subEnd ).toLowerCase();
var isExcluded = j$.inArray(pgLocation, dialogExcludedPages) != -1;
var isActive;
var isNoServContract;
var isNoServAR;
var isExpiring;
var hasAlerts;

// Testing differences

/*Execute this code block once page DOM has fully loaded*/
j$(document).ready(function(){	
	j$("div.navElement2 a").each(function (i) {				
		var href = this.href.substring(this.href.indexOf('.com/') + 4, this.href.length).toLowerCase();
		if (href == pgLocation) {
			j$(this).addClass("selected");
		}
	});
	
	j$("div.leftnavcol div.parent div a").each(function (i) {
		var href = this.href.substring(this.href.indexOf('.com/') + 4, this.href.length).toLowerCase();
		if (href == pgLocation) {
			j$(this).parents(".parent").addClass("currentPage"); 
		} 
	});
	
	var hasAlert = false;
	var priorDlg;
	var showDialogs = !isExcluded;
	
	if(showDialogs) {
		if(isNoServContract == "true") {
			var dlgName = "dialog-Expired";
			showAlertDialog(dlgName, hasAlert, priorDlg, '/myAccount');
			hasAlert = true;
			priorDlg = dlgName;
		}
		if(isNoServAR == "true") {
			var dlgName = "dialog-PastDue";
			showAlertDialog(dlgName, hasAlert, priorDlg, '/myAccount');
			hasAlert = true;
			priorDlg = dlgName;
		}	
		if(isExpiring == "true") {		
			if(j$.cookie("MXW_Expiring_Shown") != "true") {
				var dlgName = "dialog-Expiring";
				showAlertDialog(dlgName, hasAlert, priorDlg, '/myAccount');
				hasAlert = true;
				priorDlg = dlgName;			
				j$.cookie("MXW_Expiring_Shown","true");
			}
		}
		if(hasAlerts) {
			if(j$.cookie("MM_Alerts_Shown") != "true") {
				var dlgName = "dialog-Alerts";
				showAlertDialog(dlgName, hasAlert, priorDlg, '');
				hasAlert = true;
				priorDlg = dlgName;
				j$.cookie("MM_Alerts_Shown", "true");
			}
		}
	}
	
	j$(".iframe-opener").bind("click", function() {
		var iframe = j$("#popup-holder-iframe iframe"); // Main iframe to dispaly the page in
		var outputHolder = iframe.parent(); // Parent of the iframe, used as the jQueryUI Dialog
		var div = j$(this); // Current div we are binding the click event to
				
		var dialogSetting = findDialogSetting(div.attr("id"));
		
		if(typeof dialogSetting != "undefined") {
			var newSRC = dialogSetting.src;
			
			if(div.attr("urlParams")) {
				newSRC += "?" + div.attr("urlParams");
			}
			
			if(window.location.href.indexOf('salesforce.com') > 0) {
				newSRC = "/apex" + newSRC;
			}
			var oldSRC = iframe.attr("src");
			
			// Only change the iframe SRC if a new div was clicked
			if(newSRC != oldSRC) {
				iframe.attr("src",newSRC); // Set the iframe SRC to the div ID
			}						
			
			var dlgWidth = dialogSetting.width;
			var dlgHeight = dialogSetting.height;
			var title = dialogSetting.title;					
			
			// Open the output div with the iframe inside as a dialog box
			outputHolder.dialog({ 
				height: dlgHeight,
				width: dlgWidth,
				title: title,
				dialogClass: "main",
				show: "fade",
				hide: "fade",
				close: function(event, ui) { iframe.attr("src","");	} // When the dialog is closed, null out the SRC
			  });				      
		  }
	});
	
	j$("a").each(function(i) {
		var e = j$(this);
		var	ref = e.attr("href");
		var domain = "www.maxwellsystems.com";
		
		if(typeof ref != "undefined" && ref.charAt(0) != "/" && ref.indexOf(domain) > 0) {					
			e.attr("href", ref.substring(ref.indexOf(domain) + domain.length, ref.length));
			count++;
		}				
	});					
	
	if(window.location.href.indexOf("contact.maxwellsystems.com") > 0) {
		j$("a").each(function (i) {
			var ele = j$(this);
			var href = ele.attr("href");
			
			if(href.indexOf("/") === 0) {
				var newhref = "http://www.maxwellsystems.com" + href;
				ele.attr("href",newhref);
			}					
		});				
	}	
	
	if(window.location.pathname == "/myTraining" || window.location.pathname == "/myMigration"){
		initMyTrainingDialog();
	}
	if(window.location.pathname == "/HL_PCMX"){
		initMyVideosDialog();
	}
	if(window.location.pathname.toUpperCase() == "/MYVIDEOS" || window.location.pathname.toUpperCase() == "/MYSUPPORT_AIM_INSTALLATION"){
		initMyVideos();
	}	
	if(window.location.pathname == "/myTraining_Popup"){
		bindClicks();
	}
});

function showAlertDialog(divID, isMultiple, priorDialogName, closeURL) {
	var dlg = j$("#"+divID);				
	var myPos;
	var atPos;
	var ofPos;
	var offset;
	
	if(isMultiple) {
		myPos = "center top";
		atPos = "center bottom";
		ofPos = j$("#"+priorDialogName);
		offset = "0 50";

	}
	else {
		myPos = "center bottom";
		atPos = "center center";
		ofPos = j$(window);
		offset = "0";
	}
	
	dlg.dialog({
		autoOpen: true,
		width: 450,
		modal: !isMultiple,
		draggable: false,
		resizable: false,
		title: "ALERT!",
		close: function(event,ui) {
			if(closeURL) {
				window.parent.location = closeURL;
			} 
		},
		position: {
			my: myPos,
			at: atPos,
			of: ofPos,
			offset: offset
		}		     				  
	});
}

function closeIframe() {			
	j$("#popup-holder-iframe").dialog("close");
	return false;
}

function initMyVideosDialog(){	
	j$("#videoDownload").dialog({
    			dialogClass: "main",
    			width: 400,
    			height: 225,
    			hide: "fade",
    			show: "fade",
    			autoOpen: true,
    			resizable: false,
    			modal: true,
    			title: "Release Notes Video",
    			buttons: [{
    				text: "Yes, I want to view the videos",
    				click: function() {
    					window.open("/myVideos");
    					j$(this).dialog("close");
    				}
    			},{
    				text: "Skip Videos",
    				click: function() {
    					j$(this).dialog("close");
    				}
    			}]	
    		});
}

function initMyTrainingDialog(){
	j$("a.downloadLink").on('click', function() {
		var link = j$(this);
		webinarMessage(link.attr("url"), link.attr("campaignId"));
	});
	
	j$("#downloadLink").on("contextmenu", function(e) {
		createHistory('Webinar', j$(this).attr("campaignId"));
	});
	
	j$("#webinarDownload").dialog({
		dialogClass: "main",
		width: 450,
		height: 200,		
		hide: "fade",
		show: "fade",
		autoOpen: false,
		resizable: false,
		title: "Webinar Download",
		close: function(event, ui){
			j$("#downloadLink").attr({
				href: "",
				campaignId: ""
			});
		}
	});
}

function webinarMessage(urlForDownload, campaignId){	
	var anchor = j$("#downloadLink");
	anchor.attr({
		href: urlForDownload,
		campaignId: campaignId
	}).parents("#webinarDownload").dialog("open");
}	
function initMyVideos(){
	j$.each(j$(".video"), function(){
		j$(this).bind({
			click: function(){
				LaunchContent(j$(this).attr("id"));
			}
		});			
	});
}

function bindClicks() {
	j$("a.show-hide").bind("click", function() {
		var ele = j$(this);
		var index = ele.attr("attendeeIndex");
		var action = ele.attr("action");
		
		if(action == "show") {		
			j$("tr.atd-"+index).show();
			ele.attr("action", "hide");
			ele.text("Hide Details");
		}
		else if(action == "hide") {
			j$("tr.atd-"+index).hide();
			ele.attr("action", "show");
			ele.text("Show Details");
		}		
	});
	
	j$("div.event-course-details a").bind("click", function() {
		var parent = j$(this).parent();
		var courseId = parent.attr("courseId");
				
		var dlg_div = j$("div.course-details[courseId="+courseId);
		
		if(dlg_div.is(":data(dialog)")) {
			dlg_div.dialog("open");
		}
		else {
			dlg_div.dialog({
				dialogClass: "main",
				width: 600,
				height: 600,
				title: "Course Details",
				hide: "fade",
				show: "fade",
				autoOpen: true,
				modal: true,
				draggable: false,
				buttons: [{
					text: "Close", 
					"class": "pBlockButton",
					click: function() { j$(this).dialog("close")} 
				}]
			});
		}
	});
}

function LaunchContent(urlForVideo)	{
	var Safari =  (navigator.appVersion.indexOf("Safari") >= 0);
	var g_bChromeless = true;
	var g_bResizeable = true;
	var g_nContentWidth = 1160;
	var g_nContentHeight = 793;
	var g_strStartPage = urlForVideo;
	var g_strBrowserSize = "default";
	var nWidth = screen.availWidth;
	var nHeight = screen.availHeight;
	
	if (nWidth > g_nContentWidth && nHeight > g_nContentHeight && g_strBrowserSize != "fullscreen"){
		nWidth = g_nContentWidth;
		nHeight = g_nContentHeight;
		if (!Safari && !g_bChromeless){
			nWidth += 17;
		}
	}

	// Build the options string
	var strOptions = "width=" + nWidth +",height=" + nHeight;
	if (g_bResizeable){
		strOptions += ",resizable=yes"
	}
	else{
		strOptions += ",resizable=no"
	}

	if (g_bChromeless){
		strOptions += ", status=0, toolbar=0, location=0, menubar=0, scrollbars=0";
	}
	else{
		strOptions += ", status=1, toolbar=1, location=1, menubar=1, scrollbars=1";
	}

	// Launch the URL
	if (Safari){
		var oWnd = window.open("", "_blank", strOptions);
		oWnd.location = g_strStartPage;
	}
	else{
		window.open(g_strStartPage , "_blank", strOptions);
	}
}
var spinner;
var opts = {
  lines: 11, // The number of lines to draw
  length: 13, // The length of each line
  width: 6, // The line thickness
  radius: 10, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};