import bridge from "@vkontakte/vk-bridge";
import React, { useState, version } from 'react';
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
	Banner,
	Tabs,
	HorizontalScroll,
	TabsItem,
	ModalCard,
	Select,
	CustomSelectOption
} from '@vkontakte/vkui';
import {
	Icon28HomeOutline,
	Icon28PawOutline,
	Icon28IncognitoOutline,
	Icon28GlobeOutline,
	Icon28Users3Outline,
	Icon28Smiles2Outline,
	Icon28GridSquareOutline,
	Icon24SkullOutline,
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
	Icon24GiftOutline,
	Icon24ChainOutline,
	Icon24AppleOutline,
	Icon24PaletteOutline,
	Icon24MagicWandOutline,
	Icon24UserSquareOutline,
	Icon24KeyOutline,
	Icon24LocationOutline,
	Icon24HomeOutline,
	Icon24PawOutline,
	Icon24CheckCircleOutline,
	Icon28DonateOutline,
	Icon28CancelCircleOutline,
	Icon28CheckCircleOutline,
	Icon28ReportOutline
} from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

import Items from './data/items.json';
import Collections from './data/collections.json';
import Bosses from './data/bosses.json';

import dataMap from './data/map.json';
import dataBosses from './data/boss.json';
import dataArena from './data/arena.json';
dataArena.season = dataArena.season.reverse();
import dataCharacter from './data/character.json';
import dataGuild from './data/guild.json';
import dataOther from './data/other.json';
dataOther.events = dataOther.events.reverse();

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

let api_id = 5536422;
let clan_id = 292859277;
let clan_auth = 'de73003f6d508e583e9c7f316024abbf';
// let admins = [14973344];
let admins = [153968505, 14973344];
let syncUser = null;
let syncUserGame = null;
let isDonut = false;
let syncItems = [];
let server = 1;

let countBossAll = {
	skill_1: 0,
	skill_2: 0,
	skill_3: 0,
	skill_4: 0,
	spell_1: 0,
	spell_2: 0,
	spell_3: 0
};
let newBossID = 5;

