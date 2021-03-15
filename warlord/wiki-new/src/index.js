//Подключаем элементы интерфейса
import bridge from "@vkontakte/vk-bridge";
import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
	InfoRow,
	CardGrid,
	IOS,
	Header,
	Card,
	CardScroll,
	Spinner,
	Link,
	ScreenSpinner,
	PanelHeaderButton,
	Avatar,
	ModalRoot,
	ModalPage,
	ModalPageHeader,
	PanelHeaderClose,
	withAdaptivity,
	usePlatform,
	ViewWidth,
	VKCOM,
	ConfigProvider,
	AdaptivityProvider, 
	AppRoot,
	Slider,
	Input,
	FormItem,
	Gallery,
	Gradient,
	Title,
	Text,
	Spacing,
	SplitLayout,
	PanelHeader,
	SplitCol,
	Epic,
	Tabbar,
	TabbarItem,
	View,
	Panel,
	PanelHeaderBack,
	Group,
	Placeholder,
	Cell,
	Button,
	Counter
} from '@vkontakte/vkui';

//Подключаем css
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

import Items from './data/items.json';

import dataArena from './data/arena.json';
const dataArenaSeason = dataArena.season;
const dataArenaLeague = dataArena.league;
const dataArenaChest = dataArena.chest;

import X2JS from './xml2js.js';
const x2js = new X2JS();


//Подключаем иконки
import {
	Icon28HomeOutline,
	Icon28UserCircleOutline,
	Icon28PawOutline,
	Icon28IncognitoOutline,
	Icon28GlobeOutline,
	Icon28Users3Outline,
	Icon28Smiles2Outline,
	Icon28GridSquareOutline,
	Icon24LikeOutline,
	Icon24SkullOutline,
	Icon24MentionOutline,
	Icon24ArticleOutline,
	Icon24InfoCircleOutline,
	Icon24RobotOutline,
	Icon24Dismiss,
	Icon24CupOutline,
	Icon24MoneyCircleOutline,
	Icon24ClockOutline,
	Icon24CubeBoxOutline,
	Icon24StickerOutline,
	Icon24TshirtOutline,
	Icon24FavoriteOutline,
	Icon24UsersOutline
} from '@vkontakte/icons';


bridge.subscribe(({ detail: { type, data }}) => {
	if (type === 'VKWebAppUpdateConfig') {
		const schemeAttribute = document.createAttribute('scheme');
		schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
		document.body.attributes.setNamedItem(schemeAttribute);
	}
});
bridge.send("VKWebAppInit");

