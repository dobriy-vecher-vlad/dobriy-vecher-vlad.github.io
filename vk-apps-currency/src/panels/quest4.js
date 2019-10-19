import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import View from '@vkontakte/vkui/dist/components/View/View';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

const Quest4 = ({ id, go, next }) => (
	<Panel id={id} theme="white">
		<PanelHeader left={<HeaderButton onClick={go} data-to="home">{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}>
			VK Test » 4
		</PanelHeader>
		<Group>
		  <Gallery slideWidth="90%" style={{ height: 150 }} bullets="dark">
			<div style={{ backgroundColor: 'var(--destructive)' }} />
			<div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
			<div style={{ backgroundColor: 'var(--accent)' }} />
		  </Gallery>
		</Group>
		<FormLayoutGroup>
			<FormStatus title="Вопрос">
				Очень длинное описание возможных вариантов ответа в данном тесте?
			</FormStatus>
		</FormLayoutGroup>
		<FormLayoutGroup>
			<Radio name="radio" value="1" description="Дополнительное описание ответа, если необходимо.">Первый</Radio>
			<Radio name="radio" value="2" description="Дополнительное описание ответа, если необходимо.">Второй</Radio>
			<Radio name="radio" value="3" description="Дополнительное описание ответа, если необходимо.">Третий</Radio>
			<Radio name="radio" value="4" description="Дополнительное описание ответа, если необходимо.">Четвёртый</Radio>
		</FormLayoutGroup>
		<Div>
			<Button size="xl" onClick={next} data-to="quest_finish" level="secondary">Следующий вопрос</Button>
			<Button size="xl" onClick={go} data-to="quest_finish" level="tertiary">Дополнительная информация</Button>
		</Div>
	</Panel>
);


Quest4.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
};

export default Quest4;