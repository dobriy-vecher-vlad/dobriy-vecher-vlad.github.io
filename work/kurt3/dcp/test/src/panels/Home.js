import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

const Home = ({ id, go }) => (
	<Panel id={id}>
		<Div className="d-flex logo" style={{textAlign: 'center', color: '#FFF', fontSize: '2em', textShadow: '0.1em 0.1em 0em rgba(0, 0, 0, 0.25)'}}>
			<span className="icon-logo" style={{fontSize: '1em'}}></span>  К У Р Т
		</Div>
		<Div className="description">
			<span className="header">Заголовок</span>
			Очень длинное описание чего-либо.
			Очень длинное описание чего-либо.
			Очень длинное описание чего-либо.
			Очень длинное описание чего-либо.
			Очень длинное описание чего-либо.
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" level="commerce" onClick={go} data-to="GoToTest1">
					Начать тест
				</Button>
			</Div>
			<Div className="description">
				<span className="header">Быстрый переход для разработки</span>
				<Div className="d-flex">
					<Button size="l" level="outline" onClick={go} data-to="GoToTest1" style={{ marginRight: 16 }}>1</Button>
					<Button size="l" level="outline" onClick={go} data-to="GoToTest2" style={{ marginRight: 16 }}>2</Button>
					<Button size="l" level="outline" onClick={go} data-to="GoToTest3" style={{ marginRight: 16 }}>3</Button>
					<Button size="l" level="outline" onClick={go} data-to="GoToTest4">4</Button>
				</Div>
				<Div className="d-flex">
					<Button size="l" level="outline" onClick={go} data-to="GoToTestPreEnd">
						Панель с выбором места обучения
					</Button>
				</Div>
				<Div className="d-flex">
					<Button size="l" level="outline" onClick={go} data-to="GoToTestEnd">
						Панель с ответом
					</Button>
				</Div>
			</Div>
		</Div>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Home;