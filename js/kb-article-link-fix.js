// This script removes absolute links to a .com site from the div.centercol class of the site and replaces it with a relative link
// Used for Answer Center article pages primarily

var domainsToReplace = ["salesforce.com", "/?startURL="];

var j$ = jQuery.noConflict();

j$(document).ready(function() {
	j$("div.centercol a").each(function(i) {
		var e = j$(this);
		var	ref = e.attr("href");
		
		for(var x=0; x < domainsToReplace.length; x++) {
			var domain = domainsToReplace[x];

			if(typeof ref != "undefined" && ref.charAt(0) != "/" && ref.indexOf(domain) > 0) {								
				e.attr("href", ref.substring(ref.indexOf(domain) + domain.length, ref.length));
			}
		}
	});
});