var access_token = 'b6976c45b6976c45b6976c4562b6fb1a80bb697b6976c45ebc84db7bd66a7ecc589f3f8';
var version = '5.103';

function gototopnews() {
    $("html, body").animate({
        scrollTop: 0
    }, 400);
}

function close_post() {
    document.querySelector('body').setAttribute('overflow', 'scroll');
    $('.post_view').css({
        "display": "none"
    });
    $('.post_view').empty();
}

function open_post(name, text, photo, photo_size, id, date) {
	close_post();
    document.querySelector('body').setAttribute('overflow', 'hidden');
    $('.post_view').css({
        "display": "block"
    });
    var post_body = '<div class="post_block"><div class="post_name">' + name + '</div><div class="post_date">' + date + '</div><div class="post_text">' + text.replace(/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/gim, '$1$2<a class="post_text_href" href=\"$3\" target="_blank">$3</a>') + '</div><div class="post_photo" style="background-image: url(' + photo + '); background-size: ' + photo_size + '; height: ' + (photo_size == "not" ? 0 : 660) + 'px; width: 660px;"></div><div class="post_like" id="vk_like"></div></div><div class="post_comments"><div id="vk_comments"></div></div><div class="post_close" onclick="close_post();"></div><div class="post_close_back" onclick="close_post();"></div>';
    document.querySelector('.post_view').insertAdjacentHTML('beforeend', post_body);
    document.querySelector('.post_close_back').setAttribute('style', 'height: '+document.querySelector('.body').scrollHeight+'px;');
	document.querySelector(".post_photo").addEventListener("click", function(){window.open(photo, "_blank")}, false);
    VK.Widgets.Comments("vk_comments", {
        limit: 10,
        attach: "*"
    }, id);
    VK.Widgets.Like("vk_like", {
        type: "mini",
        height: 30
    }, id);
}

