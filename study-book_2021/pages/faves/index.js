var data = {
	'custom': true,
	'title': 'Избранные страницы',
	'description': '',
	'tag': '',
	'text': ``
}
setTimeout(() => {
	let favesData = localStorage.getItem('faves') == null ? {} : JSON.parse(localStorage.getItem('faves'));
	if (Object.keys(favesData).length !== 0) {
		let faves = '<div class="title">Избранные страницы</div><div class="text"><div class="cards">';
		Object.keys(favesData).forEach((item) => {
			/*faves += `
				<div class="card ${item}">
					<a href="${favesData[item].href}">
						<div scale class="text">
							<span class="header" tag="${favesData[item].tag}"><span>${favesData[item].title}</span></span>
							<span class="content preview">${favesData[item].preview}</span>
							<span class="content bottom">${window.location.host+window.location.pathname+favesData[item].href}</span>
						</div>
					</a>
					<div class="buttons">
						<div class="button s primary center b" onclick="delFave('${item}');"><span icon="&#xf0e7">Удалить из избранного</span></div>
					</div>
				</div>
			`;*/
			faves += `
			<div class="card ${item}">
				<div scale class="button icon secondary delete" onclick="delFave('${item}');"><span><i class="far fa-times"></i></span></div>
				<a href="${favesData[item].href}">
					<div scale class="text">
						<span class="header" tag="${favesData[item].tag}"><span>${favesData[item].title}</span></span>
						${favesData[item].image !== null ? `<span class="image" style='background-image: ${favesData[item].image}'></span>` : ''}
						<span class="content">
							<span class="preview">${favesData[item].preview}</span>
							<span class="href">${favesData[item].href}</span>
						</span>
					</div>
				</a>
			</div>
		`;
		console.log(favesData[item]);
		});
		faves += '</div></div>';
		document.querySelector('.middle').insertAdjacentHTML('beforeend', faves.replace(/>[\s{2,}]+</g, '><'));
	} else {
		document.querySelector('.middle').innerHTML = `<div class="text"><div class="placeholder" icon="&#xf005">Нет избранных страниц</div></div>`;
	}
}, 0);
function delFave(fave) {
	let faves = localStorage.getItem('faves') == null ? {} : JSON.parse(localStorage.getItem('faves'));
	delete faves[fave];
	document.querySelector(`.${fave}`).remove();
	if (document.querySelectorAll('.card').length == 0) {
		document.querySelector('.middle').innerHTML = `<div class="text"><div class="placeholder" icon="&#xf005">Нет избранных страниц</div></div>`;
	}
	localStorage.setItem('faves', JSON.stringify(faves));
	changeSettings({type: 'faves'});
}
var isScriptLoad = true;