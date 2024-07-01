const projects = [
	{
		'name': 'Book',
		'description': 'Дипломная работа для Радиотехнического техникума. Сайт-учебник для студентов.',
		'date': 'May 2021',
		'tag': ['html', 'css', 'js'],
		'href': 'study-book_history',
		'image': 'img/project_20.png'
	}, {
		'name': 'WS site',
		'description': 'Дипломная работа для Радиотехнического техникума. Вспомогательный сайт для участников WorldSkills.',
		'date': 'May 2021',
		'tag': ['html', 'css', 'js'],
		'href': 'study-ws',
		'image': 'img/project_19.png'
	}, {
		'name': 'Book',
		'description': 'Дипломная работа для Радиотехнического техникума. Шаблон электронного учебника, в котором написаны системы управления контентом, закладок, тестов и модальных окон. Реализован общий набор стилей и компонентов.',
		'date': 'December 2020',
		'tag': ['html', 'css', 'js'],
		'href': 'study-book_2021',
		'image': 'img/project_7.png'
	}, {
		'name': 'Book',
		'description': 'Дипломная работа для Радиотехнического техникума. Шаблон электронного учебника, в котором написаны системы управления контентом и тестов.',
		'date': 'June 2020',
		'tag': ['html', 'css', 'js'],
		'href': 'study-book_2020',
		'image': 'img/project_8.png'
	}, {
		'name': 'Quiz mini-app',
		'description': 'Дипломная работа для Радиотехнического техникума. Приложение на платформе VK Mini Apps. Шаблон мобильного приложения с функцией создания тестов и сохранения результатов на сервер.',
		'date': 'March 2020',
		'tag': ['html', 'css', 'js', 'react'],
		'href': 'https://vk.com/app7155169',
		'image': 'img/project_13.png'
	}, {
		'name': 'VK Photo Manager',
		'description': 'Приложение на платформе VK Mini Apps. Позволяет расширено работать с альбомами ВКонтакте (поиск дубликатов, перемешивание, перенос из одного в альбома в другой).',
		'date': 'November 2020',
		'tag': ['html', 'css', 'js', 'react'],
		'href': 'https://vk.com/app7474658',
		'image': 'img/project_14.png'
	}, {
		'name': 'Book',
		'description': 'Дипломная работа для Радиотехнического техникума. Шаблон электронного учебника, в котором написаны системы управления контентом, оповещений, тестов.',
		'date': 'May 2020',
		'tag': ['html', 'css', 'js'],
		'href': 'study-book_2019',
		'image': 'img/project_9.png'
	}, {
		'name': 'News KURT',
		'description': 'Дипломная работа для Радиотехнического техникума. Шаблон новостного сайта, в котором написаны системы управления контентом, оповещений, модальных окон, слайдера и др.',
		'date': 'May 2020',
		'tag': ['html', 'css', 'js'],
		'href': 'study-news',
		'image': 'img/project_10.png'
	}, {
		'name': 'Random-cube',
		'description': 'Рандомайзер в виде кубика со случайными числами.',
		'date': 'December 2019',
		'tag': ['html', 'css', 'js'],
		'href': 'kubic',
		'image': 'img/project_11.png'
	}, {
		'name': 'VK Group Messages',
		'description': 'Поиск бесед сообщества и отправка сообщений при помощи токена группы.',
		'date': 'October 2019',
		'tag': ['html', 'css', 'js'],
		'href': '',
		'image': 'img/project_15.png'
	}, {
		'name': 'Warlord Wiki',
		'description': 'Вспомогательное приложение с информацией по игре Warlord.',
		'date': 'March 2017',
		'tag': ['flash', 'ActionScript 3'],
		'href': 'warlord/wiki',
		'image': 'img/project_17.png'
	}, {
		'name': 'Warlord Scaner',
		'description': 'Сканер друзей ВКонтакте. Показывает их игровую характеристику из игры Warlord, с возможностью сортировки и удаления.',
		'date': 'September 2019',
		'tag': ['html', 'css', 'js'],
		'href': 'warlord/scaner',
		'image': 'img/project_12.png'
	}, {
		'name': 'Warlord Calculator',
		'description': 'Вспомогательное приложение позволяющее расчитывать свои возможности в бою с противниками в игре Warlord.',
		'date': 'January 2018',
		'tag': ['flash', 'ActionScript 3'],
		'href': 'warlord/calculator',
		'image': 'img/project_16.png'
	}, {
		'name': 'Warlord Script',
		'description': 'Вспомогательное расширение, позволяющее смотреть характеристики игроков из игры Warlord, прямо на страницах ВКонтакте.',
		'date': 'May 2019',
		'tag': ['html', 'css', 'js'],
		'href': 'https://chrome.google.com/webstore/detail/warlord-script/lnohbnecjodgkjkfcfaamadbeiapofoa',
		'image': 'img/project_4.png'
	}, {
		'name': 'Invasion Script',
		'description': 'Вспомогательное расширение, позволяющее смотреть характеристики игроков из игры Invasion, прямо на страницах ВКонтакте.',
		'date': 'February 2019',
		'tag': ['html', 'css', 'js'],
		'href': 'https://chrome.google.com/webstore/detail/invasion-script/babhdbcgmpkbihdjcpfldnedooaojala',
		'image': 'img/project_3.png'
	}, {
		'name': 'New Tab',
		'description': 'Вспомогательное расширение, позволяющее создавать свои закладки. Полностью заменяет стартовую страницу браузера и даёт возможность при помощи ползунков полностью настроить внешний вид под себя.',
		'date': 'January 2021',
		'tag': ['html', 'css', 'js'],
		'href': '',
		'image': 'img/project_18.png'
	}, {
		'name': 'DeadLand Script',
		'description': 'Вспомогательное расширение, позволяющее смотреть характеристики игроков из игры DeadLand, прямо на страницах ВКонтакте.',
		'date': 'February 2021',
		'tag': ['html', 'css', 'js'],
		'href': 'https://chrome.google.com/webstore/detail/deadland-script/nfpijfchkkommchpnljlpabngkcmogom',
		'image': 'img/project_2.png'
	}, {
		'name': 'TimeTrap Script',
		'description': 'Вспомогательное расширение, позволяющее смотреть характеристики игроков из игры TimeTrap, прямо на страницах ВКонтакте.',
		'date': 'February 2021',
		'tag': ['html', 'css', 'js'],
		'href': 'https://chrome.google.com/webstore/detail/timetrap-script/kiidpdifmhnobdpodmkcmonhokmplldj',
		'image': 'img/project_5.png'
	}, {
		'name': 'HeroesArena Script',
		'description': 'Вспомогательное расширение, позволяющее смотреть характеристики игроков из игры HeroesArena, прямо на страницах ВКонтакте.',
		'date': 'October 2021',
		'tag': ['html', 'css', 'js'],
		'href': 'https://chrome.google.com/webstore/detail/heroesarena-script/kdgdhfahfeacfebajodpkkijopmobpkn',
		'image': 'img/project_1.png'
	}, {
		'name': 'Warlord Helper',
		'description': 'Вспомогательное приложение с информацией по игре Warlord.',
		'date': 'June 2021',
		'tag': ['html', 'css', 'js', 'react'],
		'href': 'https://vk.com/app7787242_153968505',
		'image': 'img/project_6.png'
	}
];