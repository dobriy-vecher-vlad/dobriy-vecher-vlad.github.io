import bridge from "@vkontakte/vk-bridge";
import React, { useState } from 'react';
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
	Counter,
	Banner
} from '@vkontakte/vkui';
import {
	Icon28HomeOutline,
	Icon28UserCircleOutline,
	Icon28PawOutline,
	Icon28IncognitoOutline,
	Icon28GlobeOutline,
	Icon28Users3Outline,
	Icon28Smiles2Outline,
	Icon28GridSquareOutline,
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
	Icon24MagicWandOutline,
	Icon24UserSquareOutline,
	Icon24StatisticsOutline,
	Icon24KeyOutline,
	Icon24LocationOutline,
	Icon24HomeOutline,
	Icon24PawOutline
} from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

import Items from './data/items.json';
import Bosses from './data/bosses.json';
import dataMap from './data/map.json';
import dataArena from './data/arena.json';
dataArena.season = dataArena.season.reverse();
import dataCharacter from './data/character.json';
import dataGuild from './data/guild.json';

import X2JS from './xml2js.js';
const x2js = new X2JS();

bridge.subscribe(({ detail: { type, data }}) => {
	if (type === 'VKWebAppUpdateConfig') {
		const schemeAttribute = document.createAttribute('scheme');
		schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
		document.body.attributes.setNamedItem(schemeAttribute);
	}
});
bridge.send("VKWebAppInit");

