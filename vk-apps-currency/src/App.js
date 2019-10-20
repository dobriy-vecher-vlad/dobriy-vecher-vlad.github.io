import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
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
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
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
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' go={go} next={next} />
			
			<Quest1 id='quest1' go={go} next={next} setCheck={setCheck} />
			<Quest2 id='quest2' go={go} next={next} setCheck={setCheck} />
			<Quest3 id='quest3' go={go} next={next} setCheck={setCheck} />
			<Quest4 id='quest4' go={go} next={next} setCheck={setCheck} />
			<QuestFinish id='quest_finish' go={go} checked={checked} />
			
			<Persik id='persik' fetchedUser={fetchedUser} go={go} next={next} />
			<Ua id='ua' go={go} next={next} />
		</View>
	);
}

export default App;