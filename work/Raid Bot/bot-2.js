const { VK, Keyboard, Attachment  } = require('vk-io');
const { HearManager } = require('@vk-io/hear');
const { createCanvas, loadImage, registerFont, Image } = require('canvas');
const moment = require('moment'); moment().format(); moment.locale('ru');
const utils = JSON.parse(require('fs').readFileSync('./meta/utils.json', "UTF-8"));
const hearManager = new HearManager();
let version = '5.122';
let data = ['126004779','844fc36a6699cea1d7f71842b591140af9260a63f9d001879c39832f79e7ccf788f2c160596ecb843fa99'];
const vk = new VK({
	token: data[1],
	apiMode: 'parallel_selected',
	pollingGroupId: data[0]
});

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function compare(a, b) {
	if (a > b) return 1;
	if (a == b) return 0;
	if (a < b) return -1;
}
function spam(id, message) {
	const interval = setInterval(() => {
		message.send({
			chat_id: id,
			message: random(1,2) === 1 ? utils.spam_text : utils.spam_smiles,
			attachment: utils.spam_album[[random(0,(utils.spam_album.length-1))]]
		})
	}, 5000);
	setTimeout(() => {
		clearInterval(interval);
		
	}, 5000*51);
}

console.log('\x1b[1m', 'Successful start bot!');

