//	Slider 1.0
//
//	Структура в HTML:
//	<div class="slider">
//		<div class="slider-track"> 
//			<div class="slider-item"></div>
//			<div class="slider-item"></div>
//			<div class="slider-item"></div>
//			<div class="slider-item"></div>
//			<div class="slider-item"></div>
//			...
//		</div>
//	</div>
//
//	Возможно использование своих классов. Необходимо чтобы в Div(.slider) присутствовал Div(.slider-track) с коллекцией элементов(.slider-item), как в примере выше.
//	Внутри элементов(.slider-item) можно расположить что угодно.
//
//	Для использования слайдера необходимо вызвать функцию с аргументами: класс Div'a родителя(.slider), число элементов при прокрутке за раз(Number), 
//	число отображаемых элементов за раз(Number), необходимы кнопки(true or false), необходима прокрутка удерживанием(true or false).
//
//	Пример: sliderStart('.slider', 2, 2, true, true);

function sliderStart(parent, slidesToScroll, slidesToShow, needControl, needDrag) {
	let slider = document.querySelector(parent);
	let position = 0;
	let sliderTrack = document.querySelector(`.${slider.children[0].classList[0]}`);
	let sliderItems = document.querySelectorAll(`.${sliderTrack.children[0].classList[0]}`);
	let itemWidth = 100/slidesToShow;
	sliderTrack.style.transform = `translateX(0%)`;
	sliderItems.forEach(item => {
		item.style.minWidth = `${itemWidth}%`;
	});
	function goSlide(type, count) {
		type == 'back' ? position = Math.min(itemWidth*count+position, 0) : position = Math.max(-itemWidth*count+position,-itemWidth*(sliderItems.length-slidesToShow));
		sliderTrack.style.transform = `translateX(${position}%)`;
		needControl == true ? checkDisableButton() : '';
	};
	function checkDisableButton() {
		document.querySelector('.next').disabled = position <= -itemWidth*(sliderItems.length-slidesToShow);
		document.querySelector('.prev').disabled = position >= 0;
	};
	if (needControl == true) {
		slider.insertAdjacentHTML('beforeend', '<button class="control prev"><i class="fal fa-angle-left"></i></button><button class="control next"><i class="fal fa-angle-right"></i></button>');
		checkDisableButton();
		document.querySelector('.prev').onclick = function() { goSlide('back', slidesToScroll); };
		document.querySelector('.next').onclick = function() { goSlide('next', slidesToScroll); };
	}
	if (needDrag == true) {
		let transition = getComputedStyle(document.querySelector('.slider-track')).transition;
		function onMouseMove(event,shiftX) {
			console.log(event)
			let newLeft = event.type == 'touchmove' ? event.targetTouches[0].pageX - shiftX + position : event.type == 'mousemove' ? event.clientX - shiftX - slider.getBoundingClientRect().left : 0;
			console.log(position, newLeft, event.clientX, shiftX, slider.getBoundingClientRect().left)
			newLeft <= -itemWidth*(sliderItems.length-slidesToShow) ? newLeft = -itemWidth*(sliderItems.length-slidesToShow) : '';
			newLeft >= 0 ? newLeft = 0 : '';
			sliderTrack.style.transform = `translateX(${newLeft}%)`;
		}
		function onMouseUp(event) {
			let posEnd = /translateX\((.*)%\)/.exec(sliderTrack.style.transform)[1];
			console.log(posEnd, position);
			posEnd < position ? goSlide('next', Math.ceil(Math.abs(posEnd-position)/itemWidth)) : goSlide('back',  Math.ceil(Math.abs(posEnd-position)/itemWidth));
			sliderTrack.style.transition = transition;
			event.type == 'touchend' ? document.removeEventListener('touchmove', move) : event.type == 'mouseup' ? document.removeEventListener('mousemove', move) : console.log(event.type);
			event.type == 'touchend' ? document.removeEventListener('touchend', up) : event.type == 'mouseup' ? document.removeEventListener('mouseup', up) : console.log(event.type);
		}
		const touch = (event) => {
			sliderTrack.style.transition = `0s`;
			let shiftX = event.targetTouches[0].clientX;
			sliderTrack.addEventListener('touchmove', move  = (e) => { onMouseMove(e, shiftX) });
			sliderTrack.addEventListener('touchend', up  = (e) => { onMouseUp(e) });
		};
		sliderTrack.onmousedown = function(event) {
			sliderTrack.style.transition = `0s`;
			let shiftX = event.clientX - sliderTrack.getBoundingClientRect().left;
			document.addEventListener('mousemove', move  = (e) => { onMouseMove(e,shiftX) });
			document.addEventListener('mouseup', up  = (e) => { onMouseUp(e) });
		};
		sliderTrack.addEventListener("touchstart", touch);
	}
}





function test(type, type2) {
	let sliderItems = document.querySelectorAll('.example-container > div');

	if (type == 'start') {
		let slidesToShow = 2;
		let itemWidth = 100/slidesToShow;
		sliderItems.forEach((item,x) => {
			item.style.minWidth = `${itemWidth}%`;
			item.style.order = `${x+1}`;
		});
	}


	if (type2 == true) {
		sliderItems.forEach((item) => {
			let x = Number(item.style.order);
			item.style.order = type == 'back' ? `${x + 1 === 6 ? 1 : x + 1}` : `${x - 1 === 0 ? sliderItems.length : x - 1}`;
		});
	}
}
test('start');