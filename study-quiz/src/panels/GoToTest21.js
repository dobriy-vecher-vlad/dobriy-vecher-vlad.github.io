import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();
const GoToTest = ({ id, go, next, setCheck, question }) => (
	<Panel id={id}>
		<Div className="header">
			<span className="button">{<PanelHeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </PanelHeaderButton>}</span>
			Вопрос 21 из 24
		</Div>
		<Div className="description">
			<span className="header">Вопрос</span>
			{question.question}
		</Div>
		<Div className="description">
			<Radio name="radio" onClick={setCheck} value="1" description={Object.values(question.answers)[0]}>{Object.keys(question.answers)[0]}</Radio>
			<Radio name="radio" onClick={setCheck} value="2" description={Object.values(question.answers)[1]}>{Object.keys(question.answers)[1]}</Radio>
			<Radio name="radio" onClick={setCheck} value="3" description={Object.values(question.answers)[2]}>{Object.keys(question.answers)[2]}</Radio>
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="m" style={{opacity: .5, pointerEvents: 'none'}} name="next" mode="outline" onClick={next} data-to="GoToTest22">
					Следующий вопрос
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="m" mode="secondary" onClick={go} data-to="home">
					Завершить тестирование
				</Button>
			</Div>
		</Div>
	</Panel>
);
export default GoToTest;