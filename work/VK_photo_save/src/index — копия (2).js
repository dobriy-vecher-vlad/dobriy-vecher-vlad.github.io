//Подключаем элементы интерфейса
import "core-js/features/map";
import "core-js/features/set";
import bridge from "@vkontakte/vk-bridge";
import React from 'react';
//import resemble from 'resemblejs';
import ReactDOM from 'react-dom';
import { Placeholder, FixedLayout, Separator, CardGrid, Select, Alert, ActionSheet, ActionSheetItem, Snackbar, CellButton, Div, IOS, platform, Header, Card, CardScroll, Banner, Counter, Link, ScreenSpinner, View, Panel, PanelHeader, Group, Cell, ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton, FormLayout, FormLayoutGroup, Button, Radio, SelectMimicry, Checkbox, Input, List, Avatar, InfoRow, ModalCard, UsersStack, Textarea } from '@vkontakte/vkui';

//Подключаем css
//import './panels/vkui.css';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/fix.css';

//Подключаем иконки
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import Icon56MoneyTransferOutline from '@vkontakte/icons/dist/56/money_transfer_outline';
import Icon28LogoVkOutline from '@vkontakte/icons/dist/28/logo_vk_outline';
import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import Icon28PictureStackOutline from '@vkontakte/icons/dist/28/picture_stack_outline';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon28LocationOutline from '@vkontakte/icons/dist/28/location_outline';
import Icon28CommentOutline from '@vkontakte/icons/dist/28/comment_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon28ScreencastOutline from '@vkontakte/icons/dist/28/screencast_outline';
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';
import Icon24ErrorCircle from '@vkontakte/icons/dist/24/error_circle';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';
import Icon24ImageFilterOutline from '@vkontakte/icons/dist/24/image_filter_outline';
import Icon24ScanViewfinderOutline from '@vkontakte/icons/dist/24/scan_viewfinder_outline';

