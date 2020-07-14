import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';

const Page = ({ id, go, GoVKBridge }) => (
	<Panel id={id}>
		<PanelHeader 
			left={<PanelHeaderButton onClick={GoVKBridge} data-to="VKBridge">{<Icon28LogoVkOutline />}</PanelHeaderButton>} 
		>
			Main
		</PanelHeader>
		<FormLayout>
			<Checkbox>Я долбоёб</Checkbox>
		</FormLayout>
	</Panel>
);

export default Page;