const App = withAdaptivity(({ viewWidth }) => {
	const numberSpaces = (number, symbol = '.') => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
	}
	const numberForm = (number, titles) => {
		number = Math.abs(number);
		let cases = [2, 0, 1, 1, 1, 2];  
		return titles[(number%100>4&&number%100<20)?2:cases[(number%10<5)?number%10:5]];
	}
	const getTime = (s = 0) => {
		let hours = Math.floor(s/(60*60));
		let minutes = parseInt((s/(60))%60);
		let seconds = parseInt((s)%60);
		return `${String(hours).length === 1 ? `0${hours}` : hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}:${String(seconds).length === 1 ? `0${seconds}` : seconds}`
	};
	const getBridge = async(method) => {
		let data = null;
		try {
			data = await bridge.send(method);
		} catch (error) {}
		return data;
	};
	const getData = async(type, link) => {
		if (type && link) {
			try {
				let dataResponse = await fetch(link);
				let data = type === 'xml' ? await x2js.xml_str2json(await dataResponse.text()).data : type === 'json' ? await dataResponse.json() : null;
				return data;
			} catch (error) {
				return null;
			}
		}
	}
	const getItem = (data, x) => {
		return (
			<Cell 
				after={
					<span>
						<span className="itemPriceWiki">{numberSpaces(Items[data.id].price)}<Spinner size="small" className="itemPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/${Items[data.id].currency}.png)`}}/></span>
						<span className="itemTypeWiki">
							{data.item && <Icon24TshirtOutline />}
							{data.scroll && <Icon24StickerOutline />}
							{data.collection && <Icon24CubeBoxOutline />}
						</span>
					</span>
				} 
				className="itemCellWiki" key={x} before={<div><Spinner size="regular" className="itemAvatarPreloadWiki" /><div className="itemAvatarWiki" style={{backgroundImage: `url(image/${Items[data.id].icon})`}}></div></div>}
			>
				<InfoRow style={{marginBottom: '10px'}}><b>{Items[data.id].title}</b></InfoRow>
				<InfoRow><span className='itemTextSWiki'>DMG</span> {numberSpaces(Items[data.id].dmg)}</InfoRow>
				<InfoRow><span className='itemTextSWiki'>HP</span> {numberSpaces(Items[data.id].hp*15)}</InfoRow>
				<InfoRow><span className='itemTextSWiki'>ID</span> {data.id}</InfoRow>
			</Cell>
		)
	}

	const platform = usePlatform();
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
	const hasHeader = platform !== VKCOM;

	const [activeStory, setActiveStory] = useState('home');
	const [activePanel, setActivePanel] = useState(null);
	const [activeModal, setActiveModal] = useState(null);
	const [user, setUser] = useState({vk: null, game: null});
	const [popout, setPopout] = useState(null);
	const [modalOpened, isModalOpened] = useState(false);
	// const [activeStory, setActiveStory] = useState('warlordArena');
	// const [activePanel, setActivePanel] = useState('warlordArena_2');
	// const [activeModal, setActiveModal] = React.useState('modal-warlordArena_2');
	const [dataModal, setDataModal] = useState(null);
	const [indexModal, setIndexModal] = useState(null);
	// const [modalOpened, isModalOpened] = useState(true);
	
	const modal = (
		<ModalRoot
			activeModal={modalOpened ? activeModal : null}
			onClose={() => isModalOpened(false)}
		>
			<ModalPage
				id="modal-warlordArena"
				onClose={() => isModalOpened(false)}
				header={
					<ModalPageHeader
						className={isDesktop && "ModalWiki"}
						left={platform !== IOS && !isDesktop && <PanelHeaderClose onClick={() => isModalOpened(false)} />}
						right={platform === IOS && !isDesktop && <PanelHeaderButton onClick={() => isModalOpened(false)}><Icon24Dismiss /></PanelHeaderButton>}
					>
						{dataModal && indexModal === 2 && dataModal.name}
						{dataModal && indexModal === 3 && dataModal.title}
						{dataModal && indexModal === 4 && dataModal.title}
					</ModalPageHeader>
				}
			>
				<Group>
					{dataModal && indexModal === 2 && dataModal.items.sort((a, b) => {
						return b.item - a.item || b.collection - a.collection || b.scroll - a.scroll;
					}).map((data, x) => {
						return getItem(data, x);
					})}
					{dataModal && indexModal === 3 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24CupOutline />} description="Диапазон кубков для вступления в лигу">{numberSpaces(dataModal.from)}{dataModal.to === 0 ? `+` : ` - ${numberSpaces(dataModal.to)}`} кубков</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость одного боя в лиге">{numberSpaces(dataModal.price)} золота</Cell>
							<Spacing separator size={16} />
							<Cell className="DescriptionWiki" before={<Icon24SkullOutline />} description="Количество боёв для прохождения всей лиги">{dataModal.to === 0 ? `–` : `${numberSpaces(Math.ceil((dataModal.to-dataModal.from)/19))} ${numberForm(Math.ceil((dataModal.to-dataModal.from)/19), ['бой', 'боя', 'боёв'])}`}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Затраты золота для прохождения всей лиги">{dataModal.to === 0 ? `–` : `${numberSpaces(Math.ceil((dataModal.to-dataModal.from)/19)*dataModal.price)} золота`}</Cell>
						</Group>
					}
					{dataModal && indexModal === 4 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Время, требуемое на открытие сундука">{getTime(dataModal.time)}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость моментального открытия сундука">{numberSpaces(dataModal.skip)} {numberForm(dataModal.skip, ['рубин', 'рубина', 'рубинов'])}</Cell>
							<Spacing separator size={16} />
							{dataModal.items.length === 0 && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
							{dataModal.items.sort((a, b) => {
								return b.item - a.item || b.collection - a.collection || b.scroll - a.scroll;
							}).map((data, x) => {
								return getItem(data, x);
							})}
						</Group>
					}
				</Group>
			</ModalPage>
		</ModalRoot>
	);
	const OpenModal = (name, data, index) => {
		if (name && data && index) {
			setActiveModal(name);
			setDataModal(data);
			setIndexModal(index);
			isModalOpened(true);
		}
	}
	
	const [count_arena_1, setCountArena1] = useState(0);
	const [count_arena_2, setCountArena2] = useState(0);

	const onStoryChange = (e) => {
		setActivePanel(null);
		setActiveStory(e.currentTarget.dataset.story);
	}
	const testtest = (from, to) => {
		let number = 0;
		let response = from;
		for (let x = 0; x < Math.ceil((to-from)/19); x++) {
			if (response >= dataArenaLeague[0].from && response < dataArenaLeague[0].to) {
				number += dataArenaLeague[0].price;
				response += 19;
			} else if (response >= dataArenaLeague[1].from && response < dataArenaLeague[1].to) {
				number += dataArenaLeague[1].price;
				response += 19;
			} else if (response >= dataArenaLeague[2].from && response < dataArenaLeague[2].to) {
				number += dataArenaLeague[2].price;
				response += 19;
			} else if (response >= dataArenaLeague[3].from && response < dataArenaLeague[3].to) {
				number += dataArenaLeague[3].price;
				response += 19;
			} else if (response >= dataArenaLeague[4].from && response < dataArenaLeague[4].to) {
				number += dataArenaLeague[4].price;
				response += 19;
			} else if (response >= dataArenaLeague[5].from && response < dataArenaLeague[5].to) {
				number += dataArenaLeague[5].price;
				response += 19;
			} else if (response >= dataArenaLeague[6].from && response < dataArenaLeague[6].to) {
				number += dataArenaLeague[6].price;
				response += 19;
			} else if (response >= dataArenaLeague[7].from && response < dataArenaLeague[7].to) {
				number += dataArenaLeague[7].price;
				response += 19;
			} else if (response >= dataArenaLeague[8].from) {
				number += dataArenaLeague[8].price;
				response += 19;
			}
		}
		return number;
	}
	const VKBridge = async() => {
		setPopout(<ScreenSpinner />);
		let dataVK = await getBridge('VKWebAppGetUserInfo');
		let dataGame = await getData('xml', `https://backup1.geronimo.su/warlord_vk/udata.php?user=${dataVK.id}`);
		setUser({vk: dataVK, game: dataGame.u});
		setActiveStory('profile');
		setPopout(null);
	}



	return (
		<SplitLayout header={isDesktop && hasHeader && <PanelHeader separator={false} />} style={{ justifyContent: "center" }} popout={popout} >
			{isDesktop && (
				<SplitCol fixed width="280px" maxWidth="280px">
					<Panel>
					{hasHeader && <PanelHeader />}
						<Group>
							<Cell
								disabled={activeStory === 'home'}
								style={activeStory === 'home' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="home"
								onClick={onStoryChange}
								before={<Icon28HomeOutline />}
							>Главная</Cell>
							<Cell
								disabled={activeStory === 'profile'}
								style={activeStory === 'profile' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="profile"
								onClick={VKBridge}
								before={<Icon28UserCircleOutline />}
							>Мой профиль</Cell>
							<Spacing separator size={16} />
							<Cell
								disabled={activeStory === 'warlordMap'}
								style={activeStory === 'warlordMap' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="warlordMap"
								onClick={onStoryChange}
								before={<Icon28GlobeOutline />}
							>Карта</Cell>
							<Cell
								disabled={activeStory === 'warlordBosses'}
								style={activeStory === 'warlordBosses' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="warlordBosses"
								onClick={onStoryChange}
								before={<Icon28PawOutline />}
							>Боссы</Cell>
							<Cell
								disabled={activeStory === 'warlordArena'}
								style={activeStory === 'warlordArena' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="warlordArena"
								onClick={onStoryChange}
								before={<Icon28Smiles2Outline />}
							>Арена</Cell>
							<Cell
								disabled={activeStory === 'warlordCharacter'}
								style={activeStory === 'warlordCharacter' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="warlordCharacter"
								onClick={onStoryChange}
								before={<Icon28IncognitoOutline />}
							>Персонаж</Cell>
							<Cell
								disabled={activeStory === 'warlordGuild'}
								style={activeStory === 'warlordGuild' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="warlordGuild"
								onClick={onStoryChange}
								before={<Icon28Users3Outline />} 
							>Гильдия</Cell>
							<Cell
								disabled={activeStory === 'warlordOther'}
								style={activeStory === 'warlordOther' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="warlordOther"
								onClick={onStoryChange}
								before={<Icon28GridSquareOutline />} 
							>Разное</Cell>
						</Group>
					</Panel>
				</SplitCol>
			)}
			<SplitCol animate={!isDesktop} spaced={isDesktop} width={isDesktop ? '560px' : '100%'} maxWidth={isDesktop ? '560px' : '100%'}>
				<Epic activeStory={activeStory} tabbar={!isDesktop &&
					<Tabbar>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'home'}
							data-story="home"
							text="Главная"
						><Icon28HomeOutline/></TabbarItem>
						<TabbarItem
							onClick={VKBridge}
							selected={activeStory === 'profile'}
							data-story="profile"
							text="Мой профиль"
						><Icon28UserCircleOutline /></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'warlordMap'}
							data-story="warlordMap"
							text="Карта"
						><Icon28GlobeOutline/></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'warlordBosses'}
							data-story="warlordBosses"
							text="Боссы"
						><Icon28PawOutline/></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'warlordArena'}
							data-story="warlordArena"
							text="Арена"
						><Icon28Smiles2Outline/></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'warlordCharacter'}
							data-story="warlordCharacter"
							text="Персонаж"
						><Icon28IncognitoOutline/></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'warlordGuild'}
							data-story="warlordGuild"
							text="Гильдия"
						><Icon28Users3Outline/></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'warlordOther'}
							data-story="warlordOther"
							text="Разное"
						><Icon28GridSquareOutline/></TabbarItem>
					</Tabbar>
				}>



					
					<View id="home" activePanel="home">
						<Panel id="home">
							<PanelHeader>WARLORD: Helper</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28HomeOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid>
								<Spacing separator size={16} />
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={
									<span>
										Требуются скриншоты наград с сундуков арены, а именно с серебряного, трофейного, золотого, магического и пиратского.
										<br/>
										За помощь в сборе информации возможна награда, в виде привелегий в Warlord Script.
									</span>
								}></Cell>
							</Group>
						</Panel>
					</View>




					<View id="profile" activePanel="profile">
						<Panel id="profile">
							<PanelHeader>Мой профиль</PanelHeader>
								{user.vk && user.game &&
								<Group>
									<Gradient style={{
										margin: isDesktop ? '-7px -7px 0 -7px' : 0,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										textAlign: 'center',
										padding: 32
									}}>
										<Avatar size={96} src={user.vk.photo_200 ? user.vk.photo_200 : null} />
										<Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="medium">{user.vk.first_name} {user.vk.last_name}</Title>
										<Text style={{ color: 'var(--text_secondary)' }}>@{user.vk.id}</Text>
									</Gradient>
									<Group mode="plain">
										<Header>Характеристики в игре WARLORD</Header>
										<CardGrid size="s">
											<Card>
												<Cell before={<Icon24MentionOutline />} description="Игровой ник">{user.game._name}</Cell>
											</Card>
											<Card>
												<Cell before={<Icon24LikeOutline />} description="Здоровье">{numberSpaces(Number(user.game._end) + Number(user.game._endi) * 15)}</Cell>
											</Card>
											<Card>
												<Cell before={<Icon24SkullOutline />} description="Урон">{numberSpaces(user.game._dmgi)}</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Group>
								}
						</Panel>
					</View>




					<View id="warlordMap" activePanel="warlordMap">
						<Panel id="warlordMap">
							<PanelHeader>Карта</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28GlobeOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid>
								<Spacing separator size={16} />
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={
									<span>
										Требуются скриншоты наград с сундуков арены, а именно с серебряного, трофейного, золотого, магического и пиратского.
										<br/>
										За помощь в сборе информации возможна награда, в виде привелегий в Warlord Script.
									</span>
								}></Cell>
							</Group>
						</Panel>
					</View>




					<View id="warlordBosses" activePanel="warlordBosses">
						<Panel id="warlordBosses">
							<PanelHeader>Боссы</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28PawOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid>
								<Spacing separator size={16} />
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={
									<span>
										Требуются скриншоты наград с сундуков арены, а именно с серебряного, трофейного, золотого, магического и пиратского.
										<br/>
										За помощь в сборе информации возможна награда, в виде привелегий в Warlord Script.
									</span>
								}></Cell>
							</Group>
						</Panel>
					</View>




					<View id="warlordArena" activePanel={!activePanel ? 'warlordArena' : activePanel} modal={modal}>
						<Panel id="warlordArena">
							<PanelHeader>Арена</PanelHeader>
							<Group>
								<Gallery
									slideWidth="100%"
									style={{ 
										height: 200,
										margin: isDesktop ? '-7px -7px 0 -7px' : 0,
										borderRadius: isDesktop ? '8px 8px 0 0' : 0
									}}
									bullets="dark"
									showArrows
								>
									{dataArena.images.map((data, x) =>
										<div key={x}>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div className="headBannerWiki" style={{backgroundImage: `url(image/${data})`}} />
										</div>
									)}
								</Gallery>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card onClick={() => setActivePanel('warlordArena_1')}>
										<Cell before={<Icon24ArticleOutline />} description="Затраты на прохождение арены">Калькулятор</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordArena_2')}>
										<Cell before={<Icon24ArticleOutline />} description="Предметы за все сезоны">Сезоны</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordArena_3')}>
										<Cell before={<Icon24ArticleOutline />} description="Список лиг и наград">Лиги</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordArena_4')}>
										<Cell before={<Icon24ArticleOutline />} description="Список сундуков и наград">Сундуки</Cell>
									</Card>
								</CardGrid>
								<Spacing size={8} />
								<CardGrid size="s">
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24TshirtOutline />} description="Иконка">Предмет</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24StickerOutline />} description="Иконка">Заточка</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24CubeBoxOutline />} description="Иконка">Коллекция</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordArena_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordArena')}/>}>Калькулятор</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="На арене идёт состязание двух игроков с примерно одинаковыми характеристиками. В качестве награды за победу игрок получает: случайный сундук, 19 кубков и опыт."></Cell>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card mode="shadow">
										<FormItem top="Текущее количество кубков">
											<Slider
												step={1}
												min={0}
												max={10000}
												value={Number(count_arena_1)}
												onChange={count => setCountArena1(Number(count))}
											/>
										</FormItem>
										<FormItem>
											<Input value={String(count_arena_1)} min={0} onChange={e => setCountArena1(Number(e.target.value))} type="number"/>
										</FormItem>
									</Card>
									<Card mode="shadow">
										<FormItem top="Конечное количество кубков">
											<Slider
												step={1}
												min={0}
												max={10000}
												value={Number(count_arena_2)}
												onChange={count => setCountArena2(Number(count))}
											/>
										</FormItem>
										<FormItem>
											<Input value={String(count_arena_2)} min={0} onChange={e => setCountArena2(Number(e.target.value))} type="number"/>
										</FormItem>
									</Card>
								</CardGrid>
								<Spacing size={8} />
								<Cell className="DescriptionWiki" before={<Icon24RobotOutline />}>
									<InfoRow style={{marginBottom: '10px'}} header="Победных боёв необходимо">{numberSpaces(Math.ceil((count_arena_2-count_arena_1)/19))}</InfoRow>
									<InfoRow style={{marginBottom: '10px'}} header="Кубков необходимо заработать">{numberSpaces(Math.ceil((count_arena_2-count_arena_1)/19)*19)}</InfoRow>
									<InfoRow header="Золота необходимо потратить">{numberSpaces(testtest(count_arena_1, count_arena_2))}</InfoRow>
								</Cell>
							</Group>
						</Panel>
						<Panel id="warlordArena_2">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordArena')}/>}>Сезоны</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Ежемесячно в игру поступают 2 новых предмета экипировки, которые доступны в качестве награды за арену. Чем выше лига - тем лучше и больше награда с ежемесячного сундука."></Cell>
								{dataArenaSeason.map((data, x_main) =>
										<Gradient className="GradientBannerWiki" key={x_main}>
											<Header indicator={<Counter size="s" mode="secondary">{data.month.length} {numberForm(data.month.length, ['месяц', 'месяца', 'месяцев'])}</Counter>}>{data.name}</Header>
											<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
												{data.month.map((data, x) =>
													<Card className="BannerWiki Scroll" key={x} onClick={() => OpenModal(`modal-warlordArena`, data, 2)}>
														<Spinner size="regular" className="bannerPreloadWiki" />
														<Cell
															style={{
																backgroundImage: `url(image/${data.icon})`
															}}
														>{data.name}</Cell>
													</Card>
												)}
											</CardScroll>
										</Gradient>
								)}
							</Group>
						</Panel>
						<Panel id="warlordArena_3">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordArena')}/>}>Лиги</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Подбор противников осуществляется из игроков в той же лиге, что и Вы. Чем выше ваша лига - тем выше шанс на выпадение более редкого сундука."></Cell>
								<Spacing size={8} />
								<CardGrid size="s">
									{dataArenaLeague.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordArena`, data, 3)}>
											<Spinner size="regular" className="bannerPreloadWiki" />
											<Cell
												style={{
													backgroundImage: `url(image/${data.icon})`
												}}
											>{data.title}</Cell>
										</Card>
									)}
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordArena_4">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordArena')}/>}>Сундуки</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Из сундуков могут выпасть вещи, заточки, а так же ценные ресурсы. Трофейные сундуки могут выпасть только с противника, который состоит в гильдии."></Cell>
								<Spacing size={8} />
								<CardGrid size="s">
									{dataArenaChest.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordArena`, data, 4)}>
											<Spinner size="regular" className="bannerPreloadWiki" />
											<Cell
												style={{
													backgroundImage: `url(image/${data.icon})`
												}}
											>{data.title}</Cell>
										</Card>
									)}
								</CardGrid>
							</Group>
						</Panel>
					</View>




					<View id="warlordCharacter" activePanel="warlordCharacter">
						<Panel id="warlordCharacter">
							<PanelHeader>Персонаж</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28IncognitoOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid>
								<Spacing separator size={16} />
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={
									<span>
										Требуются скриншоты наград с сундуков арены, а именно с серебряного, трофейного, золотого, магического и пиратского.
										<br/>
										За помощь в сборе информации возможна награда, в виде привелегий в Warlord Script.
									</span>
								}></Cell>
							</Group>
						</Panel>
					</View>




					<View id="warlordGuild" activePanel="warlordGuild">
						<Panel id="warlordGuild">
							<PanelHeader>Гильдия</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28Users3Outline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid>
								<Spacing separator size={16} />
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={
									<span>
										Требуются скриншоты наград с сундуков арены, а именно с серебряного, трофейного, золотого, магического и пиратского.
										<br/>
										За помощь в сборе информации возможна награда, в виде привелегий в Warlord Script.
									</span>
								}></Cell>
							</Group>
						</Panel>
					</View>



					
					<View id="warlordOther" activePanel="warlordOther">
						<Panel id="warlordOther">
							<PanelHeader>Разное</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28GridSquareOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid>
								<Spacing separator size={16} />
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={
									<span>
										Требуются скриншоты наград с сундуков арены, а именно с серебряного, трофейного, золотого, магического и пиратского.
										<br/>
										За помощь в сборе информации возможна награда, в виде привелегий в Warlord Script.
									</span>
								}></Cell>
								<Spacing separator size={16} />
								{Items.map((data, x) => {
									return getItem({id: x}, x);
								})}
							</Group>
						</Panel>
					</View>
				</Epic>
			</SplitCol>
		</SplitLayout>
	);
}, {
	viewWidth: true
});

ReactDOM.render(<ConfigProvider><AdaptivityProvider><AppRoot><App /></AppRoot></AdaptivityProvider></ConfigProvider>, document.getElementById('root'));