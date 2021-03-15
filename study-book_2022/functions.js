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
		window.open('?list=error', '_top');
	};
	try { document.querySelector('script[async]').remove(); } catch(error) {}
	document.getElementsByTagName('head')[0].appendChild(s);
}
function addFave(e) {
	let faves = localStorage.getItem('faves') == null ? {} : JSON.parse(localStorage.getItem('faves'));
	let tag = document.querySelector('title').getAttribute('tag');
	let title = document.querySelector('title').getAttribute('title');
	let page = document.querySelector('title').getAttribute('page');
	let preview = document.querySelector('.middle > .text > p') !== null ? document.querySelector('.middle > .text > p').textContent.slice(0, 350) : 'На странице нет стандартного текста, либо он не обнаружен.';
	let image = document.querySelector('.middle > .text > .img') !== null ? document.querySelector('.middle > .text > .img').style.backgroundImage : null;
	faves[`${page}_${tag.replace(/\./gi, '')}`] = {tag: (tag.length == 0 ? '#' : tag), title: title, preview: preview, image: image, href: window.location.search};
	localStorage.setItem('faves', JSON.stringify(faves));
	if (e !== undefined) {
		e.innerHTML = '<span icon="&#xf00c">В избранном</span>';
		e.setAttribute('disabled', '');
		e.removeAttribute('onclick');
	}
	changeSettings({type: 'faves'})
}
function copyText(text) {
	document.body.insertAdjacentHTML('beforeend', `<input class="copy-wrap"></input>`);
	let warp = document.querySelector('.copy-wrap');
	warp.value = text;
	warp.select();
	document.execCommand('copy');
	warp.remove();
}
function openModal(data) {
	if (typeof data == 'object') {
		document.querySelector('.modal-wrap').innerHTML = `
			<div ${data.type} class="modal-container" ${data.width !== undefined ? 'style="width: '+data.width+'"' : ''}>${data.html}
				<div class="buttons modal-control" inline>
					<div scale class="button icon round s" onclick="closeModal();"><span><i class="fas fa-times"></i></span></div>
				</div>
			</div>
		`;
		document.querySelector('html').setAttribute('modal', '');
		document.querySelector('.modal-wrap').addEventListener('click', closeModal);
		document.querySelector('.modal-container').addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			return false;
		});
	}
}
function closeModal() {
	document.querySelector('.modal-wrap').innerHTML = '';
	document.querySelector('html').removeAttribute('modal');
}
function constructionHead(type) { // режим
	let html = '';
	let data = books;
	// сборщик .button
	data.forEach(item => {
		html += `<a scale class="button icon secondary l header" prompt="${item.title}" data="${item.href}" href="?page=${item.href}"><span>${item.name}</span></a>`;
	});
	document.querySelector('.headmenu').innerHTML = html;
	// снимает активные классы с главных кнопок в head
	document.querySelectorAll('.headmenu > div').forEach(item => {
		item.classList.remove('active');
	});
	// устанавливает активный класс кнопке по текущей странице
	try { document.querySelector('.headmenu > [data='+type+']').classList.add('active'); } catch(error) {}
}
function constructionCard(type) { // режим
	if (type != 'error' && type != 'index' && type != null) { // если не ошибка
		// поиск объекта настроек бокового меню
		let body = books.find(card => card.href === type) == undefined ? books[0] : books.find(card => card.href === type);
		// устанавливает тип страницы
		document.body.setAttribute('custom', body.custom);
		if (body.custom == false) { // если страница не кастомная
			let data = body.titles;
			// сборщик .menu-content
			let html = `<div class="menu menu-content"><span class="name">${body.title}</span>`;
			data.forEach((item) => {
				html += `<details class="details" head><summary scale tag="${item.tag}">${item.title}</summary>`;
				item.titles.forEach((item) => {
					html += `<a href="?page=${body.href}&list=${item.href}"><span scale tag="${item.tag}">${item.title}</span></a>`;
				});
				html += '</details>';
			});
			html += '</div>';
			document.querySelector('.leftmenu').insertAdjacentHTML('beforeend', html);
			// сборщик .description
			let description = `
			<div class="content">
				<div class="content-head">
					<div>${body.description.name}</div>
					<div>${body.description.text}</div>
				</div>
				<div class="content-bottom">
					<div class="content-scroll">
						<div>${body.description.name}</div>
						<div>${body.description.text}</div>
					</div>
					<div class="content-buttons buttons" inline>
						<div scale icon_left class="button primary m b" onclick="copyText('${window.location.href}');"><span icon="&#xf0c1">Скопировать ссылку</span></div>
						${localStorage.faves !== undefined ? localStorage.faves.includes(`"${window.location.search}"`) ? '<div scale icon_left class="button primary m b" disabled><span icon="&#xf00c">В избранном</span></div>' : '<div scale icon_left class="button primary m b" onclick="addFave(this);"><span icon="&#xf005">Добавить в избранное</span></div>' : '<div scale icon_left class="button primary m b" onclick="addFave(this);"><span icon="&#xf005">Добавить в избранное</span></div>'}
					</div>
				</div>
			</div>
			`;
			document.querySelector('.description').insertAdjacentHTML('beforeend', description);
		}
		// расчёт пикселей для закрепления левого меню
		document.querySelector('.leftmenu').style.top = document.querySelector('.description').offsetHeight-(document.querySelector('.description').offsetHeight-document.querySelector('.head').offsetHeight-(document.querySelector('.description').offsetHeight !== 0 ? document.querySelector('.content-bottom').offsetHeight+20 : 0))+20;
	}
}
function constructionText(page, list) { // ссылка на папку, ссылка на файл, первая загрузка(1 - да)
	loadJS(`./pages/${page === 'null' ? '' : `${page}/`}${list === 'null' ? 'index' : `${list}`}.js`, function() {
		if (typeof isScriptLoad != 'is not defined') { // если страница подгрузилась
			document.title = `${data.tag} ${data.title}`;
			document.querySelector('title').setAttribute('tag', data.tag);
			document.querySelector('title').setAttribute('title', data.title);
			document.querySelector('title').setAttribute('page', page === 'null' ? list : page);
			if (data.custom == false) {
				// сборщик .middle
				let html = `
					<div class="title" tag="${data.tag}">${data.title}</div>
					<div class="text">${data.text}</div>
					<div class="secondtitle">${data.description}</div>
				`;
				document.querySelector('.middle').innerHTML = html;
				// устанавливает страницу активной в меню при загрузке
				document.querySelector('details [tag="'+data.tag+'"]').parentNode.parentNode.setAttribute('open', '');
				document.querySelector('details [tag="'+data.tag+'"]').parentNode.setAttribute('open', '');
				// устанавливает краткое описание в .description
				document.querySelectorAll('.content-scroll > div')[0].innerHTML = data.tag;
				document.querySelectorAll('.content-scroll > div')[1].innerHTML = data.title;
			} else { // если страница не текстовая
				// сборщик страницы
				document.querySelector('.middle').innerHTML = data.text.replace(/>[\s{2,}]+</g, '><');
			}
		} else { // если страница не подгрузилась
			window.open('?list=error', '_top');
		}
	});
}


