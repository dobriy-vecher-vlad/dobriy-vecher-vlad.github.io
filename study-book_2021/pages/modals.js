var data = {
	'custom': true,
	'title': 'Modals',
	'description': '',
	'tag': '',
	'text': `
		<style>
			.important {
				box-shadow: inset 0px 0px 0px 1px var(--color-line-x1); 
				background: var(--color-line-x1); 
				padding: 2px 6px; 
				margin: 0 2px; 
				border-radius: 8px;
			}
		</style>
		<div class="title">Modals</div>
		<div class="text">
			<p>Модальные окна <span class="important">.modal-container</span> адаптивны к размерам окна и тёмной теме и вызываются событием onclick с функцией <span class="important">openModal</span>, для работы необходим контейнер-родитель <span class="important">.modal-wrap</span>.
			</p><p>Функция <span class="important">openModal</span> принимает значения <span class="important">html</span>, который задаёт контент внутри модального окна и <span class="important">width</span>, который устанавливает определённую ширину модального окна (стандартная ширина 60vw).
			</p><p>Значение <span class="important">html</span> в функции <span class="important">openModal</span> принимает текст в виде html разметки. Для модального окна написаны стандартные классы внутри <span class="important">.modal-container</span>, такие как: <span class="important">.modal-image</span>, отвечающий за картинку перед заголовком модального окна, <span class="important">.modal-title</span>, отвечающий за заголовок модального окна и <span class="important">.modal-content</span>, отвечающий за текст после заголовка модального окна.
			</p>
			<span class="decoration"></span>
			<span class="article">Примеры modals</span>
			<div class="buttons" inline>
				<div scale class="button m primary" onclick="openModal({html: test_modal_1});"><span>Long modal with scroll</span></div>
				<div scale class="button m primary" onclick="openModal({html: test_modal_2, width: '40vw'});"><span>Short modal with image</span></div>
				<div scale class="button m primary" onclick="openModal({html: test_modal_3, type: 'menu', width: '30vw'});"><span>Short modal with type menu</span></div>
			</div>
		</div>
	`
}
var isScriptLoad = true;
let test_modal_1 = `
	<div class="modal-title">
		Long modal with scroll
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="buttons">
		<div line></div>
		<div scale class="button primary m center" onclick="closeModal();"><span icon="&#xf00d">Close modal</span></div>
	</div>
`;
let test_modal_2 = `
	<div class="modal-image">
		<img src="image/img7.png"></img>
	</div>
	<div class="modal-title">
		Short modal with image
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="buttons">
		<div scale class="button extra l center"><span icon="&#xf65f">button extra l</span></div>
		<div scale class="button primary m center"><span icon="&#xf672">button primary m</span></div>
		<div scale class="button secondary s center"><span icon="&#xf672">button secondary s</span></div>
		<div line></div>
		<div scale class="button primary m center" onclick="closeModal();"><span icon="&#xf00d">Close modal</span></div>
	</div>
`;
let test_modal_3 = `
	<div class="modal-title">
		<span>Short modal with type menu</span>
		<div class="buttons" inline>
			<div scale class="button icon round primary s" onclick="closeModal();"><span><i class="far fa-times"></i></span></div>
		</div>
	</div>
	<div class="modal-content">
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim veritatis modi dolorum consequatur ipsa. Officia animi veniam optio repudiandae molestias corrupti nihil totam dolores, repellendus itaque voluptate? Nihil, ut blanditiis?
	</div>
	<div class="buttons modal-bottom">
		<div scale class="button primary m center" onclick="closeModal();"><span icon="&#xf00d">Close modal</span></div>
	</div>
`;