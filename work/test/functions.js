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
			document.querySelector('.time').insertAdjacentHTML('afterend', html);
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
$(window).on('load', function() {
	$.when( changeSettings('theme', false), start(), changeColor(false) )
	.done(function(){
		$('.loader').delay(200).fadeOut(500);
	});
});
function changeColor(change, color) {
	let basecolor = [['58,39,120','153,55,55','69,100,44','67,102,99','0,107,144','99,70,94','127,76,67','121,62,7','122,48,93','79,93,118'],['32,31,54','55,35,38','34,46,35','34,47,49','17,48,60','42,39,48','49,40,41','47,37,26','48,33,47','37,44,54']];
	if (change == true) {
		localStorage.setItem('color', color);
		document.querySelector('.colorblock[active]').removeAttribute('active');
		document.querySelector('.colorblock[index="'+color+'"]').setAttribute('active', '');
		let rgb = basecolor[localStorage.getItem('theme') == 'false' ? 0 : 0][color];
		let main = '--style-main: rgba('+rgb+',1);';
		let second = '--style-second: rgba('+rgb+',0.25);';
		document.querySelector('body').setAttribute('style', main+second);
	} else {
		let rgb = localStorage.getItem('color') == null ? 0 : localStorage.getItem('color');
		let color = '<span class="name">Цветовая схема</span><div class="text">';
		for (let x = 0; x < basecolor[0].length; x++) {
			color += '<span index="'+x+'" class="colorblock" onclick="changeColor(true,`'+x+'`);" style="background-color: rgba('+basecolor[0][x]+',1);" '+(x==rgb?'active':'')+'></span>';
		}
		color += '<div class="titletext">Тёмная тема<input type="checkbox" toggle '+(localStorage.getItem('theme')=='true'?'checked':'')+' onchange="changeSettings(`theme`, true);" theme></div>';
		color += '<div class="buttontext" onclick="localStorage.clear(); location.reload();">Сбросить сохранённые данные</div>';
		document.querySelector('.color').insertAdjacentHTML('beforeend', color);
		changeColor(true, rgb);
	}
}
function changeSettings(type, change) {
	if (type == 'theme') {
		if (change == true) {
			if (document.querySelector('input['+type+']').checked) {
				document.querySelector('body').setAttribute('dark', '');
				localStorage.setItem(type, true);
			} else {
				document.querySelector('body').removeAttribute('dark');
				localStorage.setItem(type, false);
			}
			let rgb = localStorage.getItem('color') == null ? 0 : localStorage.getItem('color');
			changeColor(true, rgb);
		} else {
			if (localStorage.getItem('theme') == null) {
				localStorage.setItem(type, false);
			} else if (localStorage.getItem('theme') == 'false') {
				localStorage.setItem(type, false);
			} else {
				document.querySelector('body').setAttribute('dark', '');
				localStorage.setItem(type, true);
			}
		}
	}
}
$(window).scroll(function() {
	if ($(this).scrollTop() > 1){
		$('.head').addClass("sticky");
	}
	else{
		$('.head').removeClass("sticky");
	}
});
$(document).ready(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});
	$('.scrollup').click(function() {
		$("html, body").animate({
		scrollTop: 0
	}, 400);
		return false;
	});
});