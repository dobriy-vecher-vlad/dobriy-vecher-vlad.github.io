const isDev = false;
const parseQueryString = (string) => {
	return string.slice(1).split('&').map((queryParam) => {
		let kvp = queryParam.split('=');
		return {key: kvp[0], value: kvp[1]}
	}).reduce((query, kvp) => {
		query[kvp.key] = kvp.value;
		return query
	}, {});
};
/*
	const getPageHTML = async(href = 'index') => {
		isDev&&console.log(href);
		try {
			let data = await fetch(`pages/${href}.json`);
			data = await data.json();
			return data;
		} catch (error) {
			window.open('?book=error', '_top');
		}
	};

	Функция не работает с локальными файлами, необходим сервер (localhost и т.д.),
	ниже аналог функции, загружает те же данные, но через подключение js-файла.
*/
const getPageHTML = async(href = 'index') => {
	isDev&&console.warn('getPageHTML');
	isDev&&console.log('> href', href);
	return new Promise(resolve => {
        let script = document.createElement('script');
		document.getElementsByTagName('head')[0].appendChild(script);
		script.src = `pages/${href}.js`;
		script.async = true;
		script.onreadystatechange = script.onload = () => {
			try {
				resolve(data);
			} catch (error) {
				window.open('?page=error', '_top');
			}
		};
		script.onreadystatechange = script.onerror = () => {
			window.open('?page=error', '_top');
		};
    }).then(data => {
		return data;
	});
};
const buildMain = async(text = '') => {
	isDev&&console.warn('buildMain');
	isDev&&console.log('> text', text);
	const parent = document.querySelector('.main__container');
	parent.insertAdjacentHTML('beforeend',
		text.html.join('')
			.replace(/<p>!!-(.*?)\.-!! /g, '<h2>$1</h2><p>') // преобразование выборочных подзаголовков
			.replace(/<p>!-(.*?)\.-! /g, '<h3>$1</h3><p>') // преобразование выборочных подзаголовков
			.replace(/<p>!!!(.*?)<\/p>/g, '<blockquote>$1</blockquote><p>') // преобразование лёгких выносок
			.replace(/<p>!!(.*?)\. /g, '<h2>$1</h2><p>') // преобразование лёгких заголовков
			.replace(/<p>!(.*?)\. /g, '<h3>$1</h3><p>') // преобразование лёгких подзаголовков
	);
	text.description && text.description !== '' && parent.insertAdjacentHTML('afterbegin', `<span>${text.title}</span>`);
	// text.title && text.title !== '' && parent.insertAdjacentHTML('afterbegin', `<h1>${text.description.replace(/§(\d*) - /g, '')}</h1>`);
	text.title && text.title !== '' && parent.insertAdjacentHTML('afterbegin', `<h1>${text.description.replace(/<(.*)>/g, '')}</h1>`);
	document.title = text.description.replace(/<(.*)>/g, '');
};
const buildMenu = async(book = [], page = 0) => {
	isDev&&console.warn('buildMenu');
	isDev&&console.log('> book', book);
	isDev&&console.log('> page', page);
	const parent = document.querySelector('.menu__container');
	// document.querySelector('.__empty').classList.remove('__empty');
	let child = '';
	book.map((item, x) => {
		child += `<a class="menu--href ${item.href == page.href ? '__active' : ''}" href="?page=${item.href}">${item.icon ? `<i class="far fa-${item.icon}"></i>` : ''}<span class="menu--href__text">${item.title}</span></a>`
	});
	parent.insertAdjacentHTML('beforeend', child);
};




const start = async() => {
	let queryParams = parseQueryString(window.location.search);
	let hashParams = parseQueryString(window.location.hash);
	isDev&&console.warn('start');
	isDev&&console.log('> queryParams', queryParams);
	isDev&&console.log('> hashParams', hashParams);
	if (queryParams.page) { // страница выбрана
		if (queryParams.page === 'error') {
			let page = await getPageHTML('error');
			buildMain(page);
			buildMenu(pages);
		} else {
			let currentPage = pages.find(item => item.href === queryParams.page);
			isDev&&console.log('> currentPage', currentPage);
			if (typeof currentPage !== 'undefined') { // страница найдена
				if (queryParams.list) { // лист выбран
					let currentList = currentPage.titles[queryParams.list-1];
					isDev&&console.log('> currentList', currentList);
					if (typeof currentList !== 'undefined') { // лист найден
						let list = await getPageHTML(`${currentPage.href}/${queryParams.list}`);
						list.title = currentPage.title;
						list.description = currentList.title;
						buildMain(list);
						buildMenu(pages, currentPage);
					} else { // лист не найден
						let page = await getPageHTML(`${currentPage.href}/index`);
						buildMain(page);
						buildMenu(pages, currentPage);
					}
				} else { // лист не выбран
					let page = await getPageHTML(`${currentPage.href}/index`);
					buildMain(page);
					buildMenu(pages, currentPage);
				}
			} else { // страница не найдена
				let page = await getPageHTML('error');
				buildMain(page);
				buildMenu(pages);
			}
		}
	} else { // страница не выбрана
		let page = await getPageHTML('home/index');
		buildMain(page);
		buildMenu(pages, {href: 'home'});
	}
};
start();