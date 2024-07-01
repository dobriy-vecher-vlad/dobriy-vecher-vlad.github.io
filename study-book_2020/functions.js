const basecolor = ['58,39,120','153,55,55','69,100,44','67,102,99','0,107,144','99,70,94','127,76,67','121,62,7','122,48,93','79,93,118'];
function loadJS(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
	s.onreadystatechange = s.onerror = function() {
		console.warn('Error loadJS!');
		constructionHead('error');
		constructionCard('error');
		constructionText('','error.js');
    };
    try { document.querySelector('script[async]').remove(); } catch(err) {}
    document.getElementsByTagName('head')[0].appendChild(s);
}
function constructionHead(type) {
	let html = '';
	let data = books;
	for(let x = 0; x < data.length; x++) {
		html += '<div class="button" data="'+data[x].href+'" onclick="window.open(`#'+data[x].href+'_index.js`, `_top`); location.reload();">'+data[x].name+'</div>';
	}
	document.querySelector('.headmenu').innerHTML = '';
	document.querySelector('.headmenu').insertAdjacentHTML('beforeend', html);
}
function constructionCard(type) {
	if (type != 'error' && type != 'index') {
		let body = books.find(card => card.href === type) == undefined ? books[0] : books.find(card => card.href === type);
		if (body.custom == false) {
			let data = body.titles;
			let html = '<div class="menu menu-1"><span class="name">'+body.title+'</span>';
			for(let x = 0; x < data.length; x++) {
				html += '<details class="details" head><summary tag="'+data[x].tag+'">'+data[x].title+'</summary>';
				for(let z = 0; z < data[x].titles.length; z++) {
					html += '<span onclick="constructionText(`'+body.href+'`, `/'+data[x].titles[z].href+'`); window.open(`#'+body.href+'_'+data[x].titles[z].href+'`, `_top`);"><a tag="'+data[x].titles[z].tag+'">'+data[x].titles[z].title+'</a></span>';
				}
				html += '</details>';
			}
			html += '</div>';
			document.querySelector('.name').insertAdjacentHTML('afterend', html);
			document.querySelector('label[for="trigger"]').setAttribute(`true`,``);
		}
		try { document.querySelector('.headmenu > .active').classList.remove('active'); } catch(err) {}
		document.querySelector('.headmenu > .button[data='+body.href+']').classList.add('active');
	}
}
function constructionText(book, index, type) {
	document.querySelector('#trigger').checked = false;
	loadJS('./pages/'+book+index, function() {
		if (typeof isScriptLoad != 'is not defined') {
			document.title = data.tag+' '+data.title;
			if (data.custom == false) {
				let html = '<div class="name"><span tag="'+data.tag+'">'+data.title+'</span></div><div class="text">'+data.text+'</div><div class="secondname"><span>'+data.description+'</span></div>';
				document.querySelector('.middle').innerHTML = '';
				document.querySelector('.middle').insertAdjacentHTML('beforeend', html);
				if (type == 1) {
					console.log(data.tag)
					document.querySelector('a[tag="'+data.tag+'"]').parentNode.parentNode.setAttribute(`open`,``);
				}
				try { document.querySelector('span[open]').removeAttribute('open'); } catch(err) {}
				document.querySelector('a[tag="'+data.tag+'"]').parentNode.setAttribute(`open`,``);
			} else {
				document.querySelector('.middle').innerHTML = '';
				document.querySelector('.middle').insertAdjacentHTML('beforeend', data.text.replace(/>[\s{2,}]+</g, '><'));
			}
		}
	})
}
function start() {
	let href = window.location.hash.substr(1);
	if (href != '') {
		try {
			let href_book = /(.*)_(.*)/gim.exec(href)[1];
			let href_page = '/'+/(.*)_(.*)/gim.exec(href)[2];
			constructionHead();
			constructionCard(href_book);
			constructionText(href_book,href_page,1);
		} catch(err) {
			console.warn(err);
			constructionHead('error');
			constructionCard('error');
			constructionText('','error.js');
		}
	} else {
		window.open(`#theoretical_index.js`, `_top`); location.reload();
		//constructionHead('index');
		//constructionCard('index');
		//constructionText('','index.js');
	}
}
document.addEventListener('DOMContentLoaded', function() {
	changeSettings({type: 'design'}), start();
});
window.onload = function () {
	document.querySelector('.loader').style = 'visibility: hidden; opacity: 0;'
}
function changeSettings(object, change) {
	if (object.type == 'design') {
		let html = '';
		html += '<div class="menu"><span class="name">Цветовая схема</span><div class="text">' + changeSettings({type: 'color'}, false) + changeSettings({type: 'theme'}, false) + '</div></div>';
		html += '<div class="menu"><div class="text"><div class="buttontext" onclick="localStorage.clear(); location.reload();">Сбросить сохранённые данные</div></div></div>';
		document.querySelector('.leftmenu').insertAdjacentHTML('beforeend', html);

		changeSettings({type: 'color', color: localStorage.getItem('color') == null ? 0 : localStorage.getItem('color')}, true);
		changeSettings({type: 'theme'}, true);
	}
	if (object.type == 'theme') {
		if (change == true) {
			if (document.querySelector('input['+object.type+']').checked) {
				document.querySelector('body').setAttribute('dark', '');
				localStorage.setItem(object.type, true);
			} else {
				document.querySelector('body').removeAttribute('dark');
				localStorage.setItem(object.type, false);
			}
		} else {
			let html = '<div class="titletext">Тёмная тема<input type="checkbox" toggle '+(localStorage.getItem('theme')==null||localStorage.getItem('theme')=='false'?'':'checked')+' onchange="changeSettings({type: `theme`}, true);" theme></div>';
			return html;
		}
	}
	if (object.type == 'color') {
		if (change == true) {
			localStorage.setItem('color', object.color);
			try { document.querySelector('.colorblock[active]').removeAttribute('active'); } catch(err) {}
			document.querySelector('.colorblock[index="'+object.color+'"]').setAttribute('active', '');
			document.querySelector('body').setAttribute('style', '--style-main: rgba('+basecolor[object.color]+',1);--style-second: rgba('+basecolor[object.color]+',0.25);');
		} else {
			let html = '<div>';
			basecolor.forEach(function(value, index) {
				html += '<div index="'+index+'" class="colorblock" onclick="changeSettings({type: `color`, color: `'+index+'`}, true);" style="background-color: rgba('+value+',1);"></div>';
			});
			html += '</div>';
			return html;
		}
	}
}
window.addEventListener('scroll', function() {
	window.pageYOffset > 1 ? document.querySelector('.head').classList.add('sticky') : document.querySelector('.head').classList.remove('sticky');
	window.pageYOffset > 1 ? document.querySelector('.scrollup').style = 'visibility: visible; opacity: 0.3;' : document.querySelector('.scrollup').style = 'visibility: hidden; opacity: 0;';
});