async function getPage(body) {
	try {
		let data = await fetch(`./pages/${body.join('/')}.json`);
		data = await data.json();
		return data;
	} catch (error) {
		window.open('?list=error', '_top');
	}
}
async function startPage() {
	try {
		changeSettings({type: 'theme'}), changeSettings({type: 'faves'});
		let url = new URLSearchParams(window.location.search);
		if (url.get('page') || url.get('list')) {
			let body = [];
			url.get('page') ? body.push(url.get('page')) : '';
			url.get('list') ? body.push(url.get('list')) : body.push('index');
			
			let data = await getPage(body);

			constructionCard(url.get('page'));
			constructionText(`${url.get('page')}`, `${url.get('list')}`);
		} else {
			window.open(`?page=theoretical`, `_top`);
		}
	} catch (error) {
		window.open('?list=error', '_top');
	}
}
startPage();


function start() {
	// получаем запросы из строки url
	let url = new URLSearchParams(window.location.search);
	constructionHead(`${url.get('page')}`);
	if (url.get('page') !== null || url.get('list') !== null) { // если есть информация о page или list, то загружаем их
		constructionCard(url.get('page')); constructionText(`${url.get('page')}`, `${url.get('list')}`);
	} else { // если нет, то выкидываем на стартовую страницу
		window.open(`?page=theoretical`, `_top`);
		//constructionCard(url.get('page')); constructionText(`${url.get('page')}`, `${url.get('list')}`);
	}
}
function changeSettings(object, change) { // объект[данные], изменение настроек(true - да)
	if (object.type == 'theme') {
		if (change == true) {
			if (document.body.getAttribute('dark') == null) {
				document.querySelector('body').setAttribute('dark', '');
				localStorage.setItem(object.type, true);
			} else {
				document.querySelector('body').removeAttribute('dark');
				localStorage.setItem(object.type, false);
			}
		} else {
			localStorage.getItem('theme') == null || localStorage.getItem('theme')=='false' ? '' : document.body.setAttribute('dark', 'true');
			//let html = '<div class="titletext">Тёмная тема<input type="checkbox" toggle '+(localStorage.getItem('theme')==null||localStorage.getItem('theme')=='false'?'':'checked')+' onchange="changeSettings({type: `theme`}, true);" theme></div>';
			//return html;
		}
	}
	if (object.type == 'faves') {
		if (localStorage.faves !== undefined) {
			Object.keys(JSON.parse(localStorage.getItem('faves'))).length !== 0 ? document.querySelector('[data=faves] > span > i').setAttribute('count', Object.keys(JSON.parse(localStorage.getItem('faves'))).length) : document.querySelector('[data=faves] > span > i').removeAttribute('count');
		}
	}
}
window.addEventListener('scroll', updateElements);
window.addEventListener('resize', updateElements);
function updateElements() {
	window.pageYOffset > 1 ? document.querySelector('.scrollup').style = 'visibility: visible; opacity: 0.3;' : document.querySelector('.scrollup').style = 'visibility: hidden; opacity: 0;';
	if (document.body.getAttribute('custom') == 'false' && window.pageYOffset > document.querySelector('.description').offsetHeight-document.querySelector('.content-bottom').offsetHeight-20) {
		document.querySelector('.description').classList.add('sticky');
		document.querySelector('.description').style.top = -document.querySelector('.description').offsetHeight+document.querySelector('.head').offsetHeight+document.querySelector('.content-bottom').offsetHeight+20;
	} else if (document.body.getAttribute('custom') == 'false') {
		document.querySelector('.description').classList.remove('sticky')
		document.querySelector('.description').style.top = 0;
	}
}
window.onload = function () {
	document.querySelector('.loader').style = 'visibility: hidden; opacity: 0;'
}