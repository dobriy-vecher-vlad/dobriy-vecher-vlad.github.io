(() => {
var statusRED=[292859277,510734972,526054914,495192793,459772957,125435364,222005243,370803501,161187789,372782890,234277345,68779150,383696269,176107703,9512099];
var statusGREEN=[292859277,56032503,117152075,85490780,220805065,87716971,27944274,226658250,7689481,347059140,53910831,183450054,59042066,378215738,162136121];
var statusORANGE=[292859277,186872964,121420423,464855371,478532399];
var statusYELLOW=[292859277,218780861,272100841,234540642,211999232,184896316,114973584,280108742,284346597,229518926,241583543,195572944,535257440,278333796,468477538,232805824,326344159,524762639,106475787];
var statusELITE=[153968505,292859277,178048433];
var statusINVISIBLE=[153968505,292859277,397754858,193757332,134528170];
var statusBLOCK=[9512099];
var statusAnimate1=[292859277,163763742,142211787];
var statusAnimate2=[292859277,134528170,275139505];
var statusAnimate3=[292859277,117944645,354394310,517853958];
var statusAnimate4=[292859277];
var statusAnimate5=[292859277];
var statusAnimate6=[292859277];
var statusAnimate7=[292859277,498225631];
var clanBLOCK = [59,301,693,298];
var css = `.head {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center
}
.headhelp {
    width: 510px;
    padding: 20px;
    margin: 10px;
    border-radius: 4px;
    background-color: #313131!important;
    border: 1px solid #535353!important;
    box-shadow: inset 0px 0px 0px 1px rgba(25,23,23,1), inset 0px 0px 15px rgba(0,0,0,0.35);
}
.global {
	background-color: #4c4c4c!important;
    border: 1px solid #0f0f0f!important;
    box-shadow: inset 0px 0px 0px 1px rgba(117,117,117,1), inset 0px 0px 60px rgba(0,0,0,0.35);
    align-items: center;
    width: 478px;
    padding: 15px;
    border-radius: 6px;
    margin-top: 6px;
	border: 1px solid red;
}
.spoilerhelp {
    box-sizing: border-box;
    align-items: center;
    width: 460px;
    padding: 0px;
    border-radius: 4px;
    margin: 10px 0px 0px;
}
.spoilerhelpboss {
    overflow: auto;
    height: 200px;
    width: 450px;
}
.spoilerhelpboss::-webkit-scrollbar {
    width: 10px;
    height: 0px;
}
.spoilerhelpboss::-webkit-scrollbar-thumb:vertical {
    height: 1px;
    border-radius: 4px;
    background-color: #222!important;
    border: 1px solid #3D3D3D!important;
    box-shadow: inset 1px 1px 0px #111, inset -1px -1px 0px #111;
}
.spoilerhelpboss::-webkit-scrollbar-track {
    background-color: #323232!important;
    border-radius: 4px;
    border: 1px solid #3D3D3D!important;
    box-shadow: inset 1px 1px 0px #222, inset -1px -1px 0px #222;
}
.spoilericon {
	background-color: #1e1e1e!important;
    border: 1px solid #303030!important;
    box-shadow: inset 1px 1px 0px #191717, inset -1px -1px 0px #191717, inset 0px 0px 7px rgba(0,0,0,0.35);
    background-image: url("https://vk.com/images/svg_icons/lead_forms_app_section_arrow.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 50%;
    border-radius: 4px;
    width: 17px;
    height: 13px;
	display: inline-block;
	cursor: pointer;
}
.spoiler input[type=checkbox] {
    display: none;
}
.spoiler input[type=checkbox] ~ .text1 {
    opacity: 1;
	transition: 0.2s;
	visibility: visible;
	max-height: 500px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox]:checked ~ .text1 {
    opacity: 0;
	transition: 0.2s;
	visibility: hidden;
	max-height: 0px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox] ~ .text2 {
    opacity: 0;
	transition: 0.2s;
	visibility: hidden;
	max-height: 0px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox]:checked ~ .text2 {
    opacity: 1;
	transition: 0.2s;
	visibility: visible;
	max-height: 500px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox] ~ .text3 {
    opacity: 0;
	transition: 0.2s;
	visibility: hidden;
	max-height: 0px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox]:checked ~ .text3 {
    opacity: 1;
	transition: 0.2s;
	visibility: visible;
	max-height: 500px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox] ~ .text4 {
    opacity: 0;
	transition: 0.2s;
	visibility: hidden;
	max-height: 0px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox]:checked ~ .text4 {
    opacity: 1;
	transition: 0.2s;
	visibility: visible;
	max-height: 500px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox] ~ .text5 {
	opacity: 1;
	transition: 0.2s;
	visibility: visible;
	max-height: 500px;
	will-change: opacity, visibility;
}
.spoiler input[type=checkbox]:checked ~ .text5 {
	opacity: 0;
	transition: 0.2s;
	visibility: hidden;
	max-height: 0px;
	will-change: opacity, visibility;
}
.bossstylesglobal {
	border-collapse: collapse;
}
.bossstyles {
	text-shadow: 1px 1px 0 rgba(0,0,0,0.75);
	border-radius: 4px;
    box-shadow: inset 0px 0px 15px rgba(0,0,0,0.35), 1px 1px 0px 1px rgba(0,0,0,0.25);
	will-change: box-shadow, text-shadow;
}
.spoiler {
	text-shadow: 1px 1px 0 rgba(0,0,0,0.75);
	background-color: #313131!important;
    border: 1px solid #535353!important;
    box-shadow: inset 0px 0px 0px 1px rgba(25,23,23,1), inset 0px 0px 15px rgba(0,0,0,0.35);
    align-items: center;
    width: 460px;
    padding: 5px;
    border-radius: 4px;
    margin: 3px 0px 3px;
}
.styleTableDesc {
	color: #9C9C9C!important;
	font-size: 10px;
	text-transform: uppercase;
	font-weight: bold;
}
.styleTableDescHelp {
	display: flex;
	align-items: center;
}
.styleTable {
	color: #cbcbcb!important;
	background-color: #242424!important;
    border: 1px solid #303030!important;
    box-shadow: inset 0px 0px 0px 1px rgba(25,23,23,1), inset 0px 0px 15px rgba(0,0,0,0.35), inset 0px 19px 10px rgba(0,0,0,0.100);
    border-radius: 4px;
    align-items: center;
    line-height: 1.2;
    font-size: 13px;
}
.Fix {
    transform: translateZ(0);
}
.sWidth {
	width: 150px;
}
.styleTableText {
    font-size: 10px;
    text-transform: uppercase;
}
.animateTable {
	box-shadow: inset 1px 1px 0px #191717, inset -1px -1px 0px #191717;
	height: 38px;
	width: 470px;
	border-radius: 4px;
    border: 1px solid #535353!important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3px 0px 3px;
}
.textStandart {
	line-height: 1.2em;
	font-size: 13px;
	text-shadow: 2px 2px 0 rgba(0,0,0,0.75);
	color: #fff!important;
	user-select: none;
}
.animateText {
	font-size: 16px;
	color: #fff!important;
	text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
	user-select: none;
}
.animateTable1 {
	background-image: url("https://i.gifer.com/3Nrfx.gif");
}
.animateTable2 {
	background-image: url("https://i.gifer.com/3Nrfw.gif");
}
.animateTable3 {
	background-image: url("https://i.gifer.com/3Nrg4.gif");
}
.animateTable4 {
	background-image: url("https://i.gifer.com/3NrgK.gif");
}
.animateTable5 {
	background-image: url("https://i.gifer.com/3Nrgv.gif");
}
.animateTable6 {
	background-image: url("https://i.gifer.com/3Nrh5.gif");
}
.animateTable7 {
	background-image: url("https://i.gifer.com/3NsIi.gif");
}
.animateTable8 {
	background-image: url("https://i.gifer.com/3NsOL.gif");
}
.animateTable9 {
	background-image: url("https://i.gifer.com/3NsOM.gif");
}
.animateTable10 {
	background-image: url("https://i.gifer.com/3NsIe.gif");
}
.animateTable11 {
	background-image: url("https://i.gifer.com/3Nrg7.gif");
}
.animateTable12 {
	background-image: url("https://i.gifer.com/3NsRW.gif");
}
.animateTable13 {
	background-image: url("https://i.gifer.com/3NsRg.gif");
}
.animateTable14 {
	background-image: url("https://i.gifer.com/3NsRX.gif");
}
.animateTable15 {
	background-image: url("https://i.gifer.com/3NsRk.gif");
}
.btn_style1 {
	padding: 7px 16px 8px;
    margin: 0;
    font-size: 12.5px;
    display: inline-block;
    zoom: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    vertical-align: top;
    line-height: 15px;
    text-align: center;
    text-decoration: none;
    background: none;
	box-shadow: inset 0px -3px 0px 0px rgba(0,100,0,1);
    background-color: green;
    color: #fff;
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
	border-radius: 4px;
	width: 510px;
}
.mv_game_icon {
    display: inline-block;
    vertical-align: middle;
    height: 12px;
    width: 12px;
    margin-top: -2px;
    margin-right: 7px;
    background: url(https://vk.com/images/icons/tab_view.png?8) 0 -44px;
}
.tooltip{
	position: relative;
	display: inline-block;
	cursor: help;
}
.tooltip .tip{
	opacity: 0;
	transition: 0.2s;
	transform: scale(1.1);
	position: absolute;
	visibility: hidden;
	white-space: nowrap;
	text-align: left;
	padding: 10px;
	left: -12px;
	color: #fff!important;
	bottom: 22px;
	background:#000!important;
	border-radius: 6px;
	font-size: 12px;
	line-height: 1.4;
	text-transform: none;
	font-weight: normal;
	user-select: none;
	will-change: transform, opacity, visibility;
}
.tooltip .tip_clan{
	max-width: 350px;
	min-width: 250px;
	white-space: pre-line;
	word-wrap: break-word;
}
.tooltip .tip::after, .tooltip .tip::before {
    content: '';
    position: absolute;
    background: #000!important;
    left: 16px; bottom: -4px;
    width: 8px; height: 8px;
    transform: rotate(45deg);
}
.tooltip:hover .tip {
	opacity: 0.8;
	transition: 0.2s;
	transform: scale(1);
	visibility: visible;
	will-change: transform, opacity, visibility;
} `;
var style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);

var patch_log = "Изменения в версии 2.4.2:<br>- исправление ошибок;<br>- доработка интерфейса.<br><br>НАШЕСТВИЕ: БАЗА ЗНАНИЙ  —  VK-BOT.COM  —  v2.4.2";
var donate_log = "Возможности:<br>- gif-баннеры в свой профиль;<br>- скрыть свой бой либо профиль целиком;<br>- скрыть казну клана либо его целиком (для глав).";
NodeList.prototype.forEach = Array.prototype.forEach;
var buttounId = 'full_script',
	buttonHtml = '<div class="head"><div class="headhelp"><button id="' + buttounId + '" class="flat_button btn_style1"><span class="mv_game_icon"></span>Нашествие: Мобильная версия</button><div id="' + buttounId + '_div" align="center"></div></div></div>',
	progress = '<center><br><img class="vk_loader" src="https://vk.com/images/c_upload_2x.gif" width="16px"></center></center>';
var qs = (selector) => {
    return document.querySelector(selector);
};
var qa = (selector) => {
    return document.querySelectorAll(selector);
};
var showInfo = (insertDiv, id, myid) => {
    insertDiv.innerHTML = progress;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://vk-bot.com/invscript/api', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({
		id: id,
		myid: myid,
	}));
	xhr.onloadend = () => {
	try {
		var data = JSON.parse(xhr.responseText);
		var random = Math.floor(Math.random() * (7 - 4)) + 4;
		var idn = Number(data.id);
		var clan_name = data.clan_id >= 1? data.clan.name: 'не состоит в клане'; 
		var clan_job = data.clan_id >= 1? (['Глава клана','Офицер клана', 'Участник клана']) [data.clan_r-1] : 'Нет данных';
		var the_loc = {21:"Редикс", 20:"Пул", 19:"Мелдон", 18:"Стокпорт", 17:"Под временных боссов", 16:"Уэрли", 15:"Стоунлет", 14:"Харвер", 13:"Дорборн", 12:"Таннбери", 11:"Канализация", 10:"Стоки", 9:"Грандтаун", 8:"Нортед", 7:"Кинтон", 6:"Ньютаун", 5:"Эндроу", 4:"Харрис", 3:"Рафилд", 2:"Бренс", 1:"Хейвен"};
		var loc = the_loc[data.loc];
		var the_room = {7:"Укрепление", 6:"Метро", 5:"Озеро", 4:"Полиция", 3:"Госпиталь", 2:"Мини-маркет", 1:"Начальная комната"};
		var room = the_room[data.room];
		var h0 = data.name;
		var h0i = (h0).replace(/ /g," ");
		var h1 = Math.round(data.s1);
		var h1i = (h1+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h2 = Math.round(data.s2);
		var h2i = (h2+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h3 = Math.round(data.s3);
		var h3i = (h3+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h4 = Math.round(data.s4);
		var h4i = (h4+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h5 = Math.round((Number(data.luck) + Number(data.lucki)));
		var h5i = (h5+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h6 = Math.round(data.end);
		var h6i = (h6+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h7 = Math.round((Number(data.end) + Number(data.endi)) * 15);
		var h7i = (h7+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h8 = Math.round(data.dmgi);
		var h8i = (h8+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h9 = Math.round(data.exp);
		var h9i = (h9+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h14 = Math.round(Number(data.bd)/60/60/24);
		var h14i = (h14+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
		var h15h1 = new Date();
		var h15h2 = new Date(h15h1-(Number(data.l_t)*1000));
		var h15h3 = { timezone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', };
		var h15i = h15h2.toLocaleString("ru", h15h3);
		var h16h1 = new Date();
		var h16h2 = new Date(h16h1-(Number(data.l_t)*1000));
		var h16h3 = { timezone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric' };
		var h16i = h16h2.toLocaleString("ru", h16h3);
		var h17h1 = new Date();
		var h17h2 = new Date(h17h1-(Number(data.bd)*1000));
		var h17h3 = { timezone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', };
		var h17i = h17h2.toLocaleString("ru", h17h3);
		var h18h1 = new Date();
		var h18h2 = new Date(h17h1-(Number(data.bd)*1000));
		var h18h3 = { timezone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric' };
		var h18i = h18h2.toLocaleString("ru", h18h3);
		var text = '<div class="global">';
		if (data) {
			if( statusRED.includes(idn) ) { 
				text += '<div class="animateTable animateTable7"><div class="textStandart" align="center">Игрок ' + '<b>ID' + id + '</b> под ником <b>' + h0i + '</b>, имеет статус:<br>— замечен в суде, будьте осторожны —</div></div>'; }
			if( statusGREEN.includes(idn) ) { 
				text += '<div class="animateTable animateTable8"><div class="textStandart" align="center">Игрок ' + '<b>ID' + id + '</b> под ником <b>' + h0i + '</b>, имеет статус:<br>— доверенное и подтверждённое лицо —</div></div>'; }
			if( statusORANGE.includes(idn) ) { 
				text += '<div class="animateTable animateTable9"><div class="textStandart" align="center">Игрок ' + '<b>ID' + id + '</b> под ником <b>' + h0i + '</b>, имеет статус:<br>— замечен в суде, но претензии сняты —</div></div>'; }
			if( statusYELLOW.includes(idn) ) { 
				text += '<div class="animateTable animateTable10"><div class="textStandart" align="center">Игрок ' + '<b>ID' + id + '</b> под ником <b>' + h0i + '</b>, имеет статус:<br>— неадекватное поведение —</div></div>'; }
			if( statusELITE.includes(idn) ) { 
				text += '<div class="animateTable animateTable1"></div>'; }
			if( statusAnimate1.includes(idn) ) { 
				text += '<div class="animateTable animateTable2"><b class="animateText">' + h0i + '</b></div>'; }
			if( statusAnimate2.includes(idn) ) { 
				text += '<div class="animateTable animateTable3"><b class="animateText">' + h0i + '</b></div>'; }
			if( statusAnimate3.includes(idn) ) { 
				text += '<div class="animateTable animateTable11"><b class="animateText">' + h0i + '</b></div>'; }
			if( statusAnimate4.includes(idn) ) { 
				text += '<div class="animateTable animateTable12"><b class="animateText">' + h0i + '</b></div>'; }
			if( statusAnimate5.includes(idn) ) { 
				text += '<div class="animateTable animateTable13"><b class="animateText">' + h0i + '</b></div>'; }
			if( statusAnimate6.includes(idn) ) { 
				text += '<div class="animateTable animateTable14"><b class="animateText">' + h0i + '</b></div>'; }
			if( statusAnimate7.includes(idn) ) { 
				text += '<div class="animateTable animateTable15"><b class="animateText">' + h0i + '</b></div>'; }
			if (idn == 390342468||idn == 292859277) {
				text += '<div class="animateTable animateTable'+random+'"></div>'; }
			if (statusBLOCK.includes(Number(myid))) {
				text += '<div class="spoiler"><table><tr><td class="styleTableDesc">Для Вас доступ к скрипту ограничен</td></tr></table></div>';
			} else { 
				if (statusINVISIBLE.includes(Number(id)) &&! statusINVISIBLE.includes(Number(myid))) {
					text += '<div class="spoiler"><table><tr><td class="styleTableDesc">Информация пользователя скрыта</td></tr></table></div>';
				} else {
					text += '<div class="spoiler"><label><input type="checkbox"><table style="line-height: 1.2; border-collapse: collapse" width="454px"><tr>';
					text += '<td><div class="styleTableDesc styleTableDescHelp"><div class="spoilericon"></div>  Основные характеристики игрока</div></td></tr></table>';
					text += '<div class="text1"><table style="border-collapse: collapse"><tr>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">ID профиля ВКонтакте</t><br><b>' + idn + '</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Игровой ник</t><br><b>' + (h0i ? h0i : 'ник не определён') + '</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Уровень игрока</t><br><b>' + data.lvl + ' уровень</b> <div class="tooltip"><t class="tip">' + h9i + ' опыта</t>[...]</div></td></table></td>';
					text += '</tr><tr>';
					text += '<td><table class="styleTable Fix sWidth"><td><t class="styleTableText">Здоровье игрока</t><br><b><t style="color: green; font-weight: 700">' + h7i + '</t> единиц</b></td></table></td>';
					text += '<td><table class="styleTable Fix sWidth"><td><t class="styleTableText">Урон игрока</t><br><b><t style="color: #E50000; font-weight: 700">' + h8i + '</t> единиц</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Состоит в клане</t><br><b>' + clan_name + '</b> <div class="tooltip"><t class="tip">' + clan_job + '</t>[...]</div></td></table></td></tr></table></div></label></div>';
					if (data.clan_id > 0) {
						var clan = data.clan;
						var clanID = Number(data.clan_id);
						var clan_descr = (clan.descr).replace(/ /g, " ");
						var fullclanlvl = Number(clan.u1)+Number(clan.u2)+Number(clan.u3)+Number(clan.u4)+Number(clan.u5)+Number(clan.u6)+Number(clan.u7);
						text += '<div class="spoiler"><label><input type="checkbox"><table style="line-height: 1.2; border-collapse: collapse" width="454px"><tr>';
						text += '<td><div class="styleTableDesc styleTableDescHelp"><div class="spoilericon"></div>  Информация клана — <div class="tooltip"><t class="tip tip_clan">Описание клана '+clan.name+':<br><br>'+clan_descr+'</t>' + clan.name + '</div> — LVL '+fullclanlvl+' — ' + 'ID ' + clan.id + '</div></td></tr></table>';
						text += '<div class="text2"><table style="border-collapse: collapse"><tr>';
						if (clanBLOCK.includes(clanID) && myid != 153968505) {
							text += '<td><table class="styleTable" width="454px" height="38px"><td align="center"><t class="styleTableText">Информация клана скрыта</t><br><b>-</b></td></table></td>';
						} else {
							text += '<td><table class="styleTable" width="140px"><td><t class="styleTableText">ID лидера клана</t><br><b><a style="text-decoration: none; color: #cbcbcb" href="http://vk.com/id' + clan.leader + '" target="_blank">' + clan.leader + '</a></b></td></table></td>';
							text += '<td><table class="styleTable" width="160px"><td><t class="styleTableText">Суммарно опыта в клане</t><br><b>' + (clan.r1 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' опыта</b></td></table></td>';
							text += '<td><table class="styleTable" width="80px"><td><t class="styleTableText">Ранг. очков</t><br><b>' + (clan.m7 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' шт.</b></td></table></td>';
							text += '<td><table class="styleTable" width="68px"><td><t class="styleTableText">Людей</t><br><b>' + clan.mcnt + '/' + (clan.u1*10+10) + '</b></td></table></td>';
							text += '</tr></table><table style="border-collapse: collapse"><tr>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">Казна: Патроны</t><br><b>' + (clan.m1 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' шт.</b></td></table></td>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">Казна: Золото</t><br><b>' + (clan.m2 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' шт.</b></td></table></td>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">Казна: Жетоны</t><br><b>' + (clan.m3 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' шт.</b></td></table></td>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">Казна: Спички</t><br><b>' + (clan.m4 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' шт.</b></td></table></td>';
							text += '</tr></table><table style="border-collapse: collapse"><tr>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">База: Казармы</t><br><b>' + clan.u1 + ' уровень</b> <div class="tooltip"><t class="tip">' + (clan.u1*10+10) + ' людей вмещается в клане</t>[...]</div></td></table></td>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">База: Наставник</t><br><b>' + clan.u2 + ' уровень</b> <div class="tooltip"><t class="tip">' + (clan.u2*1) + '% больше опыта в клановых боях</t>[...]</div></td></table></td>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">База: Собиратель</t><br><b>' + clan.u3 + ' уровень</b> <div class="tooltip"><t class="tip">' + (clan.u3*1) + '% больше патрон в клановых боях</t>[...]</div></td></table></td>';
							text += '<td><table class="styleTable" width="112.5px"><td><t class="styleTableText">База: Оружейная</t><br><b>' + clan.u4 + ' уровень</b> <div class="tooltip"><t class="tip">' + (clan.u4*500+1000+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' урона от РПГ</t>[...]</div></td></table></td>';
							text += '</tr></table><table style="border-collapse: collapse"><tr>';
							text += '<td><table class="styleTable" width="150px"><td><t class="styleTableText">База: Медпункт</t><br><b>' + clan.u5 + ' уровень</b> <div class="tooltip"><t class="tip">' + (clan.u5*50+250+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.") + ' здоровья от аптеки</t>[...]</div></td></table></td>';
							text += '<td><table class="styleTable" width="150px"><td><t class="styleTableText">База: Оборона</t><br><b>' + clan.u6 + ' уровень</b> <div class="tooltip"><t class="tip">' + new Date(clan.u6*30*60*1000).toUTCString().split(' ')[4] + ' действует защита</t>[...]</div></td></table></td>';
							text += '<td><table class="styleTable" width="150px"><td><t class="styleTableText">База: Транспортёр</t><br><b>' + clan.u7 + ' уровень</b> <div class="tooltip"><t class="tip">' + (clan.u7*1) + '% грабит от казны клана</t>[...]</div></td></table></td></tr></table>';
						}
						text += '</tr></table></div></label></div>';
					}
					text += '<div class="spoiler"><label><input type="checkbox"><table style="line-height: 1.2; border-collapse: collapse" width="454px"><tr>';
					text += '<td><div class="styleTableDesc styleTableDescHelp"><div class="spoilericon"></div>  Навыки игрока</div></td></tr></table>';
					text += '<div class="text3"><table style="border-collapse: collapse"><tr>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Навык: Выносливость</t><br><b>' + h6i + ' единиц</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Навык: Удача</t><br><b>' + h5i + ' единиц</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Навык: Вломить</t><br><b>' + h1i + ' единиц</b></td></table></td>';
					text += '</tr><tr>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Навык: Прикрыться</t><br><b>' + h2i + ' единиц</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Навык: Подлый удар</t><br><b>' + h3i + ' единиц</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Навык: Отдышаться</t><br><b>' + h4i + ' единиц</b></td></table></td></tr></table></div></label></div>';
					text += '<div class="spoiler"><label><input type="checkbox"><table style="line-height: 1.2; border-collapse: collapse" width="454px"><tr>';
					text += '<td><div class="styleTableDesc styleTableDescHelp"><div class="spoilericon"></div>  Прочие характеристики игрока</div></td></tr></table>';
					text += '<div class="text4"><table style="border-collapse: collapse"><tr>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Уровень машины</t><br><b>' + data.car1_lvl + ' уровень</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Дней в игре</t><br><b>' + h14i + ' дней</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Дата создания профиля</t><br><b>' + h17i + '</b> <div class="tooltip"><t class="tip">В ' + h18i + '</t>[...]</div></td></table></td>';
					text += '</tr><tr>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Находится в комнате</t><br><b>' + room + '</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Находится в локации</t><br><b>' + loc + '</b></td></table></td>';
					text += '<td><table class="styleTable sWidth"><td><t class="styleTableText">Последний вход в игру</t><br><b>' + h15i + '</b> <div class="tooltip"><t class="tip">В ' + h16i + '</t>[...]</div></td></table></td></tr></table></div></label></div>';
					if (data.fight) {
						var fight = data.fight;
						var id_boss = Number(fight.eid);
						var h10 = Math.round(fight.hp);
						var h10i = (h10 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
						var h11 = Math.round(fight.mhp);
						var h11i = (h11 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
						var h12 = Math.round(fight.mydd);
						var h12i = (h12 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
						var h19h = ((id_boss == 70) ? 50 : ((id_boss == 18) ? "?" : 300));
						var h19 = ((id_boss == 18) ? "?" : Math.round(fight.mhp/h19h));
						var h19i = (h19 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
						var h20 = Math.round(fight.hp / (fight.mhp / 100));
						if (fight.hp >= 0) { var h20i = h20 + '%'; } else { var h20i = 'убит'; }
						var h21 = (new Date(2 * 60 * 60 * 1000 - (fight.time * 1000))).toUTCString().split(' ')[4];
						if (fight.time <= 7200) { var h21i = h21; } else { var h21i = '00:00:00'; }
						var h22 = Math.round(fight.dmg);
						var h22i = (h22 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
						var num = 0;
						var cu = fight.users[0].id;
						var cun_help = fight.users[0].n;
						var cun = (cun_help).replace(/ /g, " ");
						var gold_bosses = [52,53,54,55,56,66,70];
						var gold_bosses_tokens = {52:50, 53:80, 54:110, 55:150, 56:215, 66:250, 70:100};
						var gbt = gold_bosses_tokens[id_boss];
						var min_gbt = Math.round(h11/gbt);
						var gold_tokens_info_description = "Расчёт золотых жетонов для босса: "+fight.name+"<br><br><table><tr><td>2 жетона — "+(Math.round(min_gbt*1.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>3 жетона — "+(Math.round(min_gbt*2.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>4 жетона — "+(Math.round(min_gbt*3.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>5 жетонов — "+(Math.round(min_gbt*4.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>6 жетонов — "+(Math.round(min_gbt*5.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>7 жетонов — "+(Math.round(min_gbt*6.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>8 жетонов — "+(Math.round(min_gbt*7.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br></td><td>    </td><td>9 жетонов — "+(Math.round(min_gbt*8.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>10 жетонов — "+(Math.round(min_gbt*9.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>11 жетонов — "+(Math.round(min_gbt*10.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>12 жетонов — "+(Math.round(min_gbt*11.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>13 жетонов — "+(Math.round(min_gbt*12.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>14 жетонов — "+(Math.round(min_gbt*13.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона<br>15 жетонов — "+(Math.round(min_gbt*14.5)+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.")+" урона</td></tr></table>";
						var gold_tokens_info = gold_bosses.includes(id_boss) ?  " — <div class='tooltip'><t class='tip' style='left: 83px;'>"+gold_tokens_info_description+"</t><t style='text-decoration:underline'>ЗОЛОТЫЕ ЖЕТОНЫ</t> [...]</t></div>" : "";
						fight.users.sort(function(a, b) { 
							return Number(a.dd) < Number(b.dd) ? 1 : -1;
						});
						text += '<div class="spoiler"><label><input type="checkbox"><table style="line-height: 1.2; border-collapse: collapse" width="454px"><tr>';
						text += '<td><div class="styleTableDesc styleTableDescHelp"><div class="spoilericon"></div>  Информация по боссу — ' + fight.name + gold_tokens_info + '</div></td></tr></table>';
						text += '<div class="text5"><table style="border-collapse: collapse"><tr>';
						text += '<td align="center" style="line-height: 1.4"><div class="styleTable Fix" style="width: 452px; height: 60px; line-height: 1.4; display: flex; align-items: center; justify-content: center"><t class="styleTableText">Босс  <div class="tooltip"><t class="tip" style="left: 0px;">Имя босса: ' + fight.name + ', ID: ' + id_boss + '<br>Здоровья: ' + h11i + ', урона: ' + h22i + '<br><br>Создатель боя: ' + cun + ' (id' + cu + ')<br>Людей на боссе: ' + fight.users.length + '/'+h19h+'</t><b style="font-size:13px">' + fight.name + '</b></div>  до конца боя осталось  ' + '<b style="font-size:13px">' + h21i + '</b>';
						text += '<br>Здоровье  <b style="font-size:13px">' + h10i + ' / ' + h11i + '</b>,  ' + h20i + '';
						text += '<br>Урон игрока  <b style="font-size:13px"><t style="color:' + (h12 > h19 ? 'green' : '#CC0000') + '; font-weight: 700">' + h12i + '</t></b>,  <div class="tooltip"><t class="tip">Минимальный урон на боссе: ' + fight.name + '</t><t style="color:green; font-weight: 500">' + h19i + '</t></t></div></div></td></tr></table>';
						text += '<div class="spoilerhelpboss">';
						for (var i = 0; i < fight.users.length; i++) {
							var u = fight.users[i];
							var h13 = Math.round(u.dd);
							var h13i = (h13 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1.");
							var h00 = u.n;
							var h00i = (h00).replace(/ /g, " ");
							var player_gbt = ((Math.round(h13/min_gbt))==0?1:(Math.round(h13/min_gbt)))//жетоны игрока
							var gold_tokens = gold_bosses.includes(id_boss) ? " ["+player_gbt+"]" : "";
							if( statusRED.includes(Number(u.id)) ) {
								var styleBOSS1 = "#CC3434"; //обводка
								var styleBOSS2 = "#FF4141"; //заливка
								var styleBOSS4 = "#F5F5F5"; //цвет текста
								var styleBOSS5 = "#F5F5F5"; //цвет текста
							} else {
								var styleBOSS4 = "#AFAFAF"; //цвет текста
								var styleBOSS5 = "" + (Number(u.dd) > Number(fight.mhp) / (fight.eid == 70 ? 50 : 300) ? '#329932' : '#E50000') + ""; //цвет текста
								if (u.id == cu && u.id == id) { //заводящий и просмотр
									var styleBOSS1 = "#4F1A1A"; //обводка
									var styleBOSS2 = "#655454"; //заливка
								} else {
									if (u.id == cu && u.id != id) { //заводящий
										var styleBOSS1 = "#4F1A1A"; //обводка
										var styleBOSS2 = "#582e2e"; //заливка
									} else {
										if (u.id != cu && u.id == id) { //просмотр	
											var styleBOSS1 = "#4D4D4D"; //обводка
											var styleBOSS2 = "#606060"; //заливка
										} else {
											if (u.id != cu && u.id != id) { //обычный
												var styleBOSS1 = "#3C3C3C"; //обводка
												var styleBOSS2 = "#414141"; //заливка
											}
										}
									}
								}
							}
							text += '<table class="bossstylesglobal"><tr>';
							text += '<td><table class="bossstyles" style="border: 1px solid ' + styleBOSS1 + '; background-color: ' + styleBOSS2 + '" width="30px">';
							text += '<td align="center" style="font-size: 13px; color: ' + styleBOSS4 + '">' + (++num) + '</td></table></td>';
							text += '<td><table class="bossstyles" style="border: 1px solid ' + styleBOSS1 + '; background-color: ' + styleBOSS2 + '" width="90px">';
							text += '<td><a style="font-size: 13px; text-decoration: none; color: ' + styleBOSS4 + '" href="http://vk.com/id' + u.id + '" target="_blank">' + u.id + '</a></td></table></td>';
							text += '<td><table class="bossstyles" style="border: 1px solid ' + styleBOSS1 + '; background-color: ' + styleBOSS2 + '" width="145px">';
							text += '<td style="font-size: 13px; color: ' + styleBOSS4 + '">' + ((h00i && h00i.length) ? h00i : 'ник не определён') + '</td></table></td>';
							text += '<td><table class="bossstyles" style="border:1px solid ' + styleBOSS1 + '; background-color: ' + styleBOSS2 + '" width="120px">';
							text += '<td style="font-size: 13px; color: ' + styleBOSS4 + '"><t style="color:' + styleBOSS5 + '; font-weight: 500">' + h13i + gold_tokens + '</t></td></table></td>';
							text += '</tr></table>';
							}
							if (fight.users.length < 8) {
								var bossclear = Math.round(8 - Number(fight.users.length));
								for (var i = 0; i < bossclear; i++) {
									var styleBOSS = "#333"; //обводка
									text += '<table class="bossstylesglobal"><tr>';
									text += '<td><table class="bossstyles" style="border:1px solid ' + styleBOSS + '; background-color: ' + styleBOSS + '" width="30px">';
									text += '<td> </td></table></td>';
									text += '<td><table class="bossstyles" style="border:1px solid ' + styleBOSS + '; background-color: ' + styleBOSS + '" width="90px">';
									text += '<td> </td></table></td>';
									text += '<td><table class="bossstyles" style="border:1px solid ' + styleBOSS + '; background-color: ' + styleBOSS + '" width="145px">';
									text += '<td> </td></table></td>';
									text += '<td><table class="bossstyles" style="border:1px solid ' + styleBOSS + '; background-color: ' + styleBOSS + '" width="120px">';
									text += '<td> </td></table></td>';
									text += '</tr></table>';
								}
							}
							text += '</div></div></label></div>';
						}}}
						insertDiv.innerHTML = text + '';
						} else {
							insertDiv.innerHTML = '<div class="global"><div class="spoiler"><table style="line-height: 1.6"><tr><td class="styleTableDesc" align="center">Данные пользователя ' + '<b style="text-decoration:underline">id' + id + '</b>' + ' не получены!<br>Пользователь не найден в базе игроков!</td></tr></table></div></div>';
						}
					} catch (e) {
						insertDiv.innerHTML = '<div class="global"><div class="spoiler"><table style="line-height: 1.6"><tr><td class="styleTableDesc" align="center">Данные пользователя ' + '<b style="text-decoration:underline">id' + id + '</b>' + ' не получены!<br>Пользователь не найден в базе игроков!</td></tr></table></div></div>';
						}
					};
					var errorLoad = () => {
						insertDiv.innerHTML = '<div class="global"><div class="spoiler"><table style="line-height: 1.6"><tr><td class="styleTableDesc" align="center">Данные пользователя ' + '<b style="text-decoration:underline">id' + id + '</b>' + ' не получены!<br>Пользователь не найден в базе игроков!</td></tr></table></div></div>';
					};
					xhr.onerror = errorLoad;
					xhr.ontimeout = errorLoad;
					xhr.onabort = errorLoad;
				};
				var madInfo = () => {
				var myid = Number(document.getElementById('MyID').value),
					id = myid;
				try {
					id = Number(document.getElementById('VashID').value);
				} catch (e) {}
				var insertDiv = qs('#' + buttounId + '_div');
				showInfo(insertDiv, id, myid);
			};
			setInterval(() => {
				var comments = qa('.author'),
				user_block = qa('.user_block'),
				friends_user_row = qa('.friends_user_row');
			if (!qs('#' + buttounId)) {
				profileInfo = qs('#profile_full');
				if (profileInfo) {
					profileInfo.insertAdjacentHTML('afterend', buttonHtml);
					qs('#' + buttounId).onclick = madInfo;
				}
				var top_nav = qs('#top_nav');
				if (top_nav && !top_nav.hasAttribute('data-inv')) {
					var script = document.createElement('script');
					script.innerHTML = 'document.getElementById("top_nav").setAttribute("data-inv", String(vk.id));';
					document.getElementsByTagName('head')[0].appendChild(script);
				}
			}
			friends_user_row.forEach((link) => {
				try {
					var id = /(\d{2,20})/.exec(link.querySelector('.friends_photo_wrap').getAttribute('onmouseover'))[1];
				} catch (e) {
					return;
				}
				var rnd = Math.round(Math.random() * 100000),
				btnId = 'inv_' + id + '_' + rnd,
				btn = '<div style="cursor: pointer" class="friends_lists clear_fix" id="' + btnId + '"><span class="friends_lists_group group6" style="background-color: #FFE7E7; color: #8E0000">Нашествие: скрипт</span></div>';
				if (link.innerHTML.search('inv_' + id) == -1 && Number(id) > 0) {
				var info = link.querySelector('.friends_user_info>.friends_field')
				info.insertAdjacentHTML('afterEnd', btn);
				link.insertAdjacentHTML('afterEnd', '<div id="' + btnId + '_div"  align="center"></div>')
				qs('#' + btnId).onclick = () => {
					var myid = Number(qs('#top_nav').getAttribute('data-inv'));
				showInfo(qs('#' + btnId + '_div'), id, myid);
			};
		}
	});
}, 300);
})();