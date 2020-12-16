import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
const Home = ({ id, go }) => (
	<Panel id={id}>
		<Div className="d-flex logo" style={{textAlign: 'left', color: '#FFF', fontSize: '2em', textShadow: '0.1em 0.1em 0em rgba(0, 0, 0, 0.25)'}}>
			<span className="icon-logo" style={{fontSize: '1em', marginRight: '20px'}}></span>К В О К<br/>&  К У Р Т
		</Div>
		<Div className="description">
			<span className="header">Привет!</span>
			<b>КВОК</b> – это проект по ранней профориентации обучающихся 8-9 классов, студентов и выпускников ОО, который дает возможность выстроить свою карьеру в г. Каменск-Уральский.
			<br/><br/><b>Методика</b> проекта основана на навыке свободного выбора: проект не отвечает на вопрос <i>«Кем быть?»</i>, а дает заинтересованным лицам возможность лучше понять себя и определиться со своими интересами, степени готовности к выбору профессионального пути.
			<br/><br/>Этот тест <b>определит</b> твои способности и интересы и поможет в выборе будущей профессии и специальности и дальнейшего трудоустройства. 
		</Div>
		<Div className="description">
			Сборка 16.03.2020
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="m" mode="commerce" onClick={go} data-to="GoToTest1">
					Начать тестирование
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="m" mode="secondary" onClick={go} data-to="GoToTestMy">
					Мои результаты тестирования
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="m" mode="secondary" onClick={go} data-to="GoToTestTop">
					Недавно прошли тестирование
				</Button>
			</Div>
		</Div>
	</Panel>
);
export default Home;