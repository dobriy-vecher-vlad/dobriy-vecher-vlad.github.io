import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import parse from 'html-react-parser';

import { platform, IOS } from '@vkontakte/vkui';

let settings = {
	dots: true,
	arrows: false,
	adaptiveHeight: true,
	autoplay: true,
	autoplaySpeed: 5000
};
const osName = platform();
const GoToTest = ({ id, go, checked, answers, score, fetchedUser, data_job }) => (
	<Panel id={id}>
		<Div className="header">
			<span className="button">{<PanelHeaderButton onClick={go} data-to="home"> {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} </PanelHeaderButton>}</span>
			Результат тестирования
		</Div>
		<Div className="description center">
			{fetchedUser &&
				<span className="header">{fetchedUser.first_name} {fetchedUser.last_name}</span>
			}
			{fetchedUser &&
				<span>Благодарим Вас за прохождение профессионального тестирования!<br/><br/></span>
			}
			<span className="header">Ключ ответов</span>
			{checked}
		</Div>
		<div className="description s-0">
			<div className="container">
				<Slider {...settings}>
					{parse(data_job)}
				</Slider>
			</div>
		</div>
		<div className="description s-0">
			<div className="container">
				<Slider {...settings}>
					<div className="subdescription s-1">
						<span className="header">{answers[0].head}</span>
						{answers[0].body}
						<br/><br/><br/>
						<InfoRow title="">
							<Progress value={score[0].percent} />
						</InfoRow>
						<br/>
						<span className="header">{score[0].score} {score[0].value}</span>
						<span className="header">{score[0].title}</span>
					</div>
					<div className="subdescription s-2">
						<span className="header">{answers[1].head}</span>
						{answers[1].body}
						<br/><br/><br/>
						<InfoRow title="">
							<Progress value={score[1].percent} />
						</InfoRow>
						<br/>
						<span className="header">{score[1].score} {score[1].value}</span>
						<span className="header">{score[1].title}</span>
					</div>
					<div className="subdescription s-3">
						<span className="header">{answers[2].head}</span>
						{answers[2].body}
						<br/><br/><br/>
						<InfoRow title="">
							<Progress value={score[2].percent} />
						</InfoRow>
						<br/>
						<span className="header">{score[2].score} {score[2].value}</span>
						<span className="header">{score[2].title}</span>
					</div>
					<div className="subdescription s-4">
						<span className="header">{answers[3].head}</span>
						{answers[3].body}
						<br/><br/><br/>
						<InfoRow title="">
							<Progress value={score[3].percent} />
						</InfoRow>
						<br/>
						<span className="header">{score[3].score} {score[3].value}</span>
						<span className="header">{score[3].title}</span>
					</div>
					<div className="subdescription s-5">
						<span className="header">{answers[5].head}</span>
						{answers[5].body}
						<br/><br/><br/>
						<InfoRow title="">
							<Progress value={score[5].percent} />
						</InfoRow>
						<br/>
						<span className="header">{score[5].score} {score[5].value}</span>
						<span className="header">{score[5].title}</span>
					</div>
				</Slider>
			</div>
		</div>
		<Div className="headbutton">
			<Div className="d-flex">
				<Button size="m" mode="secondary" onClick={go} data-to="home">
					Вернуться на главный экран
				</Button>
			</Div>
		</Div>
	</Panel>
);
export default GoToTest;