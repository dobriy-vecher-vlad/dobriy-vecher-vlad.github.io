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
				window.open('?book=error', '_top');
			}
		};
		script.onreadystatechange = script.onerror = () => {
			window.open('?book=error', '_top');
		};
    }).then(data => {
		return data;
	});
};
const buildMain = async(text = '', scroll = false) => {
	isDev&&console.warn('buildMain');
	isDev&&console.log('> text', text);
	isDev&&console.log('> scroll', scroll);
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
	try {
		let count = 1;
		[parent.querySelectorAll(`h2`), parent.querySelectorAll(`h3`)].forEach((items, x) => {
			items.forEach((item, z) => {
				item.id = count;
				item.insertAdjacentHTML('afterbegin', `<a href="#scroll=${count}" class="linkToScroll"><i class="far fa-link"></i></a>`)
				item.querySelector('a').addEventListener('click', (e) => 
					window.scrollTo({top: e.target.getBoundingClientRect().top + document.body.scrollTop - 60, behavior: 'smooth'})
				);
				count++;
			});
		});
		setTimeout(() => { // Почему то работает только при timeout, хотя parent уже отрисован и элемент найден
			// scroll&&parent.querySelector(`[id='${scroll}']`).scrollIntoView({behavior: "smooth"});
			scroll&&window.scrollTo({top: parent.querySelector(`[id='${scroll}'] > a`).getBoundingClientRect().top + document.body.scrollTop - 60, behavior: 'smooth'});
		}, 0);
	} catch (error) {
		// невозможен scroll, элемент не найден
	}
};
const buildMenu = async(book = [], section = 0, page = 0) => {
	isDev&&console.warn('buildMenu');
	isDev&&console.log('> book', book);
	isDev&&console.log('> section', section);
	isDev&&console.log('> page', page);
	const parent = document.querySelector('.menu__container');
	document.querySelector('.__empty').classList.remove('__empty');
	let child = '';
	book.titles.map((item, x) => {
		child += `<details class="menu--details" ${section == x ? 'open' : ''}><summary class="menu--summary"><span>${item.title}</span></summary>`;
		item.titles.map((item, y) => {
			child += `<a class="menu--href ${section == x && page == y ? '__active' : ''}" href="?book=${book.href}&section=${x+1}&page=${y+1}"><span class="menu--href__text">${item.title}</span></a>`;
		});
		child += `</details>`;
	});
	parent.insertAdjacentHTML('beforeend', child);
	parent.querySelectorAll('.menu--details').forEach((item, x) => {
		item.querySelector('.menu--summary').addEventListener('click', (e) => {
			e.preventDefault();
			parent.querySelectorAll('.menu--details').forEach((item, x) => {
				item.removeAttribute('open');
			});
			item.setAttribute('open', '');
		});
	});
};
const buildFooter = async(book = [], section = 0, page = 0) => {
	isDev&&console.warn('buildFooter');
	isDev&&console.log('> book', book);
	isDev&&console.log('> section', section);
	isDev&&console.log('> page', page);
	const parent = document.querySelector('.main__container');
	const pages = book.titles[section].titles;
	let child = '';
	if (page > 0 || page+1 < pages.length) {
		child += '<div class="main__footer">';
		if (page > 0 && page < pages.length) {
			let item = pages[page-1];
			child += `
				<div class="main__footer--before">
					<a href="?book=${book.href}&section=${section+1}&page=${page}">${item.title.replace(/<(.*)>/g, '')}</a>
				</div>
			`;
		}
		if (page+1 < pages.length) {
			let item = pages[page+1];
			child += `
				<div class="main__footer--next">
					<a href="?book=${book.href}&section=${section+1}&page=${page+2}">${item.title.replace(/<(.*)>/g, '')}</a>
				</div>
			`;
		}
		child += '</div>';
		parent.insertAdjacentHTML('afterend', child);
	}
};
const buildFinaly = async(books = []) => {
	isDev&&console.warn('buildFinaly');
	isDev&&console.log('> books', books);
	const parent = document.querySelector('.main__finaly');
	let child = '';
	books.map((item, x) => {
		child += `<div class="main__finaly--content" title="${item.title}">`;
		item.titles.map((item, y) => {
			child += `<a href="?book=${books[x].href}&section=${y+1}" class="main__finaly--href">${item.title}</a>`;
		});
		child += `</div>`;
	});
	parent.insertAdjacentHTML('beforeend', child);
};
const buildHead = async(books = [], currentBook = null) => {
	isDev&&console.warn('buildHead');
	isDev&&console.log('> books', books);
	isDev&&console.log('> currentBook', currentBook);
	const parent = document.querySelector('.head__wrap--links');
	let child = '';
	books.map((item, x) => {
		child += `<a href="?book=${item.href}" class="head__wrap--link ${item.href === currentBook && '__active'}">${item.title}</a>`;
	});
	parent.insertAdjacentHTML('beforeend', child);
};




