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
import dataCharacter from './data/character.json';

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
	Icon24UsersOutline,
	Icon24GiftOutline,
	Icon24ChainOutline,
	Icon24AppleOutline,
	Icon24PaletteOutline,
	Icon24MagicWandOutline
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
							{data.collection && <Icon24CubeBoxOutline style={{color: data.personal && 'var(--destructive)'}}/>}
						</span>
					</span>
				} 
				className="itemCellWiki" key={x} before={<div><Spinner size="regular" className="itemAvatarPreloadWiki" /><div className="itemAvatarWiki" style={{backgroundImage: `url(image/${Items[data.id].icon})`}}></div></div>}
			>
				<InfoRow style={{marginBottom: '10px'}}><b>{Items[data.id].title}</b></InfoRow>
				<InfoRow><span className='itemTextWiki'>DMG</span> {numberSpaces(Items[data.id].dmg)}</InfoRow>
				<InfoRow><span className='itemTextWiki'>HP</span> {numberSpaces(Items[data.id].hp*15)}</InfoRow>
				{data.tooltip && <InfoRow style={{marginTop: '10px'}}><span className='itemDescriptionWiki'>{data.tooltip}</span></InfoRow>}
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
	// const [activeStory, setActiveStory] = useState('warlordCharacter');
	// const [activePanel, setActivePanel] = useState('warlordArena_4');
	const [dataModal, setDataModal] = useState(null);
	const [indexModal, setIndexModal] = useState(null);
	// const [modalOpened, isModalOpened] = useState(true);
	
	
	const [count_arena_1, setCountArena1] = useState(0);
	const [count_arena_2, setCountArena2] = useState(0);
	const [checkItems, setCheckItems] = useState({null: true, item: true, scroll: true, collection: true, personal: true});

	const isCheckItems = (e, id) => {
		checkItems[id] = e.target.checked;
		setCheckItems({null: checkItems.null, item: checkItems.item, scroll: checkItems.scroll, collection: checkItems.collection, personal: checkItems.personal});
	}

	const modal = (
		<ModalRoot
			activeModal={modalOpened ? 'modal-warlord' : null}
			onClose={() => isModalOpened(false)}
		>
			<ModalPage
				id="modal-warlord"
				onClose={() => isModalOpened(false)}
				header={
					<ModalPageHeader
						className={isDesktop && "ModalWiki"}
						left={platform !== IOS && !isDesktop && <PanelHeaderClose onClick={() => isModalOpened(false)} />}
						right={platform === IOS && !isDesktop && <PanelHeaderButton onClick={() => isModalOpened(false)}><Icon24Dismiss /></PanelHeaderButton>}
					>
						{activeModal === 'modal-warlordArena' && dataModal && indexModal === 2 && dataModal.name}
						{activeModal === 'modal-warlordArena' && dataModal && indexModal === 3 && dataModal.title}
						{activeModal === 'modal-warlordArena' && dataModal && indexModal === 4 && dataModal.title}

						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 1 && dataModal.title}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 4 && dataModal.title}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 5 && dataModal.title}
					</ModalPageHeader>
				}
			>
				<Group>
					{activeModal === 'modal-warlordArena' && dataModal && indexModal === 2 && dataModal.items.map((data, x) => {
						return getItem(data, x);
					})}
					{activeModal === 'modal-warlordArena' && dataModal && indexModal === 3 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24CupOutline />} description="Диапазон кубков для вступления в лигу">{numberSpaces(dataModal.from)}{dataModal.to === 0 ? `+` : ` - ${numberSpaces(dataModal.to)}`} кубков</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость одного боя в лиге">{numberSpaces(dataModal.price)} золота</Cell>
							<Spacing separator size={16} />
							<Cell className="DescriptionWiki" before={<Icon24SkullOutline />} description="Количество боёв для прохождения всей лиги">{dataModal.to === 0 ? `–` : `${numberSpaces(Math.ceil((dataModal.to-dataModal.from)/19))} ${numberForm(Math.ceil((dataModal.to-dataModal.from)/19), ['бой', 'боя', 'боёв'])}`}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Затраты золота для прохождения всей лиги">{dataModal.to === 0 ? `–` : `${numberSpaces(Math.ceil((dataModal.to-dataModal.from)/19)*dataModal.price)} золота`}</Cell>
						</Group>
					}
					{activeModal === 'modal-warlordArena' && dataModal && indexModal === 4 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Время, требуемое на открытие сундука">{getTime(dataModal.time)}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость моментального открытия сундука">{numberSpaces(dataModal.skip)} {numberForm(dataModal.skip, ['рубин', 'рубина', 'рубинов'])}</Cell>
							<Spacing separator size={16} />
							{dataModal.items.sort((a, b) => {
								return b.item - a.item || b.collection - a.collection || b.personal - a.personal || b.scroll - a.scroll;
							}).map((data, x) => {
								if (checkItems.item && data.item) {
									checkItems.null = false;
									return getItem(data, x);
								} else if (checkItems.collection && data.collection && !data.personal) {
									checkItems.null = false;
									return getItem(data, x);
								} else if (checkItems.scroll && data.scroll) {
									checkItems.null = false;
									return getItem(data, x);
								} else if (checkItems.personal && data.personal) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}

					{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 1 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MagicWandOutline />} description="Бонус">{dataModal.bonus}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Валюта прокачки навыка">{dataModal.currency === 1 ? 'Золото' : 'Серебро'}</Cell>
						</Group>
					}
					{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 4 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description="Получение">{dataModal.from}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24AppleOutline />} description="Стоимость отправки на поиск">{dataModal.food} {numberForm(dataModal.food, ['еда', 'еды', 'еды'])}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Время поиска">{getTime(dataModal.time)}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24PaletteOutline />} description="Визуальных стадий">{dataModal.stages} {numberForm(dataModal.stages, ['стадия', 'стадии', 'стадий'])}</Cell>
							<Spacing separator size={16} />
							{dataModal.items.sort((a, b) => {
								return b.item - a.item || b.collection - a.collection || b.personal - a.personal || b.scroll - a.scroll;
							}).map((data, x) => {
								if (checkItems.item && data.item) {
									checkItems.null = false;
									return getItem(data, x);
								} else if (checkItems.collection && data.collection && !data.personal) {
									checkItems.null = false;
									return getItem(data, x);
								} else if (checkItems.scroll && data.scroll) {
									checkItems.null = false;
									return getItem(data, x);
								} else if (checkItems.personal && data.personal) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 5 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description="Получение">{dataModal.description}</Cell>
							<Link href={`image/${dataModal.icon}`} target="_blank"><Cell className="DescriptionWiki" before={<Icon24ChainOutline />} description="Изображение">Открыть полное изображение фона</Cell></Link>
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
			checkItems.null = true;
			isModalOpened(true);
		}
	}
	

	const onStoryChange = (e) => {
		setActivePanel(null);
		setActiveStory(e.currentTarget.dataset.story);
	}
	const testtest = (from, to) => {
		let number = 0;
		let response = from;
		for (let x = 0; x < Math.ceil((to-from)/19); x++) {
			if (response >= dataArena.league[0].from && response < dataArena.league[0].to) {
				number += dataArena.league[0].price;
				response += 19;
			} else if (response >= dataArena.league[1].from && response < dataArena.league[1].to) {
				number += dataArena.league[1].price;
				response += 19;
			} else if (response >= dataArena.league[2].from && response < dataArena.league[2].to) {
				number += dataArena.league[2].price;
				response += 19;
			} else if (response >= dataArena.league[3].from && response < dataArena.league[3].to) {
				number += dataArena.league[3].price;
				response += 19;
			} else if (response >= dataArena.league[4].from && response < dataArena.league[4].to) {
				number += dataArena.league[4].price;
				response += 19;
			} else if (response >= dataArena.league[5].from && response < dataArena.league[5].to) {
				number += dataArena.league[5].price;
				response += 19;
			} else if (response >= dataArena.league[6].from && response < dataArena.league[6].to) {
				number += dataArena.league[6].price;
				response += 19;
			} else if (response >= dataArena.league[7].from && response < dataArena.league[7].to) {
				number += dataArena.league[7].price;
				response += 19;
			} else if (response >= dataArena.league[8].from) {
				number += dataArena.league[8].price;
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
							</Group>
						</Panel>
						<Panel id="warlordArena_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordArena')}/>}>Калькулятор</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>На арене идёт состязание двух игроков с примерно одинаковыми характеристиками.<br/>В качестве награды за победу игрок получает: случайный сундук, 19 кубков и опыт.</span>}></Cell>
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
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Ежемесячно в игру поступают 2 новых предмета экипировки, которые доступны в качестве награды за арену.<br/>Чем выше лига - тем лучше и больше награда с ежемесячного сундука.</span>}></Cell>
								{dataArena.season.map((data, x_main) =>
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
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Подбор противников осуществляется из игроков в той же лиге, что и Вы.<br/>Чем выше ваша лига - тем выше шанс на выпадение более редкого сундука.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size="s">
									{dataArena.league.map((data, x) =>
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
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Из сундуков могут выпасть вещи, заточки, а так же ценные ресурсы.<br/>Трофейные сундуки могут выпасть только с противника, который состоит в гильдии."</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size="s">
									{dataArena.chest.map((data, x) =>
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
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.item} after={<Icon24TshirtOutline style={{color: checkItems.item ? 'var(--accent)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'item')}>Предмет</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.scroll} after={<Icon24StickerOutline style={{color: checkItems.scroll ? 'var(--accent)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'scroll')}>Заточка</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.collection} after={<Icon24CubeBoxOutline style={{color: checkItems.collection ? 'var(--accent)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'collection')}>Коллекция</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.personal} after={<Icon24CubeBoxOutline style={{color: checkItems.personal ? 'var(--destructive)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'personal')}>Личная коллекция</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
					</View>




					<View id="warlordCharacter" activePanel={!activePanel ? 'warlordCharacter' : activePanel} modal={modal}>
						<Panel id="warlordCharacter">
							<PanelHeader>Персонаж</PanelHeader>
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
									{dataCharacter.images.map((data, x) =>
										<div key={x}>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div className="headBannerWiki" style={{backgroundImage: `url(image/${data})`}} />
										</div>
									)}
								</Gallery>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card onClick={() => setActivePanel('warlordCharacter_1')}>
										<Cell before={<Icon24ArticleOutline />} description="Описание талантов персонажа">Таланты</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_2')}>
										<Cell before={<Icon24ArticleOutline />} description="Список достижений и условий">Достижения</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_3')}>
										<Cell before={<Icon24ArticleOutline />} description="Список ресурсов и их получение">Ресурсы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_4')}>
										<Cell before={<Icon24ArticleOutline />} description="Список питомцев и их награды">Питомцы</Cell>
									</Card>
								</CardGrid>
								<Spacing size={8} />
								<CardGrid size="l">
									<Card onClick={() => setActivePanel('warlordCharacter_5')}>
										<Cell before={<Icon24ArticleOutline />} description="Список фонов и другая информация">Прочее</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordCharacter_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Таланты</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 4 вида навыков и каждый можно прокачать до 9.999 уровня, цена с каждым разом увеличивается.<br/>Также за определённые уровни прокачки навыка можно получить достижение.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size="m">
									{dataCharacter.talents.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordCharacter`, data, 1)}>
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
						<Panel id="warlordCharacter_2">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Достижения</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Описание.</span>}></Cell>
							</Group>
						</Panel>
						<Panel id="warlordCharacter_3">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Ресурсы</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Описание.</span>}></Cell>
							</Group>
						</Panel>
						<Panel id="warlordCharacter_4">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Питомцы</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Чем выше уровень питомца, тем больше и лучше добыча с поисков.<br/>Питомца необходимо найти и выращивать, коллекции с поисков являются личными.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size="s">
									{dataCharacter.pets.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordCharacter`, data, 4)}>
											<Spinner size="regular" className="bannerPreloadWiki" />
											<Cell
												style={{
													backgroundImage: `url(image/${data.icon})`
												}}
											>{data.title}</Cell>
										</Card>
									)}
								</CardGrid>
								<Spacing separator size={16} />
								<CardGrid size="m">
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.item} after={<Icon24TshirtOutline style={{color: checkItems.item ? 'var(--accent)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'item')}>Предмет</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.scroll} after={<Icon24StickerOutline style={{color: checkItems.scroll ? 'var(--accent)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'scroll')}>Заточка</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.collection} after={<Icon24CubeBoxOutline style={{color: checkItems.collection ? 'var(--accent)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'collection')}>Коллекция</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell selectable checked={checkItems.personal} after={<Icon24CubeBoxOutline style={{color: checkItems.personal ? 'var(--destructive)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'personal')}>Личная коллекция</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordCharacter_5">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Прочее</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 8 видов причёсок, 5 видов бород и 5 видов шрамов.<br/>Смена ника стоит 10 рубинов и он должен быть от 2 до 16 символов.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size="s">
									{dataCharacter.backgrounds.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordCharacter`, data, 5)}>
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