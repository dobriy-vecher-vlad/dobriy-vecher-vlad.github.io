import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import VKBridge from './panels/VKBridge';

//let url = 'https://vk.com/foaf.php?id=153968505';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedToken, setToken] = useState(null);
	const [fetchedUser, setUser] = useState(null);
	const [GroupsGet, setGroupsGet] = useState(null);
	const [PhotosGetAlbums, setPhotosGetAlbums] = useState(null);
	const [FriendsGet, setFriendsGet] = useState(null);

	const [popout, setPopout] = useState(null);
	let version = "5.107";

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			console.log(type); console.log(data);
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
			bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "friends,photos,video,pages,status,notes,wall,docs,groups,stats,market"}).then(data => {
				let access_token = data.access_token;
				bridge.send("VKWebAppCallAPIMethod", {"method": "groups.get", "request_id": "groups.get", "params": {"user_id":id, "extended":1, "count":100, "fields":"members_count", "v":version, "access_token":access_token}}).then(data => {
					bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":access_token}}).then(data => {
						bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "request_id": "friends.get", "params": {"user_id":id, "count":100, "fields":"photo_200_orig", "v":version, "access_token":access_token}}).then(data => {
							setActivePanel('VKBridge');
							setPopout(null);
						})
					})
				})
			})
		})
	};
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' go={go} GoVKBridge={GoVKBridge} />
			<VKBridge id='VKBridge' go={go} fetchedUser={fetchedUser} GroupsGet={GroupsGet} PhotosGetAlbums={PhotosGetAlbums} FriendsGet={FriendsGet} />
		</View>
	);
}

export default App;

