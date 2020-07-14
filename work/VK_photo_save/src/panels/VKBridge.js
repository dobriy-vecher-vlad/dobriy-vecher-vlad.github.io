import React from 'react';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Card from '@vkontakte/vkui/dist/components/Card/Card';
import CardGrid from '@vkontakte/vkui/dist/components/CardGrid/CardGrid';
import Gradient from '@vkontakte/vkui/dist/components/Gradient/Gradient';
import Link from '@vkontakte/vkui/dist/components/Link/Link';
import CardScroll from '@vkontakte/vkui/dist/components/CardScroll/CardScroll';

import './fix.css';

const osName = platform();
const Page = ({ id, go, fetchedUser, GroupsGet, PhotosGetAlbums, FriendsGet }) => (
	<Panel id={id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</PanelHeaderButton>}
		>
			VK Bridge
		</PanelHeader>
		{fetchedUser &&
			<Gradient>
				<Group header={
					<Header
						subtitle={'Родился '+fetchedUser.bdate+', занятый ID '+fetchedUser.id+'.'}
					>
						Профиль
					</Header>
				}>
					<Cell
						style={{ paddingBottom: 20 }}
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
						description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
						expandable
						target='_blank' href={'https://vk.com/id'+fetchedUser.id}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>
			</Gradient>
		}
		{FriendsGet &&
			<Gradient>
				<Group header={
					<Header
						subtitle={'Всего '+FriendsGet.count+' друзей.'}
					>
						Друзья
					</Header>
				}>
					<CardScroll style={{ paddingBottom: 20 }}>
						{FriendsGet.items.map(frend => 
							<Card 
								mode="outline"
								size="s"
								key={frend.id}
							>
								<a 
									style={{ 
										display: 'block',
										height: 100,
										width: 150,
										backgroundImage: 'url('+frend.photo_200_orig+')',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}
									target='_blank' href={'https://vk.com/id'+frend.id}
								>
									<div className="photos_album_title_wrap">
										<div className="photos_album_title">{frend.first_name} {frend.last_name}</div>
									</div>
								</a>
							</Card>)
						}
					</CardScroll>
				</Group>
			</Gradient>
		}
		{GroupsGet &&
			<Gradient>
				<Group header={
					<Header
						subtitle={'Всего '+GroupsGet.count+' сообществ.'}
					>
						Сообщества
					</Header>
				}>
					<CardScroll style={{ paddingBottom: 20 }}>
						{GroupsGet.items.map(group => 
							<Card 
								mode="outline"
								size="s"
								key={group.id}
							>
								<a 
									style={{ 
										display: 'block',
										height: 100,
										width: 150,
										backgroundImage: 'url('+group.photo_200+')',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}
									target='_blank' href={'https://vk.com/'+group.screen_name}
								>
									<div className="photos_album_title_wrap">
										<div className="photos_album_counter">{group.members_count}</div>
										<div className="photos_album_title">{group.name}</div>
									</div>
								</a>
							</Card>)
						}
					</CardScroll>
				</Group>
			</Gradient>
		}
		{PhotosGetAlbums &&
			<Gradient>
				<Group header={
					<Header
						subtitle={'Всего '+PhotosGetAlbums.count+' альбомов.'}
					>
						Альбомы
					</Header>
				}>
					<CardScroll style={{ paddingBottom: 20 }}>
						{PhotosGetAlbums.items.map(album => 
							<Card 
								mode="outline"
								size="s"
								key={album.id}
							>
								<a 
									style={{ 
										display: 'block',
										height: 100,
										width: 150,
										backgroundImage: 'url('+album.sizes[album.sizes.length-1].src+')',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat'
									}}
									target='_blank' href={'https://vk.com/album'+album.owner_id+'_'+(album.id==-6?'0':album.id==-7?'00':album.id==-15?'000':album.id)}
								>
									<div className="photos_album_title_wrap">
										<div className="photos_album_counter">{album.size}</div>
										<div className="photos_album_title">{album.title}</div>
									</div>
								</a>
							</Card>)
						}
					</CardScroll>
				</Group>
			</Gradient>
		}
	</Panel>
);

export default Page;