var j$ = jQuery.noConflict();
var mm_timeout = 250;
var $mm_timer = 0;

j$.fn.capitalize = function () {
	j$.each(this, function () {
		var split = this.value.split(' ');
		for (var i = 0, len = split.length; i < len; i++) {
			split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1).toLowerCase();
		}
		this.value = split.join(' ');
	});
	return this;
};

j$(document).ready(function() { 
	// Mega Menu functionality
	
	// Call MM plugin on our main nav
	j$(".main-nav").megamenu({ "enable_js_shadow":false });
				
	// Recreated mega menu logic to make a standalone menu like our My Maxwell nav work
	j$(".mymaxwell-nav li").click(function(e) {
		e.stopPropagation();
	}).mouseenter(function(e) {				
		e.stopPropagation();
		var ele = j$(this);
		
		clearTimeout($mm_timer);
		$mm_timer = setTimeout(function() {
			var $mm = ele.parents("ul");
			var $link = ele.find("a:first");
			var $menu = ele.find("div:first");
			
			// Add hover class to anchor
			$link.addClass("hover-link");
			
			// Set menu position
			$menu.css({
				"top": ($link.offset().top + $link.outerHeight()) - 1 +"px",
				"left": ($link.offset().left) - 5 + "px"
			});
			
			// Set horizontal position
			var nav_right = $mm.offset().left + $mm.outerWidth();
			var content_right = $link.offset().left + $menu.outerWidth() - 5;
			
			if(content_right > nav_right) {
				$menu.css({ "left": ($link.offset().left - (content_right - nav_right)) + 33 + "px" });
			}
			
			$menu.slideDown("fast");							
		}, mm_timeout);		
	}).mouseleave(function(e) {
		e.stopPropagation();
		clearTimeout($mm_timer);
		
		var ele = j$(this);
		var mm_link = ele.find("a:first");			
		var mm_content = ele.find("div:first");
		
		// Slide the menu up and remove the hover class in the callback so it's removed once the animation is completed.
		mm_content.slideUp("fast", function() {
			mm_link.removeClass("hover-link");
		});			
	});
	
	// Image overlay sliders
	j$(".image-container").hover(function () {					
		j$(this).find(".overlay").stop(true,true).slideToggle("normal");				
	}, function() {				
		j$(this).find(".overlay").stop(true,true).slideToggle("normal");					
	});
	
	// Autoclear on input fields based on label
	j$("input[type='text'].autoclear").bind("click focus", function() {
		var ele = j$(this);				
		if(ele.attr("default") == undefined) {
			ele.attr("default", ele.val()).val("");
		}
		else {
			if(ele.val() == ele.attr("default")) ele.val("");
		}
	}).blur(function() {
		var ele = j$(this);
		if(ele.val().trim() == "") {
			ele.val(ele.attr("default"));
		}
	}).capitalize();
	
	// Schedule Demo in header dialog opener
	j$("#schedule-demo-clicker").focus().click(function() {
		j$("#schedule-demo").dialog({
			height: 420,
			width: 270,
			title: "Schedule A Demo",
			dialogClass: "demo",
			show: "fade",
			hide: "fade",
			open: function(ui, event) {												
				j$("#schedule-demo input.autoclear").first().blur();						
			}
		});			
	});

	// Validation for input fields for Schedule Demo
	j$(".max-form input[type='text'], .max-form select").each(function() {
		var ele = j$(this);
		ele.attr("default", ele.val());
		j$("<div></div>").addClass("valid-flag").appendTo(ele.parent());
	}).blur(function() {
		processBlur(j$(this));
	});
	
	// Search box addition to allow Enter to submit the search
	j$(".search-input").keydown(function() {
		if(event.keyCode == 13) {
			doSearch(this.value);
			return false;
		}
	});
	//drill down functionality
	j$(".drill-down").click(function() {				
		j$(this).next(".drill-content").toggle();			
	});
	
	j$(".featured-teaser hr").remove();
	j$(".col-right-sm .teaser hr").remove();
	
	var browser = j$.browser;
	
	if(browser.webkit || browser.mozilla || (browser.msie && browser.version >= 9) || j$.cookie("MX_browser_warning_ignore") == "true") {
		// Do nothing, we are on a supported browser or the user has already ignored this message.
	}
	else {
		j$("#dialog-browser-warning").dialog({
			height: 270,
			width: 450,
			title: "Please Upgrade Your Browser!",
			modal: true,
			autoOpen: true,
			dialogClass: "warning",
			open: function(ui, event) {												
				j$(".browser-links a").first().blur();						
			},
			buttons: [
				{ text: "Continue", click: function() { j$(this).dialog("close"); } },
				{ text: "Ignore and don't remind me again", click: function() { 
						j$.cookie("MX_browser_warning_ignore", true, { expires: 10000, path: "/" } );
						j$(this).dialog("close"); 
					}
				}
			]
		});
	}
	
	j$(".fakepassword").bind("focus", function() {
		var ele = j$(this);
		ele.hide().next("input.realpassword").show().focus();		
	});
	
	j$(".realpassword").bind("blur", function() {
		var ele = j$(this);
		if(ele.val() == '') {
			ele.hide().prev("input.fakepassword").show();		
		}
	});
});

