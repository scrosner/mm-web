var j$ = jQuery.noConflict();
		
var count=0;

var subEnd = (window.location.href.indexOf('?') > 0 ? window.location.href.indexOf('?') : (window.location.href.indexOf('#') > 0 ? window.location.href.indexOf('#') : window.location.href.length));		 
var pgLocation = window.location.href.substring( window.location.href.indexOf('.com/') + 4, subEnd ).toLowerCase();
var isMyAccount = (pgLocation == "/myaccount");
var isMyMax = (pgLocation == "/mymaxwellhome");

var isActive = '';
var isNoServContract = '';
var isNoServAR = '';

/*Execute this code block once page DOM has fully loaded*/
j$(document).ready(function(){
	console.log("DialogHelper Init");
	var tabsNav = j$("#tabsNavigation a");
	var tabs = j$("#tabs .tab");
	j$(tabs[0]).show();
	j$(tabsNav[0]).addClass("active");
	
	tabsNav.each(function(index) {
		j$(this).click(function() {
			j$(tabsNav).removeClass("active");
			j$(tabs).hide();
			j$(tabs[index]).show();
			j$(this).addClass("active");	                
		});
	});
	
	console.log("Active: "+isActive);
	console.log("AR: "+isNoServAR);
	console.log("Con: "+isNoServContract);
	
	j$("#subnav-MyMax div.navElement2 a").each(function (i) {				
		var href = this.href.substring(this.href.indexOf('.com/') + 4, this.href.length).toLowerCase();
		if (href == pgLocation) {
			j$(this).addClass("selected");
			isMyMax = true;
		}
	});
	
	j$("div.leftnavcol div.parent div a").each(function (i) {
		var href = this.href.substring(this.href.indexOf('.com/') + 4, this.href.length).toLowerCase();
		if (href == pgLocation) {
			j$(this).parents(".parent").addClass("currentPage"); 
		} 
	});
			
	if((isNoServContract == "true" && isMyMax == true)) {
		showAlertDialog("dialog-Expired", false); 
	}
	if((isNoServAR == "true" && isMyMax == true)) {				
		if((isNoServContract == "true")) {					
			showAlertDialog("dialog-PastDue", true);
		}
		else {
			showAlertDialog("dialog-PastDue", false);
		}
	}
	
	j$(".iframe-opener").bind("click", function() {
		var iframe = j$("#popup-holder-iframe iframe"); // Main iframe to dispaly the page in
		var outputHolder = iframe.parent(); // Parent of the iframe, used as the jQueryUI Dialog
		var div = j$(this); // Current div we are binding the click event to
		
		var dialogSetting = findDialogSetting(div.attr("id"));		
		
		/*
		var regex_br = /<br\s*[\/]?>/gi; // Regex to replace <br> or <br/> tags with spaces
		var title = div.children("span, div.dialog-title").html(); // Title of the dialog which is the span or div (class dialog-title) element of the current div
						
		if(typeof title != 'undefined') {
			title = title.replace(regex_br," ");
		}
		*/
		
		if(typeof dialogSetting != "undefined") {				
			var newSRC = dialogSetting.src;
			if(window.location.href.indexOf('salesforce.com') > 0) {
				newSRC = "/apex" + newSRC;
			}
			var oldSRC = iframe.attr("src");
			
			// Only change the iframe SRC if a new div was clicked
			if(newSRC != oldSRC) {
				iframe.attr("src",newSRC); // Set the iframe SRC to the div ID
			}			
			
			/*
			var isActivations = (newSRC == "/mySupport_Activations");
			var isOpenChat = (newSRC == "/mySupport_OpenChat");
			
			var dlgHeight = (isActivations ? 600 : (isOpenChat ? 270 : 820));
			var dlgWidth = (isActivations ? 980 : (isOpenChat ? 530 : 630));
			*/
			
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
});

function clearField(element, text) {
	if(element.value == text) { element.value = ""; }
}

function resetField(element, text) {
	if(element.value == "") { element.value = text; } 
}

function showAlertDialog(divID, isMultiple) {
	var dlg = j$("#"+divID);
				
	var myPos;
	var atPos;
	var ofPos;
	var offset;			
	
	if(isMultiple) {
		myPos = "center top";
		atPos = "center bottom";
		ofPos = j$("#dialog-Expired");
		offset = "0 50";

	}
	else {
		myPos = "center bottom";
		atPos = "center center";
		ofPos = j$(document);
		offset = "0";
	}	
	
	dlg.dialog({
		autoOpen: !isMyAccount,
		width: 450,
		modal: !isMultiple,
		draggable: false,
		resizable: false,
		title: "ALERT!",
		close: function(event,ui) {
			if(!isMyAccount) {
				window.parent.location = "/myAccount";
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

function toggleSpin() {			
	j$('#spinner-div').spin("modal");			
}