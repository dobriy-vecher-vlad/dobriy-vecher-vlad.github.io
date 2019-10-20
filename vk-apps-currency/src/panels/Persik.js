import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon24Smile from '@vkontakte/icons/dist/24/smile';

import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import persik from '../img/persik.png';
import './Persik.css';

const osName = platform();

const Persik = ({ id, go, fetchedUser, next }) => (
	<Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Persik
		</PanelHeader>
		{fetchedUser &&
		<Group title="User Data Fetched with VK Connect">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
			<Separator style={{ margin: '12px 0' }} />
			<Cell before={<Icon24Globe />}>Занят домен: {`${fetchedUser.domain}`}</Cell>
			<Cell before={<Icon24Users />}>Подписчиков: {`${fetchedUser.followers_count}`}</Cell>
			<Cell before={<Icon24Phone />}>Номер телефона: {`${fetchedUser.mobile_phone}`}</Cell>
			<Cell before={<Icon24Smile />}>День рождения: {`${fetchedUser.bdate}`}</Cell>
		</Group>}
	</Panel>
);

Persik.propTypes = {
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
		domain: PropTypes.string,
		followers_count: PropTypes.string,
		mobile_phone: PropTypes.string,
		bdate: PropTypes.string,
	}),
};

export default Persik;