function get_page(group_id, page_id, time_delay) {
    $.ajax({
        url: 'https://api.vk.com/method/pages.get?owner_id=-' + group_id + '&page_id=' + page_id + '&need_html=1&access_token=400da9dc148fb61833ae605815575512c13e9c252f2acd5e866d21e8160a9ea71a03da624583f461c35da&v=5.101',
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
            try {
                $('.main_left').empty();
                var page_body = '<div class="main_left_content_page">' + data.response.html + '</div>';
                document.querySelector('.main_left').insertAdjacentHTML('beforeend', page_body);
                var photo_attr = Number(document.getElementsByClassName('wk_photo').length);
                for (var x = 0; x < photo_attr; x++) {
                    document.querySelector('.wk_photo>img').className = "wk_photo_edit";
                    document.querySelector('.wk_photo>img').removeAttribute('style');
                    document.querySelector('.wk_photo>img').removeAttribute('width');
                    document.querySelector('.wk_photo>img').removeAttribute('height');
					document.querySelector('.wk_photo').replaceWith(document.querySelector('.wk_photo>img'));
                }
                var link_attr = Number(document.getElementsByClassName('wk_ext_link').length);
                for (var x = 0; x < link_attr; x++) {
                    document.querySelector('.wk_ext_link').setAttribute('href', document.querySelector('.wk_ext_link').getAttribute('data-external-url'));
                    document.querySelector('.wk_ext_link').removeAttribute('data-external-url');
                    document.querySelector('.wk_ext_link').className = "wk_ext_link_edit";
                }
                var page_date_created = new Date(data.response.created * 1000 + time_delay).toISOString().substr(8, 2) + '.' + new Date(data.response.created * 1000 + time_delay).toISOString().substr(5, 2) + '.' + new Date(data.response.created * 1000 + time_delay).toISOString().substr(0, 4) + ' в ' + new Date(data.response.created * 1000 + time_delay).toISOString().substr(11, 5);
                var page_date_edited = new Date(data.response.edited * 1000 + time_delay).toISOString().substr(8, 2) + '.' + new Date(data.response.edited * 1000 + time_delay).toISOString().substr(5, 2) + '.' + new Date(data.response.edited * 1000 + time_delay).toISOString().substr(0, 4) + ' в ' + new Date(data.response.edited * 1000 + time_delay).toISOString().substr(11, 5);
                var page_body = '<div class="page_date" title="Создано/отредактировано"><i class="fas fa-plus"></i> ' + page_date_created + '<br><i class="fas fa-pen"></i> ' + page_date_edited + '</div>';
                document.querySelector('.main_left_content_page').insertAdjacentHTML('beforeend', page_body);
                var page_id_full = page_id * 1337;
                var page_comments = '<div id="' + page_id_full + '" class="page_comments"><div id="vk_comments"></div></div>';
                document.querySelector('.main_left').insertAdjacentHTML('beforeend', page_comments);
                VK.Widgets.Comments("vk_comments", {
                    limit: 10,
                    attach: "*"
                }, page_id_full);
            } catch (err) {
				messages('Error.', '<br>Ошибка получения данных страницы.<br>Невозможно построить страницу.', 'yellow');
                console.log("Ошибка получения страницы.\nОбъяснение: " + err + ".");
            }
        }
    });
}

function loadJS(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
	s.onreadystatechange = s.onerror = function() {
		messages('Error.', '<br>Ошибка получения данных страницы.<br>Невозможно построить страницу.', 'yellow');
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}

function get_page_new(group_id, page_id, time_delay) {
	try {
		loadJS('./base_pages/'+group_id+'_'+page_id+'.js', function() {
			if (typeof isScriptLoad != 'is not defined') {
				try {
					$('.main_left').empty();
					var page_body = '<div class="main_left_content_page">' + data.response.html + '</div>';
					document.querySelector('.main_left').insertAdjacentHTML('beforeend', page_body);
					try {
						var link_attr = Number(document.querySelectorAll('img[type=img]').length);
						for (var x = 0; x < link_attr; x++) {
							var href = document.querySelector('img[type=img]').getAttribute('src');
							document.querySelector('img[type=img]').insertAdjacentHTML('beforebegin', '<a href="'+href+'" class="progressive replace wk_photo_edit"><img src="'+href+'" class="preview" alt="image" /></a>');
							document.querySelector('img[type=img]').remove();
						}
					} catch(err) {}
					if (data.response.comments == true) {
						var page_id_full = page_id * 1337;
						var page_date_created = new Date(data.response.created * 1000 + time_delay).toISOString().substr(8, 2) + '.' + new Date(data.response.created * 1000 + time_delay).toISOString().substr(5, 2) + '.' + new Date(data.response.created * 1000 + time_delay).toISOString().substr(0, 4) + ' в ' + new Date(data.response.created * 1000 + time_delay).toISOString().substr(11, 5);
						var page_body = '<ol class="page_date"><li><i class="far fa-clock"></i><span id="pdate">'+page_date_created+'</span></li><li><i class="far fa-ticket-alt"></i><span id="pnumber">'+page_id_full+'</span></li></ol>';
						try {
							document.querySelector('.main_left_content_page > .wk_header').insertAdjacentHTML('afterend', page_body);
						} catch(err) {
							try {
								document.querySelector('.main_left_content_page > .wk_breadcrumb').insertAdjacentHTML('afterend', page_body);
							} catch(err) {}
						}
						var page_comments = '<div id="' + page_id_full + '" class="page_comments"><div id="vk_comments"></div></div>';
						document.querySelector('.main_left').insertAdjacentHTML('beforeend', page_comments);
						VK.Widgets.Comments("vk_comments", {
							limit: 10,
							attach: "*"
						}, page_id_full);
					}
				} catch (err) {
					messages('Error.', '<br>Ошибка получения данных страницы.<br>Невозможно построить страницу.', 'yellow');
					console.log("Ошибка получения страницы.\nОбъяснение: " + err + ".");
				}
			} else {
				messages('Error.', '<br>Ошибка получения данных страницы.<br>Невозможно построить страницу.', 'yellow');
			}
		});
	} catch(err) {
		messages('Error.', '<br>Ошибка получения данных страницы.<br>Невозможно построить страницу.', 'yellow');
		console.log("Ошибка получения страницы.\nОбъяснение: " + err + ".");
	}
}