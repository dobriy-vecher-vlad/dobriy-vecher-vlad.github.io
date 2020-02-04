import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import gonvlad from '../img/gonvlad.png';
const Home = ({ id, go }) => (
	<Panel id={id}>
		<Div className="d-flex logo" style={{textAlign: 'center', color: '#FFF', fontSize: '2em', textShadow: '0.1em 0.1em 0em rgba(0, 0, 0, 0.25)'}}>
			<span className="icon-logo" style={{fontSize: '1em'}}></span>  К У Р Т
		</Div>
		<Div className="description">
			<span className="header">Ты кто?</span>
			А может ты?
			<img src={gonvlad} alt="GonVlad" />
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" level="commerce" onClick={go} data-to="GoToTest1">
					Начать тестирование
				</Button>
			</Div>
			<Div className="description">
				<span className="header">Быстрый переход для разработки</span>
				Сборка 04.02.2020
				<Div className="d-flex">
					<Button size="l" level="outline" onClick={go} data-to="GoToTestPreEnd">
						Выбор места обучения
					</Button>
				</Div>
				<Div className="d-flex">
					<Button size="l" level="outline" onClick={go} data-to="GoToTestEnd">
						Результат
					</Button>
				</Div>
			</Div>
		</Div>
	</Panel>
);
export default Home;