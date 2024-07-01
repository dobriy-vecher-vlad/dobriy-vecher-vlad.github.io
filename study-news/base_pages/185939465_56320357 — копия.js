var data = {
	"response": {
		"created": 32503662000,
		"comments": true,
		"html": `
			<ol class="wk_breadcrumb">
				<li><a onclick="window.open('#', '_top'); location.reload();">Главная</a></li>
				<li class="active">Страница с описанием тегов</li>
			</ol>
			<img type="img" src="https://sun9-16.userapi.com/c854216/v854216710/9509b/pa4oN32z8hI.jpg"/>
			<img type="img" src="https://sun9-17.userapi.com/c858432/v858432685/d7191/FfcVzc0qZ7M.jpg"/>
			<img type="img" src="https://sun9-9.userapi.com/c824201/v824201457/d5f4c/V2LKG7f7u_E.jpg"/>
			<blockquote><img type="img" src="https://sun9-58.userapi.com/c858216/v858216215/73f08/XZfecV4g67s.jpg"/><center><i>У лукоморья дуб зелёный;<br>Златая цепь на дубе том:<br>И днём и ночью кот учёный<br>Всё ходит по цепи кругом;<br><br><b>Александр Сергеевич Пушкин</b></i></center></blockquote>
			Данная страница показывает как работают функции файла <b>pages.js</b>, имеется поддержка направлений шрифтов, таблиц, списков, выносок, картинок, картинок внутри выносок, заголовков, подзаголовков и многое другое!
			<ul>Классификация поддерживаемых тегов:
				<li>Тег Div с классом wk_header — заголовок страницы.</li>
				<li>Тег Div с классом wk_sub_header — подзаголовок страницы.</li>
				<li>Тег center — выравнивание текста по центру.</li>
				<li>Тег Div с классом wk_right — выравнивание текста по правому краю.</li>
				<li>Тег table с классом wk_table — таблица.</li>
				<ul>
					<li>Тег table > tr — строка таблицы.</li>
					<li>Тег table > tr > td — столбец таблицы.</li>
				</ul>
				<li>Тег blockquote — выноска.</li>
				<li>Тег img с type img — изображение во всю ширину.</li>
				<li>Тег a с классом wk_ext_link_edit — текстовая ссылка.</li>
				<li>Тег br — перенос строки.</li>
				<li>Тег ul — список.</li>
				<ul>
					<li>Тег ul > li — пункт списка.</li>
				</ul>
				<li>Тег line — линия.</li>
				<li>Тег panel — панель.</li>
				<ul>
					<li>Тег panel > name — название панели.</li>
					<li>Тег panel > text — текст панели.</li>
				</ul>
				<li>Тег poster — постер.</li>
				<ul>
					<li>Тег poster > name — название постера.</li>
					<li>Тег poster > text — текст постера.</li>
					<li>Тег poster > a — ссылка постера.</li>
				</ul>
			</ul>
			<poster>
				<name>Заголовок постера</name>
				<text>Описание страницы куда ведёт постер</text>
				<a href="#">Читать</a>
				<img src="https://sun9-37.userapi.com/c845016/v845016228/eca71/bDovfgRSqfA.jpg">
			</poster>
			<panel>
				<name>Первый пункт панели</name>
				<text>Любой длинный текст, который необходимо выделить при помощи панели.</text>
				<text>Любой длинный текст, который необходимо выделить при помощи панели.</text>
				<text>Любой длинный текст, который необходимо выделить при помощи панели.</text>
			</panel>
			<line>not type</line>
			<line></line>
			<line type="red">type="red"</line>
			<line type="red"></line>
			<line type="green">type="green"</line>
			<line type="green"></line>
			<line type="yellow">type="yellow"</line>
			<line type="yellow"></line>
			<img type="img" src="http://skrinshoter.ru/i/291119/x71P8IYH.png">
		`
	}
};
var isScriptLoad = true;