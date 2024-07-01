$('.body').fadeOut(0);
$(window).on('load', function() {
	$.when( construction_header(), construction_menu(), check_type(), check_bars(), check_bar(), check_style() )
	.done(function(){
		$('.preloader').fadeOut(200);
		setTimeout(function() {
			document.querySelector('body').setAttribute('overflow', 'scroll');
		}, 200);
	});
	
	var type_page = window.location.hash.substr(1);
	var time = 18000*1000; //Moscow - 10800(+3ч), Kamensk - 18000(+5ч).
	if (type_page == "") { get_posts(22403241, 0, time); }
	if (type_page == "test1") { get_posts(132702909, 0, time); }
	if (type_page == "test2") { get_page(185939465, 56320355, time); }
	if (type_page == "test3") { get_page(185939465, 56320364, time); }
	if (type_page == "test4") { get_posts(122851042, 0, time); }
	if (type_page == "test5") { get_posts(23956131, 0, time); }
	if (type_page == "test6") { get_posts(28497906, 0, time); }
	if (type_page == "test7") { get_posts(79138567, 0, time); }
	if (type_page == "test8") { get_posts(2158488, 0, time); }
	if (type_page == "test9") { get_posts(63370414, 0, time); }
	if (type_page == "test10") { get_posts(155321754, 0, time); }
	if (type_page == "test11") { get_page_new(185939465, 56320355, time); }
	if (type_page == "test12") { get_page_new(185939465, 56320356, time); }
	if (type_page == "test13") { get_page_new(1, 1100, time); }
	if (type_page == "test14") { get_page_new(1, 1101, time); }
	if (type_page == "test15") { get_page_new(185939465, 56320357, time); }
	if (type_page == "test16") { get_posts(185939465, 0, time); }
	console.log('При загрузке установлена страница под именем: '+type_page+'.')
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

function change_style(type, old_type) {
	var favicon = {'white':'../img/favicon_kurt_white.png', 'dark':'../img/favicon_kurt_dark.png'};
	document.querySelector('head>link[type=favicon]').setAttribute('href', favicon[old_type]);
	for(var i = 0; i < document.querySelectorAll('#change_style').length; i++) {
		document.querySelectorAll('#change_style')[i].removeAttribute('onclick');
	}
	$('.body').fadeOut(200);
	setTimeout(function() {
		document.querySelector('body').setAttribute('theme', type);
		localStorage.setItem('type_style', type);
		localStorage.setItem('type_old_style', old_type);
		$('.body').fadeIn(200);
	}, 200);
	setTimeout(function() {
		for(var i = 0; i < document.querySelectorAll('#change_style').length; i++) {
			document.querySelectorAll('#change_style')[i].setAttribute('onclick', 'change_style(`'+old_type+'`, `'+type+'`); messages(`Theme`, `<br>Успешно применён «'+old_type+'» стиль и иконка сайта.`, `green`);');
		}
	}, 400);
}
function check_style() {
	if ( localStorage.getItem('type_style') != null ) {
		var type_style = localStorage.getItem('type_style');
		var type_old_style = localStorage.getItem('type_old_style');
		change_style(type_style, type_old_style);
		console.log('При загрузке установлен стиль из кеша: '+type_style+'.');
	} else {
		console.log("Пользователь ранее не был. Кеш не найден.");
		change_style("white", "dark");
	}
}

function change_type(type1, type2, type3) {
	for(var i = 0; i < document.querySelectorAll('#change_type').length; i++) {
		document.querySelectorAll('#change_type')[i].removeAttribute('onclick');
	}
	setTimeout(function() {
		document.querySelector('body').setAttribute('type', type1);
		localStorage.setItem('type1', type1);
		localStorage.setItem('type2', type2);
		localStorage.setItem('type3', type3);
	}, 200);
	setTimeout(function() {
		for(var i = 0; i < document.querySelectorAll('#change_type').length; i++) {
			document.querySelectorAll('#change_type')[i].setAttribute('onclick', 'change_type(`'+type2+'`, `'+type3+'`, `'+type1+'`); messages(`News`, `<br>Успешно применён «'+type2+'» стиль новостей.`, `green`);');
		}
	}, 400);
}
function check_type() {
	if ( localStorage.getItem('type1') != null ) {
		var type1 = localStorage.getItem('type1');
		var type2 = localStorage.getItem('type2');
		var type3 = localStorage.getItem('type3');
		change_type(type1, type2, type3);
		console.log('При загрузке установлен тип новостей из кеша: '+type1+'.');
	} else {
		console.log("Пользователь ранее не был. Кеш не найден.");
		change_type("classic", "image", "image_large");
	}
}

function change_bars(bars1, bars2) {
	for(var i = 0; i < document.querySelectorAll('#change_bars').length; i++) {
		document.querySelectorAll('#change_bars')[i].removeAttribute('onclick');
	}
	setTimeout(function() {
		document.querySelector('body').setAttribute('bars', bars1);
		localStorage.setItem('bars1', bars1);
		localStorage.setItem('bars2', bars2);
	}, 200);
	setTimeout(function() {
		for(var i = 0; i < document.querySelectorAll('#change_bars').length; i++) {
			document.querySelectorAll('#change_bars')[i].setAttribute('onclick', 'change_bars(`'+bars2+'`, `'+bars1+'`); messages(`Bars`, `<br>Успешно применён «'+bars2+'» стиль меню.`, `green`);');
		}
	}, 400);
}
function check_bars() {
	if ( localStorage.getItem('bars1') != null ) {
		var bars1 = localStorage.getItem('bars1');
		var bars2 = localStorage.getItem('bars2');
		change_bars(bars1, bars2);
		console.log('При загрузке установлен тип меню из кеша: '+bars1+'.');
	} else {
		console.log("Пользователь ранее не был. Кеш не найден.");
		change_bars("classic", "none");
	}
}

function change_bar(id, bar1, bar2) {
	document.querySelector('#'+id+'[type=menu]').removeAttribute('onclick');
	setTimeout(function() {
		document.querySelector('#'+id+'[type=menu]').parentNode.setAttribute('bar', bar1);
		localStorage.setItem('bar1_'+id, bar1);
		localStorage.setItem('bar2_'+id, bar2);
	}, 200);
	setTimeout(function() {
		document.querySelector('#'+id+'[type=menu]').setAttribute('onclick', 'change_bar(`'+id+'`, `'+bar2+'`, `'+bar1+'`);');
	}, 400);
}
function check_bar() {
	for(var i = 0; i < document.querySelectorAll('.main_right_menu_head').length; i++) {
		var name = document.querySelectorAll('.main_right_menu_head')[i].getAttribute('id');
		if ( localStorage.getItem('bar1_'+name) != null ) {
			var bars1 = localStorage.getItem('bar1_'+name);
			var bars2 = localStorage.getItem('bar2_'+name);
			change_bar(name, bars1, bars2);
		} else {
			change_bar(name, 'open', 'close');
		}
	}
}

function messages(title, text, type) {
	var time = Date.now()*(Math.floor(Math.random() * (999999 - 1 + 1)) + 1);
	var body = '<div class="message_body" id="'+time+'"><div class="message '+type+'"><b>'+title+'</b> '+text+'</div></div>';
	document.querySelector('.system_messages').insertAdjacentHTML('beforeend', body);
	$('#'+time+'').fadeIn(500);
	setTimeout(function() {
		$('#'+time+'').fadeOut(500);
		setTimeout(function() {
			document.querySelector('.system_messages>div').remove();
		}, 500);
	}, 3000);
}

function construction_header() {
	var header = sys_header;
	var html = '';
	for(var x = 0; x < header.length; x++) {
		html += '<div class="menu_glav text"><span onclick="window.open(`#'+header[x].href+'`, `_top`); location.reload();">'+header[x].title+'</span>';
		if (header[x].more == true) {
			html += '<div class="menu_glav_icon"></div><div class="menu_glav_child_one">';
			for(var z = 0; z < header[x].titles.length; z++) {
				html += '<div class="menu_glav_child_one_href';
				if (header[x].titles[z].more == true) {
					html += ' menu_glav_two';
				}
				html += '" onclick="window.open(`#'+header[x].titles[z].href+'`, `_top`); location.reload();"><div class="menu_glav_child_one_href_edit">'+header[x].titles[z].title+'';
				if (header[x].titles[z].more == true) {
					html += '<div class="menu_glav_two_icon"></div>';
				}
				html += '</div>';
				if (header[x].titles[z].more == true) {
					html += '<div class="menu_glav_child_two">';
					for(var y = 0; y < header[x].titles[z].titles.length; y++) {
						html += '<div class="menu_glav_child_two_href" onclick="window.open(`#'+header[x].titles[z].titles[y].href+'`, `_top`); location.reload();">'+header[x].titles[z].titles[y].title+'</div>';
					}
					html += '</div>';
				}
				html += '</div>';
			}
			html += '</div>';
		}
		html += '</div>';
	}
	document.querySelector('.header_menu').insertAdjacentHTML('afterbegin', html);
	var html = '';
	for(var x = 0; x < header.length; x++) {
		html += '<li><span onclick="window.open(`#'+header[x].href+'`, `_top`); location.reload();">'+header[x].title+'</span>';
	}
	document.querySelector('.nav > ul').insertAdjacentHTML('afterbegin', html);
}

function construction_menu() {
	var menu = sys_menu;
	var html = '';
	for(var x = 0; x < menu.length; x++) {
		if ( menu[x].type != 'custom' ) {
			var type = menu[x].type == 'not_hidden' ? 'main_right_menu_head_not' : menu[x].type == 'button' ? 'main_right_menu_head_btn' : 'main_right_menu_head';
			var onclick = type == 'main_right_menu_head_btn' ? menu[x].onclick : '';
			html += '<div class="main_right_menu">';
			html += '<div type="menu" id="'+menu[x].name+'" class="'+type+'" onclick="'+onclick+'">'+menu[x].title+'</div>';
			html += '<div class="main_right_menu_content">';
				for(var z = 0; z < menu[x].titles.length; z++) {
					html += '<div class="main_right_menu_block" onclick="window.open(`#'+menu[x].titles[z].href+'`, `_top`); location.reload();"><div class="main_right_menu_icon"></div><a class="main_right_menu_href">'+menu[x].titles[z].title+'</a></div>';
				}
			html += '</div></div>';
		} else {
			html += menu[x].html;
		}
	}
	document.querySelector('.main_right').insertAdjacentHTML('beforeend', html);
}