var value_post = 26;
function get_posts(posts_id, posts_offset, time_delay) {
    $.ajax({
        url: 'https://api.vk.com/method/wall.get?owner_id=-' + posts_id + '&count=' + value_post+ '&offset=' + (posts_offset * value_post) + '&filter=owner&access_token='+access_token+'&v='+version+'',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
			try {
				$('.main_left').empty();
				var posts = data.response.count >= value_post && posts_offset < Math.floor(data.response.count/value_post) ? value_post : (data.response.count - (posts_offset * value_post));
				if (posts == 0) {
					var post_body = '<div class="main_left_content" style="color: var(--text-black-color); text-align: center; line-height: 225px;">Записей в указанной группе <a class="post_text_href" target="_blank" href="https://vk.com/club'+posts_id+'">ID'+posts_id+'</a> не обнаружено. Невозможно построить сетку новостей.<div class="main_left_content_nav_more" style="width: 200px; margin: auto;" onclick="get_posts(' + posts_id + ', ' + posts_offset + ', ' + time_delay + '); gototopnews();">Обновить новости</div></div>';
					document.querySelector('.main_left').insertAdjacentHTML('beforeend', post_body);
				} else {
					for (var x = 0; x < posts; x++) {
						try {
							if ((data.response.items[x].text).length > 5) {
								var post_name = (/(.*)/gi.exec(data.response.items[x].text)[1]).replace(/"/gim, "'");
							} else {
								var post_name = "Нет заголовка записи.";
							}
							try {
								var post_text = (data.response.items[x].text).replace(/^.*\n\n/g, "").replace(/"/g, "&#34;").replace(/</g, "&#8249;").replace(/>/g, "&#8250;").replace(/"/gim, "'");
								var post_text_edit = (data.response.items[x].text).replace(/^.*\n\n/g, "").replace(/"/g, "&#34;").replace(/</g, "&#8249;").replace(/>/g, "&#8250;").replace(/"/gim, "'").replace(/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/gim, '$1$2<a class="post_text_href" href=\"$3\" target="_blank">$3</a>');
							} catch {
								var post_text = "Нет текста записи.";
								var post_text_edit = "Нет текста записи.";
							}
							try {
								try {
									var last_id = data.response.items[x].attachments[0].photo.sizes.find(size => size.type === 'z');
									var post_photo = last_id.url;
									var photo_height = last_id.height;
									var photo_width = last_id.width;
								} catch {
									var last_id = data.response.items[x].attachments[0].photo.sizes.length - 1;
									var post_photo = data.response.items[x].attachments[0].photo.sizes[last_id].url;
									var photo_height = data.response.items[x].attachments[0].photo.sizes[last_id].height;
									var photo_width = data.response.items[x].attachments[0].photo.sizes[last_id].width;
								}
								var post_photo_tiny = data.response.items[x].attachments[0].photo.sizes[0].url;
								var post_photo_size = photo_height == photo_width ? "auto 100%" : photo_height > photo_width ? "auto 100%" : "100% auto";
							} catch {
								var post_photo = "img/not_img.png";
								var post_photo_tiny = "img/not_img_tiny.png";
								var post_photo_size = "not";
							}
							var post_id = data.response.items[x].id;
							var post_date = new Date(data.response.items[x].date * 1000 + time_delay).toISOString().substr(8, 2) + '.' + new Date(data.response.items[x].date * 1000 + time_delay).toISOString().substr(5, 2) + '.' + new Date(data.response.items[x].date * 1000 + time_delay).toISOString().substr(0, 4) + ' в ' + new Date(data.response.items[x].date * 1000 + time_delay).toISOString().substr(11, 5);
							var post_body = '<div class="main_left_content" onclick="open_post(`' + post_name + '`, `' + post_text + '`, `' + post_photo + '`, `' + post_photo_size + '`, `' + post_id + '`, `' + post_date + '`);"><div class="main_left_content_image"><a href="' + post_photo + '" class="progressive replace" type="news"><img src="' + post_photo_tiny + '" class="preview" alt="image" /></a></div><div class="main_left_content_image_shadow"></div><div class="main_left_content_date" onclick="window.open(`https://vk.com/wall' + data.response.items[x].owner_id + '_' + data.response.items[x].id + '`, `_blank`)">' + post_date + '</div><div class="main_left_content_head">' + post_name + '</div><div class="main_left_content_text">' + post_text_edit + '</div><div class="main_left_content_more"><i class="fas fa-angle-right"></i> ЧИТАТЬ</div></div>';
							document.querySelector('.main_left').insertAdjacentHTML('beforeend', post_body);
							$(".main_left").attr("page", (posts_offset + 1)).attr("pages", Math.ceil(data.response.count / value_post)).attr("count", (x + 1));
						} catch(err) {
							console.log("Ошибка получения записи номер " + (x + 1) + ".\nПричина:" + err + ".");
							break;
						}
					}
					var post_body = '<div class="main_left_content_nav"></div>';
					document.querySelector('.main_left').insertAdjacentHTML('beforeend', post_body);
					var pages_start = $(".main_left").attr("page") == 1 ? 0 : $(".main_left").attr("page") == 2 ? 0 : $(".main_left").attr("page") == 3 ? 0 : $(".main_left").attr("page") == 4 ? 0 : Number($(".main_left").attr("page")) - 4;
					var pages_finish = $(".main_left").attr("page") == 1 ? 5 : $(".main_left").attr("page") == 2 ? 5 : $(".main_left").attr("page") == 3 ? 5 : $(".main_left").attr("page") == 4 ? 5 : Number($(".main_left").attr("page")) + 1;
					for (var x = pages_start; x < pages_finish; x++) {
						try {
							var nav_number = x + 1;
							var nav_type = $(".main_left").attr("page") == nav_number ? "active" : $(".main_left").attr("pages") < nav_number ? "deactive" : "";
							var nav_click = $(".main_left").attr("page") == nav_number ? "" : $(".main_left").attr("pages") < nav_number ? "" : "get_posts(" + posts_id + ", " + x + ", " + time_delay + "); gototopnews();";
							var nav_body = '<div class="main_left_content_nav_more ' + nav_type + '" onclick="' + nav_click + '"><i class="far fa-file"></i> ' + nav_number + ' стр.</div>';
							document.querySelector('.main_left_content_nav').insertAdjacentHTML('beforeend', nav_body);
						} catch(err) {
							console.log("Ошибка кнопки перехода на страницу " + (x + 1) + ".\nПричина:" + err + ".");
							break;
						}
					}
					var nav_body = '<div class="main_left_content_nav_more" style="width: 180px;" onclick="get_posts(' + posts_id + ', ' + (1 - 1) + ', ' + time_delay + '); gototopnews();"><i class="fas fa-arrow-left"></i>  В начало (' + 1 + ' стр.)</div>';
					document.querySelector('.main_left_content_nav').insertAdjacentHTML('afterbegin', nav_body);
					var nav_body = '<div class="main_left_content_nav_more" style="width: 180px;" onclick="get_posts(' + posts_id + ', ' + (Number($(".main_left").attr("pages")) - 1) + ', ' + time_delay + '); gototopnews();">В конец (' + Number($(".main_left").attr("pages")) + ' стр.)  <i class="fas fa-arrow-right"></i></div>';
					document.querySelector('.main_left_content_nav').insertAdjacentHTML('beforeend', nav_body);
				}
			} catch(err) {
				$('.main_left').empty();
				messages('Error.', '<br>Ошибка получения записей.<br>Невозможно построить сетку новостей.', 'yellow');
				var post_body = '<div class="main_left_content" style="color: var(--text-black-color); text-align: center;"><br><br>Ошибка получения записей группы <a class="post_text_href" target="_blank" href="https://vk.com/club'+posts_id+'">ID'+posts_id+'</a>. Невозможно построить сетку новостей.<br><br><div class="main_left_content_nav_more" style="width: 200px; margin: auto;" onclick="get_posts(' + posts_id + ', ' + posts_offset + ', ' + time_delay + '); gototopnews();">Обновить новости</div></div>';
				document.querySelector('.main_left').insertAdjacentHTML('beforeend', post_body);
				console.log("Ошибка получения записей.\nОбъяснение: "+err+".");
			}
		}
    });
}