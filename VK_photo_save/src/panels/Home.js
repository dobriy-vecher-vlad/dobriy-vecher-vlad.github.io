import React from 'react';
import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import { Panel, PanelHeader, PanelHeaderButton, Group, List, Cell } from '@vkontakte/vkui/';

const Page = ({ id, go, GoVKBridge, GoVKPhotoSave }) => (
	<Panel id={id}>
		<PanelHeader 
			left={<PanelHeaderButton onClick={go}>{<Icon28LogoVkOutline />}</PanelHeaderButton>} 
		>
			Main
		</PanelHeader>
		<Group>
			<List>
				<Cell expandable before={<Icon28BrainOutline />} onClick={GoVKBridge} data-to="VKBridge">VK Bridge</Cell>
				<Cell expandable before={<Icon28CameraOutline />} onClick={GoVKPhotoSave} data-to="VKPhotoSave">VK Photo Save</Cell>
			</List>
		</Group>
	</Panel>
);

export default Page;