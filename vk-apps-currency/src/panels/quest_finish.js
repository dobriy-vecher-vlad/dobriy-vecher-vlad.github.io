import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import View from '@vkontakte/vkui/dist/components/View/View';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

const QuestFinish = ({ id, go, checked }) => (
	<Panel id={id} theme="white">
		<PanelHeader left={<HeaderButton onClick={go} data-to="home">{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}>
			VK Test » Finish
		</PanelHeader>
		<FormLayout>
			<FormStatus title={<b>Итог</b>}>
				Ваш результат: {checked}
			</FormStatus>
		</FormLayout>
		<Div>
			<Button size="xl" onClick={go} data-to="quest1" level="secondary">Заново</Button>
			<Button size="xl" onClick={go} data-to="home" level="tertiary">Завершить</Button>
		</Div>
	</Panel>
);


QuestFinish.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	checked: PropTypes.func.isRequired,
};

export default QuestFinish;