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
	document.querySelector('.menu-1').innerHTML = '';
	if (type != 'error' && type != 'index') {
		let body = books.find(card => card.href === type) == undefined ? books[0] : books.find(card => card.href === type);
		if (body.custom == false) {
			let data = body.titles;
			let html = '<span class="name">'+body.title+'</span>';
			for(let x = 0; x < data.length; x++) {
				html += '<details class="details" head><summary tag="'+data[x].tag+'">'+data[x].title+'</summary>';
				for(let z = 0; z < data[x].titles.length; z++) {
					html += '<details class="details"><summary tag="'+data[x].titles[z].tag+'">'+data[x].titles[z].title+'</summary>';
					for(let y = 0; y < data[x].titles[z].titles.length; y++) {
						html += '<span onclick="constructionText(`'+body.href+'`, `/'+data[x].titles[z].titles[y].href+'`); window.open(`#'+body.href+'_'+data[x].titles[z].titles[y].href+'`, `_top`);"><a tag="'+data[x].titles[z].titles[y].tag+'">'+data[x].titles[z].titles[y].title+'</a></span>';
					}
					html += '</details>';
				}
				html += '</details>';
			}
			document.querySelector('.menu-1').insertAdjacentHTML('beforeend', html);
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
					document.querySelector('a[tag="'+data.tag+'"]').parentNode.parentNode.setAttribute(`open`,``);
					document.querySelector('a[tag="'+data.tag+'"]').parentNode.parentNode.parentNode.setAttribute(`open`,``);
				}
				try { document.querySelector('span[open]').removeAttribute('open'); } catch(err) {}
				document.querySelector('a[tag="'+data.tag+'"]').parentNode.setAttribute(`open`,``);
			} else {
				document.querySelector('.middle').innerHTML = '';
				document.querySelector('.middle').insertAdjacentHTML('beforeend', data.text);
			}
		}
	})
}
let href = window.location.hash.substr(1);
if (href != '') {
	try {
		let href_book = /(.*)_(.*)/gim.exec(href)[1];
		let href_page = '/'+/(.*)_(.*)/gim.exec(href)[2];
		constructionHead();
		constructionCard(href_book);
		constructionText(href_book,href_page,1);
	} catch(err) {
		alert('Сообщите ошибку vk.com/xolova\n\nЛог ошибки:\n'+err);
		console.warn(err);
		constructionHead('error');
		constructionCard('error');
		constructionText('','error.js');
	}
} else {
	constructionHead('index');
	constructionCard('index');
	constructionText('','index.js');
}
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector('body').classList.add('showBlock');
});