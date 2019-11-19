$('.body').fadeOut(0);
$(window).on('load', function() {
	$.when( check_type(), check_style() )
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
		document.querySelector('#change_style').setAttribute('onclick', 'change_style(`'+old_type+'`, `'+type+'`);');
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

function change_type(type, old_type) {
	document.querySelector('#change_type').removeAttribute('onclick');
	$('.body').fadeOut(200);
	setTimeout(function() {
		document.querySelector('body').setAttribute('type', type);
		localStorage.setItem('type_type', type);
		localStorage.setItem('type_old_type', old_type);
		$('.body').fadeIn(200);
	}, 200);
	setTimeout(function() {
		document.querySelector('#change_type').setAttribute('onclick', 'change_type(`'+old_type+'`, `'+type+'`);');
	}, 400);
}
function check_type() {
	if ( localStorage.getItem('type_type') != null ) {
		var type_type = localStorage.getItem('type_type');
		var type_old_type = localStorage.getItem('type_old_type');
		change_type(type_type, type_old_type);
		console.log('Пользователь выбрал тип новостей: '+type_type+'.')
	} else {
		console.log("Пользователь ранее не был.");
		change_type("classic", "image");
	}
}