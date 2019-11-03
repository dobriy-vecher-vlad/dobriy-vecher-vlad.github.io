function getChat() {
	var group_id = document.querySelector('#group_id').value;
	var group_token = document.querySelector('#group_token').value;
	var chat_id = document.querySelector('#chat_id').value;
	
	$.ajax({
        url: 'https://api.vk.com/method/messages.getConversationsById?peer_ids=' + (2000000000+Number(chat_id)) + '&access_token=' + group_token + '&v=5.101',
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
						var chat_title = "Нет доступа";
						var chat_owner_id = "нет доступа";;
						var chat_members_count = 0;
						var chat_photo = "https://vk.com/images/camera_200.png";
					}
					var tooltip_body = '<div class="chat_photo" style="background-image: url('+chat_photo+');"></div><div class="chat_data"><div class="chat_name">'+chat_title+'</div><div class="chat_members">'+chat_members_count+' участников, создатель <a href="https://vk.com/id'+chat_owner_id+'" target="_blank">'+chat_owner_id+'</a></div></div><textarea class="chat_messages" placeholder="Текстовое сообщение"></textarea><input class="chat_media" placeholder="Вложение"></input><div id="send" class="chat_button" onclick="sendMessage();">Отправить</div>';
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
function sendMessage() {
	var group_id = document.querySelector('#group_id').value;
	var group_token = document.querySelector('#group_token').value;
	var chat_id = document.querySelector('#chat_id').value;
	var message = document.querySelector('.chat_messages').value;
	var media = document.querySelector('.chat_media').value;
	var random = Math.floor(Math.random() * (99999 - 0 + 0)) + 0;
	$.ajax({
        url: 'https://api.vk.com/method/messages.send?chat_id=' + chat_id + '&group_id=' + group_id + '&message=' + message + '&attachment=' + media + '&random_id=' + random + '&access_token=' + group_token + '&v=5.101',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
		success: function(data) {
			console.log(data);
			document.querySelector('#send').innerHTML = "Отправлено";
			document.querySelector('#send').className += " select";
			setTimeout(function() {
				document.querySelector('#send').className = "chat_button";
				document.querySelector('#send').innerHTML = "Отправить";
			}, 2000);
		}
    });
}
function getChats(id) {
	var group_id = document.querySelector('#group_id').value;
	var group_token = document.querySelector('#group_token').value;
	var chat_id = id;
	$.ajax({
        url: 'https://api.vk.com/method/messages.getConversationsById?peer_ids=' + (2000000000+Number(chat_id)) + '&access_token=' + group_token + '&v=5.101',
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
						var chat_title = "Нет доступа";
						var chat_owner_id = "нет доступа";;
						var chat_members_count = 0;
						var chat_photo = "https://vk.com/images/camera_200.png";
					}
					var tooltip_body = '<div class="chat_photo" style="margin-left: 50px; width: 50px; height: 50px; background-image: url('+chat_photo+');"></div><div class="chat_data" style="height: 50px;"><div class="chat_name" style="height: 10px; line-height: 10px; font-size: 16px; margin-top: 15px;">'+chat_title+' #'+id+'</div><div class="chat_members" style="height: 20px; line-height: 20px; font-size: 12px; margin-bottom: 10px;">'+chat_members_count+' участников, создатель <a style="font-size: 12px; line-height: 20px;" href="https://vk.com/id'+chat_owner_id+'" target="_blank">'+chat_owner_id+'</a></div></div>';
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
function clearmore() {
	$('.chat_info_more').empty();
	getChats(1);
}
function setChat(number) {
	group_id = ["187299468", "126004779", "none", "none", "none"];
	group_token = ["fc0d29c92ea2743eb77a7d8238f61c00ad9556fb047354022bef7c6d1ecf8a2262d9ef27ee619188a533c", "2412be72649ca013e676bda273f3a7dac35b8850b233d4401bc1a9e847192f0a0c4811bfa0073115d1730", "none", "none", "none"];
	document.querySelector('#group_id').setAttribute('value', group_id[number-1]);
	document.querySelector('#group_token').setAttribute('value', group_token[number-1]);
}