const App = withAdaptivity(({ viewWidth }) => {
	/* 
	Full item image
	https://80831.selcdn.ru/storage2/clients/wl/vk/20210326_1/img_external/items/wshop/1816.png

	Full boss image
	https://80831.selcdn.ru/storage2/clients/wl/vk/20210326_1/img_external/npc/463.png
	*/
	const numberSpaces = (number, symbol = '.') => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
	}
	const numberForm = (number, titles) => {
		number = Math.abs(number);
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[(number%100>4&&number%100<20)?2:cases[(number%10<5)?number%10:5]];
	}
	function numberRandom(min = 1, max = 2) {
		return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
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
	const getItem = (data, x = numberRandom(1, 999)) => {
		return (
			<Cell 
				after={
					<span>
						<span className="itemPriceWiki">{numberSpaces(Items[data.id].price)}<Spinner size="small" className="itemPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/${Items[data.id].currency}.png)`}}/></span>
						<span className="itemTypeWiki">
							{checkItems.item && data.item && <Icon24TshirtOutline />}
							{checkItems.collection && data.collection && !data.personal && <Icon24CubeBoxOutline />}
							{checkItems.personal && data.personal && <Icon24CubeBoxOutline style={{color: 'var(--destructive)'}}/>}
							{checkItems.scroll && data.scroll && <Icon24StickerOutline />}
						</span>
					</span>
				} 
				className="itemCellWiki" key={x} before={<div><Spinner size="regular" className="itemAvatarPreloadWiki" /><div className="itemAvatarWiki" style={{backgroundImage: `url(image/${Items[data.id].icon})`}}></div></div>}
			>
				<InfoRow style={{marginBottom: '10px'}}><b>{Items[data.id].title}</b></InfoRow>
				<InfoRow><span className='itemTextWiki'>DMG</span> {numberSpaces(Items[data.id].dmg)}</InfoRow>
				<InfoRow><span className='itemTextWiki'>HP</span> {numberSpaces(Items[data.id].hp*15)}</InfoRow>
				{data.tooltip && data.tooltip.map((data, x) => 
					<InfoRow key={x} style={{marginTop: '10px'}}><span className='itemDescriptionWiki'>{data}</span></InfoRow>
				)}
			</Cell>
		)
	}

	const getParse = async() => {
		let xml = `
		<xml>
		</xml>
		`;
		let response = await x2js.xml_str2json(xml);
		let result = [];
		response.xml.i.forEach((item, x) => {
			result.push({
				_1title: item._name,
				_2dmg: Number(item._d2),
				_3hp: Number(item._d4),
				_4price: Number(
						Number(item._p1) !== 0 ? item._p1 :
						Number(item._p2) !== 0 ? item._p2 :
						Number(item._p3) !== 0 ? item._p3 :
						Number(item._p4) !== 0 ? item._p4 :
						Number(item._p5) !== 0 ? item._p5 :
						Number(item._p6)
					),
				_5currency: Number(
					Number(item._p1) !== 0 ? 1 :
					Number(item._p2) !== 0 ? 2 :
					Number(item._p3) !== 0 ? 3 :
					Number(item._p4) !== 0 ? 4 :
					Number(item._p5) !== 0 ? 5 :
					6
				),
				_6icon: `items/${item._id}.png`
			});
		});
		console.log(response);
		console.log(result);
		console.log(JSON.stringify(result));
	}
	// getParse();

	const platform = usePlatform();
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
	const hasHeader = platform !== VKCOM;

	const [activeStory, setActiveStory] = useState('home');
	const [activePanel, setActivePanel] = useState(null);
	const [activeModal, setActiveModal] = useState(null);
	const [user, setUser] = useState({vk: null, game: null});
	const [popout, setPopout] = useState(null);
	const [modalOpened, isModalOpened] = useState(false);
	// const [activeStory, setActiveStory] = useState('warlordMap');
	// const [activePanel, setActivePanel] = useState('warlordMap_6');
	const [dataModal, setDataModal] = useState(null);
	const [indexModal, setIndexModal] = useState(null);
	// const [modalOpened, isModalOpened] = useState(true);
	
	const [count_arena_1, setCountArena1] = useState(0);
	const [count_arena_2, setCountArena2] = useState(0);
	const [count_guild_1, setCountGuild1] = useState(0);
	const [count_guild_2, setCountGuild2] = useState(0);
	const [checkItems, setCheckItems] = useState({null: true, item: true, scroll: true, collection: true, personal: true});

	const isCheckItems = (e, id) => {
		checkItems[id] = e.target.checked;
		setCheckItems({null: checkItems.null, item: checkItems.item, scroll: checkItems.scroll, collection: checkItems.collection, personal: checkItems.personal});
	}

	const SortableItems = (
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
	);

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
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 2 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 3.1 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 3.2 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 4 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 5.1 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 5.2 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 6 && dataModal.title}
						{activeModal === 'modal-warlordMap' && dataModal && indexModal === 7 && dataModal.title}

						{activeModal === 'modal-warlordArena' && dataModal && indexModal === 2 && dataModal.name}
						{activeModal === 'modal-warlordArena' && dataModal && indexModal === 3 && dataModal.title}
						{activeModal === 'modal-warlordArena' && dataModal && indexModal === 4 && dataModal.title}

						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 1 && dataModal.title}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 2 && dataModal.name}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 3 && dataModal.title}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 4 && dataModal.title}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 5 && dataModal.title}
						{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 6 && dataModal.title}

						{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 2 && dataModal.title}
						{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 3 && dataModal.title}
						{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 4 && dataModal.title}
						{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 5 && dataModal.title}
						{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 6 && dataModal.title}
					</ModalPageHeader>
				}
			>
				<Group>
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 2 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24LocationOutline />} description="Местоположение">{dataModal.map}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24KeyOutline />} description="Предмет для улучшения">{dataModal.item}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Задержка перед обыском">{getTime(dataModal.time)}</Cell>
							<Spacing separator size={16} />
							<CardGrid size="m">
							{dataModal.levels.map((data, x) => {
								return (<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description={`${x+1} уровень`}>{data[0]} {numberForm(data[0], dataModal.sign)}<br/>{numberSpaces(data[1])} {numberForm(data[1], ['ресурс', 'ресурса', 'ресурсов'])}</Cell></Card>);
							})}
							</CardGrid>
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 3.1 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 3.2 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Spacing separator size={16} />
							<CardGrid size="m">
								<Card className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description={<span style={{whiteSpace: 'nowrap'}}>Требуемый уровень</span>}>{dataModal.lvl} уровень</Cell></Card>
								<Card className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description={<span style={{whiteSpace: 'nowrap'}}>Длительность похода</span>}>{getTime(dataModal.time)}</Cell></Card>
								<Card className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description={<span style={{whiteSpace: 'nowrap'}}>Стоимость похода</span>}>{dataModal.price} энергии</Cell></Card>
								<Card className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24SkullOutline />} description={<span style={{whiteSpace: 'nowrap'}}>Обход противника</span>}>{dataModal.skip} рубинов</Cell></Card>
							</CardGrid>
							<Spacing separator size={16} />
							{dataModal.pet && <Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description={<span style={{whiteSpace: 'nowrap'}}>Питомец</span>}>{dataModal.pet}</Cell>}
							{dataModal.chests && <Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description={<span style={{whiteSpace: 'nowrap'}}>Дополнительная награда</span>}><span style={{whiteSpace: 'nowrap'}}>{dataModal.chests}</span></Cell>}
							<Link href={`image/${dataModal.icon}`} target="_blank"><Cell className="DescriptionWiki" before={<Icon24ChainOutline />} description="Изображение">Открыть полное изображение похода</Cell></Link>
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 4 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24SkullOutline />} description="Хранитель рейда">{numberSpaces(dataModal.guard[0])} здоровья<br/>{numberSpaces(dataModal.guard[1])} атаки</Cell>
							<Spacing separator size={16} />
							<CardGrid size="m">
								{dataModal.chests.map((data, x) => 
									<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description={<span style={{whiteSpace: 'nowrap'}}>{data.title}</span>}>{data.count} {numberForm(data.count, ["штука", "штуки", "штук"])}</Cell></Card>
								)}
							</CardGrid>
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 5.1 &&
						<Group>
							{dataModal.items.map((data, x) => {
								checkItems.null = false;
								return getItem(data, x);
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 5.2 &&
						<Group>
							{dataModal.items.map((data, x) => {
								checkItems.null = false;
								return getItem(data, x);
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 6 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							{typeof dataModal.lvl != 'boolean' && <Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Требуемый уровень">{dataModal.lvl} уровень</Cell>}
							{typeof dataModal.boss != 'boolean' && <Cell className="DescriptionWiki" before={<Icon24PawOutline />} description="Необходимо убить босса">{Bosses[dataModal.boss].name}</Cell>}
							{dataModal.bosses.length !== 0 && <Spacing separator size={16} />}
							{dataModal.bosses.map((data, x) => {
								return <Cell key={x} className="DescriptionWiki" before={<Icon24SkullOutline />} description={Bosses[data].description}>{Bosses[data].name}</Cell>
							})}
							{dataModal.builds.length !== 0 && <Spacing separator size={16} />}
							{dataModal.builds.map((data, x) => {
								return <Cell key={x} className="DescriptionWiki" before={<Icon24HomeOutline />} description={dataMap.builds[data].description}>{dataMap.builds[data].title}</Cell>
							})}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 7 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24CupOutline />} description="Необходимо очков для захвата района">{numberSpaces(dataModal.score)} очков</Cell>
						</Group>
					}

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
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
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
					{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 2 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Spacing separator size={16} />
							<CardGrid size="m">
							{dataModal.levels.map((data, x) => {
								return (<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description={`${x+1} стадия`}>{numberSpaces(data)} {Array.isArray(dataModal.sign) ? numberForm(data, dataModal.sign) : dataModal.sign}</Cell></Card>);
							})}
							</CardGrid>
						</Group>
					}
					{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 3 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description="Получение">{dataModal.from}</Cell>
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
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
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
					{activeModal === 'modal-warlordCharacter' && dataModal && indexModal === 6 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description="Получение">{dataModal.description}</Cell>
							<Link href={`image/${dataModal.icon}`} target="_blank"><Cell className="DescriptionWiki" before={<Icon24ChainOutline />} description="Изображение">Открыть полное изображение аватара</Cell></Link>
						</Group>
					}

					{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 2 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MagicWandOutline />} description="Бонус за каждый уровень">{dataModal.bonus}</Cell>
							<Spacing separator size={16} />
							<CardGrid size="m">
							{dataModal.levels.map((data, x) => {
								if ((dataModal.title === 'Стража Форта' || dataModal.title === 'Таран') && x === dataModal.levels.length-1) {
									return (<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description={`За каждый уровень`}>+2.000<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>+5.000<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/></Cell></Card>);
								} else {
									return (<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description={`${x+1} уровень`}>{numberSpaces(data[0])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>{numberSpaces(data[1])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/></Cell></Card>);
								}
							})}
							</CardGrid>
						</Group>
					}
					{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 4 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MagicWandOutline />} description="Бонус за каждый уровень">{dataModal.bonus}</Cell>
							<Spacing separator size={16} />
							<CardGrid size="m">
							{dataModal.levels.map((data, x) => {
								return (<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description={`${x+1} уровень`}>{numberSpaces(data)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/${dataModal.currency === 1 ? 5 : 4}.png)`}}/></Cell></Card>);
							})}
							</CardGrid>
						</Group>
					}
					{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 5 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 6 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Стаж">{dataModal.days} дней</Cell>
							<Cell className="DescriptionWiki" before={<Icon24UserSquareOutline />} description="Характеристики">{numberSpaces(dataModal.hp)} здоровья и {numberSpaces(dataModal.dmg)} атаки</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость создания">{numberSpaces(dataModal.price[0])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>{numberSpaces(dataModal.price[1])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/></Cell>
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									checkItems.null = false;
									return getItem(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
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
		let dataGame = await getData('xml', `https://backup1.geronimo.su/gameHub/index.php?api_uid=${dataVK.id}&api_type=vk`);
		setUser({vk: dataVK, game: dataGame.s});
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
							<PanelHeader>Warlord Helper</PanelHeader>
							<Group>
								<Banner
									className="HeadBannerWiki toLeft"
									mode="image"
									size="m"
									header={<span>Warlord Script</span>}
									subheader={<span>Расширение, позволяющее смотреть<br/>любые характеристики игроков</span>}
									background={
										<React.Fragment>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div
												className="LabelBannerWiki"
												style={{
													backgroundImage: 'url(image/main/label_1.png)'
												}}
											/>
										</React.Fragment>
									}
									actions={<Button href="https://chrome.google.com/webstore/detail/warlord-script/lnohbnecjodgkjkfcfaamadbeiapofoa" target="_blank" mode="overlay_primary" size="l">Установить</Button>}
								/>
								<Spacing size={8} />
								<Banner
									className="HeadBannerWiki toRight"
									mode="image"
									size="m"
									header={<span>Сообщество приложения</span>}
									subheader={<span>Вся информация по игре<br/>и многое другое</span>}
									background={
										<React.Fragment>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div
												className="LabelBannerWiki"
												style={{
													backgroundImage: 'url(image/main/label_2.png)'
												}}
											/>
										</React.Fragment>
									}
									actions={<Button href="https://vk.com/wiki.warlord" target="_blank" mode="overlay_primary" size="l">Вступить</Button>}
								/>
								<Spacing size={8} />
								<Banner
									className="HeadBannerWiki toLeft"
									mode="image"
									size="m"
									header={<span>События Warlord</span>}
									subheader={<span>Новости игры, энергия<br/>и многое другое</span>}
									background={
										<React.Fragment>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div
												className="LabelBannerWiki"
												style={{
													backgroundImage: 'url(image/main/label_5.png)'
												}}
											/>
										</React.Fragment>
									}
									actions={<Button href="https://vk.com/club125247255" target="_blank" mode="overlay_primary" size="l">Вступить</Button>}
								/>
								<Spacing size={8} />
								<Banner
									className="HeadBannerWiki toRight"
									mode="image"
									size="m"
									header={<span>Конституционный Cуд</span>}
									subheader={<span>Вас кинули? Обманули?<br/>Вам некуда податься?</span>}
									background={
										<React.Fragment>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div
												className="LabelBannerWiki"
												style={{
													backgroundImage: 'url(image/main/label_4.png)'
												}}
											/>
										</React.Fragment>
									}
									actions={<Button href="https://vk.com/club133931816" target="_blank" mode="overlay_primary" size="l">Сообщить</Button>}
								/>
								<Spacing size={8} />
								<Banner
									className="HeadBannerWiki toLeft"
									mode="image"
									size="m"
									header={<span>Сообщество игры</span>}
									subheader={<span>Официальное сообщество<br/>с розыгрышами призов</span>}
									background={
										<React.Fragment>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div
												className="LabelBannerWiki"
												style={{
													backgroundImage: 'url(image/main/label_3.png)'
												}}
											/>
										</React.Fragment>
									}
									actions={<Button href="https://vk.com/club122851042" target="_blank" mode="overlay_primary" size="l">Вступить</Button>}
								/>
								{/* <Spacing separator size={16} />
								<CardGrid size="m">
									<Card onClick={() => bridge.send("VKWebAppAddToFavorites")}>
										<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Добавляй приложение в избранное, чтобы всегда было под рукой!">Добавить в избранное</Cell>
									</Card>
									<Card onClick={() => bridge.send("VKWebAppGetGroupInfo", {"group_id": 138604865})}>
										<Cell className="DescriptionWiki" before={<Icon24UsersOutline />} description="Вступай в сообщество и отслеживай новинки приложения!">Вступить в сообщество</Cell>
									</Card>
								</CardGrid> */}
							</Group>
						</Panel>
					</View>




					<View id="profile" activePanel="profile">
						<Panel id="profile">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Мой профиль</PanelHeader>
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
										<Link style={{ color: 'var(--text_secondary)' }} href={`https://vk.com/id${user.vk.id}`} target="_blank">@{user.vk.id}</Link>
									</Gradient>
									<Spacing size={8} />
									{user.game.map((data, x) =>
										<React.Fragment>
											{x != 0 && <Spacing separator size={16} />}
											<Header subtitle={data._url}>Сервер {data._n}</Header>
											<CardGrid size="s">
												<Card className="DescriptionCardWiki">
													<Cell before={<Icon24KeyOutline />} description="Игровой ID">{data._uid}</Cell>
												</Card>
												<Card className="DescriptionCardWiki">
													<Cell before={<Icon24MentionOutline />} description="Игровой ник">{data._un}</Cell>
												</Card>
												<Card className="DescriptionCardWiki">
													<Cell before={<Icon24StatisticsOutline />} description="Уровень">{data._ulvl}</Cell>
												</Card>
											</CardGrid>
										</React.Fragment>
									)}
								</Group>
								}
						</Panel>
					</View>




					<View id="warlordMap" activePanel={!activePanel ? 'warlordMap' : activePanel} modal={modal}>
						<Panel id="warlordMap">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Карта</PanelHeader>
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
									{dataMap.images.map((data, x) =>
										<div key={x}>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div className="headBannerWiki" style={{backgroundImage: `url(image/${data})`}} />
										</div>
									)}
								</Gallery>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card onClick={() => setActivePanel('warlordMap_1')}>
										<Cell before={<Icon24ArticleOutline />} description="Список предметов и цен">Мустафа</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_2')}>
										<Cell before={<Icon24ArticleOutline />} description="Список зданий для обыска">Обыск</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_3')}>
										<Cell before={<Icon24ArticleOutline />} description="Список походов и наград">Походы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_4')}>
										<Cell before={<Icon24ArticleOutline />} description="Список рейдов и наград">Рейды</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_5')}>
										<Cell before={<Icon24ArticleOutline />} description="Список приключений и наград">Приключения</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_6')}>
										<Cell before={<Icon24ArticleOutline />} description="Описание районов">Районы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_7')}>
										<Cell before={<Icon24ArticleOutline />} description="Описание захвата района">Захват</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordMap_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Мустафа</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Описание.</span>}></Cell>
							</Group>
						</Panel>
						<Panel id="warlordMap_2">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Обыск</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>При помощи обыска можно получать различные ресурсы со зданий.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataMap.builds.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 2)}>
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
						<Panel id="warlordMap_3">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Походы</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Походы доступны с 10 уровня. В день возможно запустить поход 7 раз.<br/>В походах можно найти уникальных питомцев, а также ключи к фонам.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataMap.crusade.chests.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 3.1)}>
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
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataMap.crusade.points.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 3.2)}>
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
								{SortableItems}
							</Group>
						</Panel>
						<Panel id="warlordMap_4">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Рейды</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Рейды доступны с 40 уровня. В день возможно войти в рейд не более 3 раз.<br/>Чтобы открыть новый режим сложности, требуется убить финального босса на предыдущем режиме.</span>}></Cell>
								<Spacing size={8} />
								{dataMap.raids.map((data, x) =>
									<Gradient className="GradientBannerWiki" key={x}>
										<Header indicator={<Link href={data.map} target="_blank"><Counter size="s" mode="primary">Открыть карту</Counter></Link>} subtitle={data.description}>{data.title}</Header>
										<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
											{data.levels.map((data, x) =>
												<Card className="BannerWiki Scroll" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 4)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}</Cell>
												</Card>
											)}
										</CardScroll>
									</Gradient>
								)}
								<Spacing size={8} />
								{SortableItems}
							</Group>
						</Panel>
						<Panel id="warlordMap_5">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Приключения</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Приключения доступны с 30 уровня. В день возможно войти в приключения не более 8 раз.<br/>После прохождения всех этажей, открывается возможность получать заточки за каждый бой.</span>}></Cell>
								<Spacing size={8} />
								{dataMap.adventures.map((data, x) =>
									<Gradient className="GradientBannerWiki" key={x}>
										<Header indicator={<Link onClick={() => OpenModal(`modal-warlordMap`, data.scrolls, 5.2)}><Counter size="s" mode="primary">Посмотреть заточки</Counter></Link>} subtitle={data.description}>{data.title}</Header>
										<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
											{data.floors.map((data, x) =>
												<Card className="BannerWiki Scroll" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 5.1)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}</Cell>
												</Card>
											)}
										</CardScroll>
									</Gradient>
								)}
							</Group>
						</Panel>
						<Panel id="warlordMap_6">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Районы</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Районы это главная часть всей игры. Всего их 34 штуки.<br/>Каждый район имеет внутри себя босса и по возможности постройку.</span>}></Cell>
								<Spacing size={8} />
								{dataMap.regions.map((data, x) =>
									<Gradient className="GradientBannerWiki" key={x}>
										<Header indicator={<Counter size="s" mode="secondary">{data.items.length} {numberForm(data.items.length, ['район', 'района', 'районов'])}</Counter>}>{data.title}</Header>
										<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
											{data.items.map((data, x) =>
												<Card className="BannerWiki Scroll" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 6)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}</Cell>
												</Card>
											)}
										</CardScroll>
									</Gradient>
								)}
							</Group>
						</Panel>
						<Panel id="warlordMap_7">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordMap')}/>}>Захват</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Приключения доступны с 30 уровня. В день возможно войти в приключения не более 8 раз.<br/>После прохождения всех этажей, открывается возможность получать заточки за каждый бой.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataMap.capture.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordMap`, data, 7)}>
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




					<View id="warlordBosses" activePanel="warlordBosses">
						<Panel id="warlordBosses">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Боссы</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28PawOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
							</Group>
						</Panel>
					</View>




					<View id="warlordArena" activePanel={!activePanel ? 'warlordArena' : activePanel} modal={modal}>
						<Panel id="warlordArena">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Арена</PanelHeader>
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
								<CardGrid size={isDesktop ? "s" : "m"}>
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
								<CardGrid size={isDesktop ? "s" : "m"}>
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
								{SortableItems}
							</Group>
						</Panel>
					</View>




					<View id="warlordCharacter" activePanel={!activePanel ? 'warlordCharacter' : activePanel} modal={modal}>
						<Panel id="warlordCharacter">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Персонаж</PanelHeader>
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
									<Card onClick={() => setActivePanel('warlordCharacter_6')}>
										<Cell before={<Icon24ArticleOutline />} description="Список аватаров и их получение">Аватары</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_5')}>
										<Cell before={<Icon24ArticleOutline />} description="Список фонов и их получение">Фоны</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordCharacter_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Таланты</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 4 вида навыков и каждый можно прокачать до 9.999 уровня, цена с каждым разом увеличивается.<br/>Также за определённые уровни прокачки навыка можно получить достижение.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
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
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 80 достижений и почти каждое имеет 10 стадий.<br/>За каждую стадию достижения игрок получает награду в виде 1 рубина.</span>}></Cell>
								{dataCharacter.achievements.map((data, x_main) =>
										<Gradient className="GradientBannerWiki" key={x_main}>
											<Header indicator={<Counter size="s" mode="secondary">{data.items.length} {numberForm(data.items.length, ['достижение', 'достижения', 'достижений'])}</Counter>}>{data.title}</Header>
											<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
												{data.items.map((data, x) => 
													<Card className="BannerWiki Scroll" key={x} onClick={() => OpenModal(`modal-warlordCharacter`, data, 2)}>
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
						<Panel id="warlordCharacter_3">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Ресурсы</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>В игре множество ресурсов и каждый добывается своим способом.<br/>Иногда ресурсы можно получить по подарочной ссылке в официальной группе.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataCharacter.resources.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordCharacter`, data, 3)}>
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
						<Panel id="warlordCharacter_4">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Питомцы</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Чем выше уровень питомца, тем больше и лучше добыча с поисков.<br/>Питомца необходимо найти и выращивать, коллекции с поисков являются личными.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
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
								{SortableItems}
							</Group>
						</Panel>
						<Panel id="warlordCharacter_5">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Фоны</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 9 видов фонов.<br/>Зимние фоны включаются сами в новогодние праздники.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
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
						<Panel id="warlordCharacter_6">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Аватары</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 27 видов аватаров.<br/>Выбранный аватар отображается в списке друзей и боя.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataCharacter.avatars.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordCharacter`, data, 6)}>
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




					<View id="warlordGuild" activePanel={!activePanel ? 'warlordGuild' : activePanel} modal={modal}>
						<Panel id="warlordGuild">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Гильдия</PanelHeader>
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
									{dataGuild.images.map((data, x) =>
										<div key={x}>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div className="headBannerWiki" style={{backgroundImage: `url(image/${data})`}} />
										</div>
									)}
								</Gallery>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card onClick={() => setActivePanel('warlordGuild_1')}>
										<Cell before={<Icon24ArticleOutline />} description="Затраты на казну гильдии">Калькулятор</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_2')}>
										<Cell before={<Icon24ArticleOutline />} description="Список улучшений и цен">Улучшения</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_3')}>
										<Cell before={<Icon24ArticleOutline />} description="Список экипировки и её цен">Кузница</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_4')}>
										<Cell before={<Icon24ArticleOutline />} description="Список навыков и их цен">Академия</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_5')}>
										<Cell before={<Icon24ArticleOutline />} description="Список набегов и их наград">Набеги</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_6')}>
										<Cell before={<Icon24ArticleOutline />} description="Список рейдов и их наград">Рейды</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordGuild_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Калькулятор</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Аметисты и Топазы можно получить только вкладываясь в улучшения навыков гильдии и при пополнении казны.<br/>Пополнять казну гильдии можно только в определённом количестве.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(75*1)} золота`}>{numberSpaces(1)} {numberForm(1, ['топаз', 'топаза', 'топазов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(55*1)} серебра`}>{numberSpaces(1)} {numberForm(1, ['аметист', 'аметиста', 'аметистов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(75*5)} золота`}>{numberSpaces(5)} {numberForm(5, ['топаз', 'топаза', 'топазов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(55*5)} серебра`}>{numberSpaces(5)} {numberForm(5, ['аметист', 'аметиста', 'аметистов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(75*25)} золота`}>{numberSpaces(25)} {numberForm(25, ['топаз', 'топаза', 'топазов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(55*25)} серебра`}>{numberSpaces(25)} {numberForm(25, ['аметист', 'аметиста', 'аметистов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(75*50)} золота`}>{numberSpaces(50)} {numberForm(50, ['топаз', 'топаза', 'топазов'])}</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell before={<Icon24MoneyCircleOutline />} description={`${numberSpaces(55*50)} серебра`}>{numberSpaces(50)} {numberForm(50, ['аметист', 'аметиста', 'аметистов'])}</Cell>
									</Card>
								</CardGrid>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card mode="shadow">
										<FormItem top="Необходимое количество Топазов">
											<Slider
												step={1}
												min={0}
												max={50000}
												value={Number(count_guild_1)}
												onChange={count => setCountGuild1(Number(count))}
											/>
										</FormItem>
										<FormItem>
											<Input value={String(count_guild_1)} min={0} onChange={e => setCountGuild1(Number(e.target.value))} type="number"/>
										</FormItem>
									</Card>
									<Card mode="shadow">
										<FormItem top="Необходимое количество Аметистов">
											<Slider
												step={1}
												min={0}
												max={50000}
												value={Number(count_guild_2)}
												onChange={count => setCountGuild2(Number(count))}
											/>
										</FormItem>
										<FormItem>
											<Input value={String(count_guild_2)} min={0} onChange={e => setCountGuild2(Number(e.target.value))} type="number"/>
										</FormItem>
									</Card>
								</CardGrid>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card className="DescriptionCardWiki">
										<Cell className="DescriptionWiki" before={<Icon24RobotOutline />}>
											<InfoRow style={{marginBottom: '10px'}} header="Потратить золота необходимо">{numberSpaces(count_guild_1*75)}</InfoRow>
											<InfoRow header="Пополнений казны необходимо">{numberSpaces(Math.ceil(count_guild_1*75/3750))}</InfoRow>
										</Cell>
									</Card>
									<Card className="DescriptionCardWiki">
										<Cell className="DescriptionWiki" before={<Icon24RobotOutline />}>
											<InfoRow style={{marginBottom: '10px'}} header="Потратить серебра необходимо">{numberSpaces(count_guild_2*55)}</InfoRow>
											<InfoRow header="Пополнений казны необходимо">{numberSpaces(Math.ceil(count_guild_2*55/2750))}</InfoRow>
										</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordGuild_2">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Улучшения</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Благодаря улучшениям зданий, вам открываются новые ступени навыков, вещи в кузнице и сборщики налогов, позволяющие собирать различные бонусы.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataGuild.builds.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordGuild`, data, 2)}>
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
						<Panel id="warlordGuild_3">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Кузница</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Аметисты и Топазы можно получить только вкладываясь в улучшения навыков и при пополнении казны.<br/>Заточки можно купить после покупки самого предмета.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataGuild.items.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordGuild`, data, 3)}>
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
						<Panel id="warlordGuild_4">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Академия</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Навыки гильдии это уникальные бонусы, чей бонус зависим от уровня самого навыка.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataGuild.academy.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordGuild`, data, 4)}>
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
						<Panel id="warlordGuild_5">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Набеги</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Набеги это уникальный вид боя всех участников гильдии против вражеской гильдии или NPC.<br/>Набеги доступны всем гильдиям, начиная с 5 уровня.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataGuild.raids.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordGuild`, data, 5)}>
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
								{SortableItems}
							</Group>
						</Panel>
						<Panel id="warlordGuild_6">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Рейды</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Глава гильдии или её генералы могут создавать рейдовых боссов гильдии.<br/>Золото и серебро, требуемое для создания, взимается с казны гильдии.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"}>
									{dataGuild.bosses.map((data, x) =>
										<Card className="BannerWiki" key={x} onClick={() => OpenModal(`modal-warlordGuild`, data, 6)}>
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
								{SortableItems}
							</Group>
						</Panel>
					</View>



					
					<View id="warlordOther" activePanel="warlordOther">
						<Panel id="warlordOther">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Разное</PanelHeader>
							<Group>
								<Placeholder
									icon={<Icon28GridSquareOutline width={56} height={56} />}
									action={<Link href="https://vk.com/wiki.warlord" target="_blank"><Button size="m">Пиши нам!</Button></Link>}
								>
									Заметил ошибку или есть идеи по улучшению приложения?
								</Placeholder>
								<Spacing separator size={16} />
								{getItem({id: 744, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 745, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 746, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 747, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 748, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 749, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 750, tooltip: ["Новый предмет в игре"]})}
								{getItem({id: 751, tooltip: ["Новый предмет в игре"]})}
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