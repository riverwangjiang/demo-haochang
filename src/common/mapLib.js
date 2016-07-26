let $ = require('jquery');

function setTitle(value){
	var $body = $('body');
	document.title = value;
	var $iframe = $('<iframe src="/assets/favicon.ico"></iframe>');
	$iframe.on('load',function() {
	    setTimeout(function() {
	        $iframe.off('load').remove();
	    }, 0);
	}).appendTo($body);
}

module.exports = {
	setTitle : setTitle
}