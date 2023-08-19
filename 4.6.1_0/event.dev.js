const faCDN = 'https://use.fontawesome.com/a707992745.js'
const recaptchaUrl = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// console.log(sender.tab ?
		//             "from a content script:" + sender.tab.url :
		//             "from the extension");
		if (request.message === 'loadReCaptcha') {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.executeScript(tabs[0].id, {code: recaptchaUrl})
			})
		}
		if (request.message == "loadContent") {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", faCDN, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
						// WARNING! Might be evaluating an evil script!
						// var resp = eval("(" + xhr.responseText + ")");
						// Or this if it's work
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
							chrome.tabs.executeScript(tabs[0].id, {code: xhr.responseText});
								// $.get("http://127.0.0.1:8000/static/plugin/somesite.js", function(result) {
								//     chrome.tabs.executeScript(tabs[0].id, {code: result});
								// }, "text");
						});
						return true
				}
			}
			xhr.send();
		}
})
