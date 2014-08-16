$(document).ready(function() {
	var currentUrlAddress = window.location.href;
	var customNotesFieldName = 'custom_notes__c';

	var signUpForms = $("form[action='https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'].sign-up-our-custom-form");

	signUpForms.find("input:not(:hidden)").attr("required", "");
	signUpForms.find("select").attr("required", "");
	signUpForms.find("textarea").attr("required", "");

	var forms = $("form[action='https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8']");
	forms.find("input[required]").attr("x-moz-errormessage", "Fill this field, please");
	forms.find("select[required]").attr("x-moz-errormessage", "Fill this field, please");
	forms.find("textarea[required]").attr("x-moz-errormessage", "Fill this field, please");

	forms.each(function() {
		var self = $(this);

		self.find("input[type=tel][transformer=intlTelInput]").intlTelInput({
			preferredCountries: [ "us", "ca", "au", "hk", "sg", "gb" ]
		});

		if(self.find("input[type=hidden][name=Itinerary__c]").length <= 0)
		{
			self.append('<input type="hidden" name="Itinerary__c" value="' + currentUrlAddress + '">');
		}
		else
		{
			self.find("input[type=hidden][name=Itinerary__c]").val(currentUrlAddress);
		}

		if(self.find("input[type=hidden][name=Came_from__c]").length <= 0)
		{
			self.append('<input type="hidden" name="Came_from__c" value="' + currentUrlAddress + '">');
		}
		else
		{
			if(self.find("input[type=hidden][name=Came_from__c]").val() == '')
			{
				self.find("input[type=hidden][name=Came_from__c]").val("currentUrlAddress");
			}
		}

		// country + phone

		self.find("select[name=country][transformer=selectize]").selectize
		({
			"dropdownParent":"body",
			onChange: function(value)
			{
				var phoneField = self.find("input[type=tel][name=phone]");
				var customNotesField = self.find('input[type=hidden][name='+ customNotesFieldName +']');

				if($.trim(value) != "")
				{
					if($.isNumeric(value))
					{
						phoneField.val("+" + parseInt(value) + " ");
						customNotesField.val("Country: " + "+" + value);
					}
					else
					{
						phoneField.val("");
						customNotesField.val("Country: " + value);
					}
				}

				// ...

				phoneField.focus();
			}
		});

		// country + phone

		var returnURLField = self.find("input[type=hidden][name=retURL]");
		returnURLField.val(returnURLField.val() + "?referrer=" + currentUrlAddress);
		self.on('submit', function() {
			var inputs = $(this).find("input[required]");
			var selects = $(this).find("select[required]");
			var textareas = $(this).find("textarea[required]");
			var fields = [inputs, selects, textareas];
			for(var i = 0; i < fields.length; i++)
			{
				for(var j = 0; j < fields[i].length; j++)
				{
					if(fields[i][j].value == '')
					{
						$(fields[i][j]).notify("Please, fill this field");
						return false;
					}
				}
			}

		});
	});
	$("a.print-tour").attr("href", currentUrlAddress.split("?")[0] + "?printVersion=true").attr("target", "_blank");
	if(currentUrlAddress.split("?")[1] == "printVersion=true")
	{
		var elementsToDelete = ["#copyright_area_wrapper", "#draggable_footer_wrapper", "#landing_header", "#header_container", ".wsite-button", "#toTop", ".zopim", ".email-tour-modal-window-button", "a.empty-link.print-tour", "td.single > a.artur-custom-button.artur-custom-button-red.contact-us-modal-window-button", "td.single > a.artur-custom-button.artur-custom-button-default.contact-us-modal-window-button"];
		for(var i = 0; i < elementsToDelete.length; i++)
		{
			$(elementsToDelete[i]).hide();
			$(elementsToDelete[i]).remove();
		}
		$(".landing-layout #content_wrapper").css({"top": "0px"});
		$("div#wsite-content").prepend("<div style='float: right; margin: -15px 0 15px 0;'>" + "<div style='margin-bottom: 20px;'></div>" + "<ul>" + "<li style='display: inline;'>US/Canada: 1-800-884-1721</li>" + "<li style='display: inline;'> Europe: +7 812 648 2457</li>" + "<li style='display: inline;'> Asia: +65 3159 0515</li>" + "<li style='display: inline;'> Email: info@firebirdtours.com</li>" + "</ul>" + "</div><div class='clear'></div>");
		window.print();
	}
	$(".contact-us-modal-window-button").on("click", function() {
		ArturModals.contactUs();
		return false;
	});
	$(".email-tour-modal-window-button").on("click", function() {
		ArturModals.emailTour();
		return false;
	});
	$("form#contact-us-modal-window .close-modal-window").on("click", function() {
		ArturModals.closeModalWindow("contact-us-modal-window");
		return false;
	});
	$("form#email-tour-modal-window .close-modal-window").on("click", function() {
		ArturModals.closeModalWindow("email-tour-modal-window");
		return false;
	});
	$("form#contact-us-modal-window").on("submit", function() {
		setTimeout(function() {
			$.cookie("do_not_show_idle_pop_up", 1, { expires: 30 });
			ArturModals.closeModalWindow("contact-us-modal-window", true);
			$.notify("Your message has been received. Thank you.", "success");
		}, 1000);
	});
	$("form#email-tour-modal-window").on("submit", function() {
		setTimeout(function() {
			ArturModals.closeModalWindow("email-tour-modal-window", true);
			$.notify("Thank you for sharing this program", "success");
		}, 1000);
	});

	if(($("body").attr("class").indexOf('landing') + 1) == 0 && $.cookie("do_not_show_idle_pop_up") != 1)
	{
		$.idleTimer(1000 * 3);
		$(document).bind("idle.idleTimer", function() {
			ArturModals.idlePopUp();
		});

		$("form#idle-pop-up-modal-window .close-modal-window").on("click", function() {
			$.cookie("do_not_show_idle_pop_up", 1, { expires: 1 });
			ArturModals.closeModalWindow("idle-pop-up-modal-window");
			return false;
		});

		$("form#idle-pop-up-modal-window").on("submit", function() {
			setTimeout(function() {
				$.cookie("do_not_show_idle_pop_up", 1, { expires: 30 });
				ArturModals.closeModalWindow("idle-pop-up-modal-window", true);
				$.notify("Welcome to FireBird Experiences! We have received your details and we promise to send you only relevant FireBird Tours updates.", "success");
			}, 1000);
		});
	}

	var da_data, clicky_custom;
	$(function() {
		setTimeout(function() {
			$.ajax({url: '//cdn.daddyanalytics.com/w/daddy.js', dataType: "script", cache: true, success: function() {
				da_data = init('{"da_token":"00NC0000005Geab","da_url":"00NC0000005Geah"}');
				clicky_custom = {session: {DaddyAnalytics: da_data}};
				$.ajax({url: '//hello.staticstuff.net/w/__stats.js', dataType: "script", cache: true, success: function() {
					try
					{
						clicky.init(100624337);
					} catch(e)
					{
					}
				}});
			}});
		}, 0);
	});
	var otherPhoneNumbersBlock = $("div.other-phone-numbers-wonderful-block");
	var currentPhoneNameAndNumberBlock = $("div.select-phone-by-region > div.phone-value");
	var availablePhoneNumbersCodes = ['US', 'EU', 'AS'];
	var regionGetParameter = currentUrlAddress.split("?region=")[1];
	if(regionGetParameter != undefined)
	{
		if($.inArray(regionGetParameter, availablePhoneNumbersCodes) != -1)
		{
			$.cookie("FT_CONTACT_PHONE_NUMBER_COUNTRY_CODE", regionGetParameter);
		}
		else
		{
			$.cookie("FT_CONTACT_PHONE_NUMBER_COUNTRY_CODE", availablePhoneNumbersCodes[0]);
		}
	}
	if($.cookie("FT_CONTACT_PHONE_NUMBER_COUNTRY_CODE") !== undefined)
	{
		var needListElement = $('div.other-phone-numbers-list > ul > li[data-code="' + $.cookie("FT_CONTACT_PHONE_NUMBER_COUNTRY_CODE") + '"');
		var countryCode = needListElement.data("code");
		var countryName = needListElement.data("name");
		var countryPhone = needListElement.data("number");
		currentPhoneNameAndNumberBlock.text(countryPhone + " " + countryName);
	}
	$("div.phone-value").on("click", function() {
		if(otherPhoneNumbersBlock.is(":visible"))
		{
			otherPhoneNumbersBlock.hide();
		}
		else
		{
			otherPhoneNumbersBlock.show();
		}
		return false;
	});
	$("div.other-phone-numbers-list > ul > li").on("click", function() {
		var self = $(this);
		var countryCode = self.data("code");
		var countryName = self.data("name");
		var countryPhone = self.data("number");
		otherPhoneNumbersBlock.hide();
		$("div.select-phone-by-region > div.phone-value").text(countryPhone + " " + countryName);
		$.cookie("FT_CONTACT_PHONE_NUMBER_COUNTRY_CODE", countryCode, {expires: 31});
		return false;
	});
	var htmlOfButton = '<a class="wsite-button wsite-button-small wsite-button-normal email-tour-modal-window-button" href="https://my.firebirdtours.com/en/my/overview">' + '<span class="wsite-button-inner">My account</span>' + '</a>';
	$("td#header-right td#search span.wsite-search").after(htmlOfButton);

});