const App = withAdaptivity(({ viewWidth }) => {
	/* 
	Full item image
	https://80831.selcdn.ru/storage2/clients/wl/vk/20210326_1/img_external/items/wshop/1816.png

	Full boss image
	https://80831.selcdn.ru/storage2/clients/wl/vk/20210326_1/img_external/npc/463.png
	*/
	const platform = usePlatform();
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
	const hasHeader = platform !== VKCOM;

	const [user, setUser] = useState({vk: null, game: null});
	const [activeStory, setActiveStory] = useState(null);
	const [activePanel, isActivePanel] = useState(null);
	const [activeModal, setActiveModal] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner />);
	const [modalOpened, isModalOpened] = useState(false);
	// const [activeStory, setActiveStory] = useState('warlordBosses');
	// const [activePanel, setActivePanel] = useState('profile_1');
	// const [popout, setPopout] = useState(null);
	const [dataModal, setDataModal] = useState(null);
	const [indexModal, setIndexModal] = useState(null);
	// const [modalOpened, isModalOpened] = useState(true);
	
	const [count_boss, setCountBoss] = useState({clearDamage: 0, totalDamage: 0, leftHP: 0, totalHit: 0});
	const [count_arena_1, setCountArena1] = useState(0);
	const [count_arena_2, setCountArena2] = useState(0);
	const [count_guild_1, setCountGuild1] = useState(0);
	const [count_guild_2, setCountGuild2] = useState(0);
	const [checkItems, setCheckItems] = useState({null: true, item: true, scroll: true, collection: true, personal: true, stock: true, yesStock: true, noStock: true});
	const [checkTabs, setCheckTabs] = useState(2);
	const [isCountItem, setCountItem] = useState({yesStock: 0, noStock: 0, null: true});
	const [profileItems, setProfileItems] = useState(null);


	const [newBossCount, setNewBossCount] = useState(1);
	const [newBossArray, setNewBossArray] = useState([
		Bosses.find(item => item.id === 1),
		Bosses.find(item => item.id === 3),
		Bosses.find(item => item.id === 11),
		Bosses.find(item => item.id === 12),
		Bosses.find(item => item.id === 27),
		Bosses.find(item => item.id === 60),
		Bosses.find(item => item.id === 61),
		Bosses.find(item => item.id === 62),
		Bosses.find(item => item.id === 63),
		Bosses.find(item => item.id === 64),
		Bosses.find(item => item.id === 65),
		Bosses.find(item => item.id === 66),
		Bosses.find(item => item.id === 67),
		Bosses.find(item => item.id === 68),
		Bosses.find(item => item.id === 69),
		Bosses.find(item => item.id === 278),
		Bosses.find(item => item.id === 279),
		Bosses.find(item => item.id === 284),
		Bosses.find(item => item.id === 285),
		Bosses.find(item => item.id === 286),
		Bosses.find(item => item.id === 287),
		Bosses.find(item => item.id === 288),
		Bosses.find(item => item.id === 289),
		Bosses.find(item => item.id === 290),
		Bosses.find(item => item.id === 291),
		Bosses.find(item => item.id === 313),
		Bosses.find(item => item.id === 337),
		Bosses.find(item => item.id === 338),
		Bosses.find(item => item.id === 339),
		Bosses.find(item => item.id === 340),
		Bosses.find(item => item.id === 341),
		Bosses.find(item => item.id === 342),
		Bosses.find(item => item.id === 357),
		Bosses.find(item => item.id === 358),
		Bosses.find(item => item.id === 390),
		Bosses.find(item => item.id === 393),
		Bosses.find(item => item.id === 454),
		Bosses.find(item => item.id === 455),
		Bosses.find(item => item.id === 458),
		Bosses.find(item => item.id === 459),
		Bosses.find(item => item.id === 460)
	]);
	const [newBossHP, setNewBossHP] = useState(0);
	const [newBossDMG, setNewBossDMG] = useState(0);
	const setNewBoss = async(mode) => {
		if (mode === 'open') {
			setNewBossHP(0);
			setNewBossDMG(0);
			OpenModal(`modal-warlordBossCreate`);
		}
		if (mode === 'create') {
			isModalOpened(false);
			Bosses.push({
				id: Bosses.length,
				name: `Свой противник #${newBossCount}`,
				description: 'Долбоёб автор! Хуйня у тебя получилась!',
				hp: newBossHP,
				dmg: newBossDMG,
				background: 'bosses/backgrounds/19.png',
				image: 'bosses/images/0.png',
				icon: 'bosses/icons/0.png'
			});
			setNewBossCount(newBossCount+1);
			newBossID = Bosses.length-1;
			newBossArray.push(Bosses[Bosses.length-1]);
			CalcBoss();
		}
	}
	const isCalcBoss = (e, id) => {
		// console.warn('isCalcBoss', activePanel);
		countBossAll[id] = e.target.value;
		CalcBoss();
	};
	const CalcBoss = async() => {
		let mode = 2;
		// console.warn('CalcBoss', activePanel);
		let Boss = Bosses[newBossID];
		let BossDamage = Boss.dmg; //урон босса
		let BossHealth = Boss.hp; //здоровье босса
		let MyDamage = Number(countBossAll.skill_2); //урон игрока
		let MyHealth = Number(countBossAll.skill_1); //здоровье игрока
		let MyBonus = Number(countBossAll.skill_3); //невидимый удар
		let MyHealthBonus = Number(countBossAll.skill_4); //мастер целитель
		let MySpell1 = Number(countBossAll.spell_2); //свитки молнии
		let MySpell2 = Number(countBossAll.spell_3); //свитки огня
		let MySpell3 = Number(countBossAll.spell_1); //банки здоровья
		let MySpell1DamageHelp = Math.floor(MyDamage * 1.5);
		let MySpell2DamageHelp = Math.floor(MyDamage * 3);
		let MySpell3DamageHealth = MySpell3 * (MyHealthBonus * 3 + 250);
		let HitNumber = Math.ceil((MyHealth + MySpell3DamageHealth) / BossDamage) == 0 ? 1 : Math.ceil((MyHealth + MySpell3DamageHealth) / BossDamage);
		let HitNumberSpell = MySpell1 + MySpell2 > HitNumber ? HitNumber : MySpell1 + MySpell2;
		let HitMySpell1,
			HitMySpell2,
			MySpell1Damage,
			MySpell2Damage,
			MySpellHelpAll,
			MySpellHelp;
		if (mode == 1) {
			HitMySpell1 = MySpell1 > HitNumberSpell ? HitNumberSpell : MySpell1;
			MySpell1Damage = HitMySpell1 * MySpell1DamageHelp;
			MySpellHelpAll = HitNumberSpell - HitMySpell1;
			MySpellHelp = MySpellHelpAll <= 0 ? 0 : MySpellHelpAll;
			MySpell2Damage = MySpellHelp * MySpell2DamageHelp;
		} else {
			HitMySpell2 = MySpell2 > HitNumberSpell ? HitNumberSpell : MySpell2;
			MySpell2Damage = HitMySpell2 * MySpell2DamageHelp;
			MySpellHelpAll = HitNumberSpell - HitMySpell2;
			MySpellHelp = MySpellHelpAll <= 0 ? 0 : MySpellHelpAll;
			MySpell1Damage = MySpellHelp * MySpell1DamageHelp;
		}
		let MyClearDamage = MyDamage * (HitNumber - HitNumberSpell);
		let MyInvisibleDamageHit = MyBonus == 0 ? 0 : (MyBonus * 7) + MyDamage;
		let MyInvisibleDamage = Math.floor((HitNumber + 9) / 9);
		let ResultMyInvisibleDamage = MyInvisibleDamageHit * MyInvisibleDamage;
		let ResultMyAllDamage = MyClearDamage + ResultMyInvisibleDamage + MySpell1Damage + MySpell2Damage;
		let ResultBossTotalHP = BossHealth - ResultMyAllDamage;
		setCountBoss({
			clearDamage: MyClearDamage,
			totalDamage: ResultMyAllDamage,
			leftHP: ResultBossTotalHP,
			totalHit: HitNumber
		})
	}


	const getBridge = async(method, params) => {
		let data = null;
		try {
			data = await bridge.send(method, params);
		} catch (error) {
			console.log(error);
		}
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
	};
	const numberSpaces = (number, symbol = '.') => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
	}
	const numberForm = (number, titles) => {
		number = Math.abs(number);
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[(number%100>4&&number%100<20)?2:cases[(number%10<5)?number%10:5]];
	};
	const numberRandom = (min = 1, max = 2) => {
		return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
	};
	const getTime = (s = 0) => {
		let hours = Math.floor(s/(60*60));
		let minutes = parseInt((s/(60))%60);
		let seconds = parseInt((s)%60);
		return `${String(hours).length === 1 ? `0${hours}` : hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}:${String(seconds).length === 1 ? `0${seconds}` : seconds}`
	};
	const getItemCell = (data, x = numberRandom(1, 999)) => {
		// console.warn('getItemCell', activePanel);
		let syncItem = syncItems.indexOf(+/\d+/.exec(Items[data.id].icon)) == -1 ? false : true;
		if (!checkItems.stock && syncItem) {
			return;
		}
		checkItems.null = false;
		return (
			<Cell 
				after={
					<span>
						<span className="itemPriceWiki">{numberSpaces(Items[data.id].price)}<Spinner size="small" className="itemPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/${Items[data.id].currency}.png)`}}/></span>
						<span className="itemTypeWiki">
							{isDonut && checkItems.stock && ((checkItems.item && data.item) || (checkItems.collection && data.collection)) && syncItem && <Icon24CheckCircleOutline style={{color: 'var(--dynamic_green)'}}/>}
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
	};
	const getItemPreview = (data, x, tooltip) => {
		// console.warn('getItemPreview', activePanel);
		let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
		if (checkItems.yesStock || checkItems.noStock) {
			if (checkItems.yesStock && checkItems.noStock) {
				
			} else {
				if (checkItems.yesStock && !syncItem || checkItems.noStock && syncItem) {
					return;
				}
			}
		} else {
			return;
		}
		isCountItem.null = false;
		return (
			<Card key={x} onClick={() => OpenModal(`modal-warlordItem`, {id: Items.indexOf(data)})} className="CardWithAvatar itemPreview">
				<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki" /><Avatar className="withPreload" src={`image/${data.icon}`}/></div>} description={tooltip ? tooltip : syncItem ? "Присутствует" : "Отсутствует"}>{data.title}</Cell>
			</Card>
		)
	};

	const getParse = async() => {
		let xml = ``;
		let response = await x2js.xml_str2json(xml);
		let result = [];
		response.shop.i.forEach((item, x) => {
			result.push({
				id: Number(item._id),
				title: item._name,
				dmg: Number(item._d2),
				hp: Number(item._d4),
				price: [
						Number(item._p1),
						Number(item._p2),
						Number(item._p3),
						Number(item._p4),
						Number(item._p5),
						Number(item._p6)
					]
			});
		});
		console.log(response);
		console.log(result);
		
		let responseItems = [];
		dataGuild.items.map((data, x) => {
			let find = result.find(x => x.id === data.title);
			responseItems.push({
				_0id: find.id,
				_1title: find.title,
				_2price: [find.price[3], find.price[4]],
				_3stats: [find.dmg, find.hp],
				_4days: data.days,
				_5build: data.build,
				_6icon: `guild/item_${x+1}.png`
			});
		});
		console.log(responseItems);
		console.log(JSON.stringify(responseItems));
	}
	// getParse();

	const setActivePanel = (name = 'home', close = false) => {
		// console.warn('setActivePanel', activePanel);
		setCheckItems({null: true, item: true, scroll: true, collection: true, personal: true, stock: true, yesStock: true, noStock: true});
		checkItems.null = true;
		if (name == 'profile_1') {
			if (close && !isDonut) {
				OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри свой арсенал'}, null, 'card');
			} else {
				let array = [];
				let yesStock = 0;
				let noStock = 0;
				Items.map((data, x) => {
					if (data.type == checkTabs) {
						let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
						syncItem ? yesStock++ : noStock++;
						array.push(data);
					}
				});
				isCountItem.yesStock = yesStock;
				isCountItem.noStock = noStock;
				setProfileItems(array);
			}
		}
		if (name == 'profile_2') {
			if (close && !isDonut) {
				OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри свои коллекции'}, null, 'card');
			} else {
				let array = [];
				let yesStock = 0;
				let noStock = 0;
				Collections.map((data, x) => {
					data = Items.find(x => x.id === data);
					if (data.type == checkTabs) {
						let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
						syncItem ? yesStock++ : noStock++;
						array.push(data);
					}
				});
				isCountItem.yesStock = yesStock;
				isCountItem.noStock = noStock;
				setProfileItems(array);
			}
		}
		if (name == 'warlordBosses_1') {
			if (close && !isDonut) {
				OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай затраты на боссов'}, null, 'card');
			} else {
				countBossAll = {
					skill_1: (Number(syncUserGame._end) + Number(syncUserGame._endi)) * 15, 
					skill_2: Number(syncUserGame._dmgi), 
					skill_3: Number(syncUserGame._s3), 
					skill_4: Number(syncUserGame._s4),
					spell_1: 0, 
					spell_2: 0, 
					spell_3: 0, 
				};
				CalcBoss();
			}
		}
		if (name == 'warlordArena_1') {
			if (close && !isDonut) {
				OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай кубки и затраты на арену'}, null, 'card');
			}
		}
		if (name == 'warlordGuild_1') {
			if (close && !isDonut) {
				OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай топазы и аметисты'}, null, 'card');
			}
		}
		if (name == 'warlordOther_1') {
			if (close && !isDonut) {
				OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай затраты на улучшения'}, null, 'card');
			}
		}
		if (!close || isDonut) {
			isActivePanel(name);
		}
	};

	const isCheckItems = (e, id) => {
		// console.warn('isCheckItems', activePanel);
		isCountItem.null = true;
		checkItems.null = true;
		checkItems[id] = e.target.checked;
		setCheckItems({null: checkItems.null, item: checkItems.item, scroll: checkItems.scroll, collection: checkItems.collection, personal: checkItems.personal, stock: checkItems.stock, yesStock: checkItems.yesStock, noStock: checkItems.noStock});
	};
	const isCheckTabs = (id, type) => {
		// console.warn('isCheckTabs', activePanel);
		setCheckTabs(id);
		isCountItem.null = true;
		let array = [];
		let yesStock = 0;
		let noStock = 0;
		if (type === 'item') {
			Items.map((data, x) => {
				if (data.type == id) {
					let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
					syncItem ? yesStock++ : noStock++;
					array.push(data);
				}
			});
		}
		if (type === 'collection') {
			Collections.map((data, x) => {
				data = Items.find(x => x.id === data);
				if (data.type == id) {
					let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
					syncItem ? yesStock++ : noStock++;
					array.push(data);
				}
			});
		}
		isCountItem.yesStock = yesStock;
		isCountItem.noStock = noStock;
		setProfileItems(array);
	};

	const SortableItems = (
		<React.Fragment>
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
				{isDonut && <Card className="DescriptionCardWiki">
					<Cell selectable checked={checkItems.stock} after={<Icon24CheckCircleOutline style={{color: checkItems.stock ? 'var(--dynamic_green)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'stock')}>Наличие предмета</Cell>
				</Card>}
			</CardGrid>
			{!isDonut && <React.Fragment>
				<Spacing separator size={16} />
				<Card className="DescriptionCardWiki">
					<Placeholder action={<Button href="https://vk.com/donut/wiki.warlord" target="_blank" size="m" mode="commerce">Узнать подробнее</Button>} icon={<Icon28DonateOutline width="56" height="56" style={{color: '#ffae26'}} />} header="VK Donut">Смотри наличие вещей,<br/>а также многое другое вместе с подпиской</Placeholder>
				</Card>
			</React.Fragment>}
		</React.Fragment>
	);
	const VisibleItems = (type) => (
		<CardGrid size="m">
			<Card className="DescriptionCardWiki">
				<Cell selectable checked={checkItems.yesStock} after={<Icon28CheckCircleOutline width={24} height={24} style={{color: checkItems.yesStock ? 'var(--dynamic_green)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'yesStock')}>{type === 'item' ? 'Купленные вещи' : 'Собранные вещи'}</Cell>
			</Card>
			<Card className="DescriptionCardWiki">
				<Cell selectable checked={checkItems.noStock} after={<Icon28CancelCircleOutline width={24} height={24} style={{color: checkItems.noStock ? 'var(--destructive)' : 'var(--icon_secondary)'}}/>} description="Отображение в списке" onChange={(e) => isCheckItems(e, 'noStock')}>{type === 'item' ? 'Не купленные вещи' : 'Не собранные вещи'}</Cell>
			</Card>
		</CardGrid>
	);

	const modal = (
		<ModalRoot
			activeModal={modalOpened ? modalOpened == 'page' ? 'modal-warlord-page' : modalOpened == 'card' ? 'modal-warlord-card' : null : null}
			onClose={() => isModalOpened(false)}
		>
			<ModalCard
				id='modal-warlord-card'
				onClose={() => isModalOpened(false)}
				icon={
					activeModal === 'donut' && <Icon28DonateOutline width="56" height="56" style={{color: '#ffae26'}} /> ||
					activeModal === 'alert' && <Icon28ReportOutline width="56" height="56" style={{color: 'var(--destructive)'}} />
				}
				header={dataModal && dataModal.header}
				// subheader={<span>Смотри свой арсенал,<br/>а также многое другое вместе с подпиской</span>}
				subheader={
					dataModal && activeModal === 'donut' && dataModal.subheader && <span>{dataModal.subheader},<br/>а также многое другое вместе с подпиской</span> ||
					dataModal && activeModal === 'alert' && dataModal.subheader && <span>{dataModal.subheader}</span>
				}
				actions={activeModal === 'donut' && <Button href="https://vk.com/donut/wiki.warlord" target="_blank" size="l" mode="commerce">Узнать подробнее</Button>}
			>
			</ModalCard>
			<ModalPage
				id="modal-warlord-page"
				onClose={() => isModalOpened(false)}
				header={
					modalOpened && activeModal !== 'modal-warlordItem' && activeModal !== 'modal-warlordBossCreate' && <ModalPageHeader
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

						{activeModal === 'modal-warlordBossCreate' && 'Создание своего противника'}

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

						{activeModal === 'modal-warlordOther' && dataModal && indexModal === 3 && dataModal.name}
					</ModalPageHeader>
				}
			>
				{modalOpened && <Group>
					{activeModal === 'modal-warlordItem' && dataModal &&
						<Group>
							{(checkItems.item || checkItems.collection) && 
								getItemCell(dataModal)
							}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}

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
									return getItemCell(data, x);
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
									return getItemCell(data, x);
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
									return getItemCell(data, x);
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
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									return getItemCell(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordMap' && dataModal && indexModal === 5.2 &&
						<Group>
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									return getItemCell(data, x);
								}
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



					
					{activeModal === 'modal-warlordBossCreate' &&
						<Group>
							<Gradient style={{
								margin: isDesktop ? '-8px' : 0,
								padding: 8
							}}>
								<CardGrid size="m">
									<Card>
										<FormItem top="Здоровье" bottom="Введите здоровье вашего противника">
											<Input placeholder="Здоровье" value={String(newBossHP)} min={0} onChange={e => setNewBossHP(Number(e.target.value))} type="number"/>
										</FormItem>
									</Card>
									<Card>
										<FormItem top="Атака" bottom="Введите атаку вашего противника">
											<Input placeholder="Атака" value={String(newBossDMG)} min={0} onChange={e => setNewBossDMG(Number(e.target.value))} type="number"/>
										</FormItem>
									</Card>
								</CardGrid>
								<Spacing size={8} />
								<Button stretched size="l" mode="commerce" onClick={() => setNewBoss('create')}>Подтвердить</Button>
							</Gradient>
						</Group>
					}



					{activeModal === 'modal-warlordArena' && dataModal && indexModal === 2 &&
						<Group>
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									return getItemCell(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
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
									return getItemCell(data, x);
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
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									return getItemCell(data, x);
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
					{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 3 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Требуемый стаж">{dataModal.days} {numberForm(dataModal.days, ['день', 'дня', 'дней'])}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Требуемый уровень Кузницы">{dataModal.build} уровень</Cell>
							<Spacing separator size={16} />
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость предмета">{numberSpaces(dataModal.price[0])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/4.png)`}}/> или {numberSpaces(dataModal.price[0]*55)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>{numberSpaces(dataModal.price[1])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/5.png)`}}/> или {numberSpaces(dataModal.price[1]*75)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/></Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость заточки">{numberSpaces(Math.ceil(dataModal.price[0]/10))}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/4.png)`}}/> или {numberSpaces(Math.ceil(dataModal.price[0]/10)*55)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>{numberSpaces(Math.ceil(dataModal.price[1]/10))}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/5.png)`}}/> или {numberSpaces(Math.ceil(dataModal.price[1]/10)*75)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/><br/></Cell>
							<Spacing separator size={16} />
							{(checkItems.item || checkItems.scroll) && 
								getItemCell({item: true, scroll: true, id: Items.indexOf(Items.find(x => x.title === dataModal.title))})
							}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
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
									return getItemCell(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
					{activeModal === 'modal-warlordGuild' && dataModal && indexModal === 6 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Требуемый стаж">{dataModal.days} дней</Cell>
							<Cell className="DescriptionWiki" before={<Icon24UserSquareOutline />} description="Характеристики">{numberSpaces(dataModal.hp)}<br/>{numberSpaces(dataModal.dmg)} атаки</Cell>
							<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость создания">{numberSpaces(dataModal.price[0])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>{numberSpaces(dataModal.price[1])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/></Cell>
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									return getItemCell(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}

					{activeModal === 'modal-warlordOther' && dataModal && indexModal === 3 &&
						<Group>
							<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание события">{dataModal.description}</Cell>
							<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Дата события">{dataModal.date}</Cell>
							{dataModal.rewards.length !== 0 && <React.Fragment>
								<Spacing separator size={16} />
								<CardGrid size="m">
								{dataModal.rewards.map((data, x) => {
									return (<Card key={x} className="DescriptionCardWiki"><Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description={`Награда ${dataModal.rewards.length-x} уровня`}>{data}</Cell></Card>);
								})}
								</CardGrid>
							</React.Fragment>}
							<Spacing separator size={16} />
							{dataModal.items.map((data, x) => {
								if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
									return getItemCell(data, x);
								}
							})}
							{checkItems.null && 
								<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
							}
						</Group>
					}
				</Group>}
			</ModalPage>
		</ModalRoot>
	);
	const OpenModal = (name, data, index, mode = 'page') => {
		// console.warn('OpenModal', activePanel);
		setActiveModal(name);
		setDataModal(data);
		setIndexModal(index);
		checkItems.null = true;
		isModalOpened(mode);
	}
	
	


	const onStoryChange = (e) => {
		// console.warn('onStoryChange', activePanel);
		checkItems.null = true;
		setActivePanel(null);
		setActiveStory(e.currentTarget.dataset.story);
	}
	const testtest = (from, to) => {
		// console.warn('testtest', activePanel);
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
		// console.warn('VKBridge', activePanel);
		setPopout(<ScreenSpinner />);
		// let dataVK = await getBridge('VKWebAppGetUserInfo');
		let dataVK = syncUser;
		// let dataGame = await getData('xml', `https://backup1.geronimo.su/gameHub/index.php?api_uid=${dataVK.id}&api_type=vk`);
		// console.log(dataGame);
		// setUser({vk: dataVK, game: dataGame.s});
		setUser({vk: dataVK, game: dataVK});
		setActivePanel(null);
		setActiveStory('profile');
		setPopout(null);
	}
	const loadProfile = async(dev = false, reload = false, version = 1) => {
		reload ? setPopout(<ScreenSpinner />) : '';
		if (syncUser == null || reload == true) {
			console.warn('loadProfile', activePanel);
			let dataVK = await getBridge('VKWebAppGetUserInfo');
			if (!reload) {
				syncUser = true;
				let dataDonut = await getBridge('VKWebAppCallAPIMethod', {"method": "execute.getMembers", "params": {"v": '5.130', "access_token": "844073b741823e279bab9e368fe05fc56c1af139e5b6ecde3510cb01476167b117651849ec3ced221f55d"}});
				let isAdmin = admins.indexOf(dataVK.id) == -1 ? false : true;
				if (dataDonut.response.items.indexOf(dataVK.id) != -1 || dev || isAdmin) {
					let storage = await getBridge('VKWebAppStorageGet', {"keys": ["server"]});
					if (storage.keys[0].value === "") {
						await getBridge('VKWebAppStorageSet', {"key": "server", "value": "1"});
					} else {
						server = Number(storage.keys[0].value);
					}
					let dataGame = await getData('xml', `https://backup1.geronimo.su/gameHub/index.php?api_uid=${dataVK.id}&api_type=vk`);
					if (Number(dataGame.s[server-1]._uid) !== 0) {
						let dataGameItems = await getData('xml', `https://backup1.geronimo.su/${server === 1 ? 'warlord_vk' : 'warlord_vk2'}/game.php?api_uid=${clan_id}&api_type=vk&api_id=${api_id}&auth_key=${clan_auth}&UID=${dataVK.id}&t=${dataGame.s[server-1]._uid}&i=39`);
						syncUserGame = dataGameItems.u;
						syncItems = dataGameItems.i.map((data, x) => {
							return Number(data._id);
						});
					} else {
						// Ошибка при первом запуске
					}
					isDonut = true;
				}
				syncUser = dataVK;
				setUser({vk: dataVK, game: null});
				setActivePanel(null);
				setActiveStory('home');
			} else {
				let dataGame = await getData('xml', `https://backup1.geronimo.su/gameHub/index.php?api_uid=${dataVK.id}&api_type=vk`);
				if (Number(dataGame.s[version-1]._uid) !== 0) {
					await getBridge('VKWebAppStorageSet', {"key": "server", "value": String(version)});
					server = version;
					let dataGameItems = await getData('xml', `https://backup1.geronimo.su/${server === 1 ? 'warlord_vk' : 'warlord_vk2'}/game.php?api_uid=${clan_id}&api_type=vk&api_id=${api_id}&auth_key=${clan_auth}&UID=${dataVK.id}&t=${dataGame.s[server-1]._uid}&i=39`);
					syncUserGame = dataGameItems.u;
					syncItems = dataGameItems.i.map((data, x) => {
						return Number(data._id);
					});
				} else {
					OpenModal(`alert`, {header: 'Ошибка получения данных персонажа', subheader: `Авторизуйтесь на ${version} сервере и обновите приложение`}, null, 'card');
				}
			}
			setPopout(null);
		}
	}
	loadProfile();



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
								description="Новости приложения"
							>Главная</Cell>
							<Cell
								disabled={activeStory === 'profile'}
								style={activeStory === 'profile' ? {
									backgroundColor: "var(--button_secondary_background)",
									borderRadius: 8
								} : {}}
								data-story="profile"
								onClick={VKBridge}
								// before={<Icon28UserCircleOutline />}
								before={<Avatar size={28} src={user && user.vk ? user.vk.photo_200 : 'https://vk.com/images/camera_200.png'} />}
								description={isDonut ? `${server == 1 ? 'Эрмун' : 'Антарес'}, полный доступ` : 'Обычный доступ'}
							>{user && user.vk ? `${user.vk.first_name} ${user.vk.last_name}` : 'Пользователь'}</Cell>
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
								description="Рейды, приключения"
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
								description="Cписки боссов"
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
								description="Сезоны, сундуки"
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
								description="Питомцы, достижения"
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
								description="Кузница, набеги"
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
								description="События, лотерея"
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
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => VKBridge()}><Avatar size={28} src={user && user.vk ? user.vk.photo_200 : 'https://vk.com/images/camera_200.png'} /></PanelHeaderButton>}>Warlord Helper</PanelHeader>
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
									actions={<Button href="https://chrome.google.com/webstore/detail/warlord-script/lnohbnecjodgkjkfcfaamadbeiapofoa" target="_blank" mode="overlay_primary" size={isDesktop ? "l" : "m"}>Установить</Button>}
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
									actions={<Button href="https://vk.com/wiki.warlord" target="_blank" mode="overlay_primary" size={isDesktop ? "l" : "m"}>Вступить</Button>}
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
									actions={<Button href="https://vk.com/club125247255" target="_blank" mode="overlay_primary" size={isDesktop ? "l" : "m"}>Вступить</Button>}
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
									actions={<Button href="https://vk.com/club133931816" target="_blank" mode="overlay_primary" size={isDesktop ? "l" : "m"}>Сообщить</Button>}
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
									actions={<Button href="https://vk.com/club122851042" target="_blank" mode="overlay_primary" size={isDesktop ? "l" : "m"}>Вступить</Button>}
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




					<View id="profile" activePanel={!activePanel ? 'profile' : activePanel} modal={modal}>
						<Panel id="profile">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Мой профиль</PanelHeader>
								{user.vk && user.game && <Group>
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
										<Link style={{ marginBottom: isDonut ? 12 : 0, color: 'var(--text_secondary)' }} href={`https://vk.com/id${user.vk.id}`} target="_blank">@{user.vk.id}</Link>
										{isDonut && <Button size="m" mode="commerce" onClick={() => loadProfile(false, true, (server === 1 ? 2 : 1))}>Сменить сервер</Button>}
									</Gradient>
									<Spacing size={8} />
									<CardGrid size="m">
										<Card onClick={() => setActivePanel('profile_1', true)} className="CardWithAvatar">
											<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/24.png' /></div>} description="Список ваших вещей">Магазин</Cell>
										</Card>
										<Card onClick={() => setActivePanel('profile_2', true)} className="CardWithAvatar">
											<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/25.png' /></div>} description="Список ваших коллекций">Коллекции</Cell>
										</Card>
									</CardGrid>
								</Group>}
						</Panel>
						<Panel id="profile_1">
							{activePanel === 'profile_1' && <React.Fragment>
								<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Магазин</PanelHeader>
								<Group>
									<Tabs mode="buttons">
										<HorizontalScroll getScrollToLeft={i => i - 240} getScrollToRight={i => i + 240}>
											<TabsItem onClick={() => isCheckTabs(2, 'item')} selected={checkTabs === 2}>Оружие</TabsItem>
											<TabsItem onClick={() => isCheckTabs(4, 'item')} selected={checkTabs === 4}>Шлемы</TabsItem>
											<TabsItem onClick={() => isCheckTabs(3, 'item')} selected={checkTabs === 3}>Броня</TabsItem>
											<TabsItem onClick={() => isCheckTabs(12, 'item')} selected={checkTabs === 12}>Наплечники</TabsItem>
											<TabsItem onClick={() => isCheckTabs(6, 'item')} selected={checkTabs === 6}>Наручи</TabsItem>
											<TabsItem onClick={() => isCheckTabs(14, 'item')} selected={checkTabs === 14}>Перчатки</TabsItem>
											<TabsItem onClick={() => isCheckTabs(5, 'item')} selected={checkTabs === 5}>Штаны</TabsItem>
											<TabsItem onClick={() => isCheckTabs(13, 'item')} selected={checkTabs === 13}>Ботинки</TabsItem>
											<TabsItem onClick={() => isCheckTabs(15, 'item')} selected={checkTabs === 15}>Щиты</TabsItem>
											<TabsItem onClick={() => isCheckTabs(16, 'item')} selected={checkTabs === 16}>Бижутерия</TabsItem>
										</HorizontalScroll>
									</Tabs>
									<Spacing size={8} />
									<CardGrid size="m">
										<Card className="DescriptionCardWiki"><Cell before={<Icon28CheckCircleOutline width={24} height={24} />} description={<span>У вас куплено {isCountItem.yesStock} вещей</span>}></Cell></Card>
										<Card className="DescriptionCardWiki"><Cell before={<Icon28CancelCircleOutline width={24} height={24} />} description={<span>У вас не куплено {isCountItem.noStock} вещей</span>}></Cell></Card>
									</CardGrid>
									<Spacing separator size={16} />
									{profileItems && <CardGrid size={isDesktop ? "s" : "m"} className="Scroll" style={{maxHeight: '387px'}}>
										{profileItems.map((data, x) => {
											return getItemPreview(data, x);
										})}
									</CardGrid>}
									{!profileItems || isCountItem.null && <Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>}
									<Spacing separator size={16} />
									{VisibleItems('item')}
								</Group>
							</React.Fragment>}
						</Panel>
						<Panel id="profile_2">
							{activePanel === 'profile_2' && <React.Fragment>
								<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Коллекции</PanelHeader>
								<Group>
									<Tabs mode="buttons">
										<HorizontalScroll getScrollToLeft={i => i - 240} getScrollToRight={i => i + 240}>
											<TabsItem onClick={() => isCheckTabs(2, 'collection')} selected={checkTabs === 2}>Оружие</TabsItem>
											<TabsItem onClick={() => isCheckTabs(4, 'collection')} selected={checkTabs === 4}>Шлемы</TabsItem>
											<TabsItem onClick={() => isCheckTabs(3, 'collection')} selected={checkTabs === 3}>Броня</TabsItem>
											<TabsItem onClick={() => isCheckTabs(12, 'collection')} selected={checkTabs === 12}>Наплечники</TabsItem>
											<TabsItem onClick={() => isCheckTabs(6, 'collection')} selected={checkTabs === 6}>Наручи</TabsItem>
											<TabsItem onClick={() => isCheckTabs(14, 'collection')} selected={checkTabs === 14}>Перчатки</TabsItem>
											<TabsItem onClick={() => isCheckTabs(5, 'collection')} selected={checkTabs === 5}>Штаны</TabsItem>
											<TabsItem onClick={() => isCheckTabs(13, 'collection')} selected={checkTabs === 13}>Ботинки</TabsItem>
											<TabsItem onClick={() => isCheckTabs(15, 'collection')} selected={checkTabs === 15}>Щиты</TabsItem>
											<TabsItem onClick={() => isCheckTabs(16, 'collection')} selected={checkTabs === 16}>Бижутерия</TabsItem>
										</HorizontalScroll>
									</Tabs>
									<Spacing size={8} />
									<CardGrid size="m">
										<Card className="DescriptionCardWiki"><Cell before={<Icon28CheckCircleOutline width={24} height={24} />} description={<span>У вас собрано {isCountItem.yesStock} коллекций</span>}></Cell></Card>
										<Card className="DescriptionCardWiki"><Cell before={<Icon28CancelCircleOutline width={24} height={24} />} description={<span>У вас не собрано {isCountItem.noStock} коллекций</span>}></Cell></Card>
									</CardGrid>
									<Spacing separator size={16} />
									{profileItems && <CardGrid size={isDesktop ? "s" : "m"} className="Scroll" style={{maxHeight: '387px'}}>
										{profileItems.map((data, x) => {
											return getItemPreview(data, x);
										})}
									</CardGrid>}
									{!profileItems || isCountItem.null && <Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>}
									<Spacing separator size={16} />
									{VisibleItems('collection')}
								</Group>
							</React.Fragment>}
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
									<Card onClick={() => setActivePanel('warlordMap_1')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/1.png' /></div>} description="Список предметов и цен">Мустафа</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_2')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/2.png' /></div>} description="Список зданий для обыска">Обыск</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_3')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/3.png' /></div>} description="Список походов и наград">Походы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_4')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/4.png' /></div>} description="Список рейдов и наград">Рейды</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_5')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/5.png' /></div>} description="Список приключений и наград">Приключения</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_6')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/6.png' /></div>} description="Описание районов">Районы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordMap_7')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/7.png' /></div>} description="Описание захвата района">Захват</Cell>
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
								<CardGrid size={isDesktop ? "s" : "m"} className="size-x4 auto">
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
								<CardGrid size="s">
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
								<CardGrid size={isDesktop ? "s" : "m"} className="size-x4 auto">
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
								<CardGrid size="s" className="size-x4 auto">
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




					<View id="warlordBosses" activePanel={!activePanel ? 'warlordBosses' : activePanel} modal={modal}>
						<Panel id="warlordBosses">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Боссы</PanelHeader>
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
									{dataBosses.images.map((data, x) =>
										<div key={x}>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div className="headBannerWiki" style={{backgroundImage: `url(image/${data})`}} />
										</div>
									)}
								</Gallery>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card onClick={() => setActivePanel('warlordBosses_1', true)} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/8.png' /></div>} description="Затраты на убийство боссов">Калькулятор</Cell>
									</Card>
									{/* <Card onClick={() => setActivePanel('warlordBosses_2')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/9.png' /></div>} description="Список общих боссов и их наград">Общие боссы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordBosses_3')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/9.png' /></div>} description="Список одиночных боссов и их наград">Одиночные боссы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordBosses_4')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/9.png' /></div>} description="Список временных боссов и их наград">Временные боссы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordBosses_5')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/9.png' /></div>} description="Список уникальных боссов и их наград">Уникальные боссы</Cell>
									</Card> */}
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordBosses_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordBosses')}/>}>Калькулятор</PanelHeader>
							{activePanel === 'warlordBosses_1' && <React.Fragment>
								<Group>
									<Gradient className="GradientBannerWiki ForInput">
										{isDesktop && syncUserGame && <Avatar size={128} mode="app" src="image/bosses/persona_full.png">
											<div className="GamePersona" style={{backgroundImage: `url(image/bosses/persona_1_${syncUserGame._a1}.png)`}}></div>
											<div className="GamePersona" style={{backgroundImage: `url(image/bosses/persona_2_${syncUserGame._a2}.png)`}}></div>
											<div className="GamePersona" style={{backgroundImage: `url(image/bosses/persona_3_${syncUserGame._a3}.png)`}}></div>
										</Avatar>}
										<div>
											<CardGrid size="m">
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_1.png' /></div>}><Input defaultValue={Number((Number(syncUserGame._end) + Number(syncUserGame._endi)) * 15)} min={0} onChange={(e) => isCalcBoss(e, 'skill_1')} type="number"/></Cell>
												</Card>
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_2.png' /></div>}><Input defaultValue={Number(syncUserGame._dmgi)} min={0} onChange={(e) => isCalcBoss(e, 'skill_2')} type="number"/></Cell>
												</Card>
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_4.png' /></div>}><Input defaultValue={Number(syncUserGame._s3)} min={0} onChange={(e) => isCalcBoss(e, 'skill_3')} type="number"/></Cell>
												</Card>
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_5.png' /></div>}><Input defaultValue={Number(syncUserGame._s4)} min={0} onChange={(e) => isCalcBoss(e, 'skill_4')} type="number"/></Cell>
												</Card>
											</CardGrid>
											<Spacing size={8} />
											<CardGrid size="s">
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_6.png' /></div>}><Input defaultValue={Number(countBossAll.spell_1)} min={0} onChange={(e) => isCalcBoss(e, 'spell_1')} type="number"/></Cell>
												</Card>
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_7.png' /></div>}><Input defaultValue={Number(countBossAll.spell_2)} min={0} onChange={(e) => isCalcBoss(e, 'spell_2')} type="number"/></Cell>
												</Card>
												<Card className="CardWithAvatar ForInput">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={isDesktop ? 36 : 44} className="withPreload" src='image/bosses/talent_8.png' /></div>}><Input defaultValue={Number(countBossAll.spell_3)} min={0} onChange={(e) => isCalcBoss(e, 'spell_3')} type="number"/></Cell>
												</Card>
											</CardGrid>
										</div>
									</Gradient>
									<Spacing size={8} />
									<CardGrid size="m">
										<Select
											value={newBossID}
											onChange={(e) => {newBossID = e.target.value, CalcBoss()}}
											style={{width: 'calc(50% - 4px)', marginRight: 8}}
											placeholder="Не выбран" 
											options={newBossArray.map((data, x) => ({ label: data.name, value: Bosses.indexOf(data), avatar: `image/${data.icon}` }))}
											renderOption={({ option, ...restProps }) => (
												<CustomSelectOption {...restProps} before={<Avatar size={24} src={option.avatar} />} />
											)}
											/>
										<Button style={{width: 'calc(50% - 4px)'}} stretched size="l" mode="secondary" onClick={() => setNewBoss('open')}>Создать своего</Button>
									</CardGrid>
									<Spacing size={8} />
									{[Bosses[newBossID]].map((item, x) => 
										<React.Fragment key={x}>
											<Banner
												className="BannerBoss"
												mode="image"
												size="m"
												header={item.name}
												subheader={item.description}
												actions={
													<CardGrid size={isDesktop ? "m" : "l"}>
														<Card className="CardWithAvatar">
															<Cell description="Здоровье">{numberSpaces(item.hp)}</Cell>
														</Card>
														<Card className="CardWithAvatar">
															<Cell description="Атака">{numberSpaces(item.dmg)}</Cell>
														</Card>
														<Card className="CardWithAvatar">
															<Cell description="Чистый урон">{numberSpaces(count_boss.clearDamage)}</Cell>
														</Card>
														<Card className="CardWithAvatar">
															<Cell description="Общий урон">{numberSpaces(count_boss.totalDamage)}</Cell>
														</Card>
														<Card className="CardWithAvatar">
															<Cell description="Остаток здоровья">{numberSpaces(count_boss.leftHP < 0 ? 0 : count_boss.leftHP)}</Cell>
														</Card>
														<Card className="CardWithAvatar">
															<Cell description="Количество ударов">{numberSpaces(count_boss.totalHit)}</Cell>
														</Card>
													</CardGrid>
												}
												background={
													<React.Fragment>
														<img className="BannerBossPerson" src={`image/${item.image}`}/>
														<div className="BannerBossBackground" style={{backgroundImage: `url(image/${item.background})`}}/>
													</React.Fragment>
												}
											/>
										</React.Fragment>
									)}
								</Group>
							</React.Fragment>}
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
									<Card onClick={() => setActivePanel('warlordArena_1', true)} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/8.png' /></div>} description="Затраты на прохождение арены">Калькулятор</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordArena_2')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/9.png' /></div>} description="Предметы за все сезоны">Сезоны</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordArena_3')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/10.png' /></div>} description="Список лиг и наград">Лиги</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordArena_4')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/11.png' /></div>} description="Список сундуков и наград">Сундуки</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordArena_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordArena')}/>}>Калькулятор</PanelHeader>
							{activePanel === 'warlordArena_1' && <React.Fragment>
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
							</React.Fragment>}
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
									<Card onClick={() => setActivePanel('warlordCharacter_1')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/12.png' /></div>} description="Описание талантов персонажа">Таланты</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_2')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/13.png' /></div>} description="Список достижений и условий">Достижения</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_3')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/14.png' /></div>} description="Список ресурсов и их получение">Ресурсы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_4')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/15.png' /></div>} description="Список питомцев и их награды">Питомцы</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_6')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/16.png' /></div>} description="Список аватаров и их получение">Аватары</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordCharacter_5')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/17.png' /></div>} description="Список фонов и их получение">Фоны</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordCharacter_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordCharacter')}/>}>Таланты</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 4 вида навыков и каждый можно прокачать до 9.999 уровня, цена с каждым разом увеличивается.<br/>Также за определённые уровни прокачки навыка можно получить достижение.</span>}></Cell>
								<Spacing size={8} />
								<CardGrid size={isDesktop ? "s" : "m"} className="size-x4">
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
								<CardGrid size="s" className="size-x4">
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
								<CardGrid size="s" className="size-x4 auto">
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
									<Card onClick={() => setActivePanel('warlordGuild_1', true)} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/18.png' /></div>} description="Затраты на казну гильдии">Калькулятор</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_2')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/19.png' /></div>} description="Список улучшений и цен">Улучшения</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_3')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/20.png' /></div>} description="Список экипировки и её цен">Кузница</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_4')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/21.png' /></div>} description="Список навыков и их цен">Академия</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_5')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/22.png' /></div>} description="Список набегов и их наград">Набеги</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordGuild_6')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/23.png' /></div>} description="Список рейдов и их наград">Рейды</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordGuild_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordGuild')}/>}>Калькулятор</PanelHeader>
							{activePanel === 'warlordGuild_1' && <React.Fragment>
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
							</React.Fragment>}
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
								<CardGrid size="s" className="size-x4">
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
								<CardGrid size="s">
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
								<CardGrid size={isDesktop ? "s" : "m"} className="size-x4">
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
								<CardGrid size="s">
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



					
					<View id="warlordOther" activePanel={!activePanel ? 'warlordOther' : activePanel} modal={modal}>
						<Panel id="warlordOther">
							<PanelHeader left={!isDesktop && <PanelHeaderButton onClick={() => setActiveStory('home')}><Icon28HomeOutline /></PanelHeaderButton>}>Разное</PanelHeader>
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
									{dataOther.images.map((data, x) =>
										<div key={x}>
											<Spinner size="large" className="bannerPreloadWiki" />
											<div className="headBannerWiki" style={{backgroundImage: `url(image/${data})`}} />
										</div>
									)}
								</Gallery>
								<Spacing size={8} />
								<CardGrid size="m">
									<Card onClick={() => setActivePanel('warlordOther_1', true)} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/26.png' /></div>} description="Затраты на улучшение предмета">Калькулятор</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordOther_2')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/27.png' /></div>} description="Список награды с лото">Лотерея</Cell>
									</Card>
									<Card onClick={() => setActivePanel('warlordOther_3')} className="CardWithAvatar">
										<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/28.png' /></div>} description="Список ивентов и их наград">События</Cell>
									</Card>
								</CardGrid>
							</Group>
						</Panel>
						<Panel id="warlordOther_1">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordOther')}/>}>Калькулятор</PanelHeader>
							{activePanel === 'warlordOther_1' && <React.Fragment>
								<Group>
									<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>опять работать</span>}></Cell>
								</Group>
							</React.Fragment>}
						</Panel>
						<Panel id="warlordOther_2">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordOther')}/>}>Лотерея</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Бесплатная попытка в лотерею доступна каждые 24 часа.<br/>В лотереи можно также найти различные ресурсы.</span>}></Cell>
								<Spacing size={8} />
								{dataOther.lottery && <CardGrid size={isDesktop ? "s" : "m"} className="Scroll" style={{maxHeight: '387px'}}>
									{dataOther.lottery.map((data, x) => {
										return getItemPreview(Items[data.id], x, data.tooltip);
									})}
								</CardGrid>}
							</Group>
						</Panel>
						<Panel id="warlordOther_3">
							<PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('warlordOther')}/>}>События</PanelHeader>
							<Group>
								<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Ивенты это уникальные события, которые запускаются во время крупных праздников.<br/>Участие в ивенте доступно для каждого игрока, и не требует никаких затрат.</span>}></Cell>
								{dataOther.events.map((data, x_main) =>
									<Gradient className="GradientBannerWiki" key={x_main}>
										<Header indicator={<Counter size="s" mode="secondary">{data.items.length} {numberForm(data.items.length, ['событие', 'события', 'событий'])}</Counter>}>{data.title}</Header>
										<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
											{data.items.map((data, x) => 
												<Card className="BannerWiki Scroll" key={x} onClick={() => OpenModal(`modal-warlordOther`, data, 3)}>
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
					</View>
				</Epic>
			</SplitCol>
		</SplitLayout>
	);
}, {
	viewWidth: true
});

ReactDOM.render(<ConfigProvider><AdaptivityProvider><AppRoot><App /></AppRoot></AdaptivityProvider></ConfigProvider>, document.getElementById('root'));

if(module.hot){
	module.hot.accept()
}