var data = {
	'custom': true,
	'title': 'Buttons',
	'description': '',
	'tag': '',
	'text': `
		<style>
			.important {
				box-shadow: inset 0px 0px 0px 1px var(--shadow-x1); 
				background: var(--color-line-x1); 
				padding: 2px 6px; 
				margin: 0 2px; 
				border-radius: 8px;
			}
		</style>
		<div class="title">Buttons</div>
		<div class="text">
			<span class="article">Layout example</span>
			<span class="code">
				&lt;div <span class="important">.buttons</span> <span class="important">inline</span>&gt;
				<ul>
					<li>&lt;div <span class="important">scale</span> <span class="important">icon_left</span> <span class="important">.button.extra.m</span>&gt;
					<ul>
						<li>&lt;span <span class="important">icon=&#xf0e7</span>&gt; Text &lt;/span&gt;
					</ul>
					<li>&lt;/div&gt;
					<li>&lt;div <span class="important">scale</span> <span class="important">icon_left</span> <span class="important">.button.negative.m</span>&gt;
					<ul>
						<li>&lt;span <span class="important">icon=&#xf0e7</span>&gt; Text &lt;/span&gt;
					</ul>
					<li>&lt;/div&gt;
					<li>&lt;div <span class="important">scale</span> <span class="important">icon_left</span> <span class="important">.button.negative.m</span>&gt;
					<ul>
						<li>&lt;span <span class="important">icon=&#xf0e7</span>&gt; Text &lt;/span&gt;
					</ul>
					<li>&lt;/div&gt;
				</ul>
				&lt;/div&gt;
			</span>
			<div class="buttons" inline>
				<div scale icon_left class="button m extra"><span icon="&#xf0e7">Text</span></div>
				<div scale icon_left class="button m positive"><span icon="&#xf0e7">Text</span></div>
				<div scale icon_left class="button m negative"><span icon="&#xf0e7">Text</span></div>
			</div>
			<span class="decoration"></span>
			<span class="article">Attributes</span>
			<ul>
				<li>icon_left — устанавливает слева от текста, заданную атрибутом <span class="important">icon</span> в <span class="important">span</span>, иконку.</li>
				<li>icon_right — устанавливает справа от текста, заданную атрибутом <span class="important">icon</span> в <span class="important">span</span>, иконку.</li>
				<li>scale — меняет поведение объекта при наведении и нажатии.</li>
				<li>inline — передаётся атрибутом в родителя, в этом режиме кнопки занимают минимальный размер по тексту, без режима наоборот, растягиваются на всю ширину родителя.</li>
				<li>prompt — устанавливает подсказку, заданную значением этого тега, при наведении на объект.</li>
				<li>tabindex="0" — даёт возможность показыватьь меню при нажатии на кнопку.<br>Данное меню задаётся при помощи тега с классом <span class="important">tooltip</span>, который располагается внутри самой кнопки.<br>Внутри меню располагаются любые элементы.</li>
			</ul>
			<span class="decoration"></span>
			<span class="article">Classes</span>
			<ul>
				<li>secondary — имеет <span class="important" style="background: transparent;">прозрачный цвет</span> фона и адаптивный цвет текста.</li>
				<li>primary — имеет <span class="important">серый цвет</span> фона и адаптивный цвет текста.</li>
				<li>extra — имеет <span class="important" style="background: var(--background-extra); color: white;">основной цвет</span> фона и всегда белый цвет текста.</li>
				<li>positive — имеет <span class="important" style="background: var(--background-positive); color: white;">основной цвет</span> фона и всегда белый цвет текста.</li>
				<li>negative — имеет <span class="important" style="background: var(--background-negative); color: white;">основной цвет</span> фона и всегда белый цвет текста.</li>
				<li>icon — особый тип кнопки, внутри используется <b>только иконка</b>.</li>
				<li>center — дополнительная настройка, размещает текст по центру, не работает в связке с атрибутом <span class="important">icon</span> (не классом).</li>
				<li>round — дополнительная настройка, скругляет кнопки.</li>
				<li>header — дополнительная настройка, задаёт повышенный отступ по бокам кнопки с классом <span class="important">icon</span>.</li>
				<li>b — дополнительная настройка, увеличивает толщину шрифта до <span class="important">700</span>, включая иконку.</li>
			</ul>
			<span class="decoration"></span>
			<span class="article">Sizes (class)</span>
			<ul>
				<li>s — small размер кнопки, имеет: <span class="important">размер текста <b>12px</b> и отступы <b>10px</b></span>.</li>
				<li>m — medium размер кнопки, имеет: <span class="important">размер текста <b>14px</b> и отступы <b>15px 25px</b></span>.</li>
				<li>l — large размер кнопки, имеет: <span class="important">размер текста <b>16px</b> и отступы <b>20px</b></span>.</li>
				<li>xl — extra large размер кнопки, имеет: <span class="important">размер текста <b>20px</b> и отступы <b>25px</b></span>.</li>
			</ul>
			<span class="decoration"></span>
			<span class="article">Inline icon round buttons</span>
			<div class="buttons" inline>
				<div scale class="button icon extra xl header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary xl header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary xl header round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra xl round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary xl round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary xl round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale class="button icon extra l header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary l header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary l header round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra l round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary l round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary l round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale class="button icon extra m header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary m header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary m header round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra m round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary m round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary m round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale class="button icon extra s header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary s header round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary s header round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra s round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary s round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary s round" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<span class="decoration"></span>
			<span class="article">Inline icon buttons</span>
			<div class="buttons" inline>
				<div scale icon_left class="button xl extra b"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button icon extra xl header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary xl header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary xl header" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra xl"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary xl"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary xl" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
			<div scale icon_left class="button l extra b"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button icon extra l header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary l header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary l header" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra l"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary l"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary l" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button m extra b"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button icon extra m header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary m header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary m header" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra m"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary m"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary m" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button s extra b"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button icon extra s header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary s header"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary s header" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button icon extra s"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary s"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary s" tabindex="0" prompt="This is prompt!"><span><i class="far fa-bolt"></i></span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<span class="decoration"></span>
			<span class="article">Inline text round buttons</span>
			<div class="buttons" inline>
				<div scale icon_left class="button xl extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button xl primary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button xl secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button xl extra round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button xl primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button xl secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button l extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l primary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button l extra round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button l primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button l secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button m extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left icon_left class="button m primary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button m secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button m extra round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button m primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button m secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button s extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s primary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button s extra round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button s primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button s secondary round" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<span class="decoration"></span>
			<span class="article">Inline text buttons</span>
			<div class="buttons" inline>
				<div scale icon_left class="button xl extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button xl primary"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button xl secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button xl extra"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button xl primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button xl secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button l extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l primary"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button l extra"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button l primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button l secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button m extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left icon_left class="button m primary"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button m secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button m extra"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button m primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button m secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttons" inline>
				<div scale icon_left class="button s extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s primary"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">With icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
				<div scale class="button s extra"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button s primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button s secondary" tabindex="0" prompt="This is prompt!"><span icon="&#xf0e7">Without icon</span>
					<div class="tooltip">
						<div class="buttons">
							<div line>Types</div>
							<div scale icon_left class="button extra l"><span icon="&#xf468">button extra l</span></div>
							<div scale icon_left class="button primary m"><span icon="&#xf468">button primary m</span></div>
							<div scale icon_left class="button secondary s"><span icon="&#xf468">button secondary s</span></div>
						</div>
					</div>
				</div>
			</div>
			<span class="decoration"></span>
			<span class="article">Not inline icon round buttons</span>
			<div class="buttons">
				<div scale class="button icon extra xl round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary xl round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary xl round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon extra l round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary l round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary l round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon extra m round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary m round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary m round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon extra s round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary s round"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary s round"><span><i class="far fa-bolt"></i></span></div>
			</div>
			<span class="decoration"></span>
			<span class="article">Not inline icon buttons</span>
			<div class="buttons">
				<div scale class="button icon extra xl"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary xl"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary xl"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon extra l"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary l"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary l"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon extra m"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary m"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary m"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon extra s"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon primary s"><span><i class="far fa-bolt"></i></span></div>
				<div scale class="button icon secondary s"><span><i class="far fa-bolt"></i></span></div>
			</div>
			<span class="decoration"></span>
			<span class="article">Not inline text round buttons</span>
			<div class="buttons">
				<div scale icon_left class="button xl extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button xl primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button xl secondary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button xl extra center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button xl primary center round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button xl secondary center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button l secondary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button l extra center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button l primary center round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button l secondary center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button m extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button m primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button m secondary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button m extra center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button m primary center round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button m secondary center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s extra round"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s primary round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button s secondary round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button s extra center round"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button s primary center round"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button s secondary center round"><span icon="&#xf0e7">With icon</span></div>
			</div>
			<span class="decoration"></span>
			<span class="article">Not inline text buttons</span>
			<div class="buttons">
				<div scale icon_left class="button xl extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button xl primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button xl secondary"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button xl extra center"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button xl primary center"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button xl secondary center"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button l primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button l secondary"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button l extra center"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button l primary center"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button l secondary center"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button m extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button m primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button m secondary"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button m extra center"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button m primary center"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button m secondary center"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s extra"><span icon="&#xf0e7">With icon</span></div>
				<div scale icon_left class="button s primary"><span icon="&#xf0e7">Without icon</span></div>
				<div scale icon_left class="button s secondary"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button s extra center"><span icon="&#xf0e7">With icon</span></div>
				<div scale class="button s primary center"><span icon="&#xf0e7">Without icon</span></div>
				<div scale class="button s secondary center"><span icon="&#xf0e7">With icon</span></div>
			</div>
		</div>
	`
}
var isScriptLoad = true;