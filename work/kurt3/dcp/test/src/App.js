import React, { useState } from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import GoToTest1 from './panels/GoToTest1';
import GoToTest2 from './panels/GoToTest2';
import GoToTest3 from './panels/GoToTest3';
import GoToTest4 from './panels/GoToTest4';
import GoToTest5 from './panels/GoToTest5';
import GoToTest6 from './panels/GoToTest6';
import GoToTest7 from './panels/GoToTest7';
import GoToTest8 from './panels/GoToTest8';
import GoToTest9 from './panels/GoToTest9';
import GoToTest10 from './panels/GoToTest10';
import GoToTest11 from './panels/GoToTest11';
import GoToTest12 from './panels/GoToTest12';
import GoToTest13 from './panels/GoToTest13';
import GoToTest14 from './panels/GoToTest14';
import GoToTest15 from './panels/GoToTest15';
import GoToTest16 from './panels/GoToTest16';
import GoToTest17 from './panels/GoToTest17';
import GoToTest18 from './panels/GoToTest18';
import GoToTest19 from './panels/GoToTest19';
import GoToTest20 from './panels/GoToTest20';
import GoToTest21 from './panels/GoToTest21';
import GoToTest22 from './panels/GoToTest22';
import GoToTest23 from './panels/GoToTest23';
import GoToTest24 from './panels/GoToTest24';
import GoToTestPreEnd from './panels/GoToTestPreEnd';
import GoToTestEnd from './panels/GoToTestEnd';

