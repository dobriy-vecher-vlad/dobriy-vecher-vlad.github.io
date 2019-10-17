import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

import View from '@vkontakte/vkui/dist/components/View/View';

import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';


import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Slider from '@vkontakte/vkui/dist/components/Slider/Slider';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import List from '@vkontakte/vkui/dist/components/List/List';
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';

import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import { platform, IOS } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();


const Home = ({ id, go }) => (
	<View activePanel={id}>
		<Panel id={id} theme="white">
		
		
			<PanelHeader>VK Test</PanelHeader>
			
			
			<Group>
              <Gallery
                slideWidth="90%"
                style={{ height: 150 }}
                bullets="dark"
              >
                <div style={{ backgroundColor: 'var(--destructive)' }} />
                <div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
                <div style={{ backgroundColor: 'var(--accent)' }} />
              </Gallery>
            </Group>
			
			
			<Group>
				<Tabs>
					<Div>
					Очень длинное описание возможных вариантов ответа в данном тесте.
					</Div>
				</Tabs>
			</Group>
			
			
			<FormLayoutGroup>
				<Radio name="radio" value="1" description="Дополнительное описание ответа, если необходимо.">Первый</Radio>
				<Radio name="radio" value="2" description="Дополнительное описание ответа, если необходимо.">Второй</Radio>
				<Radio name="radio" value="3" description="Дополнительное описание ответа, если необходимо.">Третий</Radio>
				<Radio name="radio" value="4" description="Дополнительное описание ответа, если необходимо.">Четвёртый</Radio>
			</FormLayoutGroup>
			
			
			<Div>
				<Button size="xl" onClick={go} data-to="persik" level="secondary">Следующий вопрос</Button>
				<Button size="xl" onClick={go} data-to="ua" level="tertiary">Дополнительная информация</Button>
			</Div>
			
			
		</Panel>
	</View>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};
export default Home;
