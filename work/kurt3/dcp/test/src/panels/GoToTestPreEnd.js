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

const GoToTestEnd = ({ id, go, next, setCheck }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </HeaderButton>}
		>
			Место обучения
		</PanelHeader>
		<Div className="description">
			<span className="header">Где бы Вы хотели учиться?</span>
			Выберите учебное заведение города по вашему вкусу и система сама подберёт Вам профессию по выбранным вариантам ответов.
			<br/><br/>
			После выбора Вам станет доступен ключ ответов.
		</Div>
		<Div className="description">
			<Radio name="radio" onClick={setCheck} value="1" description="Каменск-Уральский Радиотехнический Техникум">Конечно КУРТ!</Radio>
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" style={{opacity: .5, pointerEvents: 'none'}} name="next" level="outline" onClick={next} data-to="GoToTestEnd">
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

GoToTestEnd.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	setCheck: PropTypes.func.isRequired,
};

export default GoToTestEnd;