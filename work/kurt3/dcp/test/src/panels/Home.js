import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
const Home = ({ id, go }) => (
	<Panel id={id}>
		<Div className="d-flex logo" style={{textAlign: 'center', color: '#FFF', fontSize: '2em', textShadow: '0.1em 0.1em 0em rgba(0, 0, 0, 0.25)'}}>
			<span className="icon-logo" style={{fontSize: '1em'}}></span>  К У Р Т
		</Div>
		<Div className="description">
			<span className="header">Здрастье всем, привет всем!</span>
			Купил мужик шляпу. Переворачивает, а там мужик грустный. Первый мужик спрашивает у второго:
			<br/>- Ты чего такой грустный?
			<br/>- Да вот, купил шляпу, а она мне велика.
			<br/><br/>«Зато мне, наверное, будет как раз» - подумал мужик, но вслух говорить не стал, чтобы не обидеть второго мужика.
		</Div>
		<Div className="description">
			Сборка 09.02.2020
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" level="commerce" onClick={go} data-to="GoToTest1">
					Начать тестирование
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="l" level="secondary" onClick={go} data-to="GoToTestMy">
					Мои результаты тестирования
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="l" level="secondary" onClick={go} data-to="GoToTestTop">
					Недавно прошли тестирование
				</Button>
			</Div>
		</Div>
	</Panel>
);
export default Home;