import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();

const GoToTest4 = ({ id, go, next, setCheck }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </HeaderButton>}
		>
			Вопрос 4 из 20
		</PanelHeader>
		<Div className="description">
			<span className="header">Заголовок</span>
			Очень длинное описание чего-либо.
			<br/>
			Очень длинное описание чего-либо.
			<br/>
			Очень длинное описание чего-либо.
			<br/>
			Очень длинное описание чего-либо.
			<br/>
			Очень длинное описание чего-либо.
		</Div>
		<Div className="description">
			<Radio name="radio" onClick={setCheck} value="1" description="Дополнительное описание ответа, если необходимо.">Первый</Radio>
			<Radio name="radio" onClick={setCheck} value="2" description="Дополнительное описание ответа, если необходимо.">Второй</Radio>
			<Radio name="radio" onClick={setCheck} value="3" description="Дополнительное описание ответа, если необходимо.">Третий</Radio>
			<Radio name="radio" onClick={setCheck} value="4" description="Дополнительное описание ответа, если необходимо.">Четвёртый</Radio>
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" style={{opacity: .5, pointerEvents: 'none'}} name="next" level="outline" onClick={next} data-to="GoToTestPreEnd">
					Следующий вопрос
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="l" level="secondary" onClick={go} data-to="home">
					Завершить
				</Button>
			</Div>
		</Div>
	</Panel>
);

GoToTest4.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	setCheck: PropTypes.func.isRequired,
};

export default GoToTest4;