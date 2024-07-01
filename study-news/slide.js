var dataslides = {
	'max': 5,
	'image': {1:'./img/1.png',2:'./img/2.png',3:'./img/3.png',4:'./img/4.png'},
	'image_tiny': {1:'./img/1.png',2:'./img/2.png',3:'./img/3.png',4:'./img/4.png'}, // загрузить low-size image
	'text': {1:'Россия',2:'Россия',3:'Россия',4:'Россия'},
	'description': {1:'Каменск-Уральский, изображение #1',2:'Каменск-Уральский, изображение #2',3:'Каменск-Уральский, изображение #3',4:'Каменск-Уральский, изображение #4'},
	'href': {1:'./img/1.png',2:'./img/2.png',3:'./img/3.png',4:'./img/4.png'}
};
var value = 1;
var max = dataslides.max;
var time = 5000;
start = true;
slide(value, max);
function slide(value, max) {
	var countback = value == 1 ? max : value-1;
	var countnext = value == max ? 1 : value+1;
	var img = typeof dataslides.image[value] == 'undefined' ? './img/not_img.png' : dataslides.image[value];
	var image_tiny = typeof dataslides.image_tiny[value] == 'undefined' ? './img/not_img_tiny.png' : dataslides.image_tiny[value];
	document.querySelector('#slide_selector').innerHTML += '<a href="'+img+'" class="progressive replace" type="slider"><img src="'+image_tiny+'" class="preview" alt="image" /></a>';
	if ( start == false ) { 
		timetimeout = setTimeout(function(){ document.querySelector('#slide_selector > a:first-child').remove(); }, (500));
		document.querySelector('#slide_timer > .active').classList.remove('active');
	} else { 
		start = false;
		for (var x = 1; x <= max; x++) {
			document.querySelector('#slide_timer').innerHTML += '<div id="slide_time_'+x+'" onclick="slide('+x+', '+max+')" class="time"></div>';
		}
	};
	document.querySelector('#slide_timer > #slide_time_'+value).classList.add('active');
	var href = typeof dataslides.href[value] == 'undefined' ? '#' : dataslides.href[value];
	document.querySelector('#slide_shadow').setAttribute('onclick', 'window.open(`'+href+'`, `_blank`);');
	document.querySelector('#slide_back').setAttribute('onclick', 'slide('+countback+', '+max+');');
	document.querySelector('#slide_next').setAttribute('onclick', 'slide('+countnext+', '+max+');');
	var text = typeof dataslides.text[value] == 'undefined' ? 'DATASLIDES['+value+'] UNDEFINED' : dataslides.text[value];
	var description = typeof dataslides.description[value] == 'undefined' ? 'MAX VALUE = '+Object.keys(dataslides.image).length+'' : dataslides.description[value];
	document.querySelector('#slide_text').innerHTML = ''+text+'<span class="dop">'+description+'</span>';
	try { clearInterval(timeinterval); } catch(err) { /*таймер запущен*/ };
	timeinterval = setInterval(function(){ slide(countnext, max) }, time);
}