j$(function() {
	// Homepage image slides
	if(j$(".slide-images").length) {
		j$(".slide-images").cycle({
			fx:     "scrollHorz",
			prev:   ".prev",
			next:   ".next",			
			timeout:  10000,
			speed:    1500
		});
	}	
});

function doCookieBrowserWarning(dlg) {	
	
}
//sets shadowboxes to load properly - useful if original shadowbox links hidden
function prepareShadowboxes(){
	Shadowbox.setup("a.shadowbox");
}
//IE9 AJAX workaround... Rerender on forms don't work, need to toggle input
function hideForm(){
	if (jQuery.browser.msie == true) { 
		if (jQuery.browser.version == 9.0){
			j$(":input").toggle();
			j$(".resource-form").toggle();
		}
	}
}
		
function doSearch(query) {
	window.open("/search?q="+query);
}

function processBlur(ele) {
	var isValid = false;
	var eleDefault = ele.attr("default");
	
	isValid = (ele.val() != eleDefault);
	
	if(ele.hasClass("email")) isValid = isValidEmailAddress(ele.val());	
	if(ele.attr("default").toLowerCase() == "confirm email") { isValid = ele.val() == j$("#tblForm input.email").val();	}
	
	ele.next(".valid-flag").toggleClass("valid", isValid);
	ele.attr("valid", isValid);
	
	if(isValid) ele.removeClass("invalid");
}

function isValidEmailAddress(emailAddress) {
	if(emailAddress.toLowerCase()=="username@domain.com") //default email address entry (reg expression will find this valid, so we have to filter it)
		return false;
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
};

function validateSubmit() {			
	var isAllValid = true;
	j$(".max-form input.autoclear, .max-form select").each(function(i) {				
		if(j$(this).attr("valid") != "true") {
			j$(this).addClass("invalid");
			isAllValid = false;
		}				
	});
	
	if(isAllValid) {
		toggleSpin();
		addGaEvent("Forms", "Submit", window.location.pathname);
	}

	return isAllValid;
}

//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function setSEOValue() {
	try {		
		var UTMZ="__utmz=";
		var pagecookies = document.cookie;
		var cookielist = pagecookies.split(";");
		
		for(var i=0; i<cookielist.length; i++){
			var parsedcookies=cookielist[i];
			while(parsedcookies.charAt(0)==" ") {
				parsedcookies = parsedcookies.substring(1,parsedcookies.length);
			}
			if(parsedcookies.indexOf(UTMZ)==0){
				var seo = parsedcookies.substring(UTMZ.length,parsedcookies.length);
				var fldSEO = j$("input.seo-cookie");
				fldSEO.val(seo);
			}
		}
	} catch(ex) {
		if(typeof console !== 'undefined') console.log(ex);
	}
}

function addGaEvent(cat, action, label) {
	pageTracker._trackEvent(cat, action, label);
}