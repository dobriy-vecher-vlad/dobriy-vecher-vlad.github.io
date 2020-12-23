//Подключаем элементы интерфейса
import "core-js/features/map";
import "core-js/features/set";
import bridge from "@vkontakte/vk-bridge";
import React from 'react';
import resemble from 'resemblejs';
//import pixelmatch from 'pixelmatch';
import ReactDOM from 'react-dom';
import { ConfigProvider, AdaptivityProvider, AppRoot, HorizontalScroll, ActionSheet, ActionSheetItem, InfoRow, Progress, Placeholder, FixedLayout, Separator, CardGrid, Select, CustomSelect, CustomSelectOption, CellButton, Div, IOS, platform, Header, Card, CardScroll, Banner, Counter, Link, ScreenSpinner, View, Panel, PanelHeader, Group, Cell, PanelHeaderButton, Button, Avatar } from '@vkontakte/vkui';

//Подключаем css
//import './panels/vkui.css';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/fix.css';

//Подключаем иконки
import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24ErrorCircle from '@vkontakte/icons/dist/24/error_circle';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';
import Icon24ImageFilterOutline from '@vkontakte/icons/dist/24/image_filter_outline';
import Icon24ScanViewfinderOutline from '@vkontakte/icons/dist/24/scan_viewfinder_outline';

//Назначаем глобальные переменные
const osName = platform();
console.warn(platform());
const version = '5.122';

const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

//Подключаем ВК и определяем системную тему
bridge.send("VKWebAppInit");
bridge.subscribe(({ detail: { type, data }}) => {
	if (type === 'VKWebAppUpdateConfig') {
		const schemeAttribute = document.createAttribute('scheme');
		schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
		document.body.attributes.setNamedItem(schemeAttribute);
	}
});