import './panels/Style.css';
let checked = '';
let lang = ['баллов', 'балл', 'балла'];
let statuses = [
	{
		'score': '10-12',
		'max': 12,
		'min': 10,
		'title': 'Ярко выраженная профессиональная склонность'
	}, {
		'score': '7-9',
		'max': 9,
		'min': 7,
		'title': 'Средне выраженная профессиональная склонность'
	}, {
		'score': '4-6',
		'max': 6,
		'min': 4,
		'title': 'Слабо выраженная профессиональная склонность'
	}, {
		'score': '0-3',
		'max': 3,
		'min': 0,
		'title': 'Профессиональная склонность не выражена'
	}
];
let score = [
	{
		'score': 0,
		'title': 'Вы не прошли тестирование',
		'value': 'баллов'
	}, {
		'score': 0,
		'title': 'Вы не прошли тестирование',
		'value': 'баллов'
	}, {
		'score': 0,
		'title': 'Вы не прошли тестирование',
		'value': 'баллов'
	}, {
		'score': 0,
		'title': 'Вы не прошли тестирование',
		'value': 'баллов'
	}, {
		'score': 0,
		'title': 'Вы не прошли тестирование',
		'value': 'баллов'
	}, {
		'score': 0,
		'title': 'Вы не прошли тестирование',
		'value': 'баллов'
	}
];
let questions = [
	{
		'question': 'Мне хотелось бы в своей профессиональной деятельности...',
		'answers': {'Вариант А':'...общаться с самыми разными людьми.','Вариант Б':'...что-нибудь делать своими руками – мебель, одежду, машины и т.д.','Вариант В':'...снимать фильмы, рисовать, писать книги, выступать на сцене и т.д.'}
	}, {
		'question': 'В книге или кинофильме меня больше всего привлекает...',
		'answers': {'Вариант А':'...художественная форма, мастерство писателя или режиссера.','Вариант Б':'...сюжет, действие героев.','Вариант В':'...информация, которая может пригодиться в жизни.'}
	}, {
		'question': 'Меня обрадует Нобелевская премия...',
		'answers': {'Вариант А':'...в области науки.','Вариант Б':'...за общественную деятельность.','Вариант В':'...в области искусства.'}
	}, {
		'question': 'Я скорее соглашусь стать...',
		'answers': {'Вариант А':'...управляющим банка.','Вариант Б':'...главным инженером на производстве.','Вариант В':'...начальником экспедиции.'}
	}, {
		'question': 'Будущее людей определяет...',
		'answers': {'Вариант А':'...достижение науки.','Вариант Б':'...развитие производства.','Вариант В':'...взаимопонимание среди людей.'}
	}, {
		'question': 'На месте директора школы я прежде всего займусь...',
		'answers': {'Вариант А':'...благоустройством школы (столовая, спортзал, компьютеры).','Вариант Б':'...созданием дружного, сплоченного коллектива.','Вариант В':'...разработкой новых технологий обучения.'}
	}, {
		'question': 'На технической выставке меня больше всего привлечет...',
		'answers': {'Вариант А':'...внешний вид экспонатов (цвет, форма).','Вариант Б':'...внутреннее устройство экспонатов (механизм).','Вариант В':'...практическое применение экспонатов.'}
	}, {
		'question': 'В людях я ценю прежде всего...',
		'answers': {'Вариант А':'...мужество, смелость, выносливость.','Вариант Б':'...дружелюбие, чуткость, отзывчивость.','Вариант В':'...ответственность, аккуратность.'}
	}, {
		'question': 'В свободное от работы время я буду...',
		'answers': {'Вариант А':'...писать стихи или музыку или рисовать.','Вариант Б':'...ставить различные опыты.','Вариант В':'...тренироваться.'}
	}, {
		'question': 'В заграничных поездках меня больше всего привлечет...',
		'answers': {'Вариант А':'...экстремальный туризм (альпинизм, виндсерфинг, горные лыжи).','Вариант Б':'...деловое общение.','Вариант В':'...возможность знакомства с историей и культурой другой страны.'}
	}, {
		'question': 'Мне интереснее беседовать...',
		'answers': {'Вариант А':'...о машине нового типа.','Вариант Б':'...о новой научной теории.','Вариант В':'...о человеческих взаимоотношениях.'}
	}, {
		'question': 'Если бы в моей школе было всего три кружка, я бы выбрал...',
		'answers': {'Вариант А':'...технический.','Вариант Б':'...музыкальный.','Вариант В':'...спортивный.'}
	}, {
		'question': 'В школе больше внимания следует уделять...',
		'answers': {'Вариант А':'...улучшению взаимопонимания между учителями и учениками.','Вариант Б':'...поддержанию здоровья учащихся, занятиям спортом.','Вариант В':'...укреплению дисциплины.'}
	}, {
		'question': 'Я с большим интересом смотрю...',
		'answers': {'Вариант А':'...научно-популярные фильмы.','Вариант Б':'...программы о культуре и спорте.','Вариант В':'...спортивные программы.'}
	}, {
		'question': 'Мне было бы интереснее работать...',
		'answers': {'Вариант А':'...с машинами, механизмами.','Вариант Б':'...с объектами природы.','Вариант В':'...с детьми или сверстниками.'}
	}, {
		'question': 'Школа в первую очередь должна...',
		'answers': {'Вариант А':'...давать знания и умения.','Вариант Б':'...учить общению с другими людьми.','Вариант В':'...обучать навыкам работы.'}
	}, {
		'question': 'Каждый человек должен...',
		'answers': {'Вариант А':'...вести здоровый образ жизни.','Вариант Б':'...иметь возможность заниматься творчеством.','Вариант В':'...иметь удобные бытовые условия.'}
	}, {
		'question': 'Для благополучия общества в первую очередь необходима...',
		'answers': {'Вариант А':'...защита интересов и прав граждан.','Вариант Б':'...забота о материальном благополучии людей.','Вариант В':'...наука и технический прогресс.'}
	}, {
		'question': 'Мне больше всего нравятся уроки...',
		'answers': {'Вариант А':'...физкультуры.','Вариант Б':'...математики.','Вариант В':'...труда.'}
	}, {
		'question': 'Мне интереснее было бы...',
		'answers': {'Вариант А':'...планировать производство продукции.','Вариант Б':'...изготавливать изделия.','Вариант В':'...заниматься сбытом продукции.'}
	}, {
		'question': 'Я предпочитаю читать статьи...',
		'answers': {'Вариант А':'...о выдающихся ученых и их открытиях.','Вариант Б':'...о творчестве ученых и музыкантов.','Вариант В':'...об интересных изобретениях.'}
	}, {
		'question': 'Свободное время я охотнее провожу...',
		'answers': {'Вариант А':'...делая что-то по хозяйству.','Вариант Б':'...с книгой.','Вариант В':'...на выставках, концертах и пр.'}
	}, {
		'question': 'Больший интерес у меня вызовет сообщение...',
		'answers': {'Вариант А':'...о художественной выставке.','Вариант Б':'...о ситуации на фондовой бирже.','Вариант В':'...о научном открытии.'}
	}, {
		'question': 'Я предпочитаю работать...',
		'answers': {'Вариант А':'...в помещении, где много людей.','Вариант Б':'...в необычных условиях.','Вариант В':'...в обычном кабинете.'}
	}, {
		'question': 'Выберите учебное заведение города по вашему вкусу и система сама подберёт Вам профессию по выбранным вариантам ответов.',
		'answers': {'Конечно КУРТ!': 'Каменск-Уральский Радиотехнический Техникум.'}
	}
];
let answers = [
	{
		'head': 'Склонность к работе с людьми',
		'body': 'Профессии, связанные с обслуживанием (бытовым, медицинским, информационным), управлением, воспитанием и обучением. Люди, успешные в профессиях этой группы, должны уметь и любить общаться, находить общий язык с разными людьми, понимать их настроение, намерения и особенности.'
	}, {
		'head': 'Склонность к исследовательской деятельности',
		'body': 'Профессии, связанные с научной работой. Кроме хорошей теоретической подготовки в определенных областях науки, людям, занимающимся исследовательской деятельностью, необходимы такие качества, как рациональность, независимость и оригинальность суждений, аналитический склад ума. Как правило, им больше нравится размышлять о проблеме, чем заниматься ее реализацией.'
	}, {
		'head': 'Склонность к работе на производстве',
		'body': 'Круг этих профессий очень широк: производство и обработка металла; сборка, монтаж приборов и механизмов; ремонт, наладка, обслуживание электронного и механического оборудования; монтаж, ремонт зданий, конструкций; обработка и использование различных материалов; управление транспортом. Профессии этой группы предъявляют повышенные требования к здоровью человека, координации движений, вниманию.'
	}, {
		'head': 'Склонность к эстетическим видам деятельности',
		'body': 'Профессии творческого характера, связанные с изобразительной, музыкальной, литературно-художественной, актерско-сценической деятельностью. Людей творческих профессий, кроме наличия специальных способностей (музыкальных, литературных, актерских), отличает оригинальность мышления и независимость характера, стремление к совершенству.'
	}, {
		'head': 'Склонность к экстремальным видам деятельности',
		'body': 'Профессии, связанные с занятиями спортом, путешествиями, экспедиционной работой, охранной и оперативно-розыскной деятельностью, службой в армии. Все они предъявляют особые требования к физической подготовке, здоровью и морально-волевым качествам.'
	}, {
		'head': 'Склонность к планово-экономическим видам деятельности',
		'body': 'Профессии, связанные с расчетами и планированием (бухгалтер, экономист); делопроизводством, анализом и преобразованием текстов (редактор, переводчик, лингвист); схематическим изображением объектов (чертежник, топограф). Эти профессии требуют от человека собранности и аккуратности.'
	}, {
		'head': 'Ошибка',
		'body': 'Вы ответили не на все вопросы!'
	}, [
		{1:1,4:3,6:2},
		{2:3,4:1,5:2},
		{1:2,2:1,4:3},
		{3:2,5:3,6:1},
		{1:3,2:1,3:2},
		{1:2,2:3,6:1},
		{2:2,3:3,4:1},
		{1:2,5:1,6:3},
		{2:2,4:1,5:3},
		{4:3,5:1,6:2},
		{1:3,2:2,3:1},
		{3:1,4:2,5:3},
		{1:1,5:2,6:3},
		{2:2,4:2,5:3},
		{1:3,3:1,5:2},
		{1:2,3:3,6:1},
		{4:2,5:1,6:3},
		{1:1,2:3,3:2},
		{3:3,5:1,6:2},
		{1:3,3:2,6:1},
		{2:1,3:3,4:2},
		{2:2,3:1,4:3},
		{2:3,4:1,6:2},
		{1:1,5:2,6:3}
	]
];
const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const go = e => {
		try {
			setActivePanel(e.currentTarget.dataset.to);
			checked = '';
		} catch(err) { console.log(err); }
	};
	const next = e => {
		try {
			let check = document.querySelector('input[name="radio"]:checked').value;
			checked += check;
			if ( e.currentTarget.dataset.to === 'GoToTestEnd' ) {
				setAnswer();
			}
			setActivePanel(e.currentTarget.dataset.to);
			document.querySelector('button[name="next"]').setAttribute('style', 'opacity:.5; pointer-events: none;');
		} catch(err) { console.log(err); }
	};
	const setCheck = e => {
		try {
			document.querySelector('button[name="next"]').setAttribute('style', 'opacity:1; pointer-events: auto;');
		} catch(err) { console.log(err); }
	};
	const setAnswer = e => {
		try {
			let size_questions = 25;
			let size_answers = 3;
			let size_scores = 6;
			let size_rangs = 4;
			if ( checked.length === size_questions ) {
				for ( let r = 0; r < size_scores; r++ ) {
					score[r].score = 0;
					if ( (r+1) === size_scores ) {
						let match = checked.split('');
						for ( let x = 0; x < (size_questions-1); x++ ) {
							for ( let z = 0; z < size_answers; z++ ) {
								console.log('Правильный ответ: ' + Object.values(answers[7][x])[z] + ' / Ваш ответ: ' + Number(match[x]) + '\nНомер вопроса: ' + (x+1) + ' / Номер ответ: ' + (z+1));
								if ( Object.values(answers[7][x])[z] === Number(match[x]) ) { //ЕСЛИ ОТВЕТ В СЕТКЕ РАВЕН ОТВЕТУ
									score[Object.keys(answers[7][x])[z]-1].score += 1; //ПРИБАВЛЯЕМ БАЛЛ В КАТЕГОРИЮ С МАСКИ
								}
								if ( (x+1) === (size_questions-1) && (z+1) === size_answers ) {
									for ( let y = 0; y < size_scores; y++ ) {
										for ( let q = 0; q < size_rangs; q++ ) {
											if ( score[y].score >= statuses[q].min && score[y].score <= statuses[q].max ) {
												score[y].title = statuses[q].title;
												let last = Number(score[y].score.toString().slice(-1));
												last === 1 ? (score[y].value = lang[1]) : last === 2 || last === 3 || last === 4 ? (score[y].value = lang[2]) : (score[y].value = lang[0]);
											}
										}
									}
								}
							}
						}
					}
				}
				console.log(score);
			}
		} catch(err) { console.log(err); }
	};
	return (
		<View activePanel={activePanel}>
			<Home id='home' go={go} />
			<GoToTest1 id='GoToTest1' go={go} next={next} setCheck={setCheck} question={questions[0]} />
			<GoToTest2 id='GoToTest2' go={go} next={next} setCheck={setCheck} question={questions[1]} />
			<GoToTest3 id='GoToTest3' go={go} next={next} setCheck={setCheck} question={questions[2]} />
			<GoToTest4 id='GoToTest4' go={go} next={next} setCheck={setCheck} question={questions[3]} />
			<GoToTest5 id='GoToTest5' go={go} next={next} setCheck={setCheck} question={questions[4]} />
			<GoToTest6 id='GoToTest6' go={go} next={next} setCheck={setCheck} question={questions[5]} />
			<GoToTest7 id='GoToTest7' go={go} next={next} setCheck={setCheck} question={questions[6]} />
			<GoToTest8 id='GoToTest8' go={go} next={next} setCheck={setCheck} question={questions[7]} />
			<GoToTest9 id='GoToTest9' go={go} next={next} setCheck={setCheck} question={questions[8]} />
			<GoToTest10 id='GoToTest10' go={go} next={next} setCheck={setCheck} question={questions[9]} />
			<GoToTest11 id='GoToTest11' go={go} next={next} setCheck={setCheck} question={questions[10]} />
			<GoToTest12 id='GoToTest12' go={go} next={next} setCheck={setCheck} question={questions[11]} />
			<GoToTest13 id='GoToTest13' go={go} next={next} setCheck={setCheck} question={questions[12]} />
			<GoToTest14 id='GoToTest14' go={go} next={next} setCheck={setCheck} question={questions[13]} />
			<GoToTest15 id='GoToTest15' go={go} next={next} setCheck={setCheck} question={questions[14]} />
			<GoToTest16 id='GoToTest16' go={go} next={next} setCheck={setCheck} question={questions[15]} />
			<GoToTest17 id='GoToTest17' go={go} next={next} setCheck={setCheck} question={questions[16]} />
			<GoToTest18 id='GoToTest18' go={go} next={next} setCheck={setCheck} question={questions[17]} />
			<GoToTest19 id='GoToTest19' go={go} next={next} setCheck={setCheck} question={questions[18]} />
			<GoToTest20 id='GoToTest20' go={go} next={next} setCheck={setCheck} question={questions[19]} />
			<GoToTest21 id='GoToTest21' go={go} next={next} setCheck={setCheck} question={questions[20]} />
			<GoToTest22 id='GoToTest22' go={go} next={next} setCheck={setCheck} question={questions[21]} />
			<GoToTest23 id='GoToTest23' go={go} next={next} setCheck={setCheck} question={questions[22]} />
			<GoToTest24 id='GoToTest24' go={go} next={next} setCheck={setCheck} question={questions[23]} />
			<GoToTestPreEnd id='GoToTestPreEnd' go={go} next={next} setCheck={setCheck} setAnswer={setAnswer} question={questions[24]} />
			<GoToTestEnd id='GoToTestEnd' go={go} checked={checked} answers={answers} score={score} />
		</View>
	);
}
export default App;