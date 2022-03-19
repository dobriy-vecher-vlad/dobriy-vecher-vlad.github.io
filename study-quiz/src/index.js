import bridge from "@vkontakte/vk-bridge";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
	Header,
	Link,
	ScreenSpinner,
	Avatar,
	withAdaptivity,
	ViewWidth,
	ConfigProvider,
	AdaptivityProvider, 
	AppRoot,
	FormItem,
	Gradient,
	Title,
	Spacing,
	PanelHeader,
	View,
	Panel,
	PanelHeaderBack,
	Group,
	Cell,
	Banner,
	FormStatus,
	Footer,
	SimpleCell,
	Button,
	Radio,
	CardScroll,
	Card,
	Snackbar,
	RichCell,
	Counter,
	CardGrid
} from '@vkontakte/vkui';
import {
	Icon16Done,
	Icon16LikeOutline,
	Icon16Link,
	Icon16SadFaceOutline,
	Icon24ClockOutline,
	Icon24HammerOutline,
	Icon24HomeOutline,
	Icon24KeyOutline,
	Icon24LaptopOutline,
	Icon24PawOutline,
	Icon24ScanViewfinderOutline,
	Icon24UsersOutline,
	Icon28HomeOutline,
	Icon28KeyOutline
} from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

let isStart = false;
let answers = [];
const questions = [
	{
		'question': 'Что бы вам хотелось в своей профессиональной деятельности?',
		'answers': {'Вариант А':'Общаться с самыми разными людьми','Вариант Б':'Что-нибудь делать своими руками','Вариант В':'Снимать фильмы, рисовать, писать книги, выступать на сцене и т.д.'}
	}, {
		'question': 'Что вас больше всего привлекает в книге или кинофильме?',
		'answers': {'Вариант А':'Художественная форма, мастерство писателя или режиссера','Вариант Б':'Сюжет, действие героев','Вариант В':'Информация, которая может пригодиться в жизни'}
	}, {
		'question': 'За что вас обрадует Нобелевская премия?',
		'answers': {'Вариант А':'В области науки','Вариант Б':'За общественную деятельность','Вариант В':'В области искусства'}
	}, {
		'question': 'Кем вы скорее согласитесь стать?',
		'answers': {'Вариант А':'Управляющий банка','Вариант Б':'Главный инженер на производстве','Вариант В':'Начальник экспедиции'}
	}, {
		'question': 'Что определяет будущее людей?',
		'answers': {'Вариант А':'Достижение науки','Вариант Б':'Развитие производства','Вариант В':'Взаимопонимание среди людей'}
	}, {
		'question': 'Чем вы прежде всего займётесь на месте директора школы?',
		'answers': {'Вариант А':'Благоустройство школы','Вариант Б':'Создание дружного, сплоченного коллектива','Вариант В':'Разработка новых технологий обучения'}
	}, {
		'question': 'Что вас больше всего привлечёт на технической выставке?',
		'answers': {'Вариант А':'Внешний вид экспонатов','Вариант Б':'Внутреннее устройство экспонатов','Вариант В':'Практическое применение экспонатов'}
	}, {
		'question': 'Что вы цените в людях прежде всего?',
		'answers': {'Вариант А':'Мужество, смелость, выносливость','Вариант Б':'Дружелюбие, чуткость, отзывчивость','Вариант В':'Ответственность, аккуратность'}
	}, {
		'question': 'Чем бы вы хотели заниматься в свободное от работы время?',
		'answers': {'Вариант А':'Писать стихи или музыку или рисовать','Вариант Б':'Ставить различные опыты','Вариант В':'Тренироваться'}
	}, {
		'question': 'Что вас больше всего привлечёт в заграничных поездках?',
		'answers': {'Вариант А':'Экстремальный туризм','Вариант Б':'Деловое общение','Вариант В':'Возможность знакомства с историей и культурой другой страны'}
	}, {
		'question': 'О чём вам интереснее беседовать?',
		'answers': {'Вариант А':'О машине нового типа','Вариант Б':'О новой научной теории','Вариант В':'О человеческих взаимоотношениях'}
	}, {
		'question': 'Если бы в вашей школе было всего три кружка, какой бы вы выбрали?',
		'answers': {'Вариант А':'Технический','Вариант Б':'Музыкальный','Вариант В':'Спортивный'}
	}, {
		'question': 'Чему в школе следует уделять больше внимания?',
		'answers': {'Вариант А':'Улучшение взаимопонимания между учителями и учениками','Вариант Б':'Поддержка здоровья учащихся, занятие спортом','Вариант В':'Укрепление дисциплины'}
	}, {
		'question': 'Что вы смотрите с большим интересом?',
		'answers': {'Вариант А':'Научно-популярные фильмы','Вариант Б':'Программы о культуре и спорте','Вариант В':'Спортивные программы'}
	}, {
		'question': 'Где вам было бы интереснее работать?',
		'answers': {'Вариант А':'С машинами, механизмами','Вариант Б':'С объектами природы','Вариант В':'С детьми или сверстниками'}
	}, {
		'question': 'Что школа в первую очередь должна делать?',
		'answers': {'Вариант А':'Давать знания и умения','Вариант Б':'Учить общению с другими людьми','Вариант В':'Обучать навыкам работы'}
	}, {
		'question': 'Что необходимо каждому человеку?',
		'answers': {'Вариант А':'Вести здоровый образ жизни','Вариант Б':'Иметь возможность заниматься творчеством','Вариант В':'Иметь удобные бытовые условия'}
	}, {
		'question': 'Что необходимо для благополучия общества в первую очередь?',
		'answers': {'Вариант А':'Защита интересов и прав граждан','Вариант Б':'Забота о материальном благополучии людей','Вариант В':'Наука и технический прогресс'}
	}, {
		'question': 'Какие вам больше всего нравятся уроки?',
		'answers': {'Вариант А':'Физкультура','Вариант Б':'Математика','Вариант В':'Труд'}
	}, {
		'question': 'Чем вам интереснее было бы заниматься?',
		'answers': {'Вариант А':'Планировать производство продукции','Вариант Б':'Изготавливать изделия','Вариант В':'Заниматься сбытом продукции'}
	}, {
		'question': 'О чём вы предпочитаете читать статьи?',
		'answers': {'Вариант А':'О выдающихся ученых и их открытиях','Вариант Б':'О творчестве ученых и музыкантов','Вариант В':'Об интересных изобретениях'}
	}, {
		'question': 'Как вы проводите свободное время?',
		'answers': {'Вариант А':'Делая что-то по хозяйству','Вариант Б':'С книгой','Вариант В':'На выставках, концертах и т.д.'}
	}, {
		'question': 'О каком сообщении у вас вызовет больший интерес?',
		'answers': {'Вариант А':'О художественной выставке','Вариант Б':'О ситуации на фондовой бирже','Вариант В':'О научном открытии'}
	}, {
		'question': 'Где вы предпочитаете работать?',
		'answers': {'Вариант А':'В помещении, где много людей','Вариант Б':'В необычных условиях','Вариант В':'В обычном кабинете'}
	}, {
		'question': 'В каком учебном заведении вам хотелось бы обучаться?',
		'answers': {
			'КУРТ': 'Каменск-Уральский Радиотехнический Техникум',
			'КУПК': 'Каменск-Уральский Политехнический Колледж',
			'КУПедК': 'Каменск-Уральский Педагогический Колледж',
			'КУТТС': 'Каменск-Уральский Техникум Торговли и Сервиса',
			'КУАТ': 'Каменск-Уральский Агропромышленный Техникум',
			'СОМК': 'Свердловский Областной Медицинский Колледж'
		}
	}
];
const interests = [
	{
		'head': 'Работа с людьми',
		'body': `Профессии, связанные с обслуживанием, управлением, воспитанием и обучением\n\nЛюди, успешные в профессиях этой группы, должны уметь и любить общаться, находить общий язык с разными людьми, понимать их настроение, намерения и особенности`
	}, {
		'head': 'Исследовательская деятельность',
		'body': 'Профессии, связанные с научной работой\n\nКроме хорошей теоретической подготовки в определенных областях науки, людям, занимающимся исследовательской деятельностью, необходимы такие качества, как рациональность, независимость и оригинальность суждений, аналитический склад ума'
	}, {
		'head': 'Работа на производстве',
		'body': 'Круг этих профессий очень широк: производство и обработка металла; сборка, монтаж приборов и механизмов; ремонт, наладка, обслуживание электронного и механического оборудования\n\nПрофессии этой группы предъявляют повышенные требования к здоровью человека, координации движений, вниманию'
	}, {
		'head': 'Эстетическая деятельность',
		'body': 'Профессии творческого характера, связанные с изобразительной, музыкальной, литературно-художественной, актерско-сценической деятельностью\n\nЛюдей творческих профессий, кроме наличия специальных способностей, отличает оригинальность мышления и независимость характера, стремление к совершенству'
	}, {
		'head': 'Экономическая и информационная деятельность',
		'body': 'Профессии, связанные с расчетами и планированием; делопроизводством, анализом и преобразованием текстов; схематическим изображением объектов\n\nЭти профессии требуют от человека собранности и аккуратности'
	}
];
const jobs = {
	'Радиотехнический техникум': [
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Управление качеством продукции, процессов и услуг':'forwork', 'Радиоаппаратостроение':'forwork', 'Прикладная информатика':'forwork', 'Технология металлообрабатывающего производства':'forwork', 'Техническая эксплуатация и обслуживание электрического и электромеханического оборудования':'forwork'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Управление качеством продукции, процессов и услуг':'ПАО «СинтТЗ»<br>УПКБ «Деталь»<br>ОАО «КУЛЗ»<br>...и ещё 15 мест!', 'Прикладная информатика':'forwork'}
	],
	'Политехнический колледж': [
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Техническая эксплуатация и обслуживание электрического и электромеханического оборудования':'forwork', 'Монтаж и техническая эксплуатация промышленного оборудования':'forwork', 'Технология машиностроения':'forwork', 'Металлургия цветных металлов':'forwork', 'Обработка металлов давлением':'forwork'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Информационные системы и программирование':'forwork', 'Экономика и бухгалтерский учет':'forwork'}
	], 
	'Педагогический колледж': [
		{'Дошкольное образование':'forwork', 'Коррекционная педагогика в начальном образовании':'forwork', 'Социальная работа':'forwork'}, 
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'}
	], 
	'Техникум торговли и сервиса': [
		{'Правоохранительная деятельность':'forwork', 'Гостиничное дело':'forwork', 'Поварское и кондитерское дело':'forwork', 'Земельно-имущественные отношения':'forwork', 'Гостиничный сервис':'forwork', 'Организация обслуживания в общественном питании':'forwork'}, 
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Строительство и эксплуатация зданий и сооружений':'forwork', 'Организация перевозок и управление на транспорте':'forwork'}, 
		{'Парикмахерское искусство':'forwork', 'Дизайн':'forwork', 'Гостиничное дело':'forwork', 'Поварское и кондитерское дело':'forwork'}, 
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Информационные системы и программирование':'forwork', 'Технология продукции общественного питания':'forwork', 'Операционная деятельность в логистике':'forwork', 'Коммерция':'forwork', 'Финансы':'forwork', 'Прикладная информатика':'forwork', 'Земельно-имущественные отношения':'forwork', 'Гостиничный сервис':'forwork', 'Экономика и бухгалтерский учет':'forwork'}
	], 
	'Агропромышленный техникум': [
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Автомеханик':'forwork', 'Мастер по техническому обслуживанию и ремонту машинно-тракторного парка':'forwork', 'Сварщик ручной и частично механизированной сварки':'forwork', 'Эксплуатация и ремонт сельскохозяйственной техники и оборудования':'forwork', 'Техническое обслуживание и ремонт автомобильного транспорта':'forwork'}, 
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Информационные системы':'forwork'}
	], 
	'Областной медицинский колледж': [
		{'Сестринское дело':'forwork', 'Медико-профилактическое дело':'forwork', 'Лабораторная диагностика':'forwork', 'Социальная работа':'forwork', 'Стоматология ортопедическая':'forwork', 'Лечебное дело':'forwork', 'Акушерское дело':'forwork'}, 
		{'Лабораторная диагностика':'forwork'}, 
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'},
		{'Нет подходящих специальностей':'Нет подходящих работ'}
	]
};
const level = [
	'Нет профессионального интереса',
	'Нет профессионального интереса',
	'Нет профессионального интереса',
	'Нет профессионального интереса',
	'Слабый профессиональный интерес',
	'Слабый профессиональный интерес',
	'Слабый профессиональный интерес',
	'Средний профессиональный интерес',
	'Средний профессиональный интерес',
	'Средний профессиональный интерес',
	'Сильный профессиональный интерес',
	'Сильный профессиональный интерес',
	'Сильный профессиональный интерес'
];

