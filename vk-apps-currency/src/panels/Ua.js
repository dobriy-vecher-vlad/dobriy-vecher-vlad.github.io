import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import ua from '../img/ua.png';
import './Persik.css';

const osName = platform();

const Ua = ({ id, go }) => (
	<Panel id={id} theme="white">
		<PanelHeader left={<HeaderButton onClick={go} data-to="home">{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}>
			Ua
		</PanelHeader>
		<FormLayout>
			<FormStatus>
				<img className="Persik" src={ua} alt="Ua"/>
				<Div style={{textAlign: 'center', color: 'var(--text_secondary)'}}>Это всемогущий Юа,<br/>держи и не теряй</Div>
				<Div><Button size="xl" level="commerce">Спасибо!</Button></Div>
			</FormStatus>
		</FormLayout>
	</Panel>
);

Ua.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Ua;