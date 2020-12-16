let basecolor = ['108,92,255','255,92,92','138,200,88','134,204,198','0,134,181','165,117,157','213,128,112','202,104,13','204,81,156','132,156,197'];
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
		showNotification('SITE API', 'Невозможно загрузить файл по пути <span style="background-color: var(--line); border-radius: 4px; padding: 4px; color: var(--text-main-black);">'+src+'</span>.', false);
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
	document.querySelector('.time').innerHTML = '';
	let time = `
		<span class="name">Сейчас</span>
		<div class="text"><i class="far fa-clock"></i>  `+moment().format('Do MMMM, dddd, h:mm a');+`</div>
	`;
	document.querySelector('.time').insertAdjacentHTML('beforeend', time);
	if (type != 'error' && type != 'index') {
		let body = books.find(card => card.href === type) == undefined ? books[0] : books.find(card => card.href === type);
		if (body.custom == false) {
			let data = body.titles;
			let html = '<div class="menu menu-1"><span class="name">'+body.title+'</span>';
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
					document.querySelector('a[tag="'+data.tag+'"]').parentNode.parentNode.setAttribute(`open`,``);
					document.querySelector('a[tag="'+data.tag+'"]').parentNode.parentNode.parentNode.setAttribute(`open`,``);
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
			alert('Сообщите ошибку vk.com/xolova\n\nЛог ошибки:\n'+err);
			showNotification('SITE API', err, false);
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
}
function getip() {
	try {
		$.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function(data) {
			console.log(data);
			document.querySelector('.ip').innerHTML = '';
			let ip = `
				<span class="name">ПОСЕТИТЕЛЬ</span>
				<div class="text">
					<i class="far fa-database"></i>  `+data.geoplugin_request+`<br>
					<i class="far fa-globe"></i>  `+data.geoplugin_countryName+`<br>
					<i class="far fa-flag-alt"></i>  `+data.geoplugin_region+`<br>
					<i class="far fa-city"></i>  `+data.geoplugin_city+`<br>
				</div>
			`;
			document.querySelector('.ip').insertAdjacentHTML('beforeend', ip);
		});
	} catch(err) {

	}
}
$(window).on('load', function() {
	$.when( start(), changeColor('load'), changeSettings('theme'), changeSettings('notification')/*, getip()*/ )
	.done(function(){
		$('.loader').delay(200).fadeOut(500);
	});
});



function vkopenapi(owner_id, offset, count) {
	return new Promise(function(resolve) {
		VK.init({
			apiId: 7108293
		});
		let v = '5.103';
		let random = getRandom(1,999999);
		let filter = 'owner';
		VK.Api.call('wall.get', {owner_id: owner_id, offset: offset, count: count, filter: filter, v: v}, function(r) {
			if (Object.keys(r)[0] == 'response') {
				resolve(r.response);
			}
			if (Object.keys(r)[0] === 'error') {
				showNotification('VK API', 'Ошибка получения записей от источника '+owner_id+'!', false);
			}
		});
	});
}/*
vkopenapi(-161807458, 0, 20).then(function(response) {
	console.log(response);
});
*/

function showNotification(name, text, close) {
	if (localStorage.getItem('notification') == 'false' || close == false) {
		let index = getRandom(1,999999);
		let tooltip_body = '<div style="display: none;" class="menu" notification="'+index+'">'+(close==false?'<i class="pin fas fa-thumbtack" pin></i>':'<i class="pin fas fa-dot-circle" circle></i>')+'<span class="name">'+name+'</span><div class="text">'+text+'</div></div>';
		document.querySelector('.rightmenu').insertAdjacentHTML('beforeend', tooltip_body);
		$('div[notification="'+index+'"]').slideDown(500);
		if (close == true) {
			closeNotification(index);
		}
	}
}
function closeNotification(index) {
	let timeout = 5000;
	setTimeout(function() {
		$('div[notification="'+index+'"]').slideUp(500, function() {
	    	document.querySelector('div[notification="'+index+'"]').remove();
		});
	}, timeout);
}
function changeColor(type, color) {
	if (type == 'load') {
		let rgb = localStorage.getItem('color') == null ? 0 : localStorage.getItem('color');
		let color = '<span class="name">Цветовая схема</span><div class="text">';
		for (let x = 0; x < basecolor.length; x++) {
			color += '<span index="'+x+'" class="colorblock" onclick="changeColor(`set`,`'+x+'`);" style="background-color: rgba('+basecolor[x]+',1);" '+(x==rgb?'active':'')+'></span>';
		}
		color += '<div class="titletext">Тёмная тема<input type="checkbox" toggle '+(localStorage.getItem('theme')=='true'?'checked':'')+' onchange="changeSettings(`theme`);" theme></div>';
		color += '<div class="titletext">Уведомления<input type="checkbox" toggle '+(localStorage.getItem('notification')=='true'?'checked':'')+' onchange="changeSettings(`notification`);" notification></div></div>';
		color += '<div class="buttontext" onclick="localStorage.clear(); location.reload();">Сбросить сохранённые данные</div>';
		document.querySelector('.color').insertAdjacentHTML('beforeend', color);
		changeColor('set', rgb);
	}
	if (type == 'set') {
		localStorage.setItem('color', color);
		document.querySelector('.colorblock[active]').removeAttribute('active');
		document.querySelector('.colorblock[index="'+color+'"]').setAttribute('active', '');
		let rgb = basecolor[color];
		let main = '--style-main: rgba('+rgb+',1);';
		let second = '--style-second: rgba('+rgb+',0.25);';
		document.querySelector('body').setAttribute('style', main+second);
		showNotification('SITE API', 'Успешно применён <span style="background-color: rgba('+rgb+',1); border-radius: 4px; padding: 4px; color: var(--text-main-white);">новый стиль</span>.', true)
	}
}
function changeSettings(type) {
	if (type == 'theme') {
		if (document.querySelector('input['+type+']').checked) {
			document.querySelector('body').setAttribute('dark', '');
			localStorage.setItem(type, true);
	    }
		else {
			document.querySelector('body').removeAttribute('dark');
			localStorage.setItem(type, false);
		}
	}
	if (type == 'notification') {
		if (document.querySelector('input['+type+']').checked) {
			localStorage.setItem(type, true);
	    }
		else {
			localStorage.setItem(type, false);
		}
	}
	showNotification('SITE API', 'Успешно переключён стиль <span style="background-color: var(--line); border-radius: 4px; padding: 4px; color: var(--text-main-black);">'+type+'</span>.', true)
}


function check_speed() {
    sessionStorage.now = Date.now();
    setTimeout(check_speed, 25);
}
window.onload = function() {
    let now = Date.now();
    if ( sessionStorage.now ) {
        let loaded = (now - parseInt(sessionStorage.now))/1000;
        showNotification('SITE API', 'Страница загружена за <span style="background-color: var(--line); border-radius: 4px; padding: 4px; color: var(--text-main-black);">'+loaded+'</span> мс.', false)
    }
    check_speed();
};


showNotification('SITE API', `Проверка работы оповещений.<div class="buttontext" onclick="showNotification('Оповещение', 'Это проверочное оповещение, которое не закроется.', false);"><i class="far fa-bell"></i>  showNotification</div><div class="buttontext" onclick="showNotification('Оповещение', 'Это проверочное оповещение, которое закроется.', true);"><i class="far fa-bell-slash"></i>  showNotification</div>`, false);