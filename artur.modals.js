var ArturModals = (function() {

	var Overlay = {
		idName: "artur-super-overlay",
		styles: {display: "none", position: "fixed", top: "0", right: "0", bottom: "0", left: "0", "z-index": "777", "background-color": "rgba(0, 0, 0, 0.5)"},
		create: function() {
			var overlay = $("<div></div>");
			overlay.attr("id", Overlay.idName);
			overlay.css(Overlay.styles);
			$("body").append(overlay);
		},
		remove: function() {
			$("#" + Overlay.idName).remove();
		},
		show: function() {
			$("#" + Overlay.idName).show();
		},
		hide: function() {
			$("#" + Overlay.idName).hide();
		}
	};

	var SecretIframe = {
		name: "secret-iframe",
		styles: {width: "0", height: "0", border: "0", opacity: "0"},
		create: function() {
			var secretIFrame = $("<iframe></iframe>");
			secretIFrame.attr("id", SecretIframe.name);
			secretIFrame.attr("name", SecretIframe.name);
			secretIFrame.attr("src", "");
			secretIFrame.css(SecretIframe.styles);
			$("body").append(secretIFrame);
		},
		remove: function() {
			$("#" + SecretIframe.name).remove();
		}
	};
	var ModalWindow = {
		ContactUs: {
			idName: "contact-us-modal-window",
			show: function() {
				$("#" + ModalWindow.ContactUs.idName).show();
			},
			hide: function(isResetNeed) {
				$("#" + ModalWindow.ContactUs.idName).hide();
				if(isResetNeed == true)
				{
					ModalWindow.ContactUs.resetValues();
				}
			},
			resetValues: function() {
				$("#" + ModalWindow.ContactUs.idName).trigger("reset");
			}
		},
		EmailTour: {
			idName: "email-tour-modal-window",
			show: function() {
				$("#" + ModalWindow.EmailTour.idName).show();
			},
			hide: function(isResetNeed) {
				$("#" + ModalWindow.EmailTour.idName).hide();
				if(isResetNeed == true)
				{
					ModalWindow.EmailTour.resetValues();
				}
			},
			resetValues: function() {
				$("#" + ModalWindow.EmailTour.idName).trigger("reset");
			}
		},
		IdlePopUp: {
			idName: "idle-pop-up-modal-window",
			show: function() {
				$.idleTimer("destroy");
				$("#" + ModalWindow.IdlePopUp.idName).show("slow");
			},
			hide: function(isResetNeed) {
				$("#" + ModalWindow.IdlePopUp.idName).hide();
				if(isResetNeed == true)
				{
					ModalWindow.IdlePopUp.resetValues();
				}
			},
			resetValues: function() {
				$("#" + ModalWindow.IdlePopUp.idName).trigger("reset");
			}
		},
		closeModalWindowByIdName: function(idName, isResetNeed) {
			switch(idName)
			{
				case "contact-us-modal-window":
					ModalWindow.ContactUs.hide(isResetNeed);
					break;
				case "email-tour-modal-window":
					ModalWindow.EmailTour.hide(isResetNeed);
					break;
				case "idle-pop-up-modal-window":
					ModalWindow.IdlePopUp.hide(isResetNeed);
					break;
			}
		}
	};

	var Support = {
		Scroll: {
			removeScroll: function() {
				if(($("body").get(0).scrollHeight > $("body").height()) == false)
				{
					$("body").css({"overflow": "hidden", "margin-right": Support.Scroll.getScrollBarWidth()});
				}
			},
			returnScroll: function() {
				$("body").css({"overflow": "auto", "margin-right": "0"});
			},
			getScrollBarWidth: function() {
				var inner = document.createElement('p');
				inner.style.width = "100%";
				inner.style.height = "200px";
				var outer = document.createElement('div');
				outer.style.position = "absolute";
				outer.style.top = "0px";
				outer.style.left = "0px";
				outer.style.visibility = "hidden";
				outer.style.width = "200px";
				outer.style.height = "150px";
				outer.style.overflow = "hidden";
				outer.appendChild(inner);
				document.body.appendChild(outer);
				var w1 = inner.offsetWidth;
				outer.style.overflow = 'scroll';
				var w2 = inner.offsetWidth;
				if(w1 == w2)
				{
					w2 = outer.clientWidth;
				}
				document.body.removeChild(outer);
				return(w1 - w2);
			}
		},
		ZIndex: {
			badElementsWithZIndex: [ {name: "#content_wrapper", oldZIndexValue: 3}, {name: "#header_container", oldZIndexValue: 3} ],
			removeZIndexes: function() {
				for(var i = 0; i < Support.ZIndex.badElementsWithZIndex.length; i++)
				{
					$(Support.ZIndex.badElementsWithZIndex[i].name).css({"z-index": 0});
				}
			},
			returnZIndexes: function() {
				for(var i = 0; i < Support.ZIndex.badElementsWithZIndex.length; i++)
				{
					$(Support.ZIndex.badElementsWithZIndex[i].name).css({"z-index": Support.ZIndex.badElementsWithZIndex[i].oldZIndexValue});
				}
			}
		}
	};

	return {
		contactUs: function() {
			Support.Scroll.removeScroll();
			Support.ZIndex.removeZIndexes();
			Overlay.create();
			Overlay.show();
			SecretIframe.create();
			ModalWindow.ContactUs.show();
		},
		emailTour: function() {
			Support.Scroll.removeScroll();
			Support.ZIndex.removeZIndexes();
			Overlay.create();
			Overlay.show();
			SecretIframe.create();
			ModalWindow.EmailTour.show();
		},
		idlePopUp: function() {
			Support.Scroll.removeScroll();
			Support.ZIndex.removeZIndexes();
			Overlay.create();
			Overlay.show();
			SecretIframe.create();
			ModalWindow.IdlePopUp.show();
		},
		closeModalWindow: function(modalWindowId, isWarningClose) {
			if(typeof isWarningClose === "undefined" || isWarningClose == false)
			{
				ModalWindow.closeModalWindowByIdName(modalWindowId, false);
			}
			else if(isWarningClose == true)
			{
				ModalWindow.closeModalWindowByIdName(modalWindowId, isWarningClose);
			}
			SecretIframe.remove();
			Overlay.hide();
			Overlay.remove();
			Support.ZIndex.returnZIndexes();
			Support.Scroll.returnScroll();
		}}
})();
