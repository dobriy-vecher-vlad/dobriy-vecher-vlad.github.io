import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();

const GoToTestEnd = ({ id, go, checked }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </HeaderButton>}
		>
			Результат
		</PanelHeader>
		<Div className="description">
			<span className="header">Итог теста</span>
			Ваш ключ ответов: {checked}
		</Div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" level="outline" onClick={go} data-to="GoToTest1">
					Заново
				</Button>
			</Div>
			<Div className="d-flex">
				<Button size="l" level="outline" onClick={go} data-to="home">
					Завершить
				</Button>
			</Div>
		</Div>
	</Panel>
);

GoToTestEnd.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	checked: PropTypes.func.isRequired,
};

export default GoToTestEnd;