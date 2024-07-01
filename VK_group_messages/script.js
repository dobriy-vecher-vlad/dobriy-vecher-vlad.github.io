var api_version = "5.103"
function getChat(group_id) {
	var group_id = group_id;
	var group_token = document.querySelector('#group_token').value;
	var chat_id = document.querySelector('#chat_id').value;
	
	$.ajax({
        url: 'https://api.vk.com/method/messages.getConversationsById?peer_ids=' + (2000000000+Number(chat_id)) + '&access_token=' + group_token + '&v='+api_version+'',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
			if ( data.response ) {
				try {
					$('.chat_info').empty();
					console.log(data);
					try {
						var chat_title = data.response.items[0].chat_settings.title;
						var chat_owner_id = data.response.items[0].chat_settings.owner_id;
						var chat_members_count = data.response.items[0].chat_settings.members_count;
						var chat_photo = data.response.items[0].chat_settings.photo.photo_200;
					} catch {
						var chat_title = "API error [no permissions]";
						var chat_owner_id = 0;
						var chat_members_count = 0;
						var chat_photo = "https://vk.com/images/camera_200.png";
					}
					var tooltip_body = '<div class="chat_help"><div class="chat_photo" style="background-image: url('+chat_photo+');"></div><div class="chat_data"><div class="chat_name">'+chat_title+'</div><div class="chat_members">'+chat_members_count+' участников, создатель <a href="https://vk.com/id'+chat_owner_id+'" target="_blank">'+chat_owner_id+'</a></div></div></div><textarea id="chat_messages" placeholder="Текстовое сообщение"></textarea><input class="chat_media" placeholder="Вложение"></input><div id="send" class="button button_blue" onclick="sendMessage('+group_id+');">Отправить</div>';
					document.querySelector('.chat_info').insertAdjacentHTML('beforeend', tooltip_body);
				} catch(err) {
					console.log("Ошибка получения данных беседы.\nОбъяснение: "+err+".");
					$('.chat_info').empty();
					var tooltip_body = 'Данного ID беседы не существует';
					document.querySelector('.chat_info').insertAdjacentHTML('beforeend', tooltip_body);
				}
			} else {
				console.log("Ошибка получения данных беседы.");
				$('.chat_info').empty();
				var tooltip_body = 'Данного ID беседы не существует';
				document.querySelector('.chat_info').insertAdjacentHTML('beforeend', tooltip_body);
			}
		}
    });
}
function sendMessage(group_id) {
	var group_id = group_id;
	var group_token = document.querySelector('#group_token').value;
	var chat_id = document.querySelector('#chat_id').value;
	var message = (document.querySelector('#chat_messages').value+'').replace(/[\r\n]/gim, "%0A");
	var attachment = (/(photo|video|audio|doc|wall|market|poll)(\d*)_(\d*)/im.exec(document.querySelector('.chat_media').value));
	var random = Math.floor(Math.random() * (99999 - 0 + 0)) + 0;
	$.ajax({
        url: 'https://api.vk.com/method/messages.send?chat_id=' + chat_id + '&group_id=' + group_id + '&message=' + message + '&attachment=' + attachment + '&random_id=' + random + '&access_token=' + group_token + '&v='+api_version+'',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
		success: function(data) {
			console.log(data);
			document.querySelector('#send').innerHTML = "Отправлено";
			document.querySelector('#send').className += " button_grey";
			setTimeout(function() {
				document.querySelector('#send').className = "button button_blue";
				document.querySelector('#send').innerHTML = "Отправить";
			}, 2000);
		}
    });
}
function getChats(id, group_id) {
	var group_id = group_id;
	var group_token = document.querySelector('#group_token').value;
	var chat_id = id;
	$.ajax({
        url: 'https://api.vk.com/method/messages.getConversationsById?peer_ids=' + (2000000000+Number(chat_id)) + '&access_token=' + group_token + '&v='+api_version+'',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
			if ( data.response ) {
				try {
					console.log(data);
					try {
						var chat_title = data.response.items[0].chat_settings.title;
						var chat_owner_id = data.response.items[0].chat_settings.owner_id;
						var chat_members_count = data.response.items[0].chat_settings.members_count;
						var chat_photo = data.response.items[0].chat_settings.photo.photo_200;
					} catch {
						var chat_title = "API error [no permissions]";
						var chat_owner_id = 0;
						var chat_members_count = 0;
						var chat_photo = "https://vk.com/images/camera_200.png";
					}
					var tooltip_body = '<div class="chat_help"><div class="chat_photo" style="margin-left: 50px; width: 50px; height: 50px; background-image: url('+chat_photo+');"></div><div class="chat_data" style="height: 50px;"><div class="chat_name" style="height: 10px; line-height: 10px; font-size: 16px; margin-top: 15px;">'+chat_title+' #'+id+'</div><div class="chat_members" style="height: 20px; line-height: 20px; font-size: 12px; margin-bottom: 10px;">'+chat_members_count+' участников, создатель <a style="font-size: 12px; line-height: 20px;" href="https://vk.com/id'+chat_owner_id+'" target="_blank">'+chat_owner_id+'</a></div></div></div>';
					document.querySelector('.chat_info_more').insertAdjacentHTML('beforeend', tooltip_body);
					getChats(id+1);
					
				} catch(err) {
					console.log("Ошибка получения данных беседы.\nОбъяснение: "+err+".");
				}
			} else {
				console.log("Ошибка получения данных беседы.");
			}
		}
    });
}
function getId() {
	var group_token = document.querySelector('#group_token').value;
	$.ajax({
        url: 'https://api.vk.com/method/groups.getById?fields=members_count&access_token=' + group_token + '&v='+api_version+'',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
			if ( data.response ) {
				try {
					console.log(data);
					try {
						var group_id = data.response[0].id;
						var group_name = data.response[0].name;
						var group_photo_200 = data.response[0].photo_200;
						var group_members_count = data.response[0].members_count == undefined ? 0 : data.response[0].members_count;
						getChat(group_id);
						getChats(1, group_id);
					} catch {
						var group_id = 0;
						var group_name = "API error [bad request]";
						var group_photo_200 = "https://vk.com/images/camera_200.png";
						var group_members_count = 0;
					}
					var tooltip_body = '<div class="chat_help"><div class="chat_photo" style="background-image: url('+group_photo_200+');"></div><div class="chat_data"><div class="chat_name">'+group_name+'</div><div class="chat_members">'+group_members_count+' участников, ID <a href="https://vk.com/club'+group_id+'" target="_blank">'+group_id+'</a></div></div></div></div>';
					document.querySelector('.id_info').insertAdjacentHTML('beforeend', tooltip_body);
				} catch(err) {
					console.log("Ошибка получения данных сообщества.\nОбъяснение: "+err+".");
				}
			} else {
				console.log("Ошибка получения данных сообщества.");
				document.querySelector('.id_info').innerHTML = "<pre>"+JSON.stringify(data.error, null, " ")+"</pre>";
				document.querySelector('.chat_info').innerHTML = "<pre>"+JSON.stringify(data.error, null, " ")+"</pre>";
				document.querySelector('.chat_info_more').innerHTML = "<pre>"+JSON.stringify(data.error, null, " ")+"</pre>";
				var index = Date.now()*(Math.floor(Math.random() * (999999 - 1 + 1)) + 1);
				var tooltip_body = '<div class="main_tooltip_body" id="'+index+'">Неверный токен.<br>'+data.error.error_msg+'<br>Код ошибки: '+data.error.error_code+'.</div>';
				document.querySelector('.main_tooltip').insertAdjacentHTML('beforeend', tooltip_body);
				$('#'+index+'').fadeIn(500);
				setTimeout(function() {
					$('#'+index+'').fadeOut(500);
					setTimeout(function() {
						document.querySelector('.main_tooltip>div').remove();
					}, 500);
				}, 3000);
			}
		}
    });
}
function clearmore() {
	if ( document.querySelector('#group_token').value.length == 85 ) {
		$('.id_info').empty();
		$('.chat_info').empty();
		$('.chat_info_more').empty();
		getId();
	} else {
		var index = Date.now()*(Math.floor(Math.random() * (999999 - 1 + 1)) + 1);
		var tooltip_body = '<div class="main_tooltip_body" id="'+index+'">Неверный токен.<br>Токен должен содержать 85 символов.</div>';
		document.querySelector('.main_tooltip').insertAdjacentHTML('beforeend', tooltip_body);
		$('#'+index+'').fadeIn(500);
		setTimeout(function() {
			$('#'+index+'').fadeOut(500);
			setTimeout(function() {
				document.querySelector('.main_tooltip>div').remove();
			}, 500);
		}, 3000);
	}
}
function setChat(number) {
	group_token = ["fc0d29c92ea2743eb77a7d8238f61c00ad9556fb047354022bef7c6d1ecf8a2262d9ef27ee619188a533c", "2412be72649ca013e676bda273f3a7dac35b8850b233d4401bc1a9e847192f0a0c4811bfa0073115d1730", "none", "none", "none"];
	document.querySelector('#group_token').value = group_token[number-1];
}