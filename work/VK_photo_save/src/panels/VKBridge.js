import React from 'react';
import { platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { Panel, PanelHeader, PanelHeaderButton, Group, Avatar, Header, Card, CardScroll, Banner, Counter, Link } from '@vkontakte/vkui/';

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
							<Link href={'https://vk.com/id'+frend.id} target='_blank'>
							<Card 
								mode="outline"
								size="m"
								key={frend.id}
							>
								<Banner
									mode="image"
									size="m"
									asideMode="expand"
									background={
										<div
											style={{
												backgroundColor: '#000',
												backgroundImage: 'url('+frend.photo_200_orig+')',
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundRepeat: 'no-repeat'
											}}
										>
											<div className="photos_album_title_wrap">
												<div className="photos_album_title">{frend.first_name} {frend.last_name}</div>
											</div>
										</div>
									}
								/>
							</Card>
							</Link>)
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
							<Link href={'https://vk.com/'+group.screen_name} target='_blank'>
							<Card 
								mode="outline"
								size="m"
								key={group.id}
							>
								<Banner
									mode="image"
									size="m"
									asideMode="expand"
									background={
										<div
											style={{
												backgroundColor: '#000',
												backgroundImage: 'url('+group.photo_200+')',
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundRepeat: 'no-repeat'
											}}
										>
											<div className="photos_album_title_wrap">
												<div className="photos_album_counter">{group.members_count}</div>
												<div className="photos_album_title">{group.name}</div>
											</div>
										</div>
									}
								/>
							</Card>
							</Link>)
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
							<Link href={'https://vk.com/album'+album.owner_id+'_'+(album.id===-6?'0':album.id===-7?'00':album.id===-15?'000':album.id)} target='_blank'>
							<Card 
								mode="outline"
								size="m"
								key={album.id}
							>
								<Banner
									mode="image"
									size="m"
									asideMode="expand"
									background={
										<div
											style={{
												backgroundColor: '#000',
												backgroundImage: 'url('+album.sizes[album.sizes.length-1].src+')',
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundRepeat: 'no-repeat'
											}}
										>
											<div className="photos_album_title_wrap">
												<div className="photos_album_counter">{album.size}</div>
												<div className="photos_album_title">{album.title}</div>
											</div>
										</div>
									}
								/>
							</Card>
							</Link>)
						}
					</CardScroll>
				</Group>
			}
	</Panel>
);

export default Page;