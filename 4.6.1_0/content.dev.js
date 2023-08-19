console.log('dev')
// const faCDN = 'https://use.fontawesome.com/a707992745.js'
const localContent = 'https://localhost:8011/content-bundle.js'
//
function appendScript(url) {
	const script = document.createElement( 'script' )
	script.type = 'text/javascript'
	script.src = url
	document.body.appendChild(script);
}
chrome.runtime.sendMessage({message: 'loadContent'})
//
appendScript(localContent)

var onloadcallback = function() {
	console.log('ready')
}


// var s = document.createElement('script')
