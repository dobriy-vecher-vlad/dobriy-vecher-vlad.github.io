import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS } from '@vkontakte/vkui';
const osName = platform();
const GoToTest = ({ id, go, data_users }) => (
	<Panel id={id}>
		<Div className="header">
			<span className="button">{<HeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </HeaderButton>}</span>
			Прошедшие тестирование
		</Div>
		<Div className="description" dangerouslySetInnerHTML={data_users} />
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="l" level="secondary" onClick={go} data-to="home">
					Вернуться на главный экран
				</Button>
			</Div>
		</Div>
	</Panel>
);
export default GoToTest;