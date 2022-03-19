import React from 'react';
import { platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { Panel, PanelHeader, PanelHeaderButton, Group, Avatar, Card, CardScroll, Banner, Div, Button, FormLayoutGroup, Select, FormLayout } from '@vkontakte/vkui/';

const osName = platform();
const Page = ({ id, go, fetchedUser, GroupsGet, PhotosGetAlbums, FriendsGet, update, goSave }) => (
	<Panel id={id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
			VK Photo Save
		</PanelHeader>
		<Group>
			<Banner
				before={fetchedUser.photo_200 ? <Avatar size={48} src={fetchedUser.photo_200}/> : null}
				header={`${fetchedUser.first_name} ${fetchedUser.last_name}, привет!`}
				subheader="Данный раздел позволяет взаимодействовать с альбомами и фотографиями в них."
			/>
		</Group>
		<FormLayout>
			<FormLayoutGroup top="Группа">
				<Select placeholder="Выберите группу" onChange={update} name="group">
					{GroupsGet.items.map(group =>
						<option key={-group.id} value={-group.id} name="group">{group.name}</option>)
					}
				</Select>
			</FormLayoutGroup>
			<FormLayoutGroup top="Альбом">
				<Select placeholder="Выберите альбом" onChange={update} name="album"></Select>
			</FormLayoutGroup>
			<FormLayoutGroup top="Фотографии">
				<CardScroll data-to="photo">
					<Card size="s">
						<div style={{ width: 144, height: 96 }} />
					</Card>
					<Card size="s">
						<div style={{ width: 144, height: 96 }} />
					</Card>
					<Card size="s">
						<div style={{ width: 144, height: 96 }} />
					</Card>
					<Card size="s">
						<div style={{ width: 144, height: 96 }} />
					</Card>
					<Card size="s">
						<div style={{ width: 144, height: 96 }} />
					</Card>
				</CardScroll>
			</FormLayoutGroup>
		</FormLayout>
		<Div>
			<Button size="xl" stretched mode="commerce" onClick={goSave} data="save">Сохранить</Button>
		</Div>
	</Panel>
);

export default Page;