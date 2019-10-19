import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import View from '@vkontakte/vkui/dist/components/View/View';

const Home = ({ id, go, next }) => (
	<View activePanel={id}>
		<Panel id={id} theme="white">
			<PanelHeader>VK Test</PanelHeader>
			<Div>
				<Button size="xl" onClick={go} data-to="quest1" level="secondary">Button to Quest 1</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="quest2" level="secondary">Button to Quest 2</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="quest3" level="secondary">Button to Quest 3</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="quest4" level="secondary">Button to Quest 4</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="quest_finish" level="secondary">Button to Quest Finish</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="persik" level="secondary">Button to Persik</Button>
			</Div>
			<Div>
				<Button size="xl" onClick={go} data-to="ua" level="secondary">Button to Ua</Button>
			</Div>
		</Panel>
	</View>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	next: PropTypes.func.isRequired,
};

export default Home;