//Структура приложения
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePanel: 'Home',
			popout: null,
			text: '',
			test: '',
			snackbar: null,
			PhotoProgress: '100',
			PhotoProgressText: 'null',
			PhotoSelect: '',
			count1: 0,
			alert: '',
			PhotoGrid: <Group><Placeholder icon={<Icon56GalleryOutline />}>Выберите альбом для продолжения работы</Placeholder></Group>
		};
		this.response = {};
		this.info = {
			test: 12334
		};
		const {
			noSlideClick
		  } = this.props;
	}
	VKBridge () {
		this.setState({ popout: <ScreenSpinner /> });
		bridge.send('VKWebAppGetUserInfo').then(data => {
			this.response.id = data.id;
			this.response.fetchedUser = data;
			bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "friends,photos,video,pages,status,notes,wall,docs,groups,stats,market"}).then(data => {
				this.response.access_token = data.access_token;
				bridge.send("VKWebAppCallAPIMethod", {"method": "groups.get", "request_id": "groups.get", "params": {"user_id":this.response.id, "extended":1, "count":100, "fields":"members_count", "v":version, "access_token":this.response.access_token}}).then(data => {
					this.response.GroupsGet = data.response;
					bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":this.response.id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":this.response.access_token}}).then(data => {
						this.response.PhotosGetAlbums = data.response;
						bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "request_id": "friends.get", "params": {"user_id":this.response.id, "count":100, "fields":"photo_200_orig", "v":version, "access_token":this.response.access_token}}).then(data => {
							this.response.FriendsGet = data.response;
							this.setState({ activePanel: 'VKBridge' });
							this.setState({ popout: null });
						}).catch(error => {
							this.setState({ popout: null });
						});
					}).catch(error => {
						this.setState({ popout: null });
					});
				}).catch(error => {
					this.setState({ popout: null });
				});
			}).catch(error => {
				this.setState({ popout: null });
			});
		}).catch(error => {
			this.setState({ popout: null });
		});
	}
	VKPhotoManager () {
		this.setState({ popout: <ScreenSpinner /> });
		bridge.send('VKWebAppGetUserInfo').then(data => {
			this.response.id = data.id;
			this.response.fetchedUser = data;
			bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "photos"}).then(data => {
				this.response.access_token = data.access_token;
				bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":this.response.id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":this.response.access_token}}).then(data => {
					this.response.PhotosGetAlbums = data.response;
					this.setState({PhotoGrid:<Group><Placeholder icon={<Icon56GalleryOutline />}>Выберите альбом для продолжения работы</Placeholder></Group>});
					this.setState({PhotoSelect: ''})
					this.setState({ activePanel: 'VKPhotoManager' });
					this.setState({ popout: null });
					this.setState({ snackbar: null });
				}).catch(error => {
					this.setState({ popout: null });
					this.setState({ snackbar: null });
				});
			}).catch(error => {
				this.setState({ popout: null });
				this.setState({ snackbar: null });
			});
		}).catch(error => {
			this.setState({ popout: null });
			this.setState({ snackbar: null });
		});
	}
	openDestructive(data, type) {
		console.log(data);
		console.log(type);
		this.setState({ popout:
			<ActionSheet onClose={() => this.setState({ popout: null })}>
				<ActionSheetItem autoclose onClick={this.PhotoFindDuplicates.bind(this,{"count":data.response.count,"total":Math.ceil(data.response.count/1000)},type.target.value,1,0,'low')}>Низкое качество</ActionSheetItem>
				<ActionSheetItem autoclose onClick={this.PhotoFindDuplicates.bind(this,{"count":data.response.count,"total":Math.ceil(data.response.count/1000)},type.target.value,1,0,'middle')}>Среднее качество</ActionSheetItem>
				<ActionSheetItem autoclose onClick={this.PhotoFindDuplicates.bind(this,{"count":data.response.count,"total":Math.ceil(data.response.count/1000)},type.target.value,1,0,'high')}>Высокое качество</ActionSheetItem>
				{osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
			</ActionSheet>
		});
	}
	Update(type, count) {
		let Count = Number(count)-1;
		let CountMin = 50;
		if (type.target.value !== "") {
			this.setState({ snackbar: null });
			this.setState({ popout: <ScreenSpinner /> });
			bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":this.response.id, "album_id":type.target.value, "rev":1, "count":CountMin, "offset":(Count*CountMin), "v":version, "access_token":this.response.access_token}}).then(data => {
				let CountMax = Math.ceil(data.response.count/CountMin);
				this.info.PhotosGet = data.response;
				this.setState({PhotoGrid:
					<Group>
						<CellButton  onClick={(e) => {this.openDestructive(data,type)}} before={<Icon24ImageFilterOutline/>}>Поиск дубликатов</CellButton>
						<CellButton onClick={(e) => {console.log(this)}} before={<Icon24ScanViewfinderOutline/>}>Перемешать</CellButton>
						<Separator style={{ margin: '16px 0' }} />
						<CardGrid style={{paddingBottom: 69}}>
							{this.info.PhotosGet.items.map(photo =>
								<Card size="m" key={photo.id}>
									<a href={'https://vk.com/photo'+photo.owner_id+'_'+photo.id} target='_blank' style={{ backgroundImage: 'url('+photo.sizes[photo.sizes.length-1].url+')' }}></a>
								</Card>
							)}
						</CardGrid>
						<FixedLayout vertical="bottom">
							<Separator wide />
							<Div style={{display: 'flex'}}>
								<Button disabled={Number(count) === 1 ? true : false} before={<Icon16Chevron style={{transform:"scale(-1, 1)"}}/>} onClick={() => this.Update(type,(Number(count)-1))} size="m" stretched mode="secondary"/>
								<Div style={{ padding: 0, width: "100%", margin: "auto", textAlign: "center" }}>{count} / {CountMax}</Div>
								<Button disabled={Number(count) === CountMax ? true : false} before={<Icon16Chevron/>} onClick={() => this.Update(type,(Number(count)+1))} size="m" stretched mode="secondary"/>
							</Div>
						</FixedLayout>
					</Group>
				});
				this.setState({ popout: null });
				this.setState({ snackbar: null });
				type.target.value = type.target.value;
			}).catch(error => {
				console.log(error);
				this.setState({ popout: null });
				this.setState({ snackbar: null });
			});
		} else {
			this.setState({PhotoGrid:<Group><Placeholder icon={<Icon56GalleryOutline />}>Выберите альбом для продолжения работы</Placeholder></Group>});
			this.setState({ popout: null });
			this.setState({ snackbar: null });
		}
	}
	PhotoFindDuplicates(info, album, count, offset, type) {
		console.log(info);
		console.log(album);
		console.log(count);
		console.log(offset);
		console.log(type);
		if (count === 1) {
			this.setState({ snackbar: null });
			this.setState({ popout: <ScreenSpinner /> });
			this.info.PhotoFindDuplicates = [];
			this.info.PhotoFindDuplicatesFind = [];
		}
		bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":this.response.id, "album_id":album, "rev":1, "count":1000, "offset":offset, "v":version, "access_token":this.response.access_token}}).then(data => {
			console.log(data);
			if (data.response.count > 1) {
				this.info.PhotoFindDuplicates = this.info.PhotoFindDuplicates.concat(data.response.items);
				if (count === info.total) {
					let findCount = this.info.PhotoFindDuplicates.length*(this.info.PhotoFindDuplicates.length-1)/2;
					this.info.count1 = 0;
					this.info.count2 = 0;
					this.info.count3 = 0;
					this.info.findCount = findCount;
					console.log('Всего пар: '+findCount);
					console.log('Всего фотографий: '+this.info.PhotoFindDuplicates.length);
					function function_name(this2,count,x,y,z,t) {
						if (this2.info.PhotoFindDuplicates.length != z) {
							let typeX = t == 'low' ? 0 : t == 'middle' ? Math.floor((0+(this2.info.PhotoFindDuplicates[x].sizes.length-1))/2) : t == 'high' ? (this2.info.PhotoFindDuplicates[x].sizes.length-1) : 0;
							let typeY = t == 'low' ? 0 : t == 'middle' ? Math.floor((0+(this2.info.PhotoFindDuplicates[y].sizes.length-1))/2) : t == 'high' ? (this2.info.PhotoFindDuplicates[y].sizes.length-1) : 0;
							resembleVK(this2.info.PhotoFindDuplicates[x].sizes[typeX].url,this2.info.PhotoFindDuplicates[y].sizes[typeY].url,x,y,this2).then(function(resolve) {
								let zz = y == this2.info.PhotoFindDuplicates.length-1 ? z+1 : z;
								let xx = y == this2.info.PhotoFindDuplicates.length-1 ? x+1 : x;
								let yy = y < this2.info.PhotoFindDuplicates.length-1 ? y+1 : zz+0;
								function_name(this2,count,xx,yy,zz,t);
							});
						}
					}
					function_name(this,findCount,0,1,1,type);
				} else {
					this.PhotoFindDuplicates(info,album,(count+1),(count*1000),type,this);
				}
			} else {
				this.setState({ popout: null });
				this.setState({ snackbar: null });
			}
		}).catch(error => {
			this.setState({ popout: null });
			this.setState({ snackbar: null });
		});
		function resembleVK(file1, file2, index1, index2, this1) {
			return new Promise(function(resolve, reject) {
				console.log(file1);
				console.log(file2);
				console.log(index1);
				console.log(index2);
				console.log(this1);
				this1.info.count1 += 1;
				if (this1.info.count1 === this1.info.findCount) {
					this1.setState({ popout: null });
					this1.setState({ snackbar: null });
				}
				resolve(1);
			});
			//console.log('RES ' + index1 + ' / ' + index2);
			// return new Promise(function(resolve, reject) {
			// 	//console.log('RES ' + index1 + ' / ' + index2);


				
			// 	//pixelmatch(file1, file2, null, 500, 500, {threshold: 0.1});
			// 	const img1 = file1;
			// 	const img2 = file2;
			// 	const {width, height} = img1;
			// 	console.log(img1);
			// 	console.log(img2);
			// 	let test = pixelmatch(img1, img2, null, width, height, {threshold: 0.1});
			// 	console.log(test);



			// 	resemble(file1)
			// 	.compareTo(file2)
			// 	.ignoreAntialiasing()
			// 	.scaleToSameSize()
			// 	.onComplete(function(analysis) {
			// 		this1.setState({ count1: Number(this1.info.count1)+1 });
			// 		this1.info.count1 += 1;
			// 		console.log(index1 + ' от ' + index2 + ' на '+analysis.misMatchPercentage+'% отличается.');
			// 		if (analysis.misMatchPercentage <= 20) {
			// 			console.log(file1);
			// 			console.log(file2);
			// 			console.log(this1.info.count1);
			// 			this1.info.PhotoFindDuplicatesFind[this1.info.count3] = [this1.info.PhotoFindDuplicates[index1], this1.info.PhotoFindDuplicates[index2]];
			// 			this1.info.count3 += 1;
			// 		}
			// 		if (this1.info.count1 === this1.info.findCount) {
			// 			this1.setState({PhotoGrid:
			// 				<Group>
			// 					<CellButton before={<Icon24ImageFilterOutline/>}>Удалить</CellButton>
			// 					<CellButton onClick={()=>console.log(this1.info.PhotoFindDuplicatesFind)} before={<Icon24ScanViewfinderOutline/>}>Переместить</CellButton>
			// 					<Separator wide />
			// 					<CardGrid style={{paddingBottom: 60}}>
			// 						{this1.info.PhotoFindDuplicatesFind.map(photos =>
			// 							<div>
			// 							<Card key={this1.info.count3+'_'+photos[0].id} size="m">
			// 								<Link href={'https://vk.com/photo'+photos[0].owner_id+'_'+photos[0].id} target='_blank'>
			// 									<div style={{ 
			// 										height: 96,
			// 										backgroundImage: 'url('+photos[0].sizes[photos[0].sizes.length-1].url+')',
			// 										backgroundSize: 'cover',
			// 										backgroundPosition: 'center',
			// 										backgroundRepeat: 'no-repeat'
			// 									}}/>
			// 								</Link>
			// 							</Card>
			// 							<Card key={this1.info.count3+'_'+photos[1].id} size="m">
			// 								<Link href={'https://vk.com/photo'+photos[1].owner_id+'_'+photos[1].id} target='_blank'>
			// 									<div style={{ 
			// 										height: 96,
			// 										backgroundImage: 'url('+photos[1].sizes[photos[1].sizes.length-1].url+')',
			// 										backgroundSize: 'cover',
			// 										backgroundPosition: 'center',
			// 										backgroundRepeat: 'no-repeat'
			// 									}}/>
			// 								</Link>
			// 							</Card>
			// 							</div>
			// 						)}
			// 					</CardGrid>
			// 					<FixedLayout vertical="bottom">
			// 						<Separator wide />
			// 						<Div>
			// 							<Div style={{ padding: 0, width: "100%", margin: "auto", textAlign: "center" }}>Найдено {this1.info.PhotoFindDuplicatesFind.length} повторов в альбоме</Div>
			// 						</Div>
			// 					</FixedLayout>
			// 				</Group>
			// 			});
			// 			this1.setState({ popout: null });
			// 			this1.setState({ snackbar: null });
			// 		}
			// 		resolve(this1);
			// 	});
			// });
		}
	}
	render() {
		return (
			<ConfigProvider>
				<AdaptivityProvider>
					<AppRoot>
						<View activePanel={this.state.activePanel} popout={this.state.popout}>
							<Panel id="Home">
								<PanelHeader left={<PanelHeaderButton><Icon28LogoVkOutline /></PanelHeaderButton>}>Home</PanelHeader>
								<Group>
									<Cell expandable before={<Icon28BrainOutline />} onClick={this.VKBridge.bind(this)}>VK Bridge</Cell>
									<Cell expandable before={<Icon28CameraOutline />} onClick={this.VKPhotoManager.bind(this)}>VK Photo Manager</Cell>
								</Group>
							</Panel>
							<Panel id="VKBridge">
								<PanelHeader left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>VK Bridge</PanelHeader>
								{this.response.fetchedUser &&
									<Group>
										<Link href={"https://vk.com/id"+this.response.fetchedUser.id} target="_blank">
											<Banner
												before={this.response.fetchedUser.photo_200 ? <Avatar size={48} src={this.response.fetchedUser.photo_200}/> : null}
												header={`${this.response.fetchedUser.first_name} ${this.response.fetchedUser.last_name}`}
												subheader={<span>Родился {this.response.fetchedUser.bdate}<br/>Занятый ID {this.response.fetchedUser.id}</span>}
												asideMode="expand"
											/>
										</Link>
									</Group>
								}
								{this.response.FriendsGet &&
									<Group header={
										<Header indicator={<Counter size="s" mode="secondary">{this.response.FriendsGet.count}</Counter>}>
											Друзья
										</Header>
									}>
										<CardScroll size="s">
											{this.response.FriendsGet.items.map(frend =>
												<Card mode="outline" size="m" key={frend.id}>
													<a href={'https://vk.com/id'+frend.id} target='_blank' style={{ backgroundImage: 'url('+frend.photo_200_orig+')' }}>
														<div className="photos_album_title_wrap">
															<div className="photos_album_title">{frend.first_name} {frend.last_name}</div>
														</div>
													</a>
												</Card>
											)}
										</CardScroll>
									</Group>
								}
								{this.response.GroupsGet &&
									<Group header={
										<Header indicator={<Counter size="s" mode="secondary">{this.response.GroupsGet.count}</Counter>}>
											Сообщества
										</Header>
									}>
										<CardScroll size="s">
											{this.response.GroupsGet.items.map(group =>
												<Card mode="outline" size="m" key={group.id}>
													<a href={'https://vk.com/club'+group.id} target='_blank' style={{ backgroundImage: 'url('+group.photo_200+')' }}>
														<div className="photos_album_title_wrap">
															<div className="photos_album_counter">{group.members_count}</div>
															<div className="photos_album_title">{group.name}</div>
														</div>
													</a>
												</Card>
											)}
										</CardScroll>
									</Group>
								}
								{this.response.PhotosGetAlbums &&
									<Group header={
										<Header indicator={<Counter size="s" mode="secondary">{this.response.PhotosGetAlbums.count}</Counter>}>
											Альбомы
										</Header>
									}>
										<CardScroll size="s">
											{this.response.PhotosGetAlbums.items.map(album =>
												<Card mode="outline" size="m" key={album.id}>
													<a href={'https://vk.com/album'+album.owner_id+'_'+(album.id===-6?'0':album.id===-7?'00':album.id===-15?'000':album.id)} target='_blank' style={{ backgroundImage: 'url('+album.sizes[album.sizes.length-1].src+')' }}>
														<div className="photos_album_title_wrap">
															<div className="photos_album_counter">{album.size}</div>
															<div className="photos_album_title">{album.title}</div>
														</div>
													</a>
												</Card>
											)}
										</CardScroll>
									</Group>
								}
							</Panel>












							<Panel id="VKPhotoManager">
								<PanelHeader left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>VK Photo Manager</PanelHeader>
								{this.response.fetchedUser &&
									<Group>
										<Banner
											before={<Avatar style={{ background: 'var(--accent)' }} size={48} shadow={false}><Icon24ErrorCircle fill="var(--white)" /></Avatar>}
											header={`${this.response.fetchedUser.first_name} ${this.response.fetchedUser.last_name}, привет!`}
											subheader="Данный раздел позволяет взаимодействовать с альбомами и фотографиями в них."
										/>
									</Group>
								}
								{this.response.PhotosGetAlbums &&
									<Group>
										<Div>
											<CustomSelect key={Math.random()} value={this.state.PhotoSelect} placeholder="Выберите альбом" name="album" onChange={(e) => {
												this.setState({PhotoSelect: Number(e.target.value)}),
												this.Update(e,'1')}
											}
												options={this.response.PhotosGetAlbums.items.map(album =>
													({ key: album.id, label: album.title, value: album.id, avatar: album.sizes[album.sizes.length-1].src })
												)}
												renderOption={({ option, ...restProps }) => (
													<CustomSelectOption {...restProps} before={<Avatar size={24} src={option.avatar} />} />
												)}
											/>
										</Div>
									</Group>
								}
								{this.state.PhotoGrid}
								{this.state.snackbar}
								{this.state.alert && <Group><Div>{this.state.alert}</Div></Group>}
							</Panel>
						</View>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === "development") {
	import("./eruda").then(({ default: eruda }) => {});
}