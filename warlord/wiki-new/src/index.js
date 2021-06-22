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
	CustomSelectOption,
	Div,
	HorizontalCell
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
	Icon56DonateOutline,
	Icon28CancelCircleOutline,
	Icon28CheckCircleOutline,
	Icon28ReportOutline,
	Icon28SunOutline,
	Icon28MoonOutline,
	Icon24HammerOutline,
	Icon24StatisticsOutline,
	Icon28GhostSimleOutline
} from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

import Items from './data/items.json';
import Collections from './data/collections.json';
import Bosses from './data/bosses.json';

import dataMain from './data/main.json';
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

let api_id = 5536422;
let clan_id = 292859277;
let clan_auth = 'de73003f6d508e583e9c7f316024abbf';
let admins = [153968505, 14973344];
// let admins = [14973344];
let syncUser = null;
let syncUserGame = null;
let isDonut = false;
let dataDonutUser = [];
let isDev = false;
let syncItems = [];
let syncItemsFull = [];
let server = 1;
let isMask = false;

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
	const platform = usePlatform();
	const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
	const hasHeader = platform !== VKCOM;

	let props = {
		activeStory: null,
		activePanel: null,
		modalCount: 0
	};

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

	if (!isDesktop) {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		bridge.send("VKWebAppInit");
	};



	const getParseItems = async() => {
		let xml = `<shop></shop>`;
		let response = await x2js.xml_str2json(xml);
		let result = [];
		response.shop.i.forEach((item, x) => {
			result.push({
				id: Number(item._id),
				type: Number(item._cat),
				title: item._name,
				dmg: Number(item._d2),
				hp: Number(item._d4),
				currency: 
							Number(item._p1) !== 0 ? 1 :
							Number(item._p2) !== 0 ? 2 :
							Number(item._p3) !== 0 ? 3 :
							Number(item._p4) !== 0 ? 4 :
							Number(item._p5) !== 0 ? 5 :
							Number(item._p6) !== 0 ? 6 :
							0,
				icon: `items/${Number(item._id)}.png`,
				price: 
						Number(item._p1) !== 0 ? Number(item._p1) :
						Number(item._p2) !== 0 ? Number(item._p2) :
						Number(item._p3) !== 0 ? Number(item._p3) :
						Number(item._p4) !== 0 ? Number(item._p4) :
						Number(item._p5) !== 0 ? Number(item._p5) :
						Number(item._p6) !== 0 ? Number(item._p6) :
						0
			});
		});
		console.log(response);
		console.log(result);
		console.log(JSON.stringify(result));
	};
	// getParseItems();
	const getParseBosses = async() => {
		let xml = `<bosses></bosses>`;
		let response = await x2js.xml_str2json(xml);
		console.log(response);
		let result = [];
		response.bosses.npc.forEach((item, x) => {
			result.push({
				id: Number(item.u._id),
				name: item.u._name,
				description: item.u._descr,
				hp: Number(item.u._mod_hp),
				dmg: Number(item.u._dmg),
				type: Number(item.u._solo),
				time: Number(item.u._rtm),
				tries: Number(item.u._rlmt),
				energy: Number(item.u._rq2),
				rewards: {
					exp: Number(item.r._exp),
					m1: Number(item.r._m1),
					m2: Number(item.r._m3),
				},
				background: `bosses/backgrounds/${Number(item.u._bg_id)}.png`,
				image: `bosses/images/${Number(item.u._id)}.png`,
				icon: `bosses/icons/${Number(item.u._id)}.png`
			});
		});
		console.log(response);
		console.log(result);
		console.log(JSON.stringify(result));
	};
	// getParseBosses();
	const getFix = async() => {
		dataBosses.bosses.forEach((item, x) => {
			item.mobs.forEach((item, x) => {
				let boss = Bosses.find(i => i.id === item.id);
				item.items.forEach((item, x) => {
					if (item.item || item.collection) {
						if (Items[item.id].description !== `Нет описания`) {
							console.log(Items[item.id]);
							console.log(boss.name);
						} else {
							Items[item.id].description = `Босс ${boss.name}`;
						}
					}
				});
			});
		});
		console.log(Items);
		console.log(JSON.stringify(Items));
	};
	// getFix();


	class Wiki extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				popout: <ScreenSpinner />, // <ScreenSpinner />
				activeStory: null, // warlordBosses
				activePanel: null, // profile_1
				activeModal: null, // home
				modalOpened: null, // home
				dataModal: null, // home
				indexModal: null, // home
				theme: 'bright_light',

				user: {vk: null, game: null},
				count_boss: {clearDamage: 0, totalDamage: 0, leftHP: 0, totalHit: 0},

				count_arena_1: 0,
				count_arena_2: 0,
				count_guild_1: 0,
				count_guild_2: 0,

				checkItems: {null: true, item: true, scroll: true, collection: true, personal: true, stock: true, yesStock: true, noStock: true},
				checkTabs: 2,
				isCountItem: {yesStock: 0, noStock: 0, null: true},
				isBonusItem: {count: 0, lvl: 0, dmg: 0, hp: 0, en: 0},
				profileItems: null,

				newBossCount: 1,
				newBossArray: [
					Bosses.find(item => item.id === 1),
					Bosses.find(item => item.id === 3),
					Bosses.find(item => item.id === 27),
					Bosses.find(item => item.id === 12),
					Bosses.find(item => item.id === 11),
					Bosses.find(item => item.id === 60),
					Bosses.find(item => item.id === 61),
					Bosses.find(item => item.id === 62),
					Bosses.find(item => item.id === 63),
					Bosses.find(item => item.id === 71),
					Bosses.find(item => item.id === 64),
					Bosses.find(item => item.id === 70),
					Bosses.find(item => item.id === 65),
					Bosses.find(item => item.id === 66),
					Bosses.find(item => item.id === 67),
					Bosses.find(item => item.id === 68),
					Bosses.find(item => item.id === 69),
					Bosses.find(item => item.id === 278),
					Bosses.find(item => item.id === 290),
					Bosses.find(item => item.id === 279),
					Bosses.find(item => item.id === 288),
					Bosses.find(item => item.id === 289),
					Bosses.find(item => item.id === 313),
					Bosses.find(item => item.id === 337),
					Bosses.find(item => item.id === 338),
					Bosses.find(item => item.id === 459),
					Bosses.find(item => item.id === 339),
					Bosses.find(item => item.id === 340),
					Bosses.find(item => item.id === 341),
					Bosses.find(item => item.id === 460),
					Bosses.find(item => item.id === 357),
					Bosses.find(item => item.id === 358),
					Bosses.find(item => item.id === 390),
					Bosses.find(item => item.id === 391),
					Bosses.find(item => item.id === 393),
					Bosses.find(item => item.id === 392),
					Bosses.find(item => item.id === 458),
					Bosses.find(item => item.id === 455),
					Bosses.find(item => item.id === 456),
					Bosses.find(item => item.id === 457),
					Bosses.find(item => item.id === 461),
					Bosses.find(item => item.id === 463),
					Bosses.find(item => item.id === 464),
					Bosses.find(item => item.id === 287),
					Bosses.find(item => item.id === 284),
					Bosses.find(item => item.id === 285),
					Bosses.find(item => item.id === 286),
					Bosses.find(item => item.id === 342),
					Bosses.find(item => item.id === 454),
					Bosses.find(item => item.id === 465),
					Bosses.find(item => item.id === 291),
					Bosses.find(item => item.id === 453),
					Bosses.find(item => item.id === 462)
				],
				newBossHP: 0,
				newBossDMG: 0
			};
		};




		
		setTheme = (update = false) => {
			const { activePanel, activeStory } = this.state;
			const { OpenModal } = this;
			isDev&&console.warn('setTheme', activeStory, activePanel);
			let theme = 'bright_light';
			try {
				theme = localStorage.getItem('VKWikiTheme');
				if (!theme) {
					localStorage.setItem('VKWikiTheme', 'bright_light');
					theme = 'bright_light';
				}
				if (update) {
					theme = theme == 'bright_light' ? 'space_gray' : 'bright_light';
					localStorage.setItem('VKWikiTheme', theme);
				}
			} catch (error) {
				OpenModal(`alert`, {header: 'Ошибка при обновлении темы', subheader: `Разрешите доступ к cookies на этом сайте`}, null, 'card');
				theme = 'bright_light';
			}
			this.setState({theme: theme});
			document.body.setAttribute('scheme', theme);
		};


		setNewBoss = async(mode) => {
			const { activePanel, activeStory, newBossCount, newBossHP, newBossDMG, newBossArray } = this.state;
			isDev&&console.warn('setNewBoss', activeStory, activePanel);
			const { OpenModal, CalcBoss } = this;
			if (mode === 'open') {
				this.setState({newBossHP: 0});
				this.setState({newBossDMG: 0});
				OpenModal(`modal-warlordBossCreate`);
			}
			if (mode === 'create') {
				this.setState({ modalOpened: null });
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
				this.setState({ newBossCount: newBossCount+1 });
				newBossID = Bosses.length-1;
				newBossArray.push(Bosses[Bosses.length-1]);
				CalcBoss();
			}
		};
		onStoryChange = (e) => {
			const { checkItems } = this.state;
			checkItems.null = true;
			this.setState({ activePanel: null });
			props.activeStory = e.currentTarget.dataset.story;
			this.setState({ activeStory: props.activeStory });
			isDev&&console.warn('onStoryChange', props.activeStory, props.activePanel);
		};
		isCalcBoss = (e, id) => {
			const { activePanel, activeStory } = this.state;
			const { CalcBoss } = this;
			isDev&&console.warn('isCalcBoss', activeStory, activePanel);
			countBossAll[id] = e.target.value;
			CalcBoss();
		};
		CalcBoss = async() => {
			const { activePanel, activeStory } = this.state;
			let mode = 2;
			isDev&&console.warn('CalcBoss', activeStory, activePanel);
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
			this.setState({count_boss: {
				clearDamage: MyClearDamage,
				totalDamage: ResultMyAllDamage,
				leftHP: ResultBossTotalHP,
				totalHit: HitNumber
			}});
		};
		numberSpaces = (number, symbol = '.') => {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
		};
		numberForm = (number, titles) => {
			number = Math.abs(number);
			let cases = [2, 0, 1, 1, 1, 2];
			return titles[(number%100>4&&number%100<20)?2:cases[(number%10<5)?number%10:5]];
		};
		numberRandom = (min = 1, max = 2) => {
			return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
		};
		getTime = (s = 0) => {
			let hours = Math.floor(s/(60*60));
			let minutes = parseInt((s/(60))%60);
			let seconds = parseInt((s)%60);
			return `${String(hours).length === 1 ? `0${hours}` : hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}:${String(seconds).length === 1 ? `0${seconds}` : seconds}`
		};
		getSort = (array) => {
			const { activePanel, activeStory, checkItems } = this.state;
			isDev&&console.warn('getSort', activeStory, activePanel);
			return array.sort(function(a, b) {
				return Items[a.id].type < Items[b.id].type ? -1 : 1;
			}).sort(function(a, b) {
				let itemA = (checkItems.item && a.item) && (checkItems.collection && a.collection) && (checkItems.scroll && a.scroll) ? 1 :
							(checkItems.item && a.item) && (checkItems.collection && a.collection) ? 2 :
							(checkItems.item && a.item) && (checkItems.scroll && a.scroll) ? 3 :
							(checkItems.item && a.item) ? 4 :
							(checkItems.collection && a.collection) && (checkItems.scroll && a.scroll) ? 5 :
							(checkItems.collection && a.collection) ? 6 :
							(checkItems.scroll && a.scroll) ? 7 : 8;
				let itemB = (checkItems.item && b.item) && (checkItems.collection && b.collection) && (checkItems.scroll && b.scroll) ? 1 :
							(checkItems.item && b.item) && (checkItems.collection && b.collection) ? 2 :
							(checkItems.item && b.item) && (checkItems.scroll && b.scroll) ? 3 :
							(checkItems.item && b.item) ? 4 :
							(checkItems.collection && b.collection) && (checkItems.scroll && b.scroll) ? 5 :
							(checkItems.collection && b.collection) ? 6 :
							(checkItems.scroll && b.scroll) ? 7 : 8;
				return itemA < itemB ? -1 : 1;
			});
		};
		getItemCell = (data, x = this.numberRandom(1, 999)) => {
			const { activePanel, activeStory, checkItems } = this.state;
			const { numberSpaces } = this;
			isDev&&console.warn('getItemCell', activeStory, activePanel);
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
		getItemPreview = (data, x, tooltip, item = false, coll = false, levels = false) => {
			const { activePanel, activeStory, checkItems, isCountItem } = this.state;
			const { OpenModal } = this;
			isDev&&console.warn('getItemPreview', activeStory, activePanel);
			let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
			let syncItemFull = levels ? syncItemsFull.find(x => x.id == data.id) : null;
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
			if (levels && !syncItem) {
				return;
			}
			isCountItem.null = false;
			return (
				<Card key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordItem`, {id: Items.indexOf(data), item: item, collection: coll, description: data.description})} className="CardWithAvatar itemPreview">
					<Cell 
						before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki" /><Avatar className="withPreload" src={`image/${data.icon}`}/></div>} 
						description={syncItemFull ? `${syncItemFull.lvl} уровень заточки` : data.description}
						after={tooltip ? item && <Icon24TshirtOutline width={24} height={24}/> || coll && <Icon24CubeBoxOutline width={24} height={24}/> : syncItem ? <Icon28CheckCircleOutline width={24} height={24} style={{color: 'var(--dynamic_green)'}}/> : <Icon28CancelCircleOutline width={24} height={24} style={{color: 'var(--destructive)'}}/>}
					>{data.title}</Cell>
					{syncItemFull && syncItemFull.bonus.reduce((accumulator, current) => accumulator + current) !== 0 && <div className="vkuiContentCard__body">
						{(syncItemFull.stones[0][0] == 1 || syncItemFull.stones[1][0] == 1 || syncItemFull.stones[2][0] == 1) && <div className="vkuiContentCard__caption  vkuiCaption vkuiCaption--ios vkuiCaption--w-regular vkuiCaption--l-1">Бонус от камней +{this.numberSpaces(syncItemFull.bonus[1])} энергии</div>}
						{(syncItemFull.stones[0][0] == 2 || syncItemFull.stones[1][0] == 2 || syncItemFull.stones[2][0] == 2) && <div className="vkuiContentCard__caption  vkuiCaption vkuiCaption--ios vkuiCaption--w-regular vkuiCaption--l-1">Бонус от камней +{this.numberSpaces(syncItemFull.bonus[0])} урона</div>}
						{(syncItemFull.stones[0][0] == 3 || syncItemFull.stones[1][0] == 3 || syncItemFull.stones[2][0] == 3) && <div className="vkuiContentCard__caption  vkuiCaption vkuiCaption--ios vkuiCaption--w-regular vkuiCaption--l-1">Бонус от камней +{this.numberSpaces(syncItemFull.bonus[2]*15)} здоровья</div>}
					</div>}
				</Card>
			)
		};
		setActivePanel = (name = 'home', close = false) => {
			const { activePanel, activeStory, checkItems, checkTabs, isCountItem, isBonusItem } = this.state;
			const { OpenModal, CalcBoss } = this;
			isDev&&console.warn('setActivePanel', activeStory, activePanel);
			this.setState({ checkItems: {null: true, item: true, scroll: true, collection: true, personal: true, stock: true, yesStock: true, noStock: true} });
			checkItems.null = true;
			if (name == '1' && activeStory == 'profile') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри свой арсенал'}, null, 'card');
					return 0;
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
					this.setState({ profileItems: array });
				}
			}
			if (name == '2' && activeStory == 'profile') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри свои коллекции'}, null, 'card');
					return 0;
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
					this.setState({ profileItems: array });
				}
			}
			if (name == '3' && activeStory == 'profile') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри уровень вещей и камней'}, null, 'card');
					return 0;
				} else {
					let array = [];
					let yesStock = 0;
					let stones = 0;
					let lvl = 0;
					let dmg = 0;
					let hp = 0;
					let en = 0;
					Items.map((data, x) => {
						if (data.type == checkTabs) {
							let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
							if (syncItem) {
								yesStock++
								let item = syncItemsFull.find(x => x.id == data.id);
								stones += (item.stones[0][0] !== 0 ? 1 : 0) + (item.stones[1][0] !== 0 ? 1 : 0) + (item.stones[2][0] !== 0 ? 1 : 0);
								lvl += item.lvl;
								dmg += item.bonus[0];
								hp += item.bonus[2];
								en += item.bonus[1];
								array.push(data);
							}
						}
					});
					array.sort(function(a, b) {
						let A = syncItemsFull.find(x => x.id == a.id);
						let B = syncItemsFull.find(x => x.id == b.id);
						if (B.lvl < A.lvl) return -1;
						if (B.lvl > A.lvl) return 1;
						if (B.bonus[0]+B.bonus[1]+B.bonus[2]*15 < A.bonus[0]+A.bonus[1]+A.bonus[2]*15) return -1;
						if (B.bonus[0]+B.bonus[1]+B.bonus[2]*15 > A.bonus[0]+A.bonus[1]+A.bonus[2]*15) return 1;
					});
					isCountItem.yesStock = yesStock;
					isBonusItem.count = stones;
					isBonusItem.lvl = lvl;
					isBonusItem.dmg = dmg;
					isBonusItem.hp = hp;
					isBonusItem.en = en;
					this.setState({ profileItems: array });
				}
			}
			if (name == '4' && activeStory == 'profile') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри кто подписан вместе с тобой'}, null, 'card');
					return 0;
				}
			}
			if (name == '1' && activeStory == 'bosses') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай затраты на боссов'}, null, 'card');
					return 0;
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
			if (name == '1' && activeStory == 'arena') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай кубки и затраты на арену'}, null, 'card');
					return 0;
				}
			}
			if (name == '1' && activeStory == 'guild') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай топазы и аметисты'}, null, 'card');
					return 0;
				}
			}
			if (name == '1' && activeStory == 'other') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Считай затраты на улучшения'}, null, 'card');
					return 0;
				}
			}
			if (name == '5' && activeStory == 'other') {
				if (!isDonut) {
					OpenModal(`donut`, {header: 'VK Donut', subheader: 'Смотри новые предметы'}, null, 'card');
					return 0;
				}
			}
			if (!close || isDonut) {
				this.setState({ activePanel: name });
			}
		};
		isCheckItems = (e, id) => {
			const { activePanel, activeStory, isCountItem, checkItems } = this.state;
			isDev&&console.warn('isCheckItems', activeStory, activePanel);
			isCountItem.null = true;
			checkItems.null = true;
			checkItems[id] = e.target.checked;
			this.setState({ checkItems: {null: checkItems.null, item: checkItems.item, scroll: checkItems.scroll, collection: checkItems.collection, personal: checkItems.personal, stock: checkItems.stock, yesStock: checkItems.yesStock, noStock: checkItems.noStock} });
		};
		isCheckTabs = (id, type) => {
			const { activePanel, activeStory, isCountItem, isBonusItem } = this.state;
			isDev&&console.warn('isCheckTabs', activeStory, activePanel);
			this.setState({ checkTabs: id });
			isCountItem.null = true;
			if (type === 'item') {
				let array = [];
				let yesStock = 0;
				let noStock = 0;
				Items.map((data, x) => {
					if (data.type == id) {
						let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
						syncItem ? yesStock++ : noStock++;
						array.push(data);
					}
				});
				isCountItem.yesStock = yesStock;
				isCountItem.noStock = noStock;
				this.setState({ profileItems: array });
			}
			if (type === 'collection') {
				let array = [];
				let yesStock = 0;
				let noStock = 0;
				Collections.map((data, x) => {
					data = Items.find(x => x.id === data);
					if (data.type == id) {
						let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
						syncItem ? yesStock++ : noStock++;
						array.push(data);
					}
				});
				isCountItem.yesStock = yesStock;
				isCountItem.noStock = noStock;
				this.setState({ profileItems: array });
			}
			if (type === 'stones') {
				let array = [];
				let yesStock = 0;
				let stones = 0;
				let lvl = 0;
				let dmg = 0;
				let hp = 0;
				let en = 0;
				Items.map((data, x) => {
					if (data.type == id) {
						let syncItem = syncItems.indexOf(data.id) == -1 ? false : true;
						if (syncItem) {
							yesStock++
							let item = syncItemsFull.find(x => x.id == data.id);
							stones += (item.stones[0][0] !== 0 ? 1 : 0) + (item.stones[1][0] !== 0 ? 1 : 0) + (item.stones[2][0] !== 0 ? 1 : 0);
							lvl += item.lvl;
							dmg += item.bonus[0];
							hp += item.bonus[2];
							en += item.bonus[1];
							array.push(data);
						}
					}
				});
				array.sort(function(a, b) {
					let A = syncItemsFull.find(x => x.id == a.id);
					let B = syncItemsFull.find(x => x.id == b.id);
					if (B.lvl < A.lvl) return -1;
					if (B.lvl > A.lvl) return 1;
					if (B.bonus[0]+B.bonus[1]+B.bonus[2]*15 < A.bonus[0]+A.bonus[1]+A.bonus[2]*15) return -1;
					if (B.bonus[0]+B.bonus[1]+B.bonus[2]*15 > A.bonus[0]+A.bonus[1]+A.bonus[2]*15) return 1;
				});
				isCountItem.yesStock = yesStock;
				isBonusItem.count = stones;
				isBonusItem.lvl = lvl;
				isBonusItem.dmg = dmg;
				isBonusItem.hp = hp;
				isBonusItem.en = en;
				this.setState({ profileItems: array });
			}
		};
		OpenModal = (name, data, index, mode = 'page') => {
			const { activePanel, activeStory, checkItems } = this.state;
			isDev&&console.warn('OpenModal', activeStory, activePanel);
			checkItems.null = true;
			this.setState({ 
				activeModal: name,
				dataModal: data,
				indexModal: index,
				modalOpened: mode
			});
		};
		testtest = (from, to) => {
			const { activePanel, activeStory } = this.state;
			isDev&&console.warn('testtest', activeStory, activePanel);
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
		};
		VKBridge = async() => {
			const { activePanel, activeStory } = this.state;
			const { setActivePanel } = this;
			isDev&&console.warn('VKBridge', activeStory, activePanel);
			this.setState({ popout: <ScreenSpinner /> });
			// let dataVK = await getBridge('VKWebAppGetUserInfo');
			let dataVK = syncUser;
			// let dataGame = await getData('xml', `https://backup1.geronimo.su/gameHub/index.php?api_uid=${dataVK.id}&api_type=vk`);
			// console.log(dataGame);
			// setUser({vk: dataVK, game: dataGame.s});
			this.setState({ user: {vk: dataVK, game: dataVK} });
			setActivePanel(null);
			this.setState({ activeStory: 'profile' });
			this.setState({ popout: null });
		};
		loadProfile = async(dev = false, reload = false, version = 1, withParams = false) => {
			const { activePanel, activeStory } = this.state;
			const { setActivePanel, OpenModal } = this;
			reload ? this.setState({ popout: <ScreenSpinner /> }) : '';
			if (syncUser == null || reload == true) {
				isDev&&console.warn('loadProfile', activeStory, activePanel);
				let dataVK = await getBridge('VKWebAppGetUserInfo');
				if (isMask) {
					dataVK.id = isMask
				}
				if (!reload) {
					syncUser = true;
					let dataDonut = await getBridge('VKWebAppCallAPIMethod', {"method": "execute.getMembers", "params": {"v": '5.130', "access_token": "844073b741823e279bab9e368fe05fc56c1af139e5b6ecde3510cb01476167b117651849ec3ced221f55d"}});
					dataDonutUser = await getBridge('VKWebAppCallAPIMethod', {"method": "execute.getMembersFull", "params": {"v": '5.130', "access_token": "844073b741823e279bab9e368fe05fc56c1af139e5b6ecde3510cb01476167b117651849ec3ced221f55d"}});
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
							syncItemsFull = dataGameItems.i.map((data, x) => {
								// console.log(data);
								return {
									id: Number(data._id), // номер
									lvl: Number(data._u), // уровень
									stones: [
										[Number(data._st11), Number(data._st12)], // раздел, уровень
										[Number(data._st21), Number(data._st22)], // раздел, уровень
										[Number(data._st31), Number(data._st32)] // раздел, уровень
									],
									bonus: [Number(data._st_dmg), Number(data._st_en), Number(data._st_end)]
								};
							});
						} else {
							// Ошибка при первом запуске
						}
						isDonut = true;
					}
					syncUser = dataVK;
					this.setState({ user: {vk: dataVK, game: null} });
					!withParams&&setActivePanel(null);
					!withParams&&this.setState({ activeStory: 'home' });
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
						syncItemsFull = dataGameItems.i.map((data, x) => {
							// console.log(data);
							return {
								id: Number(data._id), // номер
								lvl: Number(data._u), // уровень
								stones: [
									[Number(data._st11), Number(data._st12)], // раздел, уровень
									[Number(data._st21), Number(data._st22)], // раздел, уровень
									[Number(data._st31), Number(data._st32)] // раздел, уровень
								],
								bonus: [Number(data._st_dmg), Number(data._st_en), Number(data._st_end)]
							};
						});
					} else {
						OpenModal(`alert`, {header: 'Ошибка получения данных персонажа', subheader: `Авторизуйтесь на ${version} сервере и обновите приложение`}, null, 'card');
					}
				}
				this.setState({ popout: null });
			}
		};
		parseQueryString = (string) => {
			return string.slice(1).split('&')
				.map((queryParam) => {
					let kvp = queryParam.split('=');
					return {key: kvp[0], value: kvp[1]}
				})
				.reduce((query, kvp) => {
					query[kvp.key] = kvp.value;
					return query
				}, {})
		};
		async componentDidMount() {
			const { loadProfile, setTheme, setActivePanel, OpenModal, parseQueryString } = this;
			// this.setState({ popout: null });
			const queryParams = parseQueryString(window.location.search);
			const hashParams = parseQueryString(window.location.hash);
			isDev&&console.warn('queryParams', queryParams);
			isDev&&console.warn('hashParams', hashParams);
			await isDesktop && setTheme();
			if (Object.keys(hashParams).indexOf('dev') != -1) {
				isDev = true;
			}
			if (Object.keys(hashParams).indexOf('mask') != -1) {
				isMask = Number(Object.values(hashParams)[Object.keys(hashParams).indexOf('mask')]);
			}
			await loadProfile(Object.keys(hashParams).indexOf('dev') != -1, false, 1, Object.keys(hashParams).indexOf('view') != -1);
			Object.keys(hashParams).map((key) => {
				let value = hashParams[key];
				if (key === 'view') {
					this.setState({ activeStory: value });
				}
				if (key === 'panel' && typeof hashParams.view != 'undefined') {
					setActivePanel(value);
				}
				if (key === 'modal' && typeof hashParams.view != 'undefined' && typeof hashParams.panel != 'undefined') {
					try {
						document.querySelector(`#modal_${value}`).click();
					} catch (error) {
						
					}
				}
			});
		};


		render() {
			const { activeStory, activePanel, popout, user, modalOpened, activeModal, indexModal, dataModal, checkItems, count_guild_1, count_guild_2, count_arena_1, count_arena_2, newBossArray, count_boss, newBossHP, newBossDMG, checkTabs, isCountItem, isBonusItem, profileItems, theme } = this.state;
			const { onStoryChange, numberForm, setActivePanel, OpenModal, getTime, numberSpaces, isCheckItems, getItemCell, getItemPreview, testtest, isCalcBoss, CalcBoss, setNewBoss, VKBridge, loadProfile, isCheckTabs, setTheme, getSort } = this;
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
							<Placeholder action={<Button href="https://vk.com/donut/wiki.warlord" target="_blank" size="m" mode="commerce">Узнать подробнее</Button>} icon={<Icon56DonateOutline width="56" height="56" style={{color: '#ffae26'}} />} header="VK Donut">Смотри наличие вещей,<br/>а также многое другое вместе с подпиской</Placeholder>
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
					onClose={() => this.setState({ modalOpened: null })}
				>
					<ModalCard
						id='modal-warlord-card'
						onClose={() => this.setState({ modalOpened: null })}
						icon={
							activeModal === 'donut' && <Icon56DonateOutline width="56" height="56" style={{color: '#ffae26'}} /> ||
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
						onClose={() => this.setState({ modalOpened: null })}
						header={
							modalOpened && activeModal !== 'modal-warlordItem' && activeModal !== 'modal-warlordBossCreate' && <ModalPageHeader
								className={isDesktop && "ModalWiki"}
								left={platform !== IOS && !isDesktop && <PanelHeaderClose onClick={() => this.setState({ modalOpened: null })} />}
								right={platform === IOS && !isDesktop && <PanelHeaderButton onClick={() => this.setState({ modalOpened: null })}><Icon24Dismiss /></PanelHeaderButton>}
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
								{activeModal === 'modal-warlordBosses' && dataModal && indexModal === 3 && dataModal.name}
		
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
									<Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description="Получение">{dataModal.description}</Cell>
									<Spacing separator size={16} />
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
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
									<CardGrid size="m">
										<Card>
											<FormItem top="Здоровье" bottom="Введите здоровье вашего противника">
												<Input placeholder="Здоровье" value={String(newBossHP)} min={0} onChange={e => this.setState({newBossHP: e.target.value})} type="number"/>
											</FormItem>
										</Card>
										<Card>
											<FormItem top="Атака" bottom="Введите атаку вашего противника">
												<Input placeholder="Атака" value={String(newBossDMG)} min={0} onChange={e => this.setState({newBossDMG: e.target.value})} type="number"/>
											</FormItem>
										</Card>
									</CardGrid>
									<Spacing size={8} />
									<Div>
										<Button stretched size="l" mode="commerce" onClick={() => setNewBoss('create')}>Подтвердить</Button>
									</Div>
								</Group>
							}
							{activeModal === 'modal-warlordBosses' && dataModal && indexModal === 3 &&
								<Group>
									<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description="Описание">{dataModal.description}</Cell>
									<Cell className="DescriptionWiki" before={<Icon24UserSquareOutline />} description="Характеристики">{numberSpaces(dataModal.hp)} здоровья<br/>{numberSpaces(dataModal.dmg)} атаки</Cell>
									{(dataModal.rewards.m1 != 0 || dataModal.rewards.m2 != 0 || dataModal.rewards.exp != 0) && <Cell className="DescriptionWiki" before={<Icon24GiftOutline />} description="Награда за победу">
										{dataModal.rewards.m1 !== 0 && <React.Fragment>{numberSpaces(dataModal.rewards.m1)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/></React.Fragment>}
										{dataModal.rewards.m2 !== 0 && <React.Fragment>{numberSpaces(dataModal.rewards.m2)}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/><br/></React.Fragment>}
										{dataModal.rewards.exp !== 0 && <React.Fragment>{numberSpaces(dataModal.rewards.exp)} опыта</React.Fragment>}
									</Cell>}
									<Spacing separator size={16} />
									<Cell className="DescriptionWiki" before={<Icon24ClockOutline />} description="Лимит убийств">{dataModal.tries} {numberForm(dataModal.tries, ['попытка', 'попытки', 'попыток'])}, восстановление одной {getTime(dataModal.time)}</Cell>
									<Cell className="DescriptionWiki" before={<Icon24SkullOutline />} description="Тип боя">{dataModal.type === 1 ? 'Одиночный бой' : 'Общий бой'}</Cell>
									<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость нападения">{dataModal.energy} {numberForm(dataModal.energy, ['энергия', 'энергии', 'энергии'])}</Cell>
									<Spacing separator size={16} />
									{getSort(dataModal.items).map((data, x) => {
										if ((checkItems.item && data.item) || (checkItems.collection && data.collection && !data.personal) || (checkItems.scroll && data.scroll) || (checkItems.personal && data.personal)) {
											return getItemCell(data, x);
										}
									})}
									{checkItems.null && 
										<Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>
									}
									<Spacing separator size={16} />
									<Link href={`image/${dataModal.image}`} target="_blank"><Cell className="DescriptionWiki" before={<Icon24ChainOutline />} description="Изображение">Открыть полное изображение босса</Cell></Link>
									<Link href={`image/${dataModal.background}`} target="_blank"><Cell className="DescriptionWiki" before={<Icon24ChainOutline />} description="Изображение">Открыть полное изображение фона</Cell></Link>
								</Group>
							}
		
		
							{activeModal === 'modal-warlordArena' && dataModal && indexModal === 2 &&
								<Group>
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
									<Cell className="DescriptionWiki" before={<Icon24FavoriteOutline />} description="Требуемый уровень Кузницы">{dataModal.build} уровень</Cell>
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
									{getSort(dataModal.items).map((data, x) => {
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
									<Cell className="DescriptionWiki" before={<Icon24UserSquareOutline />} description="Характеристики">{numberSpaces(dataModal.hp)} здоровья<br/>{numberSpaces(dataModal.dmg)} атаки</Cell>
									<Cell className="DescriptionWiki" before={<Icon24MoneyCircleOutline />} description="Стоимость создания">{numberSpaces(dataModal.price[0])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/1.png)`}}/><br/>{numberSpaces(dataModal.price[1])}<Spinner size="small" className="DescriptionPricePreloadWiki" /><i style={{backgroundImage: `url(image/currency/3.png)`}}/></Cell>
									<Spacing separator size={16} />
									{getSort(dataModal.items).map((data, x) => {
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
									{getSort(dataModal.items).map((data, x) => {
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
			return (
				// <SplitLayout header={isDesktop && hasHeader && <PanelHeader separator={false} />} style={{ justifyContent: "center" }} popout={popout} >
				<SplitLayout style={{ justifyContent: "center" }} popout={popout} >
					{isDesktop && (
						<SplitCol fixed width="280px" maxWidth="280px">
							<Panel>
							{/* {hasHeader && <PanelHeader />} */}
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
										before={!isMask ? <Avatar size={28} src={user && user.vk ? user.vk.photo_200 : 'https://vk.com/images/camera_200.png'}/> : <Icon28GhostSimleOutline/>}
										description={isDonut ? `${server == 1 ? 'Эрмун' : 'Антарес'}, ${isDev ? 'режим разработчика' : 'полный доступ'}` : 'Обычный доступ'}
									>{!isMask ? (user && user.vk ? `${user.vk.first_name} ${user.vk.last_name}` : 'Пользователь') : `Приватный пользователь`}</Cell>
									<Spacing separator size={16} />
									<Cell
										disabled={activeStory === 'map'}
										style={activeStory === 'map' ? {
											backgroundColor: "var(--button_secondary_background)",
											borderRadius: 8
										} : {}}
										data-story="map"
										onClick={onStoryChange}
										before={<Icon28GlobeOutline />}
										description="Рейды, приключения"
									>Карта</Cell>
									<Cell
										disabled={activeStory === 'bosses'}
										style={activeStory === 'bosses' ? {
											backgroundColor: "var(--button_secondary_background)",
											borderRadius: 8
										} : {}}
										data-story="bosses"
										onClick={onStoryChange}
										before={<Icon28PawOutline />}
										description="Cписки боссов"
									>Боссы</Cell>
									<Cell
										disabled={activeStory === 'arena'}
										style={activeStory === 'arena' ? {
											backgroundColor: "var(--button_secondary_background)",
											borderRadius: 8
										} : {}}
										data-story="arena"
										onClick={onStoryChange}
										before={<Icon28Smiles2Outline />}
										description="Сезоны, сундуки"
									>Арена</Cell>
									<Cell
										disabled={activeStory === 'character'}
										style={activeStory === 'character' ? {
											backgroundColor: "var(--button_secondary_background)",
											borderRadius: 8
										} : {}}
										data-story="character"
										onClick={onStoryChange}
										before={<Icon28IncognitoOutline />}
										description="Питомцы, достижения"
									>Персонаж</Cell>
									<Cell
										disabled={activeStory === 'guild'}
										style={activeStory === 'guild' ? {
											backgroundColor: "var(--button_secondary_background)",
											borderRadius: 8
										} : {}}
										data-story="guild"
										onClick={onStoryChange}
										before={<Icon28Users3Outline />} 
										description="Кузница, набеги"
									>Гильдия</Cell>
									<Cell
										disabled={activeStory === 'other'}
										style={activeStory === 'other' ? {
											backgroundColor: "var(--button_secondary_background)",
											borderRadius: 8
										} : {}}
										data-story="other"
										onClick={onStoryChange}
										before={<Icon28GridSquareOutline />} 
										description="События, лотерея"
									>Разное</Cell>
									<Spacing separator size={16} />
									<Cell
										onClick={() => setTheme(true)}
										before={theme == 'bright_light' ? <Icon28SunOutline/> : <Icon28MoonOutline/>}
										description={theme == 'bright_light' ? 'Установлена светлая тема' : 'Установлена тёмная тема'}
									>Переключить тему</Cell>
								</Group>
							</Panel>
						</SplitCol>
					)}
					<SplitCol animate={!isDesktop} spaced={isDesktop} width={isDesktop ? '560px' : '100%'} maxWidth={isDesktop ? '560px' : '100%'}>
						<Epic activeStory={activeStory} tabbar={!isDesktop &&
							<Tabbar>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'map'}
									data-story="map"
									text="Карта"
								><Icon28GlobeOutline/></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'bosses'}
									data-story="bosses"
									text="Боссы"
								><Icon28PawOutline/></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'arena'}
									data-story="arena"
									text="Арена"
								><Icon28Smiles2Outline/></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'character'}
									data-story="character"
									text="Персонаж"
								><Icon28IncognitoOutline/></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'guild'}
									data-story="guild"
									text="Гильдия"
								><Icon28Users3Outline/></TabbarItem>
								<TabbarItem
									onClick={onStoryChange}
									selected={activeStory === 'other'}
									data-story="other"
									text="Разное"
								><Icon28GridSquareOutline/></TabbarItem>
							</Tabbar>
						}>



							
							<View id="home" activePanel="home" modal={modal}>
								<Panel id="home">
									{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => VKBridge()}><Avatar size={28} src={user && user.vk ? user.vk.photo_200 : 'https://vk.com/images/camera_200.png'} /></PanelHeaderButton>}>Warlord Helper</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Warlord Helper</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 'auto'
											}}
											bullets="dark"
											showArrows
											className="GalleryBanners"
											timeout="5000"
										>
											{dataMain.banners.map((data, x) =>
												<Banner
													key={x}
													className={`HeadBannerWiki ${x % 2 == 0 ? 'toLeft' : 'toRight'}`}
													mode="image"
													size="m"
													header={data.title}
													subheader={data.description}
													background={
														<React.Fragment>
															<Spinner size="large" className="bannerPreloadWiki" />
															<div
																className="LabelBannerWiki"
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															/>
														</React.Fragment>
													}
													actions={<Button href={data.link} target="_blank" mode="overlay_primary" size={isDesktop ? "l" : "m"}>{data.action}</Button>}
												/>
											)}
										</Gallery>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"} className="CardsNews">
											{dataMain.news.map((data, x) =>
												<Card key={x}>
													<Link href={data.link} target="_blank">
														<HorizontalCell size='l' header={data.title} subtitle={data.description}>
															<Avatar size={128} mode='image' style={{
																backgroundImage: `url(image/${data.icon})`
															}}/>
														</HorizontalCell>
													</Link>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
							</View>



							<View id="profile" activePanel={!activePanel ? 'profile' : activePanel} modal={modal}>
								<Panel id="profile">
									{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Мой профиль</PanelHeader>}
										{user.vk && user.game && <Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Мой профиль</PanelHeader>}
											<Gradient style={{
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												textAlign: 'center',
												padding: 32
											}}>
												{isMask ? <Icon28GhostSimleOutline style={{color: 'var(--accent)'}} width={96} height={96}/> : <Avatar size={96} src={user.vk.photo_200 ? user.vk.photo_200 : null} />}
												<Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="medium">{isMask ? 'Приватный пользователь' : `${user.vk.first_name} ${user.vk.last_name}`}</Title>
												<Link style={{ marginBottom: isDonut ? 12 : 0, color: 'var(--text_secondary)' }} href={`https://vk.com/id${user.vk.id}`} target="_blank">@{user.vk.id}</Link>
												{isDonut && <Button size="m" mode="commerce" onClick={() => loadProfile(false, true, (server === 1 ? 2 : 1))}>Сменить сервер</Button>}
											</Gradient>
											<Spacing size={8} />
											<CardGrid size="m">
												<Card onClick={() => setActivePanel('1', true)} className="CardWithAvatar">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/12.png' /></div>} description="Список ваших вещей">Магазин</Cell>
												</Card>
												<Card onClick={() => setActivePanel('2', true)} className="CardWithAvatar">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/20.png' /></div>} description="Список ваших коллекций">Коллекции</Cell>
												</Card>
												<Card onClick={() => setActivePanel('3', true)} className="CardWithAvatar">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/31.png' /></div>} description="Список вещей и их камней">Инкрустация</Cell>
												</Card>
												<Card onClick={() => setActivePanel('4', true)} className="CardWithAvatar">
													<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/28.png' /></div>} description="Список донов">Доны</Cell>
												</Card>
											</CardGrid>
										</Group>}
								</Panel>
								<Panel id="1">
									{activePanel === '1' && activeStory === 'profile' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Магазин</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Магазин</PanelHeader>}
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
												<Card className="DescriptionCardWiki"><Cell before={<Icon28CheckCircleOutline width={24} height={24} />} description={<span>У вас {numberForm(isCountItem.yesStock, ['куплена', 'куплены', 'куплено'])} {isCountItem.yesStock} {numberForm(isCountItem.yesStock, ['вещь', 'вещи', 'вещей'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon28CancelCircleOutline width={24} height={24} />} description={<span>У вас не {numberForm(isCountItem.noStock, ['куплена', 'куплены', 'куплено'])} {isCountItem.noStock} {numberForm(isCountItem.noStock, ['вещь', 'вещи', 'вещей'])}</span>}></Cell></Card>
											</CardGrid>
											<Spacing size={8} />
											<CardGrid size="m">
												<Card className="DescriptionCardWiki MiniCell"><Cell before={<Icon28CheckCircleOutline width={24} height={24} />} description={<span>{numberForm(isCountItem.yesStock, ['Куплена', 'Куплены', 'Куплено'])}</span>}>{isCountItem.yesStock} {numberForm(isCountItem.yesStock, ['вещь', 'вещи', 'вещей'])}</Cell></Card>
												<Card className="DescriptionCardWiki MiniCell"><Cell before={<Icon28CancelCircleOutline width={24} height={24} />} description={<span>Не {numberForm(isCountItem.noStock, ['куплена', 'куплены', 'куплено'])}</span>}>{isCountItem.noStock} {numberForm(isCountItem.noStock, ['вещь', 'вещи', 'вещей'])}</Cell></Card>
											</CardGrid>
											<CardGrid size="m">
												<Card className="DescriptionCardWiki">
													<Cell className="DescriptionWiki" before={<Icon28CheckCircleOutline />}>
														<InfoRow header={`У вас ${numberForm(isCountItem.yesStock, ['куплена', 'куплены', 'куплено'])}`}>{isCountItem.yesStock} {numberForm(isCountItem.yesStock, ['вещь', 'вещи', 'вещей'])}</InfoRow>
													</Cell>
												</Card>
												<Card className="DescriptionCardWiki">
													<Cell className="DescriptionWiki" before={<Icon28CancelCircleOutline />}>
														<InfoRow header={`У вас не ${numberForm(isCountItem.noStock, ['куплена', 'куплены', 'куплено'])}`}>{isCountItem.noStock} {numberForm(isCountItem.noStock, ['вещь', 'вещи', 'вещей'])}</InfoRow>
													</Cell>
												</Card>
											</CardGrid>
											<CardGrid size="m">
												<Card className="DescriptionCardWiki">
													<Cell before={<Icon28CheckCircleOutline width={24} height={24} />} description={`У вас ${numberForm(isCountItem.yesStock, ['куплена', 'куплены', 'куплено'])}`}>{isCountItem.yesStock} {numberForm(isCountItem.yesStock, ['вещь', 'вещи', 'вещей'])}</Cell>
												</Card>
												<Card className="DescriptionCardWiki">
													<Cell before={<Icon28CancelCircleOutline width={24} height={24} />} description={`У вас не ${numberForm(isCountItem.noStock, ['куплена', 'куплены', 'куплено'])}`}>{isCountItem.noStock} {numberForm(isCountItem.noStock, ['вещь', 'вещи', 'вещей'])}</Cell>
												</Card>
											</CardGrid>
											<Spacing separator size={16} />
											{profileItems && <CardGrid size={isDesktop ? "m" : "m"} className="Scroll" style={{maxHeight: '387px'}}>
												{profileItems.map((data, x) => {
													return getItemPreview(data, x, false, true, false);
												})}
											</CardGrid>}
											{!profileItems || isCountItem.null && <Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>}
											<Spacing separator size={16} />
											{VisibleItems('item')}
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="2">
									{activePanel === '2' && activeStory === 'profile' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Коллекции</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Коллекции</PanelHeader>}
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
												<Card className="DescriptionCardWiki"><Cell before={<Icon28CheckCircleOutline width={24} height={24} />} description={<span>У вас {numberForm(isCountItem.yesStock, ['собрана', 'собраны', 'собрано'])} {isCountItem.yesStock} {numberForm(isCountItem.yesStock, ['коллекция', 'коллекции', 'коллекций'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon28CancelCircleOutline width={24} height={24} />} description={<span>У вас не {numberForm(isCountItem.noStock, ['собрана', 'собраны', 'собрано'])} {isCountItem.noStock} {numberForm(isCountItem.noStock, ['коллекция', 'коллекции', 'коллекций'])}</span>}></Cell></Card>
											</CardGrid>
											<Spacing separator size={16} />
											{profileItems && <CardGrid size={isDesktop ? "m" : "m"} className="Scroll" style={{maxHeight: '387px'}}>
												{profileItems.map((data, x) => {
													return getItemPreview(data, x, false, false, true);
												})}
											</CardGrid>}
											{!profileItems || isCountItem.null && <Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>}
											<Spacing separator size={16} />
											{VisibleItems('collection')}
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="3">
									{activePanel === '3' && activeStory === 'profile' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Инкрустация</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Инкрустация</PanelHeader>}
											<Tabs mode="buttons">
												<HorizontalScroll getScrollToLeft={i => i - 240} getScrollToRight={i => i + 240}>
													<TabsItem onClick={() => isCheckTabs(2, 'stones')} selected={checkTabs === 2}>Оружие</TabsItem>
													<TabsItem onClick={() => isCheckTabs(4, 'stones')} selected={checkTabs === 4}>Шлемы</TabsItem>
													<TabsItem onClick={() => isCheckTabs(3, 'stones')} selected={checkTabs === 3}>Броня</TabsItem>
													<TabsItem onClick={() => isCheckTabs(12, 'stones')} selected={checkTabs === 12}>Наплечники</TabsItem>
													<TabsItem onClick={() => isCheckTabs(6, 'stones')} selected={checkTabs === 6}>Наручи</TabsItem>
													<TabsItem onClick={() => isCheckTabs(14, 'stones')} selected={checkTabs === 14}>Перчатки</TabsItem>
													<TabsItem onClick={() => isCheckTabs(5, 'stones')} selected={checkTabs === 5}>Штаны</TabsItem>
													<TabsItem onClick={() => isCheckTabs(13, 'stones')} selected={checkTabs === 13}>Ботинки</TabsItem>
													<TabsItem onClick={() => isCheckTabs(15, 'stones')} selected={checkTabs === 15}>Щиты</TabsItem>
													<TabsItem onClick={() => isCheckTabs(16, 'stones')} selected={checkTabs === 16}>Бижутерия</TabsItem>
												</HorizontalScroll>
											</Tabs>
											<Spacing size={8} />
											<CardGrid size="s">
												<Card className="DescriptionCardWiki"><Cell before={<Icon24MoneyCircleOutline width={24} height={24} />} description={<span>Куплено {isCountItem.yesStock} {numberForm(isCountItem.yesStock, ['предмет', 'предмета', 'предметов'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon24HammerOutline width={24} height={24} />} description={<span>Вставлено {numberSpaces(isBonusItem.count)} {numberForm(isBonusItem.count, ['камень', 'камня', 'камней'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon24StatisticsOutline width={24} height={24} />} description={<span>Суммарно {numberSpaces(isBonusItem.lvl)} {numberForm(isBonusItem.lvl, ['уровень', 'уровня', 'уровней'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon24GiftOutline width={24} height={24} />} description={<span>Бонус {numberSpaces(isBonusItem.dmg)} {numberForm(isBonusItem.dmg, ['урон', 'урона', 'урон'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon24GiftOutline width={24} height={24} />} description={<span>Бонус {numberSpaces(isBonusItem.hp*15)} {numberForm(isBonusItem.hp*15, ['здоровье', 'здоровья', 'здоровья'])}</span>}></Cell></Card>
												<Card className="DescriptionCardWiki"><Cell before={<Icon24GiftOutline width={24} height={24} />} description={<span>Бонус {numberSpaces(isBonusItem.en)} {numberForm(isBonusItem.en, ['энергия', 'энергии', 'энергии'])}</span>}></Cell></Card>
											</CardGrid>
											<Spacing separator size={16} />
											{profileItems && <CardGrid size={isDesktop ? "m" : "m"} className="Scroll" style={{maxHeight: '387px'}}>
												{profileItems.map((data, x) => {
													// console.log(data);
													return getItemPreview(data, x, true, false, false, true);
												})}
											</CardGrid>}
											{!profileItems || isCountItem.null && <Cell className="DescriptionWiki" style={{textAlign: 'center'}} description="Нет предметов"></Cell>}
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="4">
									{activePanel === '4' && activeStory === 'profile' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Доны</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('profile')}/>}>Доны</PanelHeader>}
											{dataDonutUser == [] && <Placeholder action={<Button href="https://vk.com/donut/wiki.warlord" target="_blank" size="m" mode="commerce">Узнать подробнее</Button>} icon={<Icon56DonateOutline width="56" height="56" style={{color: '#ffae26'}} />} header="VK Donut">Донов пока нет,<br/>но ты можешь быть первым</Placeholder>}
											{dataDonutUser.response && dataDonutUser.response.count > 0 && 
												<CardGrid size="m">
												{dataDonutUser.response.items.map((data, x) => {
													return (
														<Card key={x} className="CardWithAvatar">
															<Cell href={`https://vk.com/id${data.id}`} target='_blank' before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src={data.photo_200} /></div>} description={data.id}>{data.first_name} {data.last_name}</Cell>
														</Card>
													)
												})}
												</CardGrid>
											}
										</Group>
									</React.Fragment>}
								</Panel>
							</View>




							<View id="map" activePanel={!activePanel ? 'map' : activePanel} modal={modal}>
								<Panel id="map">
									{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Карта</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Карта</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 200,
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												borderRadius: 0
											}}
											bullets="dark"
											showArrows
											timeout="5000"
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
											<Card onClick={() => setActivePanel('1')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/1.png' /></div>} description="Список предметов и цен">Мустафа</Cell>
											</Card>
											<Card onClick={() => setActivePanel('2')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/2.png' /></div>} description="Список зданий для обыска">Обыск</Cell>
											</Card>
											<Card onClick={() => setActivePanel('3')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/3.png' /></div>} description="Список походов и наград">Походы</Cell>
											</Card>
											<Card onClick={() => setActivePanel('4')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/4.png' /></div>} description="Список рейдов и наград">Рейды</Cell>
											</Card>
											<Card onClick={() => setActivePanel('5')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/5.png' /></div>} description="Список приключений и наград">Приключения</Cell>
											</Card>
											<Card onClick={() => setActivePanel('6')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/6.png' /></div>} description="Описание районов">Районы</Cell>
											</Card>
											<Card onClick={() => setActivePanel('7')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/7.png' /></div>} description="Описание захвата района">Захват</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="1">
									{activePanel === '1' && activeStory === 'map' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Мустафа</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Мустафа</PanelHeader>}
											<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Мустафа продаёт различные товары, начиная от ресурсов, заканчивая элементами коллекций.<br/>Список товаров обновляется каждые 8 часов.</span>}></Cell>
											<Spacing size={8} />
											{dataMap.shop && <CardGrid size={isDesktop ? "m" : "m"}>
												{dataMap.shop.map((data, x) => {
													return getItemPreview(Items[data.id], x, null, data.tooltip == 'Предмет' ? true : false, data.tooltip == 'Коллекция' ? true : false);
												})}
											</CardGrid>}
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="2">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Обыск</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Обыск</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>При помощи обыска можно получать различные ресурсы со зданий.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"} className="size-x4 auto">
											{dataMap.builds.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordMap`, data, 2)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.map}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="3">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Походы</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Походы</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Походы доступны с 10 уровня. В день возможно запустить поход 7 раз.<br/>В походах можно найти уникальных питомцев, а также ключи к фонам.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s">
											{dataMap.crusade.chests.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordMap`, data, 3.1)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
										<Spacing separator size={16} />
										<CardGrid size={isDesktop ? "s" : "m"} className="size-x4 auto">
											{dataMap.crusade.points.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${dataMap.crusade.chests.length+x+1}`} onClick={() => OpenModal(`modal-warlordMap`, data, 3.2)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
										<Spacing separator size={16} />
										{SortableItems}
									</Group>
								</Panel>
								<Panel id="4">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Рейды</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Рейды</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Рейды доступны с 40 уровня. В день возможно войти в рейд не более 3 раз.<br/>Чтобы открыть новый режим сложности, требуется убить финального босса на предыдущем режиме.</span>}></Cell>
										<Spacing size={8} />
										{props.modalCount = 0, dataMap.raids.map((data, x) =>
											<Gradient className="GradientBannerWiki" key={x}>
												<Header indicator={<Link href={data.map} target="_blank"><Counter size="s" mode="primary">Открыть карту</Counter></Link>} subtitle={data.description}>{data.title}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.levels.map((data, x) => {
														props.modalCount++;
														return <Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordMap`, data, 4)}>
															<Spinner size="regular" className="bannerPreloadWiki" />
															<Cell
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
														</Card>
													})}
												</CardScroll>
											</Gradient>
										)}
										<Spacing size={8} />
										{SortableItems}
									</Group>
								</Panel>
								<Panel id="5">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Приключения</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Приключения</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Приключения доступны с 30 уровня. В день возможно войти в приключения не более 8 раз.<br/>После прохождения всех этажей, открывается возможность получать заточки за каждый бой.</span>}></Cell>
										<Spacing size={8} />
										{props.modalCount = 0, dataMap.adventures.map((data, x) =>
											<Gradient className="GradientBannerWiki" key={x}>
												<Header indicator={<Link onClick={() => OpenModal(`modal-warlordMap`, data.scrolls, 5.2)}><Counter size="s" mode="primary">Посмотреть заточки</Counter></Link>} subtitle={data.description}>{data.title}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.floors.map((data, x) => {
														props.modalCount++;
														return <Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordMap`, data, 5.1)}>
															<Spinner size="regular" className="bannerPreloadWiki" />
															<Cell
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															>{data.title}<span>Враги от {numberSpaces(data.guards[0])} HP</span></Cell>
														</Card>
													})}
												</CardScroll>
											</Gradient>
										)}
									</Group>
								</Panel>
								<Panel id="6">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Районы</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Районы</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Районы это главная часть всей игры. Всего их 34 штуки.<br/>Каждый район имеет внутри себя босса и по возможности постройку.</span>}></Cell>
										<Spacing size={8} />
										{props.modalCount = 0, dataMap.regions.map((data, z) => 
											<Gradient className="GradientBannerWiki" key={z}>
												<Header indicator={<Counter size="s" mode="secondary">{data.items.length} {numberForm(data.items.length, ['район', 'района', 'районов'])}</Counter>}>{data.title}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.items.map((data, x) => {
														props.modalCount++;
														return <Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordMap`, data, 6)}>
															<Spinner size="regular" className="bannerPreloadWiki" />
															<Cell
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															>{data.title}<span>Требуется {data.lvl == false ? 0 : data.lvl} уровень</span></Cell>
														</Card>
													})}
												</CardScroll>
											</Gradient>
										)}
									</Group>
								</Panel>
								<Panel id="7">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Захват</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('map')}/>}>Захват</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Приключения доступны с 30 уровня. В день возможно войти в приключения не более 8 раз.<br/>После прохождения всех этажей, открывается возможность получать заточки за каждый бой.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s" className="size-x4 auto">
											{dataMap.capture.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordMap`, data, 7)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>От {data.score} очков</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
							</View>



							<View id="bosses" activePanel={!activePanel ? 'bosses' : activePanel} modal={modal}>
								<Panel id="bosses">
									{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Боссы</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Боссы</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 200,
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												borderRadius: 0
											}}
											bullets="dark"
											showArrows
											timeout="5000"
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
											<Card onClick={() => setActivePanel('1', true)} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/8.png' /></div>} description="Затраты на убийство боссов">Калькулятор</Cell>
											</Card>
											<Card onClick={() => setActivePanel('3')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/29.png' /></div>} description="Список боссов и их наград">Список боссов</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="1">
									{activePanel === '1' && activeStory === 'bosses' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('bosses')}/>}>Калькулятор</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('bosses')}/>}>Калькулятор</PanelHeader>}
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
								<Panel id="3">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('bosses')}/>}>Список боссов</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('bosses')}/>}>Список боссов</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>В игре регулярно появляются новые боссы. У каждого своя награда, таймер восстановления, а также тип.<br/>Временные боссы появляются по одному через день.</span>}></Cell>
										{props.modalCount = 0, dataBosses.bosses.map((data, x_main) =>
											<Gradient className="GradientBannerWiki" key={x_main}>
												<Header indicator={<Counter size="s" mode="secondary">{data.mobs.length} {numberForm(data.mobs.length, ['босс', 'босса', 'боссов'])}</Counter>} subtitle={data.description}>{data.title}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.mobs.map((data, x) => {
														props.modalCount++;
														let boss = {};
														Object.assign(boss, Bosses.find(item => item.id === data.id), data);
														return (
															<Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordBosses`, boss, 3)}>
																<Spinner size="regular" className="bannerPreloadWiki" />
																<Cell
																	style={{
																		background: `url(image/${boss.image}) top left 25%/cover no-repeat, url(image/${boss.background}) center/cover`
																	}}
																>{boss.name}<span>{boss.description}</span></Cell>
															</Card>
														)
													}
													)}
												</CardScroll>
											</Gradient>
										)}
										<Spacing size={8} />
										{SortableItems}
									</Group>
								</Panel>
							</View>




							<View id="arena" activePanel={!activePanel ? 'arena' : activePanel} modal={modal}>
								<Panel id="arena">
									{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Арена</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Арена</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 200,
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												borderRadius: 0
											}}
											bullets="dark"
											showArrows
											timeout="5000"
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
											<Card onClick={() => setActivePanel('1', true)} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/8.png' /></div>} description="Затраты на прохождение арены">Калькулятор</Cell>
											</Card>
											<Card onClick={() => setActivePanel('2')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/9.png' /></div>} description="Предметы за все сезоны">Сезоны</Cell>
											</Card>
											<Card onClick={() => setActivePanel('3')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/10.png' /></div>} description="Список лиг и наград">Лиги</Cell>
											</Card>
											<Card onClick={() => setActivePanel('4')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/11.png' /></div>} description="Список сундуков и наград">Сундуки</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="1">
									{activePanel === '1' && activeStory === 'arena' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Калькулятор</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Калькулятор</PanelHeader>}
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
															onChange={count_arena_1 => this.setState({count_arena_1})}
														/>
													</FormItem>
													<FormItem>
														<Input value={String(count_arena_1)} min={0} onChange={e => this.setState({count_arena_1: e.target.value})} type="number"/>
													</FormItem>
												</Card>
												<Card mode="shadow">
													<FormItem top="Конечное количество кубков">
														<Slider
															step={1}
															min={0}
															max={10000}
															value={Number(count_arena_2)}
															onChange={count_arena_2 => this.setState({count_arena_2})}
														/>
													</FormItem>
													<FormItem>
														<Input value={String(count_arena_2)} min={0} onChange={e => this.setState({count_arena_2: e.target.value})} type="number"/>
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
								<Panel id="2">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Сезоны</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Сезоны</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Ежемесячно в игру поступают 2 новых предмета экипировки, которые доступны в качестве награды за арену.<br/>Чем выше лига - тем лучше и больше награда с ежемесячного сундука.</span>}></Cell>
										{props.modalCount = 0, dataArena.season.map((data, x_main) =>
											<Gradient className="GradientBannerWiki" key={x_main}>
												<Header indicator={<Counter size="s" mode="secondary">{data.month.length} {numberForm(data.month.length, ['месяц', 'месяца', 'месяцев'])}</Counter>}>{data.name}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.month.map((data, x) => {
														props.modalCount++;
														return <Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordArena`, data, 2)}>
															<Spinner size="regular" className="bannerPreloadWiki" />
															<Cell
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															>{data.name}<span>DMG {Items[data.items[0].id].dmg + Items[data.items[1].id].dmg} и HP {(Items[data.items[0].id].hp + Items[data.items[1].id].hp)*15}</span></Cell>
														</Card>
													})}
												</CardScroll>
											</Gradient>
										)}
									</Group>
								</Panel>
								<Panel id="3">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Лиги</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Лиги</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Подбор противников осуществляется из игроков в той же лиге, что и Вы.<br/>Чем выше ваша лига - тем выше шанс на выпадение более редкого сундука.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s">
											{dataArena.league.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordArena`, data, 3)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>От {data.from} кубков</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="4">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Сундуки</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('arena')}/>}>Сундуки</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Из сундуков могут выпасть вещи, заточки, а так же ценные ресурсы.<br/>Трофейные сундуки могут выпасть только с противника, который состоит в гильдии."</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"}>
											{dataArena.chest.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordArena`, data, 4)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
										<Spacing separator size={16} />
										{SortableItems}
									</Group>
								</Panel>
							</View>




							<View id="character" activePanel={!activePanel ? 'character' : activePanel} modal={modal}>
								<Panel id="character">
									{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Персонаж</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Персонаж</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 200,
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												borderRadius: 0
											}}
											bullets="dark"
											showArrows
											timeout="5000"
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
											<Card onClick={() => setActivePanel('1')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/12.png' /></div>} description="Описание талантов персонажа">Таланты</Cell>
											</Card>
											<Card onClick={() => setActivePanel('2')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/13.png' /></div>} description="Список достижений и условий">Достижения</Cell>
											</Card>
											<Card onClick={() => setActivePanel('3')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/14.png' /></div>} description="Список ресурсов и их получение">Ресурсы</Cell>
											</Card>
											<Card onClick={() => setActivePanel('4')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/15.png' /></div>} description="Список питомцев и их награды">Питомцы</Cell>
											</Card>
											<Card onClick={() => setActivePanel('6')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/16.png' /></div>} description="Список аватаров и их получение">Аватары</Cell>
											</Card>
											<Card onClick={() => setActivePanel('5')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/17.png' /></div>} description="Список фонов и их получение">Фоны</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="1">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Таланты</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Таланты</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 4 вида навыков и каждый можно прокачать до 9.999 уровня, цена с каждым разом увеличивается.<br/>Также за определённые уровни прокачки навыка можно получить достижение.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"} className="size-x4">
											{dataCharacter.talents.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordCharacter`, data, 1)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.description}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="2">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Достижения</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Достижения</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 80 достижений и почти каждое имеет 10 стадий.<br/>За каждую стадию достижения игрок получает награду в виде 1 рубина.</span>}></Cell>
										{props.modalCount = 0, dataCharacter.achievements.map((data, x_main) =>
											<Gradient className="GradientBannerWiki" key={x_main}>
												<Header indicator={<Counter size="s" mode="secondary">{data.items.length} {numberForm(data.items.length, ['достижение', 'достижения', 'достижений'])}</Counter>}>{data.title}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.items.map((data, x) => {
														props.modalCount++;
														return <Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordCharacter`, data, 2)}>
															<Spinner size="regular" className="bannerPreloadWiki" />
															<Cell
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															>{data.name}<span>{data.description}</span></Cell>
														</Card>
													})}
												</CardScroll>
											</Gradient>
										)}
									</Group>
								</Panel>
								<Panel id="3">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Ресурсы</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Ресурсы</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>В игре множество ресурсов и каждый добывается своим способом.<br/>Иногда ресурсы можно получить по подарочной ссылке в официальной группе.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s" className="size-x4">
											{dataCharacter.resources.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordCharacter`, data, 3)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.description}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="4">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Питомцы</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Питомцы</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Чем выше уровень питомца, тем больше и лучше добыча с поисков.<br/>Питомца необходимо найти и выращивать, коллекции с поисков являются личными.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"}>
											{dataCharacter.pets.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordCharacter`, data, 4)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
										<Spacing separator size={16} />
										{SortableItems}
									</Group>
								</Panel>
								<Panel id="5">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Фоны</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Фоны</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 9 видов фонов.<br/>Зимние фоны включаются сами в новогодние праздники.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"}>
											{dataCharacter.backgrounds.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordCharacter`, data, 5)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.description}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="6">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Аватары</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('character')}/>}>Аватары</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Всего в игре 27 видов аватаров.<br/>Выбранный аватар отображается в списке друзей и боя.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s" className="size-x4 auto">
											{dataCharacter.avatars.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordCharacter`, data, 6)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.description}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
							</View>




							<View id="guild" activePanel={!activePanel ? 'guild' : activePanel} modal={modal}>
								<Panel id="guild">
								{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Гильдия</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Гильдия</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 200,
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												borderRadius: 0
											}}
											bullets="dark"
											showArrows
											timeout="5000"
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
											<Card onClick={() => setActivePanel('1', true)} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/18.png' /></div>} description="Затраты на казну гильдии">Калькулятор</Cell>
											</Card>
											<Card onClick={() => setActivePanel('2')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/19.png' /></div>} description="Список улучшений и цен">Улучшения</Cell>
											</Card>
											<Card onClick={() => setActivePanel('3')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/20.png' /></div>} description="Список экипировки и её цен">Кузница</Cell>
											</Card>
											<Card onClick={() => setActivePanel('4')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/21.png' /></div>} description="Список навыков и их цен">Академия</Cell>
											</Card>
											<Card onClick={() => setActivePanel('5')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/22.png' /></div>} description="Список набегов и их наград">Набеги</Cell>
											</Card>
											<Card onClick={() => setActivePanel('6')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/23.png' /></div>} description="Список рейдов и их наград">Рейды</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="1">
									{activePanel === '1' && activeStory === 'guild' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Калькулятор</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Калькулятор</PanelHeader>}
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
															onChange={count_guild_1 => this.setState({count_guild_1})}
														/>
													</FormItem>
													<FormItem>
														<Input value={String(count_guild_1)} min={0} onChange={e => this.setState({count_guild_1: e.target.value})} type="number"/>
													</FormItem>
												</Card>
												<Card mode="shadow">
													<FormItem top="Необходимое количество Аметистов">
														<Slider
															step={1}
															min={0}
															max={50000}
															value={Number(count_guild_2)}
															onChange={count_guild_2 => this.setState({count_guild_2})}
														/>
													</FormItem>
													<FormItem>
														<Input value={String(count_guild_2)} min={0} onChange={e => this.setState({count_guild_2: e.target.value})} type="number"/>
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
								<Panel id="2">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Улучшения</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Улучшения</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Благодаря улучшениям зданий, вам открываются новые ступени навыков, вещи в кузнице и сборщики налогов, позволяющие собирать различные бонусы.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"}>
											{dataGuild.builds.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordGuild`, data, 2)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.bonus}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="3">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Кузница</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Кузница</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Аметисты и Топазы можно получить только вкладываясь в улучшения навыков и при пополнении казны.<br/>Заточки можно купить после покупки самого предмета.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s" className="size-x4">
											{dataGuild.items.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordGuild`, data, 3)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>Cтаж {data.days} {numberForm(data.days, ['день', 'дня', 'дней'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="4">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Академия</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Академия</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Навыки гильдии это уникальные бонусы, чей бонус зависим от уровня самого навыка.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s">
											{dataGuild.academy.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordGuild`, data, 4)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.bonus}</span></Cell>
												</Card>
											)}
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="5">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Набеги</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Набеги</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Набеги это уникальный вид боя всех участников гильдии против вражеской гильдии или NPC.<br/>Набеги доступны всем гильдиям, начиная с 5 уровня.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size={isDesktop ? "s" : "m"} className="size-x4">
											{dataGuild.raids.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordGuild`, data, 5)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
										<Spacing separator size={16} />
										{SortableItems}
									</Group>
								</Panel>
								<Panel id="6">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Рейды</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('guild')}/>}>Рейды</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Глава гильдии или её генералы могут создавать рейдовых боссов гильдии.<br/>Золото и серебро, требуемое для создания, взимается с казны гильдии.</span>}></Cell>
										<Spacing size={8} />
										<CardGrid size="s">
											{dataGuild.bosses.map((data, x) =>
												<Card className="BannerWiki" key={x} id={`modal_${x+1}`} onClick={() => OpenModal(`modal-warlordGuild`, data, 6)}>
													<Spinner size="regular" className="bannerPreloadWiki" />
													<Cell
														style={{
															backgroundImage: `url(image/${data.icon})`
														}}
													>{data.title}<span>{data.items.length} {numberForm(data.items.length, ['награда', 'награды', 'наград'])}</span></Cell>
												</Card>
											)}
										</CardGrid>
										<Spacing separator size={16} />
										{SortableItems}
									</Group>
								</Panel>
							</View>



							
							<View id="other" activePanel={!activePanel ? 'other' : activePanel} modal={modal}>
								<Panel id="other">
								{!isDesktop && <PanelHeader left={<PanelHeaderButton onClick={() => this.setState({ activeStory: 'home' })}><Icon28HomeOutline /></PanelHeaderButton>}>Разное</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true}>Разное</PanelHeader>}
										<Gallery
											slideWidth="100%"
											style={{ 
												height: 200,
												margin: isDesktop ? '-8px -7px 0 -7px' : 0,
												borderRadius: 0
											}}
											bullets="dark"
											showArrows
											timeout="5000"
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
											<Card onClick={() => setActivePanel('1', true)} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/26.png' /></div>} description="Затраты на улучшение предмета">Калькулятор</Cell>
											</Card>
											<Card onClick={() => setActivePanel('5', true)} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/20.png' /></div>} description="Список последних добавленных вещей">Новые предметы</Cell>
											</Card>
											<Card onClick={() => setActivePanel('3')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/28.png' /></div>} description="Список ивентов и их наград">События</Cell>
											</Card>
											<Card onClick={() => setActivePanel('2')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/27.png' /></div>} description="Список награды с лото">Лотерея</Cell>
											</Card>
											<Card onClick={() => setActivePanel('4')} className="CardWithAvatar">
												<Cell before={<div className="cardAvatar"><Spinner size="regular" className="cardAvatarPreloadWiki Head" /><Avatar size={72} className="withPreload" src='image/labels/30.png' /></div>} description="Список награды с обыска друзей">Обыск друзей</Cell>
											</Card>
										</CardGrid>
									</Group>
								</Panel>
								<Panel id="1">
									{activePanel === '1' && activeStory === 'other' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Калькулятор</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Калькулятор</PanelHeader>}
											<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Обязательно будет когда-нибудь</span>}></Cell>
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="2">
									{activePanel === '2' && activeStory === 'other' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Лотерея</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Лотерея</PanelHeader>}
											<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Бесплатная попытка в лотерею доступна каждые 24 часа.<br/>В лотереи можно также найти различные ресурсы.</span>}></Cell>
											<Spacing size={8} />
											{dataOther.lottery && <CardGrid size={isDesktop ? "m" : "m"}>
												{dataOther.lottery.map((data, x) => {
													// return getItemPreview(Items[data.id], x, data.tooltip, data.tooltip == 'Предмет' ? true : false, data.tooltip == 'Коллекция' ? true : false);
													return getItemPreview(Items[data.id], x, null, data.tooltip == 'Предмет' ? true : false, data.tooltip == 'Коллекция' ? true : false);
												})}
											</CardGrid>}
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="4">
									{activePanel === '4' && activeStory === 'other' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Обыск друзей</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Обыск друзей</PanelHeader>}
											<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Ежедневно к обыску доступно 15 друзей.<br/>При обыске можно найти различные ресурсы, а также элементы коллекций.</span>}></Cell>
											<Spacing size={8} />
											{dataOther.search && <CardGrid size={isDesktop ? "m" : "m"}>
												{dataOther.search.map((data, x) => {
													// return getItemPreview(Items[data.id], x, data.tooltip, data.tooltip == 'Предмет' ? true : false, data.tooltip == 'Коллекция' ? true : false);
													return getItemPreview(Items[data.id], x, null, data.tooltip == 'Предмет' ? true : false, data.tooltip == 'Коллекция' ? true : false);
												})}
											</CardGrid>}
										</Group>
									</React.Fragment>}
								</Panel>
								<Panel id="3">
									{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>События</PanelHeader>}
									<Group>
										{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>События</PanelHeader>}
										<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>Ивенты это уникальные события, которые запускаются во время крупных праздников.<br/>Участие в ивенте доступно для каждого игрока, и не требует никаких затрат.</span>}></Cell>
										{props.modalCount = 0, dataOther.events.map((data, x_main) =>
											<Gradient className="GradientBannerWiki" key={x_main}>
												<Header indicator={<Counter size="s" mode="secondary">{data.items.length} {numberForm(data.items.length, ['событие', 'события', 'событий'])}</Counter>}>{data.title}</Header>
												<CardScroll size="s" style={{paddingTop: 0, paddingBottom: 0}}>
													{data.items.map((data, x) => {
														props.modalCount++;
														return <Card className="BannerWiki Scroll" key={x} id={`modal_${props.modalCount}`} onClick={() => OpenModal(`modal-warlordOther`, data, 3)}>
															<Spinner size="regular" className="bannerPreloadWiki" />
															<Cell
																style={{
																	backgroundImage: `url(image/${data.icon})`
																}}
															>{data.name}<span>{data.date}</span></Cell>
														</Card>
													})}
												</CardScroll>
											</Gradient>
										)}
									</Group>
								</Panel>
								<Panel id="5">
									{activePanel === '5' && activeStory === 'other' && <React.Fragment>
										{!isDesktop && <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Новые предметы</PanelHeader>}
										<Group>
											{isDesktop && <PanelHeader className='HeaderFix' fixed={false} separator={true} left={<PanelHeaderBack onClick={() => setActivePanel('other')}/>}>Новые предметы</PanelHeader>}
											<Cell className="DescriptionWiki" before={<Icon24InfoCircleOutline />} description={<span>В игру регулярно поступают новые вещи, этот раздел отображает последние добавленные вещи и указывает их наличие у вас.</span>}></Cell>
											<Spacing size={8} />
											{dataOther.new && <CardGrid size={isDesktop ? "m" : "m"}>
												{dataOther.new.map((data, x) => {
													return getItemPreview(Items[data], x);
												})}
											</CardGrid>}
										</Group>
									</React.Fragment>}
								</Panel>
							</View>
						</Epic>
					</SplitCol>
				</SplitLayout>
			);
		};
	};
	return <ConfigProvider platform={isDesktop ? 'ios' : usePlatform()}><Wiki/></ConfigProvider>;
}, {
	viewWidth: true
});

ReactDOM.render(<AdaptivityProvider><AppRoot><App/></AppRoot></AdaptivityProvider>, document.getElementById('root'));