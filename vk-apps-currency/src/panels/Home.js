import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import View from '@vkontakte/vkui/dist/components/View/View';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormStatus from '@vkontakte/vkui/dist/components/FormStatus/FormStatus';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import Icon12OnlineVkmobile from '@vkontakte/icons/dist/12/online_vkmobile';

const Home = ({ id, go, next, changeTheme }) => (
	<View activePanel={id}>
		<Panel id={id} theme="white">
			<PanelHeader>
				<PanelHeaderContent status={<Icon12OnlineVkmobile/>} onClick={changeTheme}>
				VK Test
            </PanelHeaderContent>
			</PanelHeader>
			<FormLayout>
				<FormStatus title={<b>Квест</b>}>
					Тестовый квест, собирающий ответы пользователей с итогом всех ответов.
				</FormStatus>
			</FormLayout>
			<Div style={{display: 'flex'}}>
				<Button stretched style={{ marginRight: 8 }} size="xl" onClick={go} data-to="quest1" level="commerce">1</Button>
				<Button stretched style={{ marginRight: 8 }} size="xl" onClick={go} data-to="quest2" level="commerce">2</Button>
				<Button stretched style={{ marginRight: 8 }} size="xl" onClick={go} data-to="quest3" level="commerce">3</Button>
				<Button stretched size="xl" onClick={go} data-to="quest4" level="commerce">4</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="quest_finish" level="primary">Quest Finish</Button>
			</Div>
			<Separator style={{ margin: '12px 0' }} />
			<FormLayout>
				<FormStatus title={<b>User Data</b>}>
					Метод, собирающий общую информацию пользователя.
				</FormStatus>
			</FormLayout>
			<Div>
				<Button size="xl" onClick={go} data-to="userdatatest" level="primary">User Data</Button>
			</Div>
			<Separator style={{ margin: '12px 0' }} />
			<FormLayout>
				<FormStatus title={<b>IMG and CSS</b>}>
					Окно, с рабочими стилями и картинками.
				</FormStatus>
			</FormLayout>
			<Div>
				<Button size="xl" onClick={go} data-to="ua" level="primary">IMG Test</Button>
			</Div>
			<Separator style={{ margin: '12px 0' }} />
			<Div>
				<Button size="xl" component="a" target="_blank" href="https://vk.com/xolova" level="tertiary">Oleg Davydov</Button>
			</Div>
		</Panel>
	</View>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
	changeTheme: PropTypes.func.isRequired,
};

export default Home;