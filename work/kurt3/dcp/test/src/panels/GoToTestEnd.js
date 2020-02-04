import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();
const GoToTest = ({ id, go, checked, answers, score }) => (
	<Panel id={id}>
		<Div className="header">
			<span className="button">{<HeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </HeaderButton>}</span>
			Результат тестирования
		</Div>
		<Div className="description">
			<span className="header">Ваш ключ ответов</span>
			{checked}
		</Div>
		<Div className="description">
			<span className="header">{answers[0].head}</span>
			{answers[0].body}
			<br/><br/>
			<span className="header">{score[0].score} {score[0].value}</span>
			<span className="header">{score[0].title}</span>
		</Div>
		<Div className="description">
			<span className="header">{answers[1].head}</span>
			{answers[1].body}
			<br/><br/>
			<span className="header">{score[1].score} {score[1].value}</span>
			<span className="header">{score[1].title}</span>
		</Div>
		<Div className="description">
			<span className="header">{answers[2].head}</span>
			{answers[2].body}
			<br/><br/>
			<span className="header">{score[2].score} {score[2].value}</span>
			<span className="header">{score[2].title}</span>
		</Div>
		<Div className="description">
			<span className="header">{answers[3].head}</span>
			{answers[3].body}
			<br/><br/>
			<span className="header">{score[3].score} {score[3].value}</span>
			<span className="header">{score[3].title}</span>
		</Div>
		<Div className="description">
			<span className="header">{answers[4].head}</span>
			{answers[4].body}
			<br/><br/>
			<span className="header">{score[4].score} {score[4].value}</span>
			<span className="header">{score[4].title}</span>
		</Div>
		<Div className="description">
			<span className="header">{answers[5].head}</span>
			{answers[5].body}
			<br/><br/>
			<span className="header">{score[5].score} {score[5].value}</span>
			<span className="header">{score[5].title}</span>
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" level="outline" onClick={go} data-to="GoToTest1">
					Пройти тестирование заново
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="l" level="outline" onClick={go} data-to="home">
					Вернуться на главный экран
				</Button>
			</Div>
		</Div>
	</Panel>
);
export default GoToTest;