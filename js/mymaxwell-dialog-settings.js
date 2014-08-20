// Object: Dialog Setting
		// Use: To provide a centralized way to store dialog properties so they can be called through the website via div classes and using the div ID to determine which setting to use
		// Identifer: This is the key used for the record, currently div IDs throughout the site
		// SRC: The URL (relative) of the page the iframe's SRC attribute should be changed to
		// Width: Width of the dialog
		// Height: Height of the dialog
		// Title: Title of the dialog
		function DialogSetting(identifer, src, width, height, title){
		    this.identifer = identifer;
		    this.src = src;
		    this.width = width;
		    this.height = height;		    
		    this.title = title;
		}
		
		var defaultWidth = 630;
		var defaultHeight = 820;
			
		var myDialogs = [
			// Dialog Settings in the form of:
		 	// new DialogSetting(identifer, src, width, height, title)
			new DialogSetting("popup-open-case", "/mySupport_NewCase", defaultWidth, defaultHeight, "Open A Support Case"),
			new DialogSetting("popup-answer-center","/mySupport_AnswerCenter", defaultWidth, defaultHeight, "Support Answer Center"),
			new DialogSetting("popup-open-chat", "/mySupport_OpenChat", 530, 270, "Online Support Chat"),
			new DialogSetting("popup-activations", "/mySupport_Activations", 980, 600, "Activate Software"),
			new DialogSetting("popup-installation-advisor", "/mySupport_InstallationAdvisor", defaultWidth, defaultHeight, "Installation Advisor"),
			new DialogSetting("popup-AIM-installer", "/mySupport_AIM_Installation", 700, 320, "Advanced Image Manager Installer"),
			new DialogSetting("popup-mobile-connect", "/MobileConnect", defaultWidth, defaultHeight, "Manage Mobile Connect"),
			new DialogSetting("popup-enchantment-request", "/mySupport_NewER", defaultWidth, defaultHeight, "Enhancement Request Form"),
			new DialogSetting("popup-requestcontact-solution", "/myMaxwell_RequestContact?type=mySolution", 450, 530, "I'd like more information..."),
			new DialogSetting("popup-requestcontact-account", "/myMaxwell_RequestContact?type=myAccount", defaultWidth, 400, "I'd like more information..."),
			new DialogSetting("popup-requestcontact-migration", "/myMaxwell_RequestContact?type=myMigration", defaultWidth, 650, "Ask Viewpoint!"),
			new DialogSetting("popup-open-profile", "/myProfilePage", 600, 825, "My Profile"),
			new DialogSetting("popup-open-invoices", "/myAccount_OpenInvoices", 950, 700, "Open Invoices"),
			new DialogSetting("popup-training", "/myTraining_Popup", 700, 800, "Training Information")
		];
		
		function findDialogSetting(id) {			
			for (var x = 0; x < myDialogs.length; x++) {
				if(myDialogs[x].identifer == id) {
					return myDialogs[x];
				}
			}
		    return undefined;
		}
		
		function addSetting(newDialogSetting) {
			myDialogs.push(newDialogSetting);
		}