var data = {
	'custom': true,
	'title': 'Test',
	'description': '',
	'tag': '',
	'text': `
		<div class="title">Тестовая страница</div>
		<div class="text">
			<span class="article">Type of buttons</span>
			<div class="buttons">
				<div scale class="icon-button" prompt="Переключить тему"><span><i class="far fa-lightbulb-on"></i></span></div>
			</div>
			<div class="buttons" inline>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
			</div>
			<div class="buttons" inline>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
			</div>
			<div class="buttons" inline>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
				<div scale class="icon-button"><span><i class="far fa-lightbulb-on"></i></span></div>
				<div scale tabindex="0" class="icon-button"><span><i class="far fa-lightbulb-on"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Общее</div>
							<div scale icon class="secondary-button" prompt="Переключить тему" onclick="changeSettings({type: 'theme'}, true);"><span icon="&#xf672">Переключить тему</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons">
				<div scale icon class="extra-button" prompt="Переключить тему"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon class="extra-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon tabindex="0" class="extra-button"><span icon="&#xf672">Переключить тему</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Общее</div>
							<div scale icon class="secondary-button" prompt="Переключить тему" onclick="changeSettings({type: 'theme'}, true);"><span icon="&#xf672">Переключить тему</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons">
				<div scale icon class="primary-button" prompt="Переключить тему"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon class="primary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon tabindex="0" class="primary-button"><span icon="&#xf672">Переключить тему</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Общее</div>
							<div scale icon class="secondary-button" prompt="Переключить тему" onclick="changeSettings({type: 'theme'}, true);"><span icon="&#xf672">Переключить тему</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons">
				<div scale icon class="secondary-button" prompt="Переключить тему"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
			</div>
			<div class="buttons" inline>
				<div scale icon class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon class="secondary-button"><span icon="&#xf672">Переключить тему</span></div>
				<div scale icon tabindex="0" class="secondary-button"><span icon="&#xf672">Переключить тему</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Общее</div>
							<div scale icon class="secondary-button" prompt="Переключить тему" onclick="changeSettings({type: 'theme'}, true);"><span icon="&#xf672">Переключить тему</span></div>
						</div>
					</div>
				</div>
			</div>
			<span class="decoration"></span>
			<span class="article">Аннотация</span>
			<p>Длинные тексты (лонгриды), где большой объем сочетается с глубоким погружением в тему, становятся все более популярными в печатных и онлайновых изданиях, так как позволяют изданию выделиться из информационного шума. Цели исследования – выявить распространенность лонгридов в российских СМИ и содержательные и композиционные особенности этих текстов. Исследование включает мониторинг публикаций в центральных российских изданиях и последующий контент-анализ 10 материалов из 10 печатных и онлайновых изданий. Выводы исследования: лонгриды присутствуют в изданиях разных типов: от ежедневных газет − до нишевых новостных сайтов. Они посвящены, как правило, описанию нового явления; имеют объем от 2 до 4 тыс. слов и построены по композиционной схеме чередования примеров и обобщений.</p>
			<span class="decoration"></span>
			<span class="article">Abstract</span>
			<p>Long texts (longreads), where big size combines with in-depth reporting, are becoming increasingly popular in print and online media, because these texts enable the publication to stand out against the information noise. The aims of this research are to identify the popularity of longreads in the Russian media and their content and compositional particularities. The research includes the monitoring of Russian federal publications and subsequent content analysis of 10 articles issued in 10 print and online publications. The key findings of the research indicate that longreads can be found in publications of different types from daily newspapers to niche news sites. As a rule, the texts are devoted to a description of a new phenomenon, their normal size being 2−4 thousand words. The usual longread composition scheme is an alternation of examples and generalizations.</p>
		</div>
		<div class="secondtitle"><center><i class="far fa-question"></i></center></div>
	`
}
var isScriptLoad = true;