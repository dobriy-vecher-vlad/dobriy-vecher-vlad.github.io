$('.body').fadeOut(0);
$(window).on('load', function() {
	$.when( check_type(), check_bars(), check_style() )
	.done(function(){
		$('.body').css({
			"overflow-y": "scroll"
		});
	});
	
	var type_page = window.location.hash.substr(1);
	var time = 18000*1000; //Moscow - 10800(+3ч), Kamensk - 18000(+5ч).
	if (type_page == "") { get_posts(30558759, 0, time); }
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
	if (type_page == "test11") { get_page_new(185939465, 56320355); }
	console.log('Пользователь на странице под именем: '+type_page+'.')
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
	document.querySelector('#change_style').removeAttribute('onclick');
	$('.body').fadeOut(200);
	setTimeout(function() {
		document.querySelector('body').setAttribute('theme', type);
		localStorage.setItem('type_style', type);
		localStorage.setItem('type_old_style', old_type);
		$('.body').fadeIn(200);
	}, 200);
	setTimeout(function() {
		document.querySelector('#change_style').setAttribute('onclick', 'change_style(`'+old_type+'`, `'+type+'`); messages(`Theme.`, `<br>Успешно применён «'+old_type+'» стиль сайта.`, `green`);');
	}, 400);
}
function check_style() {
	if ( localStorage.getItem('type_style') != null ) {
		var type_style = localStorage.getItem('type_style');
		var type_old_style = localStorage.getItem('type_old_style');
		change_style(type_style, type_old_style);
		console.log('Пользователь выбрал стиль: '+type_style+'.')
	} else {
		console.log("Пользователь ранее не был.");
		change_style("white", "dark");
	}
}

function change_type(type1, type2, type3) {
	document.querySelector('#change_type').removeAttribute('onclick');
	setTimeout(function() {
		document.querySelector('body').setAttribute('type', type1);
		localStorage.setItem('type1', type1);
		localStorage.setItem('type2', type2);
		localStorage.setItem('type3', type3);
	}, 200);
	setTimeout(function() {
		document.querySelector('#change_type').setAttribute('onclick', 'change_type(`'+type2+'`, `'+type3+'`, `'+type1+'`); messages(`News.`, `<br>Успешно применён «'+type2+'» стиль новостей.`, `green`);');
	}, 400);
}
function check_type() {
	if ( localStorage.getItem('type1') != null ) {
		var type1 = localStorage.getItem('type1');
		var type2 = localStorage.getItem('type2');
		var type3 = localStorage.getItem('type3');
		change_type(type1, type2, type3);
		console.log('Пользователь выбрал тип новостей: '+type1+'.')
	} else {
		console.log("Пользователь ранее не был.");
		change_type("classic", "image", "image_large");
	}
}

function change_bars(bars1, bars2) {
	document.querySelector('#change_bars').removeAttribute('onclick');
	setTimeout(function() {
		document.querySelector('body').setAttribute('bars', bars1);
		localStorage.setItem('bars1', bars1);
		localStorage.setItem('bars2', bars2);
	}, 200);
	setTimeout(function() {
		document.querySelector('#change_bars').setAttribute('onclick', 'change_bars(`'+bars2+'`, `'+bars1+'`); messages(`Bars.`, `<br>Успешно применён «'+bars2+'» стиль меню.`, `green`);');
	}, 400);
}
function check_bars() {
	if ( localStorage.getItem('bars1') != null ) {
		var bars1 = localStorage.getItem('bars1');
		var bars2 = localStorage.getItem('bars2');
		change_bars(bars1, bars2);
		console.log('Пользователь выбрал тип меню: '+bars1+'.')
	} else {
		console.log("Пользователь ранее не был.");
		change_bars("classic", "none");
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