bridge.subscribe(({ detail: { type, data }}) => {
	if (type === 'VKWebAppUpdateConfig') {
		const schemeAttribute = document.createAttribute('scheme');
		schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
		document.body.attributes.setNamedItem(schemeAttribute);
	}
});
bridge.send("VKWebAppInit");

const App = withAdaptivity(({ viewWidth }) => {
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
	const numberSpaces = (number, symbol = '.') => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
	}
	const numberForm = (number, titles) => {
		number = Math.abs(number);
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[(number%100>4&&number%100<20)?2:cases[(number%10<5)?number%10:5]];
	}
	const numberRandom = (min = 1, max = 2) => {
		return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
	}
	const getTime = (ms = 0, format = 'big') => {
		let date = new Date(Number(ms));
		return format === 'big' ? date.toLocaleString("ru", {
			timezone: 'UTC',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}) : format === 'small' ? date.toLocaleString("ru", {
			timezone: 'UTC',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		}) : null;
	}
	const getTimeLast = (s = 0, type = 'full') => {
		s = +new Date() - s;
		let seconds = parseInt((s / 1000) % 60);
		let minutes = parseInt((s / (1000 * 60)) % 60);
		let hours = Math.floor(s / (1000 * 60 * 60));
		let days = Math.floor(s / (1000 * 60 * 60 * 24));
		let weeks = Math.floor(s / (1000 * 60 * 60 * 24 * 7));
		let months = Math.floor(s / (1000 * 60 * 60 * 24 * 30));
		let years = Math.floor(s / (1000 * 60 * 60 * 24 * 365));
		if (seconds < 0) {
			return `только что`;
		} else if (minutes < 1) {
			return `${seconds} ${numberForm(seconds, ['секунда', 'секунды', 'секунд'])} назад`;
		} else if (hours < 1) {
			return `${minutes} ${numberForm(minutes, ['минута', 'минуты', 'минут'])}${type=='full'&&seconds-minutes*60!==0 ? ` и ${seconds-minutes*60} ${numberForm(seconds-minutes*60, ['секунда', 'секунды', 'секунд'])}` : ``} назад`;
		} else if (days < 1) {
			return `${hours} ${numberForm(hours, ['час', 'часа', 'часов'])}${type=='full'&&minutes-hours*60!==0 ? ` и ${minutes-hours*60} ${numberForm(minutes-hours*60, ['минута', 'минуты', 'минут'])}` : ``} назад`;
		} else if (weeks < 1) {
			return `${days} ${numberForm(days, ['день', 'дня', 'дней'])}${type=='full'&&hours-days*24!==0 ? ` и ${hours-days*24} ${numberForm(hours-days*24, ['час', 'часа', 'часов'])}` : ``} назад`;
		} else if (months < 1) {
			return `${weeks} ${numberForm(weeks, ['неделя', 'недели', 'недель'])}${type=='full'&&days-weeks*7!==0 ? ` и ${days-weeks*7} ${numberForm(days-weeks*7, ['день', 'дня', 'дней'])}` : ``} назад`;
		} else if (years < 1) {
			return `${months} ${numberForm(months, ['месяц', 'месяца', 'месяцев'])}${type=='full'&&Math.floor((days-months*30)/7)!==0 ? ` и ${Math.floor((days-months*30)/7)} ${numberForm(Math.floor((days-months*30)/7), ['неделя', 'недели', 'недель'])}` : ``} назад`;
		} else {
			return `${years} ${numberForm(years, ['год', 'года', 'лет'])}${type=='full'&&Math.floor((days-years*365)/30)!==0 ? ` и ${Math.floor((days-years*365)/30)} ${numberForm(Math.floor((days-years*365)/30), ['месяц', 'месяца', 'месяцев'])}` : ``} назад`;
		}
	}

	const [activePanel, setPanel] = useState('home');
	const [popout, setPopout] = useState(<ScreenSpinner />);
	const [snackbar, setSnackbar] = useState(null);

	const [isChecked, setIsChecked] = useState(false);
	const [userData, setUserData] = useState(null);
	const [lastScore, setLastScore] = useState(null);

	const getBridge = async(method, params) => {
		let data = null;
		try {
			data = await bridge.send(method, params);
		} catch (error) {
			console.log(error);
		}
		return data;
	};
	const getActivePanel = async(name, settings) => {
		if (name == 'home' && !isStart) {
			isStart = true;
			setPopout(<ScreenSpinner />);
			console.log(name);
			let dataBridge = await getBridge('VKWebAppGetUserInfo');
			setUserData({user: dataBridge, result: null});
			setPopout(null);
		}
		if (name == 'myResults') {
			setPopout(<ScreenSpinner />);
			let dataBridge;
			let data;
			if (settings[0]) {
				dataBridge = await getBridge('VKWebAppGetUserInfo');
			} else {
				dataBridge = {
					last_name: "Пользователь",
					first_name: "Тестовый",
					photo_200: "https://vk.com/images/camera_200.png",
					id: 1337
				}
			}
			if (settings[1]) {
				data = await fetch("https://kurt-database.000webhostapp.com/for_db.php", {
					"headers": {
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
					},
					"body": `type=getUserScore&id=${dataBridge.id}`,
					"method": "POST"
				});
				data = await data.json();
				data = data.users;
				if (data.id == 0) {
					setPopout(null);
					setSnackbar(
						<Snackbar
							onClose={() => setSnackbar(null)}
							action="Пройти"
							onActionClick={() => setActivePanel('question-1')}
							before={<Icon16SadFaceOutline fill={'var(--destructive)'} width={24} height={24} />}
						>
							Вы не прошли тестирование
						</Snackbar>
					);
					return;
				}
				data.score = [Number(data.s1[0]), Number(data.s2[0]), Number(data.s3[0]), Number(data.s4[0]), Number(data.s6[0])];
				data.score = data.score.map(function(el, i) {
					return { index: i, value: el };
				}).sort(function(a, b) {
					return Number(a.value) < Number(b.value) ? 1 : -1;
				});
			} else {
				let map = [
					{1:1,4:3,6:2},
					{2:3,4:1,2:2},
					{1:2,2:1,4:3},
					{3:2,3:3,6:1},
					{1:3,2:1,3:2},
					{1:2,2:3,6:1},
					{2:2,3:3,4:1},
					{1:2,2:1,6:3},
					{2:2,4:1,3:3},
					{4:3,2:1,6:2},
					{1:3,2:2,3:1},
					{3:1,4:2,3:3},
					{1:1,2:2,6:3},
					{2:1,4:2,3:3},
					{1:3,3:1,2:2},
					{1:2,3:3,6:1},
					{4:2,3:1,6:3},
					{1:1,2:3,3:2},
					{3:3,2:1,6:2},
					{1:3,3:2,6:1},
					{2:1,3:3,4:2},
					{2:2,3:1,4:3},
					{2:3,4:1,6:2},
					{1:1,3:2,6:3}
				];
				let score = [0,0,0,0,0,0];
				map.map((data, x) => {
					Object.entries(data).map((data, z) => {
						score[data[0]-1] += answers[x] == data[1] ? 1 : 0;
					});
				});

				data = await fetch("https://kurt-database.000webhostapp.com/for_db.php", {
					"headers": {
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
					},
					"body": `type=setScore&id=${dataBridge.id}&name=${dataBridge.first_name}&surname=${dataBridge.last_name}&time=${+new Date}&hash=${answers.join('')}&s1=${score[0]}&s2=${score[1]}&s3=${score[2]}&s4=${score[3]}&s5=${score[4]}&s6=${score[5]}`,
					"method": "POST"
				});
				data = await data.json();
				
				score = [score[0], score[1], score[2], score[3], score[5]];
				score = score.map(function(el, i) {
					return { index: i, value: el };
				}).sort(function(a, b) {
					return Number(a.value) < Number(b.value) ? 1 : -1;
				});
				
				data = {
					hash: [answers.join('')],
					id: [dataBridge.id],
					name: [dataBridge.first_name],
					score: score,
					s1: [`${score[0]}`],
					s2: [`${score[1]}`],
					s3: [`${score[2]}`],
					s4: [`${score[3]}`],
					s6: [`${score[5]}`],
					surname: [dataBridge.last_name],
					time: [`${+new Date}`]
				};
			}
			setUserData({user: dataBridge, result: data});
			setActivePanel(name);
			setPopout(null);
		}
		if (name == 'lastPassed') {
			setPopout(<ScreenSpinner />);
			let data = await fetch("https://kurt-database.000webhostapp.com/for_db.php", {
				"headers": {
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				},
				"body": "type=getLastScore",
				"method": "POST"
			});
			data = await data.json();
			data = data.users;
			let users = {
				total: data.id.length,
				users: [],
				gradient: []
			};
			for (let i = 0; i < users.total && i < 13; i++) {
				users.users.push({
					id: data.id[i],
					name: 'Анонимный Аноним',
					first_name: 'Анонимный',
					last_name: 'Аноним',
					time: data.time[i],
					photo: 'https://vk.com/images/camera_200.png',
					score: [Number(data.s1[i]), Number(data.s2[i]), Number(data.s3[i]), Number(data.s4[i]), Number(data.s6[i])]
				});
			}
			let dataBridge = await getBridge('VKWebAppCallAPIMethod', {
				method: 'users.get',
				params: {
					user_ids: [users.users.map((data, x) => {
						return data.id;
					})].join(','),
					fields: 'photo_200, city, country',
					v: '5.130',
					access_token: 'fbaab44ffbaab44ffbaab44f14fbddac9cffbaafbaab44f9bf5dad7939013ff9078e0fc'
				}
			});
			await dataBridge.response.map((data, x) => {
				users.users[x].photo = data.photo_200;
				users.users[x].name = `${data.deactivated ? 'DELETED' : data.first_name} ${data.deactivated ? 'DELETED' : data.last_name}`;
				users.users[x].first_name = data.deactivated ? 'DELETED' : data.first_name;
				users.users[x].last_name = data.deactivated ? 'DELETED' : data.last_name;
				users.users[x].home = data.country ? data.city ? `${data.country.title}, ${data.city.title}` : data.country.title : null;
			});
			if (users.users.length > 3) {
				users.gradient.push(users.users[1]);
				users.gradient.push(users.users[0]);
				users.gradient.push(users.users[2]);
				users.users.splice(0, 3);
				users.total -= 3;
			}
			setLastScore(users);
			setActivePanel(name);
			setPopout(null);
		}
	}
	const setActivePanel = (name, reset = true) => {
		setIsChecked(reset ? false : true);
		if (!/question/.exec(name)) {
			answers = []
		}
		setPanel(name);
		setSnackbar(null);
	}
	const selectAnswer = (answer, question) => {
		setIsChecked(true);
		answers.splice(answer-1, 1, question);
	}
	getActivePanel('home');

	return (
		<View popout={popout} activePanel={activePanel}>
			<Panel id="home" className="Flex">
				<Group>
					{userData && console.log(userData.user)}
					{userData && userData.user && <React.Fragment>
						<RichCell className="CenterCell"
							disabled
							before={<Avatar size={72} mode="app" src={userData.user.photo_200} />}
							text={userData.user.city ? `из города ${userData.user.city.title},` : ''}
							caption="приветствуем тебя в КВОК!"
						>
							{userData.user.first_name} {userData.user.last_name},
						</RichCell>
					</React.Fragment>}
					<CardGrid size="m" className="CardForBanners">
						<Card>
						<Banner
							header={<span>Тестирование</span>}
							subheader={<span>Пройди тестирование и узнай свои способности</span>}
							asideMode="expand"
							onClick={() => setActivePanel('question-1')}
							className="headBanner headBanner_1"
						/>
						</Card>
						<Card>
						<Banner
							header={<span>Мои результаты</span>}
							subheader={<span>Посмотри свои результаты последнего тестирования</span>}
							asideMode="expand"
							onClick={() => getActivePanel('myResults', [true, true])}
							className="headBanner headBanner_2"
						/>
						</Card>
						<Card>
						<Banner
							header={<span>Недавно прошли</span>}
							subheader={<span>Узнай кто прошёл тестирование</span>}
							asideMode="expand"
							onClick={() => getActivePanel('lastPassed')}
							className="headBanner headBanner_3"
						/>
						</Card>
						<Card>
						<Banner
							header={<span>Подробнее о проекте</span>}
							subheader={<span>Возможности и смысл приложения</span>}
							asideMode="expand"
							onClick={() => setActivePanel('aboutApp')}
							className="headBanner headBanner_4"
						/>
						</Card>
					</CardGrid>
				</Group>
				<Footer className="Author">Сделано с <Icon16LikeOutline/> <Link href="https://vk.com/xolova" target="_blank">@xolova</Link></Footer>
				{snackbar}
			</Panel>
			{questions && questions.map((data, x) =>
				<Panel key={x} id={`question-${x+1}`}>
					<PanelHeader left={<PanelHeaderBack onClick={() => x+1 == 1 ? setActivePanel('home') : setActivePanel(`question-${x}`, false)}/>}>
						{`Вопрос ${x+1} из ${questions.length}`}
					</PanelHeader>
					<Group>
						<FormItem>
							<FormStatus header="Вопрос" mode="default">
								<br/>{data.question}
							</FormStatus>
						</FormItem>
						<FormItem>
							<FormStatus mode="default">
								{data.answers && Object.entries(data.answers).map((data, z) =>
									<Radio defaultChecked={answers[x] ? answers[x] == z+1 ? true : false : false} style={{width: 'auto', margin: 0, padding: '0 8px', borderRadius: isDesktop ? '8px' : '10px'}} key={z} name="radio" value={z+1} onClick={() => selectAnswer(x+1, z+1)} description={data[1]}>{data[0]}</Radio>
								)}
							</FormStatus>
						</FormItem>
						{x+1 < questions.length &&
							<div style={{margin: !isDesktop ? '12px' : '20px 12px'}}>
								<Button disabled={isChecked ? false : true} size={isDesktop ? 'l' : 'l'} stretched mode="commerce" onClick={() => setActivePanel(`question-${x+2}`, (answers[x+1] ? false : true))}>Следующий вопрос</Button>
							</div>
						}
						{x+1 == questions.length &&
							<div style={{margin: !isDesktop ? '12px' : '20px 12px'}}>
								<Button disabled={isChecked ? false : true} size={isDesktop ? 'l' : 'l'} stretched mode="commerce" onClick={() => getActivePanel('myResults', [true, false])}>Узнать результат тестирования</Button>
							</div>
						}
						<div style={{margin: !isDesktop ? '12px' : '20px 12px 12px'}}>
							<Button size={isDesktop ? 'm' : 'm'} stretched mode={isDesktop ? 'secondary' : 'tertiary'} onClick={() => setActivePanel('home')}>Завершить тестирование</Button>
						</div>
					</Group>
				</Panel>
			)}
			<Panel id="myResults">
				<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('home')}/>}>
					Мои результаты
				</PanelHeader>
				{userData && <Group>
					{userData.user && <Gradient style={{
						margin: isDesktop ? '-7px -7px 0 -7px' : 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						padding: 32
					}}>
						<Avatar size={96} src={userData.user.photo_200 ? userData.user.photo_200 : 'https://vk.com/images/camera_200.png'} />
						<Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="medium">{userData.user.first_name} {userData.user.last_name}</Title>
						<Link style={{ color: 'var(--text_secondary)' }} href={`https://vk.com/id${userData.user.id}`} target="_blank">@{userData.user.id}</Link>
					</Gradient>}
					{userData.result && <Group mode="plain">
						<Spacing size={12} />
						<Header subtitle="Они надёжно хранятся у нас">Данные</Header>
						<SimpleCell before={<Icon24KeyOutline />} description="Ключ ответов последнего тестирования">{userData.result.hash[0]}</SimpleCell>
						<SimpleCell before={<Icon24ClockOutline />} description="Время прохождения последнего тестирования">{getTime(userData.result.time[0])}</SimpleCell>
						{/* {userData.user.country && <SimpleCell before={<Icon24HomeOutline />} description="Место жительства">{userData.user.country && userData.user.country.title}{userData.user.city && `, ${userData.user.city.title}`}</SimpleCell>} */}
						<Spacing separator size={24} />
						<Header subtitle="Ваши баллы по итогам тестирования">Интересы</Header>
						<CardScroll className="vkuiCardScroll--b">
							{userData.result.score.map((data, x) =>
								<Card key={x} className="card">
									<Avatar className={`myAvatar_${data.index+1}`} size={72} shadow={false}>
										{data.index == 0 && <React.Fragment><div className="myAvatarShadow" style={{top: `${90-100/12*data.value}%`}}></div><Icon24UsersOutline width={48} height={48} style={{color: 'var(--text_primary)'}}/></React.Fragment>}
										{data.index == 1 && <React.Fragment><div className="myAvatarShadow" style={{top: `${90-100/12/*18*/*data.value}%`}}></div><Icon24ScanViewfinderOutline width={48} height={48} style={{color: 'var(--text_primary)'}}/></React.Fragment>}
										{data.index == 2 && <React.Fragment><div className="myAvatarShadow" style={{top: `${90-100/12/*18*/*data.value}%`}}></div><Icon24HammerOutline width={48} height={48} style={{color: 'var(--text_primary)'}}/></React.Fragment>}
										{data.index == 3 && <React.Fragment><div className="myAvatarShadow" style={{top: `${90-100/12*data.value}%`}}></div><Icon24PawOutline width={48} height={48} style={{color: 'var(--text_primary)'}}/></React.Fragment>}
										{data.index == 4 && <React.Fragment><div className="myAvatarShadow" style={{top: `${90-100/12*data.value}%`}}></div><Icon24LaptopOutline width={48} height={48} style={{color: 'var(--text_primary)'}}/></React.Fragment>}
									</Avatar>
									<span className="slider-card__title" style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{interests[data.index].head}</span>
									<Spacing separator size={48} />
									<span className="slider-card__text">{interests[data.index].body}</span>
									<Spacing separator size={48} />
									<span className="slider-card__title" style={{marginBottom: 15}}>{data.value} {numberForm(data.value, ['балл', 'балла', 'баллов'])}</span>
									<span className="slider-card__text" style={{margin: 0, width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{level[data.index]}</span>
								</Card>
							)}
						</CardScroll>
						<Spacing separator size={24} />
						<Header subtitle="Заведения подобраны по вашим интересам">Куда можно поступить?</Header>
						<CardScroll className="vkuiCardScroll--b">
							{Object.keys(jobs).map((title, count) => 
								Object.keys(Object.values(jobs)[count][userData.result.score[0].index]).map((name, x) =>
									<Card key={x} className="card">
										<Avatar className={`myAvatar_${count+1} House`} size={72} shadow={false}></Avatar>
										<span className="slider-card__title" style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{name}</span>
										<Spacing separator size={48} />
										<span className="slider-card__text">Тут должно быть описание работы, но его забыли придумать</span>
										<br/><span className="slider-card__text">{title}</span>
									</Card>
								)
							)}
						</CardScroll>
						<Spacing size={12} />
					</Group>}
				</Group>}
			</Panel>
			<Panel id="lastPassed">
				<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('home')}/>}>
					Недавно прошли
				</PanelHeader>
				{lastScore && <Group>
					{lastScore.gradient.length == 3 && <Gradient className="GradientTop" style={{
						margin: isDesktop ? '-7px -7px 0 -7px' : 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						padding: 32
					}}>
						{lastScore.gradient.map((data, x) => {
							return (
								<Link key={x} className="GradientItem" href={`https://vk.com/id${data.id}`} target="_blank">
									<Avatar size={24*(x==1?3:2)} src={data.photo} />
									<Title style={{ color: 'var(--text_primary)', marginBottom: 8, marginTop: (x==1?10:10) }} weight="medium">{data.first_name}<br/>{data.last_name}</Title>
									<Title className="time" style={{ color: 'var(--text_secondary)' }}>{getTimeLast(data.time, 'small')}</Title>
								</Link>
							)
						})}
					</Gradient>}
					<Group mode="plain">
					<Spacing size={6} />
					{lastScore.users.map((data, x) =>
						<RichCell 
							style={{minHeight: 'auto'}} 
							href={`https://vk.com/id${data.id}`} target="_blank" 
							key={x} 
							after={<Icon16Link style={{color: 'var(--accent)'}}/>}
							before={<Avatar size={48} src={data.photo} />} 
							caption={getTimeLast(data.time)}
						>{data.name}</RichCell>
					)}
					{lastScore.total-lastScore.users.length > 0 && <Footer>И ещё {lastScore.total-lastScore.users.length} {numberForm(lastScore.total-lastScore.users.length, ['человек', 'человека', 'человек'])}</Footer>}
					</Group>
				</Group>}
			</Panel>
			<Panel id="aboutApp">
				<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('home')}/>}>
					Подробнее о проекте
				</PanelHeader>
				<Group>
					<FormItem>
						<FormStatus header="Привет, это – КВОК" mode="default">
							<br/><b>КВОК</b> – это проект по ранней профориентации обучающихся 8-9 классов, студентов и выпускников ОО, который дает возможность выстроить свою карьеру в г. Каменск-Уральский
							<br/><br/>Этот тест <b>определит</b> твои способности и интересы и поможет в выборе будущей профессии и специальности и дальнейшего трудоустройства
						</FormStatus>
					</FormItem>
					<FormItem>
						<FormStatus header="О проекте" mode="default">
							<br/>Данное приложение является дипломной работой для Радиотехнического техникума
							<br/><br/>Ученики школ и студенты любых заведений с лёгкостью могут пройти тестирование за 5 минут и получить результат, который им покажет их профессиональную наклонность
							<br/><br/>Исходя из результатов уже можно понять, на какую работу можно устроиться, и где на неё выучиться
						</FormStatus>
					</FormItem>
				</Group>
			</Panel>
		</View>
	);
}, {
	viewWidth: true
});

ReactDOM.render(<ConfigProvider><AdaptivityProvider><AppRoot><App /></AppRoot></AdaptivityProvider></ConfigProvider>, document.getElementById('root'));