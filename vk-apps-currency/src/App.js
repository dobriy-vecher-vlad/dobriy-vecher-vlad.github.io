import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import UserDataTest from './panels/UserDataTest';
import Ua from './panels/Ua';

import Quest1 from './panels/quest1';
import Quest2 from './panels/quest2';
import Quest3 from './panels/quest3';
import Quest4 from './panels/quest4';
import QuestFinish from './panels/quest_finish';

var checked = '';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		checked = '';
	};
	const next = e => {
		var check = document.querySelector('input[name="radio"]:checked').value;
		checked += check;
		console.warn(checked);
		setActivePanel(e.currentTarget.dataset.to);
		document.querySelector('button[name="next"]').setAttribute('style', 'opacity:.5; pointer-events: none;');
	};
	const setCheck = e => {
		document.querySelector('button[name="next"]').setAttribute('style', 'opacity:1; pointer-events: auto;');
		var prc = (100/4);
		var width_check = document.querySelector('.Progress').getAttribute('index')*prc > 100 ? 100 : document.querySelector('.Progress').getAttribute('index')*prc;
		document.querySelector('.Progress__in').setAttribute('style', 'width: '+width_check+'%;');
		
	};
	const changeTheme = e => {
		var nametheme = document.querySelector('body').getAttribute('scheme') == null ? "space_gray" : document.querySelector('body').getAttribute('scheme') == "space_gray" ? "bright_light" : "space_gray";
		document.querySelector('body').setAttribute('scheme', nametheme);
	};
	
	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' go={go} next={next} changeTheme={changeTheme} />
			
			<Quest1 id='quest1' go={go} next={next} setCheck={setCheck} />
			<Quest2 id='quest2' go={go} next={next} setCheck={setCheck} />
			<Quest3 id='quest3' go={go} next={next} setCheck={setCheck} />
			<Quest4 id='quest4' go={go} next={next} setCheck={setCheck} />
			<QuestFinish id='quest_finish' go={go} checked={checked} />
			
			<UserDataTest id='userdatatest' fetchedUser={fetchedUser} go={go} />
			
			<Ua id='ua' go={go} next={next} />
		</View>
	);
}

export default App;