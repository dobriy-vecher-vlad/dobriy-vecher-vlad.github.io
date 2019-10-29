import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Smile from '@vkontakte/icons/dist/24/smile';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Locate from '@vkontakte/icons/dist/24/locate';

import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const osName = platform();

const UserDataTest = ({ id, go, fetchedUser, next }) => (
	<Panel id={id}>
		<PanelHeader left={<HeaderButton onClick={go} data-to="home">{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}>
			User Data Test
		</PanelHeader>
		{fetchedUser &&
		<Group title="VK Connect">
			<Cell description="Имя, фамилия" before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}>{`${fetchedUser.first_name} ${fetchedUser.last_name}`}</Cell>
			<Separator style={{ margin: '12px 0' }} />
			<Cell description="Занятый ID" before={<Icon24Globe />}>{fetchedUser.id}</Cell>
			<Cell description="Страна, город" before={<Icon24Home />}>{fetchedUser.country && fetchedUser.country.title ? fetchedUser.country.title : ''}, {fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}</Cell>
			<Cell description="Временная зона" before={<Icon24Locate />}>ID {fetchedUser.timezone}</Cell>
			<Cell description="День рождения" before={<Icon24Smile />}>{fetchedUser.bdate}</Cell>
		</Group>}
	</Panel>
);

UserDataTest.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
		country: PropTypes.shape({
			title: PropTypes.string,
		}),
		id: PropTypes.string,
		timezone: PropTypes.string,
		bdate: PropTypes.string,
	}),
};

export default UserDataTest;