//Назначаем глобальные переменные
const osName = platform();
console.warn(platform());
const version = '5.122';
const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_COUNTRIES = 'countries';
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback';
const MODAL_PAGE_USER_INFO = 'user-info';
const MODAL_CARD_MONEY_SEND = 'money-send';
const MODAL_CARD_APP_TO_MENU = 'app-to-menu';
const MODAL_CARD_ABOUT = 'say-about';
const MODAL_CARD_NOTIFICATIONS = 'notifications';
const MODAL_CARD_CHAT_INVITE = 'chat-invite';
const getAvatarUrl = 'https://pp.userapi.com/c639222/v639222699/5e1d8/2wtUaVn4Pho.jpg';
const importantCountries = [
	{id: 1, title: "Россия"},
	{id: 2, title: "Украина"},
	{id: 3, title: "Беларусь"},
	{id: 4, title: "Казахстан"},
	{id: 5, title: "Азербайджан"},
	{id: 6, title: "Армения"},
	{id: 7, title: "Грузия"},
	{id: 8, title: "Израиль"},
	{id: 9, title: "США"},
	{id: 65, title: "Германия"},
	{id: 11, title: "Кыргызстан"},
	{id: 12, title: "Латвия"},
	{id: 13, title: "Литва"},
	{id: 14, title: "Эстония"},
	{id: 15, title: "Молдова"},
	{id: 16, title: "Таджикистан"},
	{id: 17, title: "Туркменистан"},
	{id: 18, title: "Узбекистан"}
];
const IS_PLATFORM_ANDROID = false;
const IS_PLATFORM_IOS = true;
const orangeBackground = {
	backgroundImage: 'linear-gradient(135deg, #ffb73d, #ffa000)'
};
const blueBackground = {
	backgroundColor: 'var(--accent)'
};

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
      activeModal: null,
      modalHistory: [],
      text: '',
      alert: '',
      test: '',
      PhotoGrid: <Group><Placeholder icon={<Icon56GalleryOutline />}>Выберите альбом для продолжения работы</Placeholder></Group>,
      snackbar: null
    };

    this.info = {
    }

    this.users = 'k'.repeat(25).split('').map(() => {
      return {
      		"first_name": "Иван",
      		"id": 1470509643,
      		"last_name": "Гусев",
      		"name": "Иван Гусев",
      		"photo_100": "https://sun9-9.userapi.com/U_neC4C0b0k2TacpGigQf_4cbGKN7Z7tj4QzHQ/WCj1fIGbtZ8.jpg?ava=1",
      		"photo_200": "https://sun9-13.userapi.com/EdYJ0DLky80jbtItUYw6BZliBw9KDNxxPUjuSA/vdEHQgCkWdI.jpg?ava=1",
      		"screen_name": "girl"
      	};
    });

    this.modalBack = () => {
      this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    };

    this.openBase = this.openBase.bind(this);
    this.openBaseWithAction = this.openBaseWithAction.bind(this);

    this.openLongText = this.openLongText.bind(this);
    this.openWithAvatar = this.openWithAvatar.bind(this);

    this.openBases = this.openBases.bind(this);
    this.openIcons = this.openIcons.bind(this);
    this.openThemes = this.openThemes.bind(this);

    this.openDefault = this.openDefault.bind(this);
    this.openDestructive = this.openDestructive.bind(this);
    this.closePopout = this.closePopout.bind(this);
  }
  VKBridge () {
    this.setState({ popout: <ScreenSpinner /> });
	bridge.send('VKWebAppGetUserInfo').then(data => {
		this.info.id = data.id;
		this.info.fetchedUser = data;
		bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "friends,photos,video,pages,status,notes,wall,docs,groups,stats,market"}).then(data => {
			this.info.access_token = data.access_token;
			bridge.send("VKWebAppCallAPIMethod", {"method": "groups.get", "request_id": "groups.get", "params": {"user_id":this.info.id, "extended":1, "count":100, "fields":"members_count", "v":version, "access_token":this.info.access_token}}).then(data => {
				this.info.GroupsGet = data.response;
				bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":this.info.id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":this.info.access_token}}).then(data => {
					this.info.PhotosGetAlbums = data.response;
					bridge.send("VKWebAppCallAPIMethod", {"method": "friends.get", "request_id": "friends.get", "params": {"user_id":this.info.id, "count":100, "fields":"photo_200_orig", "v":version, "access_token":this.info.access_token}}).then(data => {
						this.info.FriendsGet = data.response;
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
		this.info.id = data.id;
		this.info.fetchedUser = data;
		bridge.send("VKWebAppGetAuthToken", {"app_id": 7474658, "scope": "photos"}).then(data => {
			this.info.access_token = data.access_token;
			bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getAlbums", "request_id": "photos.getAlbums", "params": {"owner_id":this.info.id, "need_system":1, "need_covers":1, "photo_sizes":1, "v":version, "access_token":this.info.access_token}}).then(data => {
				this.info.PhotosGetAlbums = data.response;
				this.setState({PhotoGrid:<Group><Placeholder icon={<Icon56GalleryOutline />}>Выберите альбом для продолжения работы</Placeholder></Group>});
				this.setState({ activePanel: 'VKPhotoManager' });
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
  }
	Update(count, type, test) {
		let Count = Number(count)-1;
		let CountMin = 50;
		if (type.value !== "") {
			this.setState({ popout: <ScreenSpinner /> });
			bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":this.info.id, "album_id":type.value, "rev":1, "count":CountMin, "offset":(Count*CountMin), "v":version, "access_token":this.info.access_token}}).then(data => {
				let CountMax = Math.ceil(data.response.count/CountMin);
				this.info.PhotosGet = data.response;
				this.setState({PhotoGrid:
					<Group>
						<CellButton onClick={this.PhotoFindDuplicates.bind(this,{"count":data.response.count,"total":Math.ceil(data.response.count/1000)},type.value,1,0)} before={<Icon24ImageFilterOutline/>}>Поиск дубликатов</CellButton>
						<CellButton onClick={()=>console.log(this.info.PhotoFindDuplicates)} before={<Icon24ScanViewfinderOutline/>}>Перемешать</CellButton>
						<Separator wide />
						<CardGrid style={{paddingBottom: 60}}>
							{this.info.PhotosGet.items.map(photo =>
								<Card key={photo.id} size="s">
									<Link href={'https://vk.com/photo'+photo.owner_id+'_'+photo.id} target='_blank'>
										<div style={{ 
											height: 96,
											backgroundImage: 'url('+photo.sizes[photo.sizes.length-1].url+')',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											backgroundRepeat: 'no-repeat'
										}}/>
									</Link>
								</Card>
							)}
						</CardGrid>
						<FixedLayout vertical="bottom">
							<Separator wide />
							<Div style={{display: 'flex'}}>
								<Button disabled={Number(count) === 1 ? true : false} before={<Icon16Chevron style={{transform:"scale(-1, 1)"}}/>} onClick={this.Update.bind(this,(Number(count)-1),{"value":type.value})} size="m" stretched mode="secondary"/>
								<Div style={{ padding: 0, width: "100%", margin: "auto", textAlign: "center" }}>{count} / {CountMax}</Div>
								<Button disabled={Number(count) === CountMax ? true : false} before={<Icon16Chevron/>} onClick={this.Update.bind(this,(Number(count)+1),{"value":type.value})} size="m" stretched mode="secondary"/>
							</Div>
						</FixedLayout>
					</Group>
				});
				this.setState({ popout: null });
			}).catch(error => {
				console.log(error);
				this.setState({ popout: null });
			});
		} else {
			this.setState({PhotoGrid:<Group><Placeholder icon={<Icon56GalleryOutline />}>Выберите альбом для продолжения работы</Placeholder></Group>});
		}
	}
	PhotoFindDuplicates(info, album, count, offset, type) {
		if (count === 1) {
			this.setState({ popout: <ScreenSpinner /> });
			this.info.PhotoFindDuplicates = [];
		}
		bridge.send("VKWebAppCallAPIMethod", {"method": "photos.get", "request_id": "photos.get", "params": {"owner_id":this.info.id, "album_id":album, "rev":1, "count":1000, "offset":offset, "v":version, "access_token":this.info.access_token}}).then(data => {
			this.info.PhotoFindDuplicates = this.info.PhotoFindDuplicates.concat(data.response.items);
			if (count === info.total) {
				/*
				let nms = this.info.PhotoFindDuplicates,
					rzl = [],
					fnc = new Function ('x, y', 'return (x.slice (0, y).concat (x.slice (y + 1)))');
				for (let j = 0, J = nms.length - 1; j < J; j++)
					for (let tmp = fnc (nms, j), k = j; k < J; k++)
						rzl.unshift (fnc (tmp, k));
				console.log('Всего пар: '+rzl.length);
				for (let i = 0; i < rzl.length; i++) {
					console.log(rzl[i][0].sizes[Math.floor((0+(rzl[i][0].sizes.length-1))/2)].url);
					console.log(rzl[i][1].sizes[Math.floor((0+(rzl[i][1].sizes.length-1))/2)].url);
					resembleVK(rzl[i][0].sizes[Math.floor((0+(rzl[i][0].sizes.length-1))/2)].url,rzl[i][1].sizes[Math.floor((0+(rzl[i][1].sizes.length-1))/2)].url);
				}
				*/
				this.setState({ popout: null });
			} else {
				this.PhotoFindDuplicates(info,album,(count+1),(count*1000),this);
			}
		}).catch(error => {
			this.setState({ popout: null });
		});
		/*
		function resembleVK(file1, file2) {
			let diff = resemble(file1)
			.compareTo(file2)
			.ignoreAntialiasing()
			.scaleToSameSize()
			.onComplete(function(analysis) {
				console.log('На '+analysis.misMatchPercentage+'% отличаются.');
			});
		}
		*/
	}

   openDefault () {
    this.setState({ popout:
      <Alert
        actions={[{
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel'
        }, {
          title: 'Добавить',
          autoclose: true,
          action: () => this.setState({ alert: 'Право на модерацию контента добавлено.'}),
        }]}
        onClose={this.closePopout}
      >
        <h2>Подтвердите действие</h2>
        <p>Добавить пользователю право на модерацию контента.</p>
      </Alert>
    });
  }

  openDestructive () {
    this.setState({ popout:
      <Alert
        actionsLayout="vertical"
        actions={[{
          title: 'Лишить права',
          autoclose: true,
          mode: 'destructive',
          action: () => this.setState({ alert: 'Пользователь больше не может модерировать контент.'}),
        }, {
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel'
        }]}
        onClose={this.closePopout}
      >
        <h2>Подтвердите действие</h2>
        <p>Вы уверены, что хотите лишить пользователя права на модерацию контента?</p>
      </Alert>
    });
  }

  closePopout () {
    this.setState({ popout: null });
  }

  setActiveModal(activeModal) {
    activeModal = activeModal || null;
    let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

    if (activeModal === null) {
      modalHistory = [];
    } else if (modalHistory.indexOf(activeModal) !== -1) {
      modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
    } else {
      modalHistory.push(activeModal);
    }

    this.setState({
      activeModal,
      modalHistory
    });
  };

  openBases () {
    this.setState({ popout:
      <ActionSheet onClose={() => this.setState({ popout: null })}>
        <ActionSheetItem autoclose>
          По дням
        </ActionSheetItem>
        <ActionSheetItem autoclose>
          По неделям
        </ActionSheetItem>
        <ActionSheetItem autoclose>
          По месяцам
        </ActionSheetItem>
        {osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
      </ActionSheet>
    });
  }

  openIcons () {
    this.setState({ popout:
      <ActionSheet onClose={() => this.setState({ popout: null })}>
        <ActionSheetItem autoclose before={<Icon28Profile/>}>
          Редактировать профиль
        </ActionSheetItem>
        <ActionSheetItem autoclose before={<Icon28CameraOutline/>}>
          Изменить фотографию
        </ActionSheetItem>
        {osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
      </ActionSheet>
    });
  }

  openThemes () {
    this.setState({ popout:
      <ActionSheet onClose={() => this.setState({ popout: null })}>
        <ActionSheetItem autoclose>
          Редактировать
        </ActionSheetItem>
        <ActionSheetItem autoclose mode="destructive">
          Выйти
        </ActionSheetItem>
        {osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
      </ActionSheet>
    });
  }

   openBase () {
   	if (this.state.snackbar) return;
    this.setState({ snackbar:
      <Snackbar
        layout="vertical"
        onClose={() => this.setState({ snackbar: null })}
        before={<Avatar size={24} style={blueBackground}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
      >
        Уведомления о подкастах включены
      </Snackbar>
    });
  }

  openBaseWithAction () {
    if (this.state.snackbar) return;
    this.setState({ snackbar:
      <Snackbar
        onClose={() => this.setState({ snackbar: null })}
        action="Добавить метку"
        onActionClick={() => this.setState({ text: 'Добавляем метку.' })}
        before={<Avatar size={24} style={orangeBackground}><Icon24Favorite fill="#fff" width={14} height={14} /></Avatar>}
      >
        Ссылка сохранена в закладки
      </Snackbar>
    });
  }

  openLongText () {
    if (this.state.snackbar) return;
    this.setState({ snackbar:
      <Snackbar
        layout="vertical"
        onClose={() => this.setState({ snackbar: null })}
        action="Подробнее"
        onActionClick={() => this.setState({ text: 'Открыта подробная информация.' })}
        before={<Avatar size={24} style={orangeBackground}><Icon24Favorite fill="#fff" width={14} height={14} /></Avatar>}
      >
        Ссылка сохранена в закладки. Все отметки «Нравится» переместились в новости
        под вкладкой «Понравилось».
      </Snackbar>
    });
  }

  openWithAvatar () {
    if (this.state.snackbar) return;
    this.setState({ snackbar:
      <Snackbar
        layout="vertical"
        onClose={() => this.setState({ snackbar: null })}
        action="Отменить"
        onActionClick={() => this.setState({ text: 'Сообщение Ивану было отменено.' })}
        after={<Avatar src={getAvatarUrl} size={32} />}
      >
        Отправлено Ивану Барышеву
      </Snackbar>
    });
  }

  render() {
    const modal = (
      <ModalRoot
        activeModal={this.state.activeModal}
        onClose={this.modalBack}
      >
        <ModalPage
          id={MODAL_PAGE_FILTERS}
          onClose={this.modalBack}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={<PanelHeaderButton onClick={this.modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</PanelHeaderButton>}
            >
              Фильтры
            </ModalPageHeader>
          }
        >
          <FormLayout>
            <FormLayoutGroup>
              <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_COUNTRIES)} size="xl">Выбор страны</Button>
              <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_STORY_FEEDBACK)} size="xl">Просмотры истории</Button>
              <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>
            </FormLayoutGroup>

            <SelectMimicry top="Страна" placeholder="Выбрать страну" onClick={() => this.setActiveModal(MODAL_PAGE_COUNTRIES)} />
            <SelectMimicry top="Город" placeholder="Выбрать город" disabled />

            <FormLayoutGroup top="Пол">
              <Radio name="sex" value={0} defaultChecked>Любой</Radio>
              <Radio name="sex" value={1}>Мужской</Radio>
              <Radio name="sex" value={2}>Женский</Radio>
            </FormLayoutGroup>

            <SelectMimicry top="Школа" placeholder="Выбрать школу" disabled />
            <SelectMimicry top="Университет" placeholder="Выбрать университет" disabled />

            <FormLayoutGroup top="Дополнительно">
              <Checkbox>С фотографией</Checkbox>
              <Checkbox>Сейчас на сайте</Checkbox>
            </FormLayoutGroup>

            <FormLayoutGroup top="Работа">
              <Input placeholder="Место работы" />
              <Input placeholder="Должность" />
            </FormLayoutGroup>

            <FormLayoutGroup top="Дата рождения">
              <SelectMimicry placeholder="День рождения" disabled />
              <SelectMimicry placeholder="Месяц рождения" disabled />
              <SelectMimicry placeholder="Год рождения" disabled />
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_COUNTRIES}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={this.modalBack}><Icon24Dismiss /></PanelHeaderButton>}
            >
              Выберите страну
            </ModalPageHeader>
          }
          settlingHeight={80}
        >
          <FormLayout>
            <Button mode="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>

            <FormLayoutGroup>
              {importantCountries.map(({ id, title }) => {
                return (
                  <Radio key={id} name="country" value={id}>{title}</Radio>
                );
              })}
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_STORY_FEEDBACK}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={this.modalBack}><Icon24Dismiss /></PanelHeaderButton>}
            >
              Просмотры истории
            </ModalPageHeader>
          }
          settlingHeight={80}
        >
          <List>
            {this.users.map((user) => {
              return (
                <Cell
                  before={<Avatar src={user.photo_100} />}
                  key={user.id}
                >{user.name}</Cell>
              );
            })}
          </List>
        </ModalPage>

        <ModalPage
          id={MODAL_PAGE_USER_INFO}
          header={
            <ModalPageHeader
              left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={this.modalBack}><Icon24Cancel /></PanelHeaderButton>}
              right={IS_PLATFORM_IOS && <PanelHeaderButton onClick={this.modalBack}><Icon24Dismiss /></PanelHeaderButton>}
            >
              Информация о пользователе
            </ModalPageHeader>
          }
        >
          <List>
            <Cell>
              <InfoRow header="Дата рождения">
                30 января 1993
              </InfoRow>
            </Cell>
            <Cell>
              <InfoRow header="Родной город">
                Ереван
              </InfoRow>
            </Cell>
            <Cell>
              <InfoRow header="Место работы">
                Команда ВКонтакте
              </InfoRow>
            </Cell>
          </List>
        </ModalPage>

        <ModalCard
          id={MODAL_CARD_MONEY_SEND}
          onClose={() => this.setActiveModal(null)}
          icon={<Icon56MoneyTransferOutline />}
          header="Отправляйте деньги друзьям, используя банковскую карту"
          caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
          actions={[{
            title: 'Попробовать',
            mode: 'primary',
            action: () => {
              this.setActiveModal(MODAL_CARD_APP_TO_MENU);
            }
          }]}
        >

        </ModalCard>

        <ModalCard
          id={MODAL_CARD_APP_TO_MENU}
          onClose={() => this.setActiveModal(null)}
          icon={<Avatar mode="app" src={getAvatarUrl} size={72} />}
          header="Добавить игру «Загадки детства» в меню?"
          caption="Игра появится под списком разделов на экране меню и будет всегда под рукой."
          actions={[{
            title: 'Добавить в меню',
            mode: 'primary',
            action: () => {
              this.setActiveModal(MODAL_CARD_ABOUT);
            }
          }
          ]}
        />

        <ModalCard
          id={MODAL_CARD_ABOUT}
          onClose={() => this.setActiveModal(null)}
          header="Расскажите о себе"
          actions={[
            {
              title: 'Сохранить',
              mode: 'primary',
              action: () => {
                this.setActiveModal(MODAL_CARD_NOTIFICATIONS);
              }
            }
          ]}
        >
          <Textarea defaultValue={'В Грузии'} />
        </ModalCard>

        <ModalCard
          id={MODAL_CARD_NOTIFICATIONS}
          onClose={() => this.setActiveModal(null)}
          icon={<Icon56NotificationOutline />}
          header="Приложение запрашивает разрешение на отправку Вам уведомлений"
          actions={[{
            title: 'Запретить',
            mode: 'secondary',
            action: () => this.setActiveModal(MODAL_CARD_CHAT_INVITE)
          }, {
            title: 'Разрешить',
            mode: 'primary',
            action: () => this.setActiveModal(MODAL_CARD_CHAT_INVITE)
          }]}
        />

        <ModalCard
          id={MODAL_CARD_CHAT_INVITE}
          onClose={() => this.setActiveModal(null)}
          icon={<Avatar src={getAvatarUrl} size={72} />}
          header="Баскетбол на выходных"
          caption="Приглашение в беседу"
          actions={[{
            title: 'Присоединиться',
            mode: 'primary',
            action: () => this.setActiveModal(null)
          }, {
            title: 'Скопировать приглашение',
            mode: 'secondary',
            action: () => this.setActiveModal(null)
          }]}
          actionsLayout="vertical"
        >
          <UsersStack
            photos={[
              getAvatarUrl,
              getAvatarUrl,
              getAvatarUrl,
              getAvatarUrl,
              getAvatarUrl,
              getAvatarUrl,
            ]}
            size="m"
            count={3}
            layout="vertical"
          >Алексей, Илья, Михаил<br />и ещё 3 человека</UsersStack>
        </ModalCard>
      </ModalRoot>
    );

    return (
      <View activePanel={this.state.activePanel} modal={modal} popout={this.state.popout}>
        <Panel id="Home">
			<PanelHeader 
				left={<PanelHeaderButton>{<Icon28LogoVkOutline />}</PanelHeaderButton>} 
			>
				Home
			</PanelHeader>
			<Group separator="hide">
				<Cell expandable before={<Icon28BrainOutline />} onClick={this.VKBridge.bind(this)}>VK Bridge</Cell>
				<Cell expandable before={<Icon28CameraOutline />} onClick={this.VKPhotoManager.bind(this)}>VK Photo Manager</Cell>
				<Cell expandable before={<Icon28PictureStackOutline />} onClick={()=>this.setState({activePanel:'modals'})}>Modals Pages</Cell>
				<Cell expandable before={<Icon28CommentOutline />} onClick={()=>this.setState({activePanel:'snackbars'})}>Snackbars Pages</Cell>
				<Cell expandable before={<Icon28ScreencastOutline />} onClick={()=>this.setState({activePanel:'popouts'})}>Popouts Pages</Cell>
				<Cell expandable before={<Icon28PrivacyOutline />} onClick={()=>this.setState({activePanel:'alerts'})}>Alerts Pages</Cell>
			</Group>
			<Group>
			<Div style={{display: 'flex'}}>
				<Button onClick={()=>this.setState({test:'Текст 1'})} size="m" stretched mode="secondary" style={{ marginRight: 8 }}>1</Button>
				<Button onClick={()=>this.setState({test:<Button size="m" mode="secondary">3</Button>})} size="m" stretched mode="secondary">2</Button>
			</Div>
			</Group>
			{this.state.test && <Group><Div>{this.state.test}</Div></Group>}
		</Panel>
        <Panel id="modals">
          <PanelHeader
				left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				Modals Pages
			</PanelHeader>
          <Group>
            <CellButton before={<Icon28LocationOutline />} onClick={() => this.setActiveModal(MODAL_PAGE_FILTERS)}>Открыть модальную страницу</CellButton>
			<CellButton before={<Icon28LocationOutline />} onClick={() => this.setActiveModal(MODAL_CARD_MONEY_SEND)}>Открыть модальные карточки</CellButton>
          </Group>
        </Panel>
        <Panel id="snackbars">
          <PanelHeader
				left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				Snackbars Pages
			</PanelHeader>
          <Group>
			<CellButton before={<Icon28LocationOutline />} onClick={this.openBase}>Простое уведомление с иконкой</CellButton>
			<CellButton before={<Icon28LocationOutline />} onClick={this.openBaseWithAction}>Уведомление с иконкой и кнопкой</CellButton>
			<CellButton before={<Icon28LocationOutline />} onClick={this.openLongText}>Длинный текст</CellButton>
			<CellButton before={<Icon28LocationOutline />} onClick={this.openWithAvatar}>Уведомление с аватаркой</CellButton>
          </Group>
          {this.state.text && <Group><Div>{this.state.text}</Div></Group>}
          {this.state.snackbar}
        </Panel>
        <Panel id="popouts">
          <PanelHeader
				left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				Popouts Pages
			</PanelHeader>
          <Group>
         	<CellButton before={<Icon28LocationOutline />} onClick={this.openBases}>Базовый список</CellButton>
         	<CellButton before={<Icon28LocationOutline />} onClick={this.openIcons}>Список с иконками</CellButton>
         	<CellButton before={<Icon28LocationOutline />} onClick={this.openThemes}>Темы</CellButton>
          </Group>
        </Panel>
        <Panel id="alerts">
          <PanelHeader
				left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				Alerts Pages
			</PanelHeader>
          <Group>
         	<CellButton before={<Icon28LocationOutline />} onClick={this.openDefault}>Добавить право</CellButton>
         	<CellButton before={<Icon28LocationOutline />} onClick={this.openDestructive} mode="danger">Лишить права</CellButton>
          </Group>
          {this.state.alert && <Group><Div>{this.state.alert}</Div></Group>}
        </Panel>
        <Panel id="VKBridge">
			<PanelHeader
				left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				VK Bridge
			</PanelHeader>
			{this.info.fetchedUser &&
				<Group>
					<Link href={"https://vk.com/id"+this.info.fetchedUser.id} target="_blank">
						<Banner
							before={this.info.fetchedUser.photo_200 ? <Avatar size={48} src={this.info.fetchedUser.photo_200}/> : null}
							header={`${this.info.fetchedUser.first_name} ${this.info.fetchedUser.last_name}`}
							subheader={<span>Родился {this.info.fetchedUser.bdate}<br/>Занятый ID {this.info.fetchedUser.id}</span>}
							asideMode="expand"
						/>
					</Link>
				</Group>
			}
				{this.info.FriendsGet &&
					<Group header={
						<Header
							indicator={<Counter size="s" mode="secondary">{this.info.FriendsGet.count}</Counter>}
						>
							Друзья
						</Header>
					}>
						<CardScroll>
							{this.info.FriendsGet.items.map(frend => 
								<Link href={'https://vk.com/id'+frend.id} target='_blank' key={frend.id}>
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
				{this.info.GroupsGet &&
					<Group header={
						<Header
							indicator={<Counter size="s" mode="secondary">{this.info.GroupsGet.count}</Counter>}
						>
							Сообщества
						</Header>
					}>
						<CardScroll>
							{this.info.GroupsGet.items.map(group => 
								<Link href={'https://vk.com/'+group.screen_name} target='_blank' key={group.id}>
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
				{this.info.PhotosGetAlbums &&
					<Group header={
						<Header
							indicator={<Counter size="s" mode="secondary">{this.info.PhotosGetAlbums.count}</Counter>}
						>
							Альбомы
						</Header>
					}>
						<CardScroll>
							{this.info.PhotosGetAlbums.items.map(album => 
								<Link href={'https://vk.com/album'+album.owner_id+'_'+(album.id===-6?'0':album.id===-7?'00':album.id===-15?'000':album.id)} target='_blank' key={album.id}>
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












		<Panel id="VKPhotoManager">
			<PanelHeader
				left={<PanelHeaderButton onClick={ () => this.setState({ activePanel: 'Home' }) }>
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				VK Photo Manager
			</PanelHeader>
			{this.info.fetchedUser &&
				<Group>
					<Banner
						before={<Avatar style={{ background: 'var(--accent)' }} size={48} shadow={false}><Icon24ErrorCircle fill="var(--white)" /></Avatar>}
						header={`${this.info.fetchedUser.first_name} ${this.info.fetchedUser.last_name}, привет!`}
						subheader="Данный раздел позволяет взаимодействовать с альбомами и фотографиями в них."
					/>
				</Group>
			}
			{this.info.PhotosGetAlbums &&
				<Group>
					<Div>
						<Select placeholder="Выберите альбом" name="album" onChange={this.Update.bind(this,'1')}>
							{this.info.PhotosGetAlbums.items.map(album =>
								<option key={album.id} value={album.id}>{album.title}</option>)
							}
						</Select>
					</Div>
				</Group>
			}
			{this.state.PhotoGrid && this.state.PhotoGrid}
		</Panel>
      </View>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === "development") {
	import("./eruda").then(({ default: eruda }) => {});
}