import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
//import '@vkontakte/vkui/dist/vkui.css';

import { View, ScreenSpinner } from '@vkontakte/vkui/';

import Home from './panels/Home';
import VKBridge from './panels/VKBridge';
import VKPhotoSave from './panels/VKPhotoSave';

//let url = 'https://vk.com/foaf.php?id=153968505';
import './panels/fix.css';
import './panels/vkui.css';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [GroupsGet, setGroupsGet] = useState(null);
	const [PhotosGetAlbums, setPhotosGetAlbums] = useState(null);
	const [FriendsGet, setFriendsGet] = useState(null);

	const [popout, setPopout] = useState(null);
	const [id, setId] = useState(null);
	const [access_token, setAccessToken] = useState(null);
	let version = "5.107";

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			//console.log(type); console.log(data);
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
			if (type === 'VKWebAppGetUserInfoResult') {
				setUser(data);
			}
			if (type === 'VKWebAppCallAPIMethodResult' && data.request_id === 'groups.get') {
				setGroupsGet(data.response);
			}
			if (type === 'VKWebAppCallAPIMethodResult' && data.request_id === 'photos.getAlbums') {
				setPhotosGetAlbums(data.response);
			}
			if (type === 'VKWebAppCallAPIMethodResult' && data.request_id === 'friends.get') {
				setFriendsGet(data.response);
			}
		});
	}, []);
	const GoVKBridge = e => {
		setPopout(<ScreenSpinner size='large' />);
		bridge.send('VKWebAppGetUserInfo').then(data => {
			let id = data.id;
			setId(id);
			bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "friends,photos,video,pages,status,notes,wall,docs,groups,stats,market"}).then(data => {
				let access_token = data.access_token;
				setAccessToken(access_token);
				bridge.send("VKWebAppCallAPIMethod", {"method": "groups.get", "request_id": "groups.get", "params": {"user_id":id, "extended":1, "count":100, "fields":"members_count", "v":version, "access_token":access_token}}).then(data => {
					bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":access_token}}).then(data => {
						bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "request_id": "friends.get", "params": {"user_id":id, "count":100, "fields":"photo_200_orig", "v":version, "access_token":access_token}}).then(data => {
							setActivePanel('VKBridge');
							setPopout(null);
						}).catch(error => {
							setPopout(null);
						});
					}).catch(error => {
						setPopout(null);
					});
				}).catch(error => {
					setPopout(null);
				});
			}).catch(error => {
				setPopout(null);
			});
		})
	};
	const GoVKPhotoSave = e => {
		setPopout(<ScreenSpinner size='large' />);
		bridge.send('VKWebAppGetUserInfo').then(data => {
			let id = data.id;
			setId(id);
			bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "friends,photos,video,pages,status,notes,wall,docs,groups,stats,market"}).then(data => {
				let access_token = data.access_token;
				setAccessToken(access_token);
				bridge.send("VKWebAppCallAPIMethod", {"method": "groups.get", "request_id": "groups.get", "params": {"user_id":id, "extended":1, "count":100, "fields":"members_count", "v":version, "access_token":access_token}}).then(data => {
					bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":access_token}}).then(data => {
						bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "request_id": "friends.get", "params": {"user_id":id, "count":100, "fields":"photo_200_orig", "v":version, "access_token":access_token}}).then(data => {
							setActivePanel('VKPhotoSave');
							document.querySelector('.Select__el[data-to=album]').setAttribute('disabled', '');
							setPopout(null);
						}).catch(error => {
							setPopout(null);
						});
					}).catch(error => {
						setPopout(null);
					});
				}).catch(error => {
					setPopout(null);
				});
			}).catch(error => {
				setPopout(null);
			});
		})
	};
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
	const goSave = e => {
		setPopout(<ScreenSpinner size='large' />);
		function save(owner, album_id, count, offset) {
			bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":owner, "album_id":album_id, "count":count, "v":version, "access_token":access_token}}).then(data => {
				let savedPhoto = data.response.items;
				let i = 0;
				let timerId = setInterval(() => {
					bridge.send("VKWebAppCallAPIMethod", {"method": "photos.copy", "request_id": "photos.copy", "params": {"owner_id":owner, "photo_id":savedPhoto[i].id, "v":version, "access_token":access_token}});
					if (i === savedPhoto.length-1) {
						setPopout(null);
						clearInterval(timerId);
					}
					i += 1;
				}, 500);
			}).catch(error => {
				setPopout(null);
			});
		}
		let owner = document.querySelector('.Select__el[data-to=group]').value;
		let album_id = document.querySelector('.Select__el[data-to=album]').value;
		bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":id, "album_id":-15, "count":1000, "v":version, "access_token":access_token}}).then(data => {
			let savedPhoto = data.response.items;
			if (savedPhoto.length !== 0) {
				bridge.send("VKWebAppCallAPIMethod", {"method": "photos.createAlbum", "request_id": "photos.createAlbum", "params": {"title":id, "description":"Сохранённые фотографии", "privacy_view":"only_me", "privacy_comment":"only_me", "v":version, "access_token":access_token}}).then(data => {
					let to = data.response.id;
					let i = 0;
					let timerId = setInterval(() => {
						bridge.send("VKWebAppCallAPIMethod", {"method": "photos.move", "request_id": "photos.move", "params": {"owner_id":id, "target_album_id":to, "photo_id":savedPhoto[i].id, "v":version, "access_token":access_token}});
						if (i === savedPhoto.length-1) {
							clearInterval(timerId);
							save(owner, album_id, 1000, 0);
						}
						i += 1;
					}, 500);
				}).catch(error => {
					setPopout(null);
				});
			} else {
				save(owner, album_id, 1000, 0);
			}
		}).catch(error => {
			setPopout(null);
		});
	};
	const update = e => {
		let from = e.name;
		if (from === 'group') {
			let value = e.value;
			if (value !== '-') {
				setPopout(<ScreenSpinner size='large' />);
				bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":value, "album_ids":-7, "need_system":1, "v":version, "access_token":access_token}}).then(data => {
					let to = document.querySelector('.Select__el[data-to=album]');
					let html = '<option value="0">Выберите альбом</option>';
					for (let i = 0; i < data.response.items.length; i++) {
						html += '<option key='+data.response.items[i].id+' value='+data.response.items[i].id+'>'+data.response.items[i].title+'</option>';
					}
					to.innerHTML = html;
					to.removeAttribute('disabled');
					to.parentNode.classList.remove('Select--disabled');
					to["offsetParent"]["childNodes"][1]["childNodes"][0].innerHTML = 'Выберите альбом';
					let to2 = document.querySelectorAll('.CardScroll[data-to=photo] > div > div> div > div');
					for (let i = 0; i < 5; i++) {
						to2[i]["lastChild"]["lastChild"].setAttribute('style', 'width: 144px; height: 96px;');
					}
					to2.value = 'none';
					setPopout(null);
				}).catch(error => {
					let to = document.querySelector('.Select__el[data-to=album]');
					to.setAttribute('disabled', '');
					to.parentNode.classList.add('Select--disabled');
					to.value = 'none';
					to["offsetParent"]["childNodes"][1]["childNodes"][0].innerHTML = 'Выберите альбом';
					let to2 = document.querySelectorAll('.CardScroll[data-to=photo] > div > div> div > div');
					for (let i = 0; i < 5; i++) {
						to2[i]["lastChild"]["lastChild"].setAttribute('style', 'width: 144px; height: 96px;');
					}
					setPopout(null);
				});
			} else {
				let to = document.querySelector('.Select__el[data-to=album]');
				to.setAttribute('disabled', '');
				to.parentNode.classList.add('Select--disabled');
				to.value = 0;
				to["offsetParent"]["childNodes"][1]["childNodes"][0].innerHTML = 'Выберите альбом';
				let to2 = document.querySelectorAll('.CardScroll[data-to=photo] > div > div> div > div');
				for (let i = 0; i < 5; i++) {
					to2[i]["lastChild"]["lastChild"].setAttribute('style', 'width: 144px; height: 96px;');
				}
				setPopout(null);
			}
		}
		if (from === 'album') {
			let value = document.querySelector('.Select__el[data-to=group]').value;
			let album = document.querySelector('.Select__el[data-to=album]').value;
			setPopout(<ScreenSpinner size='large' />);
			bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":value, "album_id":album, "count":50, "v":version, "access_token":access_token}}).then(data => {
				let to = document.querySelectorAll('.CardScroll[data-to=photo] > div > div> div > div');
				for (let i = 0; i < 5; i++) {
					to[i]["lastChild"]["lastChild"].setAttribute('style', 'width: 144px; height: 96px;');
				}
				for (let i = 0; i < data.response.items.length && i < 5; i++) {
					to[i]["lastChild"]["lastChild"].setAttribute('style', 'width: 144px; height: 96px; background-size: cover; background-position: center; background-repeat: no-repeat; background-image: url('+data.response.items[i].sizes[data.response.items[i].sizes.length-1].url+');');
				}
				setPopout(null);
			}).catch(error => {
				let to = document.querySelectorAll('.CardScroll[data-to=photo] > div > div> div > div');
				for (let i = 0; i < 5; i++) {
					to[i]["lastChild"]["lastChild"].setAttribute('style', 'width: 144px; height: 96px;');
				}
				setPopout(null);
			});
		}
	}
	return (
		<View activePanel={activePanel} popout={popout} >
			<Home id='home' go={go} GoVKBridge={GoVKBridge} GoVKPhotoSave={GoVKPhotoSave} />
			<VKBridge id='VKBridge' go={go} fetchedUser={fetchedUser} GroupsGet={GroupsGet} PhotosGetAlbums={PhotosGetAlbums} FriendsGet={FriendsGet} />
			<VKPhotoSave id='VKPhotoSave' go={go} fetchedUser={fetchedUser} GroupsGet={GroupsGet} PhotosGetAlbums={PhotosGetAlbums} FriendsGet={FriendsGet} update={update} goSave={goSave} />
		</View>
	);
}

export default App;