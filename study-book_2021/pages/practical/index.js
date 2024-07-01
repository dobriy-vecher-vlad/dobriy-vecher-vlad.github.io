var data = {
	'custom': true,
	'title': 'Практическая часть',
	'description': '',
	'tag': '',
	'text': `
		<div class="text"><div class="placeholder" icon="&#xf70f">Нет практических работ</div></div>
	`
}
let QuizData = [
	{
		'questions': 'Что такое компьютер?',
		'answers': ["Устройство для автоматической обработки числовой информации." ,"Устройство для хранения информации." ,"Устройство для поиска, сбора, хранения, преобразования и использования информации в цифровом формате." ,"Совокупность программных средств, осуществляющих управление информационными ресурсами."],
		'answer': 3
	}, {
		'questions': 'Мультимедийным компьютером называется компьютер, способный...',
		'answers': ["Работать в сети Интернет." ,"Показывать мультфильмы." ,"Ппроизводить печать, и сканирование документов." ,"Работать с числами, текстом, графикой, аудио и видео."],
		'answer': 4
	}, {
		'questions': 'Минимально необходимый набор устройств для работы компьютера содержит...',
		'answers': ["Принтер, системный блок, клавиатуру." ,"Системный блок, монитор, клавиатуру." ,"Процессор, мышь, монитор." ,"Клавиатуру, монитор, мышь."],
		'answer': 2
	}, {
		'questions': 'Что такое системный блок?',
		'answers': ["Корпус, в котором находятся основные функциональные элементы компьютера." ,"Устройство, предназначенное для хранения и изображения текстовой и графической информации." ,"Корпус, обеспечивающий сканирование, сохранение и печать." ,"Устройство, обеспечивающее сканирование, сохранение и печать."],
		'answer': 1
	}, {
		'questions': 'Для чего предназначен монитор (дисплей)?',
		'answers': ["Постоянного хранения информации, часто используемой при работе на компьютере." ,"Подключения периферийных устройств к магистрали." ,"Управления работой компьютера по заданной программе." ,"Изображения текстовой и графической информации."],
		'answer': 4
	}, {
		'questions': 'Что относится к устройствам вывода графической информации?',
		'answers': ["Сканер." ,"Принтер." ,"Клавиатура." ,"Модем."],
		'answer': 2
	}, {
		'questions': 'Какие устройства относятся к устройствам ввода информации?',
		'answers': ["Дисплей, клавиатура, мышь." ,"Принтер, дисплей, модем." ,"Сканер, клавиатура, мышь." ,"Принтер, сканер, мышь."],
		'answer': 3
	}, {
		'questions': 'Сканер - это устройство...',
		'answers': ["Печати на твердый носитель, обычно на бумагу." ,"Для изображения текстовой и графической информации." ,"Которое создает цифровую копию текстовой и графической информации." ,"Для обеспечения бесперебойного питания."],
		'answer': 3
	}, {
		'questions': 'Как называется устройство для вывода информации на экран?',
		'answers': ["Сканер." ,"Принтер." ,"Монитор." ,"Клавиатура."],
		'answer': 3
	}, {
		'questions': 'Как называется устройство, обеспечивающее защиту компьютера при перепадах напряжения и отключении электроэнергии?',
		'answers': ["Материнская плата." ,"Блок питания." ,"Жёсткий диск." ,"Источник бесперебойного питания (UPS)."],
		'answer': 4
	}, {
		'questions': 'Как надо смотреть на монитор?',
		'answers': ["Сверху - вниз." ,"Слева - направо." ,"Снизу - вверх." ,"Справа - налево."],
		'answer': 1
	}, {
		'questions': 'Как называются устройства компьютера, которые не принадлежат к основным?',
		'answers': ["Второстепенными." ,"Периферийными." ,"Сопряженными." ,"Дочерними."],
		'answer': 2
	}, {
		'questions': 'Клавиатура компьютера - это устройство...',
		'answers': ["Ввода алфавитно-цифровой информации." ,"Ввода графической информации." ,"Вывода алфавитно-цифровой и графической информации." ,"Хранения данных с произвольным доступом."],
		'answer': 1
	}, {
		'questions': 'Манипулятор типа мышь - это устройство...',
		'answers': ["Хранения данных с произвольным доступом." ,"Вывода графической информации." ,"Вывода алфавитно-цифровой и графической информации." ,"Ввода управляющей информации."],
		'answer': 4
	}, {
		'questions': 'В каком порядке следует выполнять включение узлов компьютера?',
		'answers': ["UPS, монитор, системный блок." ,"Монитор, системный блок, UPS." ,"Системный блок, монитор, UPS." ,"Принтер, системный блок, UPS."],
		'answer': 1
	}, {
		'questions': 'Какой из типов носителей имеет наибольший размер?',
		'answers': ["DVD-Disk." ,"Дискета." ,"CD-Disk." ,"CD-дискета."],
		'answer': 1
	}
];
let mark = ['Неудовлетворительный результат, <b>без оценки</b>.', 'Плохой результат, оценка <b>2</b>.', 'Удовлетворительный результат, оценка <b>3</b>.', 'Хороший результат, оценка <b>4</b>.', 'Отличный результат, <b>оценка 5</b>.'];
let markRate = [0.25, 0.50, 0.75, 1.00];
setTimeout(() => {
	function startQuiz() {
		document.querySelector('.middle').innerHTML = `
			<div class="title">Практическая часть по материалу</div>
			<div class="text">
				<div class="quiz">
					<div class="quiz-nav dragscroll" style="display: flex; margin-bottom: 10px;"><div inline style="display: flex; padding: 0 10px 0 0;"></div></div>
					<div class="quiz-wrap"></div>
					<div class="quiz-nav" style="margin-top: 10px;"></div>
					<div class="buttons" style="margin-top: 10px;">
						<div scale icon_left class="button positive m" onclick="QuizFinish();"><span icon="&#xf560">Проверить ответы</span></div>
					</div>
				</div>
			</div>
		`;

		let html = '';
		let nav = '';
		QuizData.forEach((item,x) => {
			html += `<div class="quiz-section"><span>${item.questions}</span>`;
			nav += `<div class="button primary m" onclick="QuizSection({count: ${x+1}});" count="${x+1}"><span>${x+1}</span></div>`;
			item.answers.forEach((item,y) => {
				html += `<input name="q${x}" id="q${x}-${y}" type="radio"><label for="q${x}-${y}"><div scale icon_left class="button s secondary"><span icon="&#xf192">${item}</span></div></label>`;
			});
			html += `</div>`;
		});
		let control = `
			<div class="buttons" inline>
				<div id="quiz_back" scale icon_left class="button primary m b" style="margin-right: 10px;"><span icon="&#xf053">Предыдущий вопрос</span></div>
				<div class="button secondary m" style="margin: 0 auto;"><span id="quiz_count">#</span></div>
				<div id="quiz_next" scale icon_right class="button primary m b" style="margin-left: 10px;"><span icon="&#xf054">Следующий вопрос</span></div>
			</div>
		`;
		document.querySelector('.quiz-wrap').insertAdjacentHTML('beforeend', html);
		document.querySelector('.quiz-nav > div').insertAdjacentHTML('beforeend', nav);
		document.querySelectorAll('.quiz-nav')[1].insertAdjacentHTML('beforeend', control);
		QuizSection({count: 1});
	}
	startQuiz();
}, 0);
function QuizSection(object) {
	let count = 1;
	let quiz_back = document.querySelector('#quiz_back');
	let quiz_next = document.querySelector('#quiz_next');
	let quiz_count = document.querySelector('#quiz_count');
	if (object.type == 'back' || object.type == 'next') {
		count = Number(document.querySelector('.quiz-nav [disabled]').textContent);
		object.type == 'back' ? count -= 1 : count += 1;
	} else {
		count = object.count;
	}
	if (count == QuizData.length) {
		quiz_next.removeAttribute('onclick');
		quiz_next.setAttribute('disabled', '');
	} else {
		quiz_next.setAttribute('onclick', 'QuizSection({type: "next"})');
		quiz_next.removeAttribute('disabled');
	}
	if (count == 1) {
		quiz_back.removeAttribute('onclick');
		quiz_back.setAttribute('disabled', ''); 
	} else {
		quiz_back.setAttribute('onclick', 'QuizSection({type: "back"})');
		quiz_back.removeAttribute('disabled');
	}
	document.querySelectorAll('.quiz-nav [count]').forEach(item => {
		item.removeAttribute('disabled');
	});
	let nav = document.querySelector(`.quiz-nav [count="${count}"]`);
	nav.setAttribute('disabled', '');
	document.querySelector('.quiz-wrap').style.transform = 'translateX(calc('+-(100*(count-1))+'% - '+(20*(count-1))+'px))';
	quiz_count.innerHTML = `${count} из ${QuizData.length}`;
}
function QuizFinish() {
	let score = 0;
	document.querySelectorAll('.quiz-section').forEach((item,x) => {
		let button = document.querySelector(`.quiz-nav [count="${x+1}"]`);
		button.classList.add('negative');
		item.querySelectorAll('input').forEach((item,y) => {
			if (item.checked && QuizData[x].answer == (y+1)) {
				score += 1;
				button.classList.remove('negative');
				button.classList.add('positive');
			}
		});
	});
	let htmlModal = `
		<div class="modal-image">
			<img src="https://24.kg/files/media/76/76128.jpg"></img>
		</div>
		<div class="modal-title">
			Практическая часть по материалу
		</div>
		<div class="modal-content">
			Вы ответили правильно на <b>${score} вопрос(ов)</b>.
			<br>${score < QuizData.length*markRate[0] ? mark[0] : score < QuizData.length*markRate[1] ? mark[1] : score < QuizData.length*markRate[2] ? mark[2] : score < QuizData.length*markRate[3] ? mark[3] : mark[4]}
		</div>
	`;
	openModal({html: htmlModal, width: '40vw'});
}
var isScriptLoad = true;