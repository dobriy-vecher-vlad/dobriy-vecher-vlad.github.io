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
import './Persik.css';

const osName = platform();

const Quest2 = ({ id, go, next, setCheck }) => (
	<Panel name="head" id={id} theme="white">
		<PanelHeader left={<HeaderButton onClick={go} data-to="home">{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}>
			VK Test » 2
		</PanelHeader>
		<Group>
		  <Gallery slideWidth="90%" style={{ height: 150 }} bullets="dark">
			<div style={{ backgroundColor: 'var(--destructive)' }} />
			<div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
			<div style={{ backgroundColor: 'var(--accent)' }} />
		  </Gallery>
		</Group>
		<FormLayout>
			<FormStatus title={<b>Вопрос</b>}>
				Очень длинное описание возможных вариантов ответа в данном тесте?
			</FormStatus>
		</FormLayout>
		<FormLayoutGroup>
			<Radio name="radio" onClick={setCheck} value="1" description="Дополнительное описание ответа, если необходимо.">Первый</Radio>
			<Radio name="radio" onClick={setCheck} value="2" description="Дополнительное описание ответа, если необходимо.">Второй</Radio>
			<Radio name="radio" onClick={setCheck} value="3" description="Дополнительное описание ответа, если необходимо.">Третий</Radio>
			<Radio name="radio" onClick={setCheck} value="4" description="Дополнительное описание ответа, если необходимо.">Четвёртый</Radio>
		</FormLayoutGroup>
		<Div>
			<Button style={{opacity: .5, pointerEvents: 'none'}} name="next" size="xl" onClick={next} data-to="quest3" level="secondary">Следующий вопрос</Button>
			<Button size="xl" onClick={go} data-to="home" level="tertiary">Завершить</Button>
		</Div>
	</Panel>
);

Quest2.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	setCheck: PropTypes.func.isRequired,
};

export default Quest2;