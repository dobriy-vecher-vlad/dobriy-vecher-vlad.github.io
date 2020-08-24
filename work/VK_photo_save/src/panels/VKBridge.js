import React from 'react';
import { platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { Panel, PanelHeader, PanelHeaderButton, Group, Avatar, Header, Card, CardScroll, Banner, Counter, Link } from '@vkontakte/vkui/';

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
			<Group>
				<Link href={"https://vk.com/id"+fetchedUser.id} target="_blank">
					<Banner
						before={fetchedUser.photo_200 ? <Avatar size={48} src={fetchedUser.photo_200}/> : null}
						header={`${fetchedUser.first_name} ${fetchedUser.last_name}`}
						subheader={<span>Родился {fetchedUser.bdate}<br/>Занятый ID {fetchedUser.id}</span>}
						asideMode="expand"
					/>
				</Link>
			</Group>
		}
			{FriendsGet &&
				<Group header={
					<Header
						indicator={<Counter size="s" mode="secondary">{FriendsGet.count}</Counter>}
					>
						Друзья
					</Header>
				}>
					<CardScroll>
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
			}
			{GroupsGet &&
				<Group header={
					<Header
						indicator={<Counter size="s" mode="secondary">{GroupsGet.count}</Counter>}
					>
						Сообщества
					</Header>
				}>
					<CardScroll>
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
			}
			{PhotosGetAlbums &&
				<Group header={
					<Header
						indicator={<Counter size="s" mode="secondary">{PhotosGetAlbums.count}</Counter>}
					>
						Альбомы
					</Header>
				}>
					<CardScroll>
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
									target='_blank' href={'https://vk.com/album'+album.owner_id+'_'+(album.id===-6?'0':album.id===-7?'00':album.id===-15?'000':album.id)}
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
			}
	</Panel>
);

export default Page;