const start = async() => {
	let queryParams = parseQueryString(window.location.search);
	let hashParams = parseQueryString(window.location.hash);
	isDev&&console.warn('start');
	isDev&&console.log('> queryParams', queryParams);
	isDev&&console.log('> hashParams', hashParams);
	let scroll = null;
	if (hashParams.scroll && hashParams.scroll !== '') {
		scroll = hashParams.scroll;
	}
	if (queryParams.book) { // книга выбрана
		if (queryParams.book === 'error') {
			buildHead(books);
			let page = await getPageHTML('error');
			buildMain(page, scroll);
		} else {
			let currentBook = books.find(item => item.href === queryParams.book);
			isDev&&console.log('> currentBook', currentBook);
			if (typeof currentBook !== 'undefined') { // книга найдена
				if (queryParams.section) { // раздел выбран
					let currentSection = currentBook.titles[queryParams.section-1];
					isDev&&console.log('> currentSection', currentSection);
					if (typeof currentSection !== 'undefined') { // раздел найден
						if (queryParams.page) { // страница выбрана
							let currentPage = currentSection.titles[queryParams.page-1];
							isDev&&console.log('> currentPage', currentPage);
							if (typeof currentPage !== 'undefined') { // страница найдена
								buildHead(books, currentBook.href);
								let page = await getPageHTML(`${currentBook.href}/${queryParams.section}.${queryParams.page}`);
								page.title = currentSection.title;
								page.description = currentPage.title;
								buildMain(page, scroll);
								buildMenu(currentBook, queryParams.section-1, queryParams.page-1);
								buildFooter(currentBook, queryParams.section-1, queryParams.page-1);
							} else { // страница не найдена
								// window.open('?book=error', '_top');
								buildHead(books);
								let page = await getPageHTML('error');
								buildMain(page, scroll);
							}
						} else { // страница не выбрана
							isDev&&console.log('Страница не выбрана');
							// window.open(`?book=${currentBook.href}&section=${queryParams.section}&page=1`, '_top');
							buildHead(books, currentBook.href);
							queryParams.page = 1;
							let currentPage = currentSection.titles[queryParams.page-1];
							let page = await getPageHTML(`${currentBook.href}/${queryParams.section}.${queryParams.page}`);
							page.title = currentSection.title;
							page.description = currentPage.title;
							buildMain(page, scroll);
							buildMenu(currentBook, queryParams.section-1, queryParams.page-1);
							buildFooter(currentBook, queryParams.section-1, queryParams.page-1);
						}
					} else { // раздел не найден
						// window.open('?book=error', '_top');
						buildHead(books);
						let page = await getPageHTML('error');
						buildMain(page, scroll);
					}
				} else { // раздел не выбран
					isDev&&console.log('Раздел не выбран');
					// window.open(`?book=${currentBook.href}&section=1&page=1`, '_top');
					buildHead(books, currentBook.href);
					queryParams.section = 1;
					queryParams.page = 1;
					let currentSection = currentBook.titles[queryParams.section-1];
					let currentPage = currentSection.titles[queryParams.page-1];
					let page = await getPageHTML(`${currentBook.href}/${queryParams.section}.${queryParams.page}`);
					page.title = currentSection.title;
					page.description = currentPage.title;
					buildMain(page, scroll);
					buildMenu(currentBook, queryParams.section-1, queryParams.page-1);
					buildFooter(currentBook, queryParams.section-1, queryParams.page-1);
				}
			} else { // книга не найдена
				// window.open('?book=error', '_top');
				buildHead(books);
				let page = await getPageHTML('error');
				buildMain(page, scroll);
			}
		}
	} else { // книга не выбрана
		buildHead(books);
		let page = await getPageHTML('index');
		buildMain(page, scroll);
	}
	buildFinaly(books);
};
start();