import React, { useState } from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import GoToTest1 from './panels/GoToTest1';
import GoToTest2 from './panels/GoToTest2';
import GoToTest3 from './panels/GoToTest3';
import GoToTest4 from './panels/GoToTest4';
import GoToTestPreEnd from './panels/GoToTestPreEnd';
import GoToTestEnd from './panels/GoToTestEnd';

import './panels/Style.css';
let checked = '';
const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
		checked = '';
	};
	const next = e => {
		try {
			var check = document.querySelector('input[name="radio"]:checked').value;
			checked += check;
			console.warn(checked);
			setActivePanel(e.currentTarget.dataset.to);
			document.querySelector('button[name="next"]').setAttribute('style', 'opacity:.5; pointer-events: none;');
		} catch(err) {}
	};
	const setCheck = e => {
		try {
			document.querySelector('button[name="next"]').setAttribute('style', 'opacity:1; pointer-events: auto;');
		} catch(err) {}
	};
	return (
		<View activePanel={activePanel}>
			<Home id='home' go={go} />
			<GoToTest1 id='GoToTest1' go={go} next={next} setCheck={setCheck} />
			<GoToTest2 id='GoToTest2' go={go} next={next} setCheck={setCheck} />
			<GoToTest3 id='GoToTest3' go={go} next={next} setCheck={setCheck} />
			<GoToTest4 id='GoToTest4' go={go} next={next} setCheck={setCheck} />
			<GoToTestPreEnd id='GoToTestPreEnd' go={go} next={next} setCheck={setCheck}/>
			<GoToTestEnd id='GoToTestEnd' go={go} checked={checked} />
		</View>
	);
}

export default App;