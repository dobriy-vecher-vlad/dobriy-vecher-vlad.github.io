var data = {
	'custom': true,
	'title': 'Избранные страницы',
	'description': '',
	'tag': '',
	'text': `
		<div class="title">Избранные страницы</div>
		<div class="text"></div>
	`
}
setTimeout(() => {
	let favesData = localStorage.getItem('faves') == null ? {} : JSON.parse(localStorage.getItem('faves'));
	if (Object.keys(favesData).length !== 0) {
		let faves = '<div class="cards">';
		Object.keys(favesData).forEach((item) => {
			faves += `<div class="card ${item}"><a scale class="text" href="${favesData[item].href}"><b>${favesData[item].tag} ${favesData[item].title}</b><span>${favesData[item].preview}</span></a><div class="buttons" inline><div scale class="button icon round primary s" onclick="delFave('${item}');"><span><i class="far fa-times"></i></span></div></div></div>`;
		});
		faves += '</div>';
		document.querySelector('.text').insertAdjacentHTML('beforeend', faves);
	} else {
		document.querySelector('.text').insertAdjacentHTML('beforeend', `<div class="placeholder" icon="&#xf005">Нет избранных страниц</div>`);
	}
}, 0);
function delFave(fave) {
	let faves = localStorage.getItem('faves') == null ? {} : JSON.parse(localStorage.getItem('faves'));
	delete faves[fave];
	document.querySelector(`.${fave}`).remove();
	if (document.querySelectorAll('.card').length == 0) {
		document.querySelector('.text').insertAdjacentHTML('beforeend', `<div class="placeholder" icon="&#xf005">Нет избранных страниц</div>`);
	}
	localStorage.setItem('faves', JSON.stringify(faves));
	changeSettings({type: 'faves'});
}
var isScriptLoad = true;