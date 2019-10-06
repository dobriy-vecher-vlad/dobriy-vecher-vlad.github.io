var send = function(params, func) {
	var ajax = new XMLHttpRequest();
	ajax.open('GET', 'https://dobriy-vecher-vlad.github.io/work/test/db.php?'+params, true);
	ajax.onreadystatechange = function() {
		if ( ajax.readyState == 4 ) {
			if ( ajax.status == 200 ) {
				func(ajax.responseText);
			}
		}
	};
	ajax.send(null);
};

var setData = function() {
	var count = Number(document.querySelector('#count').value);
	var tap = Number(document.querySelector('#count').getAttribute('index-tap'));
	send('count='+count+'&tap='+tap, function(text) {
		console.log(text);
	});
};

var getData = function() {
	send('', function(text) {
		var jText = JSON.parse(text);
		console.log(jText);
		document.querySelector('#count').setAttribute('index-tap', jText.tap);
        document.querySelector('#count').setAttribute('value', jText.count);
		document.querySelector('#tap').setAttribute('value', jText.tap);
	});
};

function GetTap() {
	var count = Number(document.querySelector('#count').value);
	var tap = Number(document.querySelector('#count').getAttribute('index-tap'));
	document.querySelector('#count').setAttribute('value', (count + tap));
	document.querySelector('#tap').setAttribute('value', tap);
};

function ByTapLVL(price) {
	var count = Number(document.querySelector('#count').value);
	var tap = Number(document.querySelector('#count').getAttribute('index-tap'));
    if ( count < price ) {
        console.log('У вас нету денег!');
    }
    if ( count >= price ) {
		document.querySelector('#count').setAttribute('index-tap', (tap + (price/10)));
        document.querySelector('#count').setAttribute('value', (count - price));
		document.querySelector('#tap').setAttribute('value', tap);
    }
};

function ClearResult() {
	document.querySelector('#count').setAttribute('index-tap', 1);
	document.querySelector('#count').setAttribute('value', 0);
	document.querySelector('#tap').setAttribute('value', 1);
}

let timerId = setInterval(() => GetTap(), 1000);