vk.updates.on('message_event', hearManager.middleware);
vk.updates.on('message_new', hearManager.middleware);
hearManager.hear(
	async (value, message) => {
		//console.log(message); console.log(message.subTypes[0]);
		if (message.subTypes[0] === 'message_event') {
			message.eventPayload.type === 'show_snackbar' ? message.eventPayload.text.length >= 90 ? message.eventPayload.text = message.eventPayload.text.substr(0, 87)+'...' : '' : '';
			vk.api.messages.sendMessageEventAnswer({
				event_id: message.eventId,
				user_id: message.userId,
				peer_id: message.peerId,
				event_data: JSON.stringify(message.eventPayload),
				v: version
			});
		}
		if (message.subTypes[0] === 'message_new') {
			console.log('\x1b[31m', '\nСигнал поступил в '+moment().subtract(2, 'hour').format('LTS')+'.\n   -[ Отправитель '+message.senderId+'.\n   -[ Текст отправителя: '+message.text+'.');
			if(message.isOutbox) return;
			if(message.isFromUser) {
				if(/(кто вы)/i.exec(message.text)) {
					return message.send({
						message: 'Вкратце — бот для спама в беседах.\nХотите пошутить над беседой? Добавьте бота в чат, и вы сами увидите, что он умеет!\n\nВнимание: бот создан в ознакомительных целях! Автор не несет ответственность за последствия от ваших действий.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Добавить бота"},color:"positive"},{action:{type:"text",label:"Кто вы такие"},color:"positive"}],[{action:{type:"text",label:"Не работает"},color:"negative"},{action:{type:"text",label:"Жалоба"},color:"negative"}]]})
					})
				}
				if(/(добавить бота)/i.exec(message.text)) {
					return message.send({
						message: 'Вы можете добавить бота в беседу, инструкция: \n1. Зайдите в нашу @club'+data[0]+' (группу);\n2. Найдите кнопку <<Добавить в беседу>> под названием сообщества;\n3. Выберите нужную беседу;\n4. Дайте доступ ко всей переписке либо упомяните через @club'+data[0]+'.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Понял"},color:"positive"},{action:{type:"text",label:"Не понял"},color:"negative"}],[{action:{type:"text",label:"« Назад"},color:"secondary"}]]})
					})
				}
				if(/(жалоба)/i.exec(message.text)) {
					return message.send({
						message: 'Начните ваше сообщение со слова: репорт.\n\nНапример:\nРепорт. Бот долго отвечает.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Добавить бота"},color:"positive"},{action:{type:"text",label:"Кто вы такие"},color:"positive"}],[{action:{type:"text",label:"Не работает"},color:"negative"},{action:{type:"text",label:"Жалоба"},color:"negative"}]]})
					})
				}
				if(/(репорт)/i.exec(message.text)) {
					message.reply('Постараемся разобраться!')
					return message.send({
						user_id: 153968505,
						message: 'Вам был отправлен репорт от *id' + message.senderId + ' (Пользователя)\n\nТекст: ' + message.text
					})
				}
				if(/(не работает)/i.exec(message.text)) {
					return message.send({
						message: 'Бот может не работать взависимости от нагрузки.\nAPI ВКонтакте накладывает флуд-контроль на бота на некоторое время.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Добавить бота"},color:"positive"},{action:{type:"text",label:"Кто вы такие"},color:"positive"}],[{action:{type:"text",label:"Не работает"},color:"negative"},{action:{type:"text",label:"Жалоба"},color:"negative"}]]})
					})
				}
				if(/(^понял|не хочу|назад|начать)/i.exec(message.text)) {
					return message.send({
						message: 'Хорошо.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Добавить бота"},color:"positive"},{action:{type:"text",label:"Кто вы такие"},color:"positive"}],[{action:{type:"text",label:"Не работает"},color:"negative"},{action:{type:"text",label:"Жалоба"},color:"negative"}]]})
					})
				}
				if(/(не понял)/i.exec(message.text)) {
					return message.send({
						message: 'Что ты нахуй не понял? Меня твои вопросы просто доебали уже, я уже не могу их слушать, блядь. Один вопрос охуительней другой просто, блядь. Про говно, блядь, про какую-то хуйню, молофью. Чё ты несёшь-то вообще? Пошёл ты нахуй со своими вопросами.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Добавить бота"},color:"positive"},{action:{type:"text",label:"Кто вы такие"},color:"positive"}],[{action:{type:"text",label:"Не работает"},color:"negative"},{action:{type:"text",label:"Жалоба"},color:"negative"}]]})
					})
				}
				if(/(не хочу|)/i.exec(message.text)) {
					return message.send({
						message: 'Такой команды нет.\nНажмите на нужную кнопку.',
						keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Добавить бота"},color:"positive"},{action:{type:"text",label:"Кто вы такие"},color:"positive"}],[{action:{type:"text",label:"Не работает"},color:"negative"},{action:{type:"text",label:"Жалоба"},color:"negative"}]]})
					})
				}
			}
			if(message.isChat) {
				if(JSON.parse(require('fs').readFileSync('./data/chats.json', "UTF-8")).includes(message.chatId) || message.senderId === 153968505) {
					if(message.senderId === 347643219 && message.hasAttachments() === true) {
						return message.send({
							attachment: 'photo-126004779_457255294'
						})
					}
					// Тест функционала ВКонтакте
					if(/\/(event|эвент|евент|test 1|тест 1|show_snackbar|open_link|open_app)$/i.exec(message.text)) {
						return message.send({
							message: 'Позволяет без отправки сообщения от пользователя получить уведомление о нажатии на кнопку и выполнить необходимое действие.\nРаботает только с телефона.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"callback",label:"show_snackbar",payload:'{"type": "show_snackbar","text": "'+utils.label_agr[[random(0,(utils.label_agr.length-1))]]+'"}'},color:"secondary"}],[{action:{type:"callback",label:"open_link",payload:'{"type":"open_link","link":"https://vk.com/xolova"}'},color:"secondary"}],[{action:{type:"callback",label:"open_app",payload:'{"type":"open_app","app_id":7474658}'},color:"secondary"}]],inline:true})
						})
					}
					if(/\/(carousel|карусель|test 2|тест 2)$/i.exec(message.text)) {
						return message.send({
							message: 'Карусель — это шаблон сообщения, который содержит несколько элементов, элементы карусели можно скролить горизонтально.\nРаботает только с телефона.',
							template: JSON.stringify({"type":"carousel","elements":[{"title":"Влад Давыдов","description":"Люблю адидас и всё что с ним связано.","action":{"type":"open_link","link":"https://vk.com/id193757332"},"photo_id":"-126004779_457255287","buttons":[{"action":{"type":"text","label":'Поешь говна, друг'},"color":"primary"},{"action":{"type":"text","label":'Подавись салфеткой от бургера'},"color":"secondary"},{"action":{"type":"vkpay","hash":{"action":"pay-to-user","amount":10,"description":"Я далбаёб","user_id":153968505}}}]}]})
						})
					}
					if(/\/(buttons|кнопки|test 3|тест 3)$/i.exec(message.text)) {
						return message.send({
							message: 'Клавиатура представляет собой массив массивов, то есть таблицу, у которой ячейки — это кнопки. У всех кнопок в рамках одной строки одинаковый размер, и они заполняют 100% ширины.\nCallback работает только с телефона.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"open_app",label:"VK Apps",app_id:7474658}}],[{action:{type:"location"}}],[{action:{type:"open_link",label:"Open Link",link:"https://vk.com/xolova"}}],[{action:{type:"vkpay",hash:{action:"pay-to-user",amount:10,description:"Я далбаёб",user_id:153968505}}}],[{action:{type:"text",label:"Negative"},color:"negative"},{action:{type:"text",label:"Positive"},color:"positive"},{action:{type:"text",label:"Primary"},color:"primary"},{action:{type:"text",label:"Secondary"},color:"secondary"}],[{action:{type:"callback",label:"Callback",payload:'{"type": "show_snackbar","text": "'+utils.label_agr[[random(0,(utils.label_agr.length-1))]]+'"}'},color:"primary"}]],inline:true})
						})
					}
					if(/\/(keyboard|клавиатура) {(.*)}$/i.exec(message.text)) {
						let keyboard = /\/(keyboard|клавиатура) {(.*)}/gim.exec(message.text)[2];
						return message.send({
							message: 'Клавиатура применена.',
							keyboard: JSON.stringify(JSON.parse(keyboard))
						})
					}
					if(/\/(raid|рейд|рэйд)$/i.exec(message.text)) {
						spam(message.chatId, message);
					}

					// Создание сигн.
					if(/\/(сигна) (.*)/i.exec(message.text)) {
						let data = JSON.parse(require('fs').readFileSync('./data/signas.json', "UTF-8"));
						let number = random(0,data.length-1);
						let text = /\/(сигна) (.*)/gim.exec(message.text)[2].replace(/\\n/g, "\n");
						if ( data.length > number && number >= 0 ) {
							let image = await loadImage('./signas/'+data[number].img);
							let canvas = createCanvas(image.width, image.height);
							let context = canvas.getContext('2d');
							context.drawImage(image,0,0);
							context.font = data[number].font_size+' '+data[number].font;
							context.fillStyle = data[number].font_color;
							context.textAlign = 'center';
							context.textBaseline = 'middle';
							context.translate(data[number].x,data[number].y);
							context.rotate(data[number].angle*Math.PI/180);
							context.translate(-data[number].x,-data[number].y);
							context.fillText(text, data[number].x, data[number].y);
							vk.upload.messagePhoto({
								source: {
									value: canvas.toBuffer()
								}
							})
							.then(attachment => (
								message.send({
									message: 'Сигна готова.',
									attachment: 'photo'+attachment.ownerId+'_'+attachment.id
								})
							));
							return;
						} else { 
							return message.send({
								message: 'Ошибка в номере '+number+'.'
							})
						}
					}
					// Создание демотиваторов.
					if(/\/(демотиватор)/i.exec(message.text)) {
						if(/\/(демотиватор) {(.*)} {(.*)}/i.exec(message.text)) {
							try {
								let text = /\/(демотиватор) {(.*)} {(.*)}/gim.exec(message.text)[2];
								let subtext = /\/(демотиватор) {(.*)} {(.*)}/gim.exec(message.text)[3];
								let canvas = createCanvas(1280, 1024);
								let context = canvas.getContext('2d');
								let back = await loadImage("images/demo.jpg");
								const img = await loadImage(message.attachments[0].largeSizeUrl);
								context.drawImage(back, 0, 0);
								context.drawImage(img, 126, 84, 1028, 684);
								context.font = '95px Times New Roman';
								context.fillStyle = '#fff';
								context.textAlign = 'center';
								context.textBaseline = 'middle';
								context.fillText(text, 640, 850);
								context.font = '35px Arial';
								context.fillText(subtext, 640, 950);
								vk.upload.messagePhoto({
									source: {
										value: canvas.toBuffer()
									}
								})
								.then(attachment => (
									message.send({
										message: '',
										attachment: 'photo'+attachment.ownerId+'_'+attachment.id
									})
								));
								return;
							} catch(err) {
								console.log(err);
								if (err == "TypeError: Cannot read property 'largeSizeUrl' of undefined") {
									return message.send({
										message: 'Пожалуйста, отправьте ваше сообщение повторно, прикрепив к нему картинку.'
									})
								} else {
									return message.send({
										message: err
									})
								}
							}
						} else {
							return message.send({
								message: 'Для того, чтобы создать демотиватор, отправьте сообщение подобного рода, обязательно прикрепив картинку:\n- демотиватор {1 строчка} {2 строчка}'
							})
						}
					}
					// Подбор картинок по ключевым словам.
					if(/\/(ранд|рнд|рандом|подбор|пдр) (.*)/i.exec(message.text)) {
						let command = /(.*) (.*)/gim.exec(message.text)[1];
						let name = /(.*) (.*)/gim.exec(message.text)[2];
						let data = [
							{
								name: 'all, все, алл',
								href: []
							}, {
								name: 'ero, эро, еро',
								href: [109863351, 155321754, 28497906, 44047005, 145001302, 104894009, 135203088, 121602441, 140547857, 177804962, 185127376, 161807458, 159411618]
							}, {
								name: 'mem, мем, мэм',
								href: [178275828, 183701461, 166216692, 108531402, 153164390, 131069024, 104224126, 92157416, 159951888, 169491174, 190255315, 91895023, 139488880, 132938840, 42954445, 98699940, 144918406, 166749475, 45745333, 177237500, 139939445, 66678575, 155862176, 162305728, 168381351, 146250382]
							}, {
								name: 'dota, дота',
								href: [155187700, 125556217, 168077565, 173221458]
							}
						];
						let rand_id_base = 
							data[1].name.search(name) != -1 ? data[1].href :
							data[2].name.search(name) != -1 ? data[2].href :
							data[3].name.search(name) != -1 ? data[3].href :
							data[0].href.concat(data[1].href,data[2].href,data[3].href)
						;
						let rand_name = 
							data[1].name.search(name) != -1 ? data[1].name :
							data[2].name.search(name) != -1 ? data[2].name :
							data[3].name.search(name) != -1 ? data[3].name :
							data[0].name
						;
						let rand_id = rand_id_base[Math.floor(Math.random()*rand_id_base.length)];
						let tokens_base = ['da51b2dcda51b2dcda51b2dc4cda3c9ddbdda51da51b2dc87c27338ca49c1aa7132ba47', 'b9592ce2b9592ce2b9592ce211b93456b5bb959b9592ce2e4f1908468601f35ae7a9ae4'];
						let tokens = tokens_base[Math.floor(Math.random()*tokens_base.length)];
						vk.api.photos.get({
							album_id: 'wall',
							owner_id: '-'+rand_id,
							offset: '0',
							count: '0',
							access_token: tokens,
							v: version
						})
						.then((response) => {
							let rand_photo = Math.floor(Math.random() * response.count);
							if (/\/(ранд|рнд|рандом)/i.exec(command)) {
								vk.api.photos.get({
									album_id: 'wall',
									owner_id: '-'+rand_id,
									offset: rand_photo,
									count: '1',
									access_token: tokens,
									v: version
								})
								.then((response) => {
									try {
										let msg = name+' from @club'+rand_id+'('+rand_id+')\n'+rand_photo+' / '+response.count;
										return message.send({
											message: msg,
											attachment: 'photo'+response.items[0].owner_id+'_'+response.items[0].id+'',
											keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/рнд все"},color:"positive"},{action:{type:"text",label:"/рнд эро"},color:"positive"},{action:{type:"text",label:"/рнд мем"},color:"positive"},{action:{type:"text",label:"/рнд дота"},color:"positive"}],[{action:{type:"text",label:"/пдр все"},color:"positive"},{action:{type:"text",label:"/пдр эро"},color:"positive"},{action:{type:"text",label:"/пдр мем"},color:"positive"},{action:{type:"text",label:"/пдр дота"},color:"positive"}]],inline:true})
										})
									} catch(error) {
										return message.send({
											message: error,
											keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/рнд все"},color:"positive"},{action:{type:"text",label:"/рнд эро"},color:"positive"},{action:{type:"text",label:"/рнд мем"},color:"positive"},{action:{type:"text",label:"/рнд дота"},color:"positive"}],[{action:{type:"text",label:"/пдр все"},color:"positive"},{action:{type:"text",label:"/пдр эро"},color:"positive"},{action:{type:"text",label:"/пдр мем"},color:"positive"},{action:{type:"text",label:"/пдр дота"},color:"positive"}]],inline:true})
										})
									}
								});
							}
							if (/\/(подбор|пдр)/i.exec(command)) {
								vk.api.photos.get({
									album_id: 'wall',
									owner_id: '-'+rand_id,
									offset: rand_photo,
									count: '10',
									access_token: tokens,
									v: version
								})
								.then((response) => {
									try {
										let msg = name+' from @club'+rand_id+'('+rand_id+')\n'+rand_photo+' / '+response.count;
										return message.send({
											message: msg,
											attachment: 'photo'+response.items[0].owner_id+'_'+response.items[0].id+',photo'+response.items[1].owner_id+'_'+response.items[1].id+',photo'+response.items[2].owner_id+'_'+response.items[2].id+',photo'+response.items[3].owner_id+'_'+response.items[3].id+',photo'+response.items[4].owner_id+'_'+response.items[4].id+',photo'+response.items[5].owner_id+'_'+response.items[5].id+',photo'+response.items[6].owner_id+'_'+response.items[6].id+',photo'+response.items[7].owner_id+'_'+response.items[7].id+',photo'+response.items[8].owner_id+'_'+response.items[8].id+',photo'+response.items[9].owner_id+'_'+response.items[9].id+'',
											keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/рнд все"},color:"positive"},{action:{type:"text",label:"/рнд эро"},color:"positive"},{action:{type:"text",label:"/рнд мем"},color:"positive"},{action:{type:"text",label:"/рнд дота"},color:"positive"}],[{action:{type:"text",label:"/пдр все"},color:"positive"},{action:{type:"text",label:"/пдр эро"},color:"positive"},{action:{type:"text",label:"/пдр мем"},color:"positive"},{action:{type:"text",label:"/пдр дота"},color:"positive"}]],inline:true})
										})
									} catch(error) {
										return message.send({
											message: error,
											keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/рнд все"},color:"positive"},{action:{type:"text",label:"/рнд эро"},color:"positive"},{action:{type:"text",label:"/рнд мем"},color:"positive"},{action:{type:"text",label:"/рнд дота"},color:"positive"}],[{action:{type:"text",label:"/пдр все"},color:"positive"},{action:{type:"text",label:"/пдр эро"},color:"positive"},{action:{type:"text",label:"/пдр мем"},color:"positive"},{action:{type:"text",label:"/пдр дота"},color:"positive"}]],inline:true})
										})
									}
								});
							}
						});
					}
					// Поиск видео по ключевым словам.
					if(/\/(видео|video|видос) (.*)/i.exec(message.text)) {
						let name = /\/(видео|video|видос) (.*)/gim.exec(message.text)[2];
						let tokens_base = ['e8b30ab5cfc4d401ade34f9ab1cbe3665216bbc25fe6876564c13453a2f8ff1a6db6a01ab51cc02946a66'];
						let tokens = tokens_base[Math.floor(Math.random()*tokens_base.length)];
						vk.api.video.search({
							q: name,
							adult: 1,
							count: 10,
							access_token: tokens,
							v: version
						})
						.then((response) => {
							try {
								attachments = '';
								for (let i = 0; i < response.items.length; i++) {
									if (i+1 == response.items.length) {
										attachments += 'video'+response.items[i].owner_id+'_'+response.items[i].id+'';
									} else {
										attachments += 'video'+response.items[i].owner_id+'_'+response.items[i].id+',';
									}
								}
								return message.send({
									message: 'Удалось найти '+response.count+' видео, первые '+response.items.length+' по вашему запросу: '+name,
									attachment: attachments
								})
							} catch(error) { }
						});
					}
					if(/\/(картиночки|картинки|images|рнд|пдр)$/i.exec(message.text)) {
						return message.send({
							message: 'Меню подбора картинок.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/рнд все"},color:"positive"},{action:{type:"text",label:"/рнд эро"},color:"positive"},{action:{type:"text",label:"/рнд мем"},color:"positive"},{action:{type:"text",label:"/рнд дота"},color:"positive"}],[{action:{type:"text",label:"/пдр все"},color:"positive"},{action:{type:"text",label:"/пдр эро"},color:"positive"},{action:{type:"text",label:"/пдр мем"},color:"positive"},{action:{type:"text",label:"/пдр дота"},color:"positive"}]],inline:true})
						})
					}
					if(/\/(крестики-нолики|крестики нолики|игра 1|game 1|крестики|нолики)$/i.exec(message.text)) {
						return message.send({
							message: 'Меню игры крестики-нолики.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game2create"]},color:"positive"},{action:{type:"text",label:"Принять игру",payload:["game2accept"]},color:"positive"},{action:{type:"text",label:"Отменить игру",payload:["game2close"]},color:"negative"}]],inline:true})
						})
					}
					if(/\/(ролл игра|roll game|игра 2|game 2)$/i.exec(message.text)) {
						return message.send({
							message: 'Меню игры roll.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game1create"]},color:"positive"},{action:{type:"text",label:"Принять игру",payload:["game1accept"]},color:"positive"},{action:{type:"text",label:"Отменить игру",payload:["game1close"]},color:"negative"}]],inline:true})
						})
					}
					if(/\/(флип игра|flip game|игра 3|game 3)$/i.exec(message.text)) {
						return message.send({
							message: 'Меню игры flip.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game3create"]},color:"positive"},{action:{type:"text",label:"Принять игру",payload:["game3accept"]},color:"positive"},{action:{type:"text",label:"Отменить игру",payload:["game3close"]},color:"negative"}]],inline:true})
						})
					}
					if(/\/(cid|айди|ид|сид)$/i.exec(message.text)) {
						return message.send({
							message: 'ID беседы ' + message.chatId + '.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Подключить беседу",payload:["addchat"]},color:"positive"},{action:{type:"text",label:"Отключить беседу",payload:["delchat"]},color:"negative"}],[{action:{type:"text",label:"Проверить список",payload:["lookchat"]},color:"secondary"}]],inline:true})
						})
					}
					if(/\/(флип|flip|монетка|подбросить|решка|орёл|орел)$/i.exec(message.text)) {
						let data = ['ОРЁЛ','РЕШКА'];
						return message.send({
							message: 'Подбрасывается монетка: '+data[random(0,(data.length-1))]+'.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/flip"},color:"positive"}]],inline:true})
						})
					}
					if(/\/(ролл|roll|число|случайное число)$/i.exec(message.text)) {
						return message.send({
							message: 'Выпадает случайное число(0-100): '+random(0,100)+'.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/roll"},color:"positive"}]],inline:true})
						})
					}
					if(/\/(когда)/i.exec(message.text)) {
						return message.send({
							message: 'Думаю, что это произойдёт '+moment().add(random(1,1000), 'days').format('LL')+' в '+moment().add(random(1,1000), 'minutes').format('LT')+'.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/когда"},color:"positive"}]],inline:true})
						})
					}
					if(/\/(info|inf|инфа|инфо|вероятность|процент)/i.exec(message.text)) {
						return message.send({
							message: 'Вероятность — '+random(0,100)+'%.',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/info"},color:"positive"}]],inline:true})
						})
					}
					if(/\/(выбери|подумай|скажи) (.*) или (.*)/i.exec(message.text)) {
						let answer = (/\/(выбери|подумай|скажи) (.*) или (.*)/i.exec(message.text)[random(2,3)]).replace(/\.$/gim, " ").replace(/ $/gim, "");
						return message.send({
							message: 'Думаю, что '+answer+'.'
						})
					}
					if(/\/(думаешь|вопрос|ответь|ответ)/i.exec(message.text)) {
						let data = ['насколько я вижу - да.', 'насколько я вижу - нет.', 'спроси позже.', 'лучше сейчас не говорить тебе.', 'не могу сейчас сказать.', 'соберись с мыслями и спроси снова.', 'рассчитывай на это.', 'не рассчитывай на это.', 'сомневаюсь насчёт этого.', 'это бесспорно да.', 'это бесспорно нет.', 'да, это так.', 'нет, это не так.', 'может быть.', 'это наиболее вероятно.', 'мои источники говорят - нет.', 'мои источники говорят - да.', 'нет.', 'перспектива хорошая.', 'перспектива не очень хорошая.', 'перспектива очень плохая.', 'будущее туманно спроси позже.', 'знаки указывают - да.', 'знаки указывают - нет.', 'извини, но нет.', 'очень сомневаюсь.', 'без сомнения.', 'да.', 'определённо да.', 'определённо нет.', 'ты можешь надеяться на это.', 'ты можешь не надеяться на это.', 'меня твои вопросы просто доебали уже, я уже не могу их слушать, блядь. Один вопрос охуительней другой просто, блядь. Про говно, блядь, про какую-то хуйню, молофью. Чё ты несёшь-то вообще? Пошёл ты нахуй со своими вопросами.'];
						return message.send({
							message: 'Думаю, что '+data[random(0,(data.length-1))],
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"/вопрос"},color:"positive"}]],inline:true})
						})
					}
					if(/(я насрал на потолок)/i.exec(message.text)) {
						let data = ['photo-126004779_457248975', 'photo-126004779_457248944', 'photo-126004779_457248945', 'photo-126004779_457248946', 'photo-126004779_457248947', 'photo-126004779_457248948', 'photo-126004779_457248949', 'photo-126004779_457248950', 'photo-126004779_457248951', 'photo-126004779_457248952', 'photo-126004779_457248953', 'photo-126004779_457248954'];
						return message.send({
							message: '',
							attachment: data[random(0,(data.length-1))]
						})
					}
					if(/(\/капучино|Плюнуть в официанта|Капучино под столом|Украсть стаканчик|Испортить салфетки)$/i.exec(message.text)) {
						let waiterlist = JSON.parse(require('fs').readFileSync('./data/waiter.json', "UTF-8"));
						let data = ['😉 У тебя 3 пропущенных стаканчика в ебало 😉', '😑 А ты руки мыл после разбора мусора? 😑', '😠 Хватит мыть туалеты, клиент пришёл! 😠', '😡 Сегодня без чаевых и еды, ты наказан 😡', '🤡 Быстро принёс капучино за его стол и вымыл столики 🤡', '😨 Я вычту это из твоей зарплаты, клоун 😨', '😢 Ты нам должен 10 стаканчиков иначе уволю 😢', '🤡 Пошёл вымыл пол, ты понижен 🤡'];
						return message.send({
							message: '*id'+waiterlist[0]+' ('+data[random(0,(data.length-1))]+')',
							keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Плюнуть в официанта"},color:"positive"},{action:{type:"text",label:"Капучино под столом"},color:"positive"}],[{action:{type:"text",label:"Украсть стаканчик"},color:"positive"},{action:{type:"text",label:"Испортить салфетки"},color:"positive"}]],inline:true})
						})
					}
					if(/\/(принять официанта) (\d+)/i.exec(message.text)) {	
						let get_whitelist = JSON.parse(require('fs').readFileSync('./data/waiter.json', "UTF-8"));
						let waiter_id1 = get_whitelist[0];
						let waiter_id2 = Number(/(принять официанта) (\d+)/gim.exec(message.text)[2]);
						get_whitelist.includes(waiter_id1) == true ? get_whitelist.splice(get_whitelist.indexOf(waiter_id1), 1) : "";
						get_whitelist.includes(waiter_id2) == false ? get_whitelist.splice(get_whitelist.length, 0, waiter_id2) : "";
						require('fs').writeFileSync('./data/waiter.json', JSON.stringify(get_whitelist));
						return message.send({
							message: '🤡 *id'+waiter_id1+' (Клоун), ты уволен нахуй! 🤡\n😠 Бегом собирать харчки, *id'+waiter_id2+' (официант)! 😠'
						})
					}


					// Обработка payload'ов.
					if(message.messagePayload) {
						if(message.messagePayload == 'prikol') {
							return message.send({
								message: 'Обнови страницу и попробуй ещё раз!'
							})
						}
						if(message.messagePayload == 'addchat') {
							let get_whitelist = JSON.parse(require('fs').readFileSync('./data/chats.json', "UTF-8")).sort(compare);
							get_whitelist.includes(message.chatId) == false ? get_whitelist.splice(get_whitelist.length, 0, message.chatId) : "";
							get_whitelist.sort(compare);
							require('fs').writeFileSync('./data/chats.json', JSON.stringify(get_whitelist));
							return message.send({
								message: 'Подключена беседа под номером '+message.chatId+'.\nТекущий список из '+get_whitelist.length+' бесед: '+get_whitelist+'.',
								keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Подключить беседу",payload:["addchat"]},color:"positive"},{action:{type:"text",label:"Отключить беседу",payload:["delchat"]},color:"negative"}],[{action:{type:"text",label:"Проверить список",payload:["lookchat"]},color:"secondary"}]],inline:true})
							})
						}
						if(message.messagePayload == 'delchat') {
							let get_whitelist = JSON.parse(require('fs').readFileSync('./data/chats.json', "UTF-8"));
							get_whitelist.includes(message.chatId) == true ? get_whitelist.splice(get_whitelist.indexOf(message.chatId), 1) : "";
							require('fs').writeFileSync('./data/chats.json', JSON.stringify(get_whitelist));
							return message.send({
								message: 'Отключена беседа под номером '+message.chatId+'.\nТекущий список из '+get_whitelist.length+' бесед: '+get_whitelist+'.',
								keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Подключить беседу",payload:["addchat"]},color:"positive"},{action:{type:"text",label:"Отключить беседу",payload:["delchat"]},color:"negative"}],[{action:{type:"text",label:"Проверить список",payload:["lookchat"]},color:"secondary"}]],inline:true})
							})
						}
						if(message.messagePayload == 'lookchat') {
							let get_whitelist = JSON.parse(require('fs').readFileSync('./data/chats.json', "UTF-8"));
							let msg = get_whitelist.includes(message.chatId) == true ? "Эта беседа в списке." : "Этой беседы нет в списке.";
							return message.send({
								message: msg+'\nТекущий список из '+get_whitelist.length+' бесед: '+get_whitelist+'.',
								keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Подключить беседу",payload:["addchat"]},color:"positive"},{action:{type:"text",label:"Отключить беседу",payload:["delchat"]},color:"negative"}],[{action:{type:"text",label:"Проверить список",payload:["lookchat"]},color:"secondary"}]],inline:true})
							})
						}
						if(message.messagePayload == 'game1create') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game1.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							require('fs').writeFileSync('./data/game1.json', JSON.stringify(gameslist, null, '\t'));
							if ( gameslist['id'+message.chatId].status == 0 ) {
								let gameslist = JSON.parse(require('fs').readFileSync('./data/game1.json', "UTF-8"));
								gameslist['id'+message.chatId].status = 1;
								gameslist['id'+message.chatId].chat = message.chatId;
								gameslist['id'+message.chatId].player1 = message.senderId;
								require('fs').writeFileSync('./data/game1.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игра от имени *id' + message.senderId+ ' (' + message.senderId+ ') создана.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Принять игру",payload:["game1accept"]},color:"positive"},{action:{type:"text",label:"Отменить игру",payload:["game1close"]},color:"negative"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'В данный момент уже идёт игра. Дождитесь окончания.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Отменить игру",payload:["game1close"]},color:"negative"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game1accept') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game1.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							let data = gameslist['id'+message.chatId];
							if ( data.status == 1 ) {
								data.player2 = message.senderId;
								data.status = 0;
								require('fs').writeFileSync('./data/game1.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игрок *id' + data.player1 + ' (' + data.player1 + ') получает результат: ' + random(0,100) + '.\nИгрок *id' + data.player2 + ' (' + data.player2 + ') получает результат: ' + random(0,100) + '.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game1create"]},color:"positive"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'Нет активной игры в данный момент.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game1create"]},color:"positive"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game1close') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game1.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							let data = gameslist['id'+message.chatId];
							if ( data.status == 1 ) {
								data.status = 0;
								require('fs').writeFileSync('./data/game1.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игрок *id' + message.senderId+ ' (' + message.senderId+ ') отменил игру.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game1create"]},color:"positive"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'Нет активной игры в данный момент.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game1create"]},color:"positive"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game3create') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game3.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							require('fs').writeFileSync('./data/game3.json', JSON.stringify(gameslist, null, '\t'));
							if ( gameslist['id'+message.chatId].status == 0 ) {
								let gameslist = JSON.parse(require('fs').readFileSync('./data/game3.json', "UTF-8"));
								gameslist['id'+message.chatId].status = 1;
								gameslist['id'+message.chatId].chat = message.chatId;
								gameslist['id'+message.chatId].player1 = message.senderId;
								require('fs').writeFileSync('./data/game3.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игра от имени *id' + message.senderId+ ' (' + message.senderId+ ') создана.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Принять игру",payload:["game3accept"]},color:"positive"},{action:{type:"text",label:"Отменить игру",payload:["game3close"]},color:"negative"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'В данный момент уже идёт игра. Дождитесь окончания.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Отменить игру",payload:["game3close"]},color:"negative"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game3accept') {
							let other = ['ОРЁЛ','РЕШКА'];
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game3.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							let data = gameslist['id'+message.chatId];
							if ( data.status == 1 ) {
								data.player2 = message.senderId;
								data.status = 0;
								require('fs').writeFileSync('./data/game3.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игрок *id' + data.player1 + ' (' + data.player1 + ') получает результат: ' + other[random(0,(other.length-1))] + '.\nИгрок *id' + data.player2 + ' (' + data.player2 + ') получает результат: ' + other[random(0,(other.length-1))] + '.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game3create"]},color:"positive"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'Нет активной игры в данный момент.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game3create"]},color:"positive"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game3close') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game3.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							let data = gameslist['id'+message.chatId];
							if ( data.status == 1 ) {
								data.status = 0;
								require('fs').writeFileSync('./data/game3.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игрок *id' + message.senderId+ ' (' + message.senderId+ ') отменил игру.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game3create"]},color:"positive"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'Нет активной игры в данный момент.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game3create"]},color:"positive"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game2create') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game2.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							require('fs').writeFileSync('./data/game2.json', JSON.stringify(gameslist, null, '\t'));
							if ( gameslist['id'+message.chatId].status == 0 ) {
								let gameslist = JSON.parse(require('fs').readFileSync('./data/game2.json', "UTF-8"));
								gameslist['id'+message.chatId].status = 1;
								gameslist['id'+message.chatId].chat = message.chatId;
								gameslist['id'+message.chatId].player1 = message.senderId;
								gameslist['id'+message.chatId].lead = message.senderId;
								gameslist['id'+message.chatId].steps = 0;
								gameslist['id'+message.chatId].save = new Array;
								require('fs').writeFileSync('./data/game2.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игра от имени *id' + message.senderId+ ' (' + message.senderId+ ') создана.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Принять игру",payload:["game2accept"]},color:"positive"},{action:{type:"text",label:"Отменить игру",payload:["game2close"]},color:"negative"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'В данный момент уже идёт игра. Дождитесь окончания.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Отменить игру",payload:["game2close"]},color:"negative"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game2accept') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game2.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							let data = gameslist['id'+message.chatId];
							if ( data.status == 1 ) {
								data.player2 = message.senderId;
								require('fs').writeFileSync('./data/game2.json', JSON.stringify(gameslist, null, '\t'));
								let keyboard = { buttons: new Array(), inline: true };
								for (let x = 0; x < 3; x++) {
									keyboard.buttons[x] = new Array();
									for (let y = 0; y < 3; y++) {
										keyboard.buttons[x][y] = { action: { type: 'text', label: '💭', payload: { game2: [ x, y ] } }, color: 'secondary' };
									}
								}
								return message.send({
									message: 'Игрок *id' + message.senderId+ ' (' + message.senderId+ ') принял игру.\nОжидаем ход игрока *id' + data.lead+ ' (' + data.lead+ ').',
									keyboard: JSON.stringify(keyboard)
								})
							} else {
								return message.send({
									message: 'Нет активной игры в данный момент.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game2create"]},color:"positive"}]],inline:true})
								})
							}
						}
						if(message.messagePayload == 'game2close') {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game2.json', "UTF-8"));
							gameslist['id'+message.chatId] == undefined ? gameslist['id'+message.chatId] = { status: 0 } : "";
							let data = gameslist['id'+message.chatId];
							if ( data.status == 1 ) {
								data.status = 0;
								require('fs').writeFileSync('./data/game2.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: 'Игрок *id' + message.senderId+ ' (' + message.senderId+ ') отменил игру.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game2create"]},color:"positive"}]],inline:true})
								})
							} else {
								return message.send({
									message: 'Нет активной игры в данный момент.',
									keyboard: JSON.stringify({buttons:[[{action:{type:"text",label:"Создать игру",payload:["game2create"]},color:"positive"}]],inline:true})
								})
							}
						}
						if(message.messagePayload.game2) {
							let gameslist = JSON.parse(require('fs').readFileSync('./data/game2.json', "UTF-8"));
							let data = gameslist['id'+message.chatId];
							if(message.senderId == data.lead) {
								data.save[data.steps] = [message.messagePayload.game2[0], message.messagePayload.game2[1]];
								data.steps += 1;
								let keyboard = { buttons: new Array(), inline: true };
								for (let x = 0; x < 3; x++) {
									keyboard.buttons[x] = new Array();
									for (let y = 0; y < 3; y++) {
										keyboard.buttons[x][y] = { action: { type: 'text', label: '💭', payload: { game2: [ x, y ] } }, color: 'secondary' };
									}
								}
								for (let x = 0; x < data.steps; x++) {
									let label = x % 2 == 0 ? '❌' : '⭕';
									let color = x % 2 == 0 ? 'positive' : 'primary';
									keyboard.buttons[data.save[x][0]][data.save[x][1]] = { action: { type: 'text', label: label }, color: color };
								}
								data.lead = data.lead == data.player2 ? data.player1 : data.player2;
								let text = data.steps >= (3^2) ? 'Игра между *id' + data.player1+ ' (' + data.player1+ ') и *id' + data.player2+ ' (' + data.player2+ ') окончена.' : 'Ход сделан. Ожидаем ход игрока *id' + data.lead+ ' (' + data.lead+ ').';
								data.steps >= 9 ? data.status = 0 : '';
								require('fs').writeFileSync('./data/game2.json', JSON.stringify(gameslist, null, '\t'));
								return message.send({
									message: text,
									keyboard: JSON.stringify(keyboard)
								})
							} else {
								return message.send({
									message: 'Ожидаем ход игрока *id' + data.lead+ ' (' + data.lead+ ').',
									keyboard: JSON.stringify(keyboard)
								})
							}
						}
					}
				} else {
					spam(message.chatId, message);
				}
			}
		}
	},
	async (context) => {
		//console.log(context);
	}
);

vk.updates.start().catch(console.error);