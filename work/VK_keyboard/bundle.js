var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function callAfter(fn, i) {
		if (i === 0) fn();
		return () => {
			if (!--i) fn();
		};
	}

	function addLoc(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		fn();
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function reinsertChildren(parent, target) {
		while (parent.firstChild) target.appendChild(parent.firstChild);
	}

	function destroyEach(iterations, detach) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detach);
		}
	}

	function createFragment() {
		return document.createDocumentFragment();
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function createComment() {
		return document.createComment('');
	}

	function addListener(node, event, handler, options) {
		node.addEventListener(event, handler, options);
	}

	function removeListener(node, event, handler, options) {
		node.removeEventListener(event, handler, options);
	}

	function setAttribute(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else node.setAttribute(attribute, value);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function setStyle(node, key, value) {
		node.style.setProperty(key, value);
	}

	function selectOption(select, value) {
		for (var i = 0; i < select.options.length; i += 1) {
			var option = select.options[i];

			if (option.__value === value) {
				option.selected = true;
				return;
			}
		}
	}

	function selectValue(select) {
		var selectedOption = select.querySelector(':checked') || select.options[0];
		return selectedOption && selectedOption.__value;
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function destroyDev(detach) {
		destroy.call(this, detach);
		this.destroy = function() {
			console.warn('Component was already destroyed');
		};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function setDev(newState) {
		if (typeof newState !== 'object') {
			throw new Error(
				this._debugName + '.set was called without an object of data key-values to update.'
			);
		}

		this._checkReadOnly(newState);
		set.call(this, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var protoDev = {
		destroy: destroyDev,
		get,
		fire,
		on,
		set: setDev,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src\components\Button.html generated by Svelte v2.16.1 */

	function data() {
	  return {
	    select: "0"
	  };
	}
	const file = "src\\components\\Button.html";

	function create_main_fragment(component, ctx) {
		var div, span, text, div_class_value, current;

		function click_handler(event) {
			component.fire('click', {color: ctx.color});
		}

		return {
			c: function create() {
				div = createElement("div");
				span = createElement("span");
				text = createText(ctx.label);
				span.className = "svelte-xc3qo4";
				addLoc(span, file, 0, 104, 104);
				addListener(div, "click", click_handler);
				div.className = div_class_value = "Button " + ctx.color + " " + (ctx.select=="1"?"select":"") + " svelte-xc3qo4";
				setAttribute(div, "test", ctx.select);
				addLoc(div, file, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, span);
				append(span, text);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				if (changed.label) {
					setData(text, ctx.label);
				}

				if ((changed.color || changed.select) && div_class_value !== (div_class_value = "Button " + ctx.color + " " + (ctx.select=="1"?"select":"") + " svelte-xc3qo4")) {
					div.className = div_class_value;
				}

				if (changed.select) {
					setAttribute(div, "test", ctx.select);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	function Button(options) {
		this._debugName = '<Button>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(data(), options.data);
		if (!('color' in this._state)) console.warn("<Button> was created without expected data property 'color'");
		if (!('select' in this._state)) console.warn("<Button> was created without expected data property 'select'");
		if (!('label' in this._state)) console.warn("<Button> was created without expected data property 'label'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Button.prototype, protoDev);

	Button.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\components\Buttons.html generated by Svelte v2.16.1 */

	const file$1 = "src\\components\\Buttons.html";

	function create_main_fragment$1(component, ctx) {
		var div, slot_content_default = component._slotted.default, current;

		return {
			c: function create() {
				div = createElement("div");
				div.className = "Buttons svelte-mmcuhn";
				addLoc(div, file$1, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);

				if (slot_content_default) {
					append(div, slot_content_default);
				}

				current = true;
			},

			p: noop,

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				if (slot_content_default) {
					reinsertChildren(div, slot_content_default);
				}
			}
		};
	}

	function Buttons(options) {
		this._debugName = '<Buttons>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);
		this._intro = !!options.intro;

		this._slotted = options.slots || {};

		this._fragment = create_main_fragment$1(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Buttons.prototype, protoDev);

	Buttons.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\language\Json.html generated by Svelte v2.16.1 */

	function data$1() {
	  return {
	    JSONminify: false
	  };
	}
	const file$2 = "src\\language\\Json.html";

	function create_main_fragment$2(component, ctx) {
		var div, input, text0, label, text2, pre, text3_value = ctx.JSON.stringify(ctx.keyboard, "", ctx.JSONminify?0:2), text3, current;

		function input_change_handler() {
			component.set({ JSONminify: input.checked });
		}

		return {
			c: function create() {
				div = createElement("div");
				input = createElement("input");
				text0 = createText("\n\t");
				label = createElement("label");
				label.textContent = "JSON minify";
				text2 = createText("\n\n\n");
				pre = createElement("pre");
				text3 = createText(text3_value);
				addListener(input, "change", input_change_handler);
				setAttribute(input, "type", "checkbox");
				addLoc(input, file$2, 1, 1, 20);
				label.className = "svelte-vtlwtn";
				addLoc(label, file$2, 2, 1, 71);
				div.className = "Rows svelte-vtlwtn";
				addLoc(div, file$2, 0, 0, 0);
				addLoc(pre, file$2, 6, 0, 107);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
				append(div, input);

				input.checked = ctx.JSONminify;

				append(div, text0);
				append(div, label);
				insert(target, text2, anchor);
				insert(target, pre, anchor);
				append(pre, text3);
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.JSONminify) input.checked = ctx.JSONminify;
				if ((changed.JSON || changed.keyboard || changed.JSONminify) && text3_value !== (text3_value = ctx.JSON.stringify(ctx.keyboard, "", ctx.JSONminify?0:2))) {
					setData(text3, text3_value);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(input, "change", input_change_handler);
				if (detach) {
					detachNode(text2);
					detachNode(pre);
				}
			}
		};
	}

	function Json(options) {
		this._debugName = '<Json>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign(assign({ JSON : JSON }, data$1()), options.data);
		if (!('JSONminify' in this._state)) console.warn("<Json> was created without expected data property 'JSONminify'");

		if (!('keyboard' in this._state)) console.warn("<Json> was created without expected data property 'keyboard'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$2(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Json.prototype, protoDev);

	Json.prototype._checkReadOnly = function _checkReadOnly(newState) {
	};

	/* src\language\Golang.html generated by Svelte v2.16.1 */

	function golang(keyboard) {
	  let text = "";

	  text += `// import "encoding/json"\n`;
	  text += `
// Структуры

type keyboardButtonAction struct {
	Label   string \`json:"label,omitempty"\`
	Payload string \`json:"payload,omitempty"\`
	Type    string \`json:"type"\`
}

type keyboardButton struct {
	Action keyboardButtonAction \`json:"action"\`
	Color  string               \`json:"color"\`
}

type keyboardRow []keyboardButton

type keyboard struct {
	Buttons []keyboardRow \`json:"buttons"\`
	OneTime bool          \`json:"one_time"\`
}

// Основной код

var buttons []keyboardRow
var button keyboardButton
var buttonAction keyboardButtonAction


`;
	  console.log(keyboard);
	  for (let i = 0; i < keyboard.buttons.length; i++) {
	    const row = keyboard.buttons[i];
	    
	    text += `var row${i} []keyboardButton
`;
	    row.forEach(button => {
	      text += `
buttonAction = keyboardButtonAction{
	Label:   "${button.action.label.replace(/\\/g,"\\\\").replace(/"/g,`\\"`)}\",
	Payload: "${button.action.payload.replace(/\\/g,"\\\\").replace(/"/g,`\\"`)}",
	Type:    "${button.action.type}",
}
button = keyboardButton{
	Action: buttonAction,
	Color:  "${button.color}",
}

row${i} = append(row${i}, button)
`;
	    });
	    text += `buttons = append(buttons, row${i})
`;
	  }

	  text += `
kb := keyboard{
	Buttons: buttons,
	OneTime: ${keyboard.one_time},
}

byteJSON, _ := json.Marshal(kb)
keyboardJSON := string(byteJSON)

// fmt.Print(keyboardJSON)`;

	  return text
	}

	function code({ keyboard }) {
		return golang(keyboard);
	}

	const file$3 = "src\\language\\Golang.html";

	function create_main_fragment$3(component, ctx) {
		var pre, text, current;

		return {
			c: function create() {
				pre = createElement("pre");
				text = createText(ctx.code);
				addLoc(pre, file$3, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, pre, anchor);
				append(pre, text);
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.code) {
					setData(text, ctx.code);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(pre);
				}
			}
		};
	}

	function Golang(options) {
		this._debugName = '<Golang>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);

		this._recompute({ keyboard: 1 }, this._state);
		if (!('keyboard' in this._state)) console.warn("<Golang> was created without expected data property 'keyboard'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$3(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Golang.prototype, protoDev);

	Golang.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('code' in newState && !this._updatingReadonlyProperty) throw new Error("<Golang>: Cannot set read-only property 'code'");
	};

	Golang.prototype._recompute = function _recompute(changed, state) {
		if (changed.keyboard) {
			if (this._differs(state.code, (state.code = code(state)))) changed.code = true;
		}
	};

	/* src\language\Golang-vksdk.html generated by Svelte v2.16.1 */

	function golang$1(keyboard) {
	  let text = "";

	  text += `// import "encoding/json"\n`;
	  text += `
// Код для github.com/SevereCloud/vksdk

var kb object.MessagesKeyboard
`;
	  console.log(keyboard);
	  for (let i = 0; i < keyboard.buttons.length; i++) {
	    const row = keyboard.buttons[i];
	    
	    text += `\nkb.AddRow()\n`;
	    row.forEach(button => {
	      text += `kb.AddButton(`+ 
`"${button.action.label.replace(/\\/g,"\\\\").replace(/"/g,`\\"`)}\", `	 +
`"${button.action.payload.replace(/\\/g,"\\\\").replace(/"/g,`\\"`)}", `	 +
`"${button.color}"`	 +
`)\n`;
	    });
	  }

	  text += `
byteJSON, _ := json.Marshal(kb)
keyboardJSON := string(byteJSON)

// fmt.Print(keyboardJSON)`;

	  return text
	}

	function code$1({ keyboard }) {
		return golang$1(keyboard);
	}

	const file$4 = "src\\language\\Golang-vksdk.html";

	function create_main_fragment$4(component, ctx) {
		var pre, text, current;

		return {
			c: function create() {
				pre = createElement("pre");
				text = createText(ctx.code);
				addLoc(pre, file$4, 0, 0, 0);
			},

			m: function mount(target, anchor) {
				insert(target, pre, anchor);
				append(pre, text);
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.code) {
					setData(text, ctx.code);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(pre);
				}
			}
		};
	}

	function Golang_vksdk(options) {
		this._debugName = '<Golang_vksdk>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);

		this._recompute({ keyboard: 1 }, this._state);
		if (!('keyboard' in this._state)) console.warn("<Golang_vksdk> was created without expected data property 'keyboard'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$4(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Golang_vksdk.prototype, protoDev);

	Golang_vksdk.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('code' in newState && !this._updatingReadonlyProperty) throw new Error("<Golang_vksdk>: Cannot set read-only property 'code'");
	};

	Golang_vksdk.prototype._recompute = function _recompute(changed, state) {
		if (changed.keyboard) {
			if (this._differs(state.code, (state.code = code$1(state)))) changed.code = true;
		}
	};

	/* src\App.html generated by Svelte v2.16.1 */

	function validPayload({ keyboard, i, j }) {
	  let isObject = data => data instanceof Object && !Array.isArray(data);
	  let p = keyboard.buttons[i][j].action.payload;
	  let a;
	  try {
	    a = JSON.parse(p);
	  } catch (e) {
	    return false;
	  }
	  return isObject(a) && Object.keys(a).length != 0 && p.length < 256;
	}

	function errorValid({ keyboard }) {
	  let text = "";

	  for (let i = 0; i < keyboard.buttons.length; i++) {
	    const buttons = keyboard.buttons[i];
	    for (let j = 0; j < buttons.length; j++) {
	      const button = buttons[j];

	      if (button.action.label == "") {
	        text += `${i+1}:${j+1} пустой текст\n`;
	      }
	      if (button.action.label.length > 41) {
	        text += `${i+1}:${j+1} больше 40 символов в тексте\n`;
	      }
	      
	      let isObject = data => data instanceof Object && !Array.isArray(data);
	      let p = button.action.payload;
	      let a;
	      try {
	        a = JSON.parse(p);
	        if (!isObject(a)){
	          text += `${i+1}:${j+1} требуется объект в json вида {"button": 1}\n`;
	        }
	        if (Object.keys(a).length == 0){
	          text += `${i+1}:${j+1} пустой объект в json\n`;
	        }
	        if (p.length > 255){
	          text += `${i+1}:${j+1} больше 255 символов в json\n`;
	        }
	      } catch (e) {
	        text += `${i+1}:${j+1} невалидный json\n`;
	      }
	    }
	  }
	  localStorage.setItem('keyboard', JSON.stringify(keyboard));
	  return text;
	}

	var methods = {
	  updateColor(color) {
	    const { keyboard, i, j } = this.get();

	    keyboard.buttons[i][j].color = color;

	    this.set({ keyboard });
	  },
	  addRow() {
	    const { keyboard, i, j } = this.get();

	    let len = keyboard.buttons.length;
	    if (len < 10) {
	      keyboard.buttons[len] = [
	        {
	          action: {
	            type: "text",
	            payload: '{"button": "1"}',
	            label: "Label"
	          },
	          color: "default"
	        }
	      ];
	    }

	    this.set({ keyboard, i: len, j: 0 });
	  },
	  addColumn(ii) {
	    const { keyboard, i, j } = this.get();

	    let len = keyboard.buttons[ii].length;
	    if (len < 4) {
	      keyboard.buttons[ii][len] = {
	        action: {
	          type: "text",
	          payload: '{"button": "1"}',
	          label: "Label"
	        },
	        color: "default"
	      };
	    }

	    this.set({ keyboard, i: ii, j: len });
	  },
	  removeButton() {
	    const { keyboard, i, j } = this.get();
	    let ii = i;
	    let jj = j;

	    let lenr = keyboard.buttons.length;
	    let lenc = keyboard.buttons[0].length;
	    console.log(lenr, lenc);
	    if (lenr > 1 || lenc > 1) {
	      keyboard.buttons[i].splice(j, 1);
	      if (keyboard.buttons[i].length == 0) {
	        keyboard.buttons.splice(i, 1);
	        if (i > 0) {
	          ii = i - 1;
	        }
	        jj = keyboard.buttons[ii].length - 1;
	      } else if (j > 0) {
	        jj = j - 1;
	      }
	    }

	    this.set({ keyboard, i: ii, j: jj });
	  }
	};

	const file$5 = "src\\App.html";

	function get_each1_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.color = list[i];
		return child_ctx;
	}

	function click_handler(event) {
		const { component, ctx } = this._svelte;

		component.addColumn(ctx.ii);
	}

	function get_each_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.button = list[i];
		child_ctx.jj = i;
		return child_ctx;
	}

	function get_each0_context(ctx, list, i) {
		const child_ctx = Object.create(ctx);
		child_ctx.buttons = list[i];
		child_ctx.ii = i;
		return child_ctx;
	}

	function create_main_fragment$5(component, ctx) {
		var div7, h1, text1, p0, text2, a0, text4, a1, text6, text7, p1, a2, text9, h3, text11, div6, text12, text13, div4, div0, label0, text15, input0, input0_updating = false, text16, text17, text18, div1, label1, text20, input1, input1_updating = false, text21, text22, div2, label2, text24, each1_anchor, text25, div3, text27, div5, input2, text28, label3, text30, current_block_type_index, if_block4, current;

		var each0_value = ctx.keyboard.buttons;

		var each0_blocks = [];

		for (var i = 0; i < each0_value.length; i += 1) {
			each0_blocks[i] = create_each_block_1(component, get_each0_context(ctx, each0_value, i));
		}

		function outroBlock(i, detach, fn) {
			if (each0_blocks[i]) {
				each0_blocks[i].o(() => {
					if (detach) {
						each0_blocks[i].d(detach);
						each0_blocks[i] = null;
					}
					if (fn) fn();
				});
			}
		}

		var if_block0 = (ctx.keyboard.buttons.length < 10) && create_if_block_7(component, ctx);

		function input0_input_handler() {
			input0_updating = true;
			ctx.keyboard.buttons[ctx.i][ctx.j].action.label = input0.value;
			component.set({ keyboard: ctx.keyboard, i: ctx.i, j: ctx.j });
			input0_updating = false;
		}

		var if_block1 = (ctx.keyboard.buttons[ctx.i][ctx.j].action.label==="") && create_if_block_6(component, ctx);

		var if_block2 = (ctx.keyboard.buttons[ctx.i][ctx.j].action.label.length > 41) && create_if_block_5(component, ctx);

		function input1_input_handler() {
			input1_updating = true;
			ctx.keyboard.buttons[ctx.i][ctx.j].action.payload = input1.value;
			component.set({ keyboard: ctx.keyboard, i: ctx.i, j: ctx.j });
			input1_updating = false;
		}

		var if_block3 = (!ctx.validPayload) && create_if_block_4(component, ctx);

		var each1_value = ["primary", "default", "negative", "positive"];

		var each1_blocks = [];

		for (var i = 0; i < each1_value.length; i += 1) {
			each1_blocks[i] = create_each_block(component, get_each1_context(ctx, each1_value, i));
		}

		function outroBlock_1(i, detach, fn) {
			if (each1_blocks[i]) {
				each1_blocks[i].o(() => {
					if (detach) {
						each1_blocks[i].d(detach);
						each1_blocks[i] = null;
					}
					if (fn) fn();
				});
			}
		}

		var buttons = new Buttons({
			root: component.root,
			store: component.store,
			slots: { default: createFragment() }
		});

		function click_handler_1(event) {
			component.removeButton();
		}

		function input2_change_handler() {
			ctx.keyboard.one_time = input2.checked;
			component.set({ keyboard: ctx.keyboard });
		}

		var if_block_creators = [
			create_if_block,
			create_else_block
		];

		var if_blocks = [];

		function select_block_type(ctx) {
			if (ctx.errorValid) return 0;
			return 1;
		}

		current_block_type_index = select_block_type(ctx);
		if_block4 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](component, ctx);

		return {
			c: function create() {
				div7 = createElement("div");
				h1 = createElement("h1");
				h1.textContent = "Генератор клавиатуры для VK";
				text1 = createText("\n\t\n  ");
				p0 = createElement("p");
				text2 = createText("Генерирует ");
				a0 = createElement("a");
				a0.textContent = "клавиатуру";
				text4 = createText(" для ботов. \n    Проверить клавиатуру можно отправив JSON ");
				a1 = createElement("a");
				a1.textContent = "боту";
				text6 = createText(".");
				text7 = createText("\n  ");
				p1 = createElement("p");
				a2 = createElement("a");
				a2.textContent = "GitHub";
				text9 = createText("\n\n  ");
				h3 = createElement("h3");
				h3.textContent = "Клавиатура";
				text11 = createText("\n\n\t");
				div6 = createElement("div");

				for (var i = 0; i < each0_blocks.length; i += 1) {
					each0_blocks[i].c();
				}

				text12 = createText(" \n    ");
				if (if_block0) if_block0.c();
				text13 = createText("\n\n    ");
				div4 = createElement("div");
				div0 = createElement("div");
				label0 = createElement("label");
				label0.textContent = "Текст";
				text15 = createText("\n        ");
				input0 = createElement("input");
				text16 = createText("\n        ");
				if (if_block1) if_block1.c();
				text17 = createText("\n        ");
				if (if_block2) if_block2.c();
				text18 = createText("\n\n      ");
				div1 = createElement("div");
				label1 = createElement("label");
				label1.textContent = "Полезная нагрузка";
				text20 = createText("\n        ");
				input1 = createElement("input");
				text21 = createText(" \n        ");
				if (if_block3) if_block3.c();
				text22 = createText("\n\n      ");
				div2 = createElement("div");
				label2 = createElement("label");
				label2.textContent = "Цвет";
				text24 = createText("\n        ");

				for (var i = 0; i < each1_blocks.length; i += 1) {
					each1_blocks[i].c();
				}

				each1_anchor = createComment();
				buttons._fragment.c();
				text25 = createText("\n\n      ");
				div3 = createElement("div");
				div3.textContent = "Удалить";
				text27 = createText("\n\n    ");
				div5 = createElement("div");
				input2 = createElement("input");
				text28 = createText("\n      ");
				label3 = createElement("label");
				label3.textContent = "скрывать клавиатуру сразу";
				text30 = createText("\n\n  ");
				if_block4.c();
				addLoc(h1, file$5, 3, 1, 64);
				a0.href = "https://vk.com/dev/bots_docs_3";
				addLoc(a0, file$5, 6, 13, 122);
				a1.href = "https://vk.com/im?sel=-174472256";
				addLoc(a1, file$5, 7, 45, 235);
				addLoc(p0, file$5, 5, 2, 105);
				a2.href = "https://github.com/severecloud/vk-keyboard";
				addLoc(a2, file$5, 10, 4, 304);
				addLoc(p1, file$5, 9, 2, 296);
				addLoc(h3, file$5, 13, 2, 378);
				label0.className = "svelte-1egbdsg";
				addLoc(label0, file$5, 30, 8, 986);
				addListener(input0, "input", input0_input_handler);
				setAttribute(input0, "type", "text");
				addLoc(input0, file$5, 31, 8, 1015);
				div0.className = "block-item svelte-1egbdsg";
				addLoc(div0, file$5, 29, 6, 953);
				label1.className = "svelte-1egbdsg";
				addLoc(label1, file$5, 37, 8, 1386);
				addListener(input1, "input", input1_input_handler);
				setAttribute(input1, "type", "text");
				addLoc(input1, file$5, 38, 8, 1427);
				div1.className = "block-item svelte-1egbdsg";
				addLoc(div1, file$5, 36, 6, 1353);
				label2.className = "svelte-1egbdsg";
				addLoc(label2, file$5, 43, 8, 1644);
				div2.className = "block-item svelte-1egbdsg";
				addLoc(div2, file$5, 42, 6, 1611);
				addListener(div3, "click", click_handler_1);
				div3.className = "button-remove svelte-1egbdsg";
				addLoc(div3, file$5, 51, 6, 1941);
				div4.className = "border svelte-1egbdsg";
				addLoc(div4, file$5, 28, 4, 926);
				addListener(input2, "change", input2_change_handler);
				setAttribute(input2, "type", "checkbox");
				addLoc(input2, file$5, 55, 6, 2053);
				label3.className = "svelte-1egbdsg";
				addLoc(label3, file$5, 56, 6, 2116);
				div5.className = "one-time svelte-1egbdsg";
				addLoc(div5, file$5, 54, 4, 2024);
				div6.className = "buttons-main svelte-1egbdsg";
				addLoc(div6, file$5, 15, 1, 400);
				div7.className = "main svelte-1egbdsg";
				addLoc(div7, file$5, 2, 0, 44);
			},

			m: function mount(target, anchor) {
				insert(target, div7, anchor);
				append(div7, h1);
				append(div7, text1);
				append(div7, p0);
				append(p0, text2);
				append(p0, a0);
				append(p0, text4);
				append(p0, a1);
				append(p0, text6);
				append(div7, text7);
				append(div7, p1);
				append(p1, a2);
				append(div7, text9);
				append(div7, h3);
				append(div7, text11);
				append(div7, div6);

				for (var i = 0; i < each0_blocks.length; i += 1) {
					each0_blocks[i].i(div6, null);
				}

				append(div6, text12);
				if (if_block0) if_block0.m(div6, null);
				append(div6, text13);
				append(div6, div4);
				append(div4, div0);
				append(div0, label0);
				append(div0, text15);
				append(div0, input0);

				input0.value = ctx.keyboard.buttons[ctx.i][ctx.j].action.label;

				append(div0, text16);
				if (if_block1) if_block1.m(div0, null);
				append(div0, text17);
				if (if_block2) if_block2.m(div0, null);
				append(div4, text18);
				append(div4, div1);
				append(div1, label1);
				append(div1, text20);
				append(div1, input1);

				input1.value = ctx.keyboard.buttons[ctx.i][ctx.j].action.payload;

				append(div1, text21);
				if (if_block3) if_block3.m(div1, null);
				append(div4, text22);
				append(div4, div2);
				append(div2, label2);
				append(div2, text24);

				for (var i = 0; i < each1_blocks.length; i += 1) {
					each1_blocks[i].i(buttons._slotted.default, null);
				}

				append(buttons._slotted.default, each1_anchor);
				buttons._mount(div2, null);
				append(div4, text25);
				append(div4, div3);
				append(div6, text27);
				append(div6, div5);
				append(div5, input2);

				input2.checked = ctx.keyboard.one_time;

				append(div5, text28);
				append(div5, label3);
				append(div7, text30);
				if_blocks[current_block_type_index].m(div7, null);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				if (changed.keyboard || changed.i || changed.j) {
					each0_value = ctx.keyboard.buttons;

					for (var i = 0; i < each0_value.length; i += 1) {
						const child_ctx = get_each0_context(ctx, each0_value, i);

						if (each0_blocks[i]) {
							each0_blocks[i].p(changed, child_ctx);
						} else {
							each0_blocks[i] = create_each_block_1(component, child_ctx);
							each0_blocks[i].c();
						}
						each0_blocks[i].i(div6, text12);
					}
					for (; i < each0_blocks.length; i += 1) outroBlock(i, 1);
				}

				if (ctx.keyboard.buttons.length < 10) {
					if (!if_block0) {
						if_block0 = create_if_block_7(component, ctx);
						if_block0.c();
						if_block0.m(div6, text13);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (!input0_updating && (changed.keyboard || changed.i || changed.j)) input0.value = ctx.keyboard.buttons[ctx.i][ctx.j].action.label;

				if (ctx.keyboard.buttons[ctx.i][ctx.j].action.label==="") {
					if (!if_block1) {
						if_block1 = create_if_block_6(component, ctx);
						if_block1.c();
						if_block1.m(div0, text17);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (ctx.keyboard.buttons[ctx.i][ctx.j].action.label.length > 41) {
					if (!if_block2) {
						if_block2 = create_if_block_5(component, ctx);
						if_block2.c();
						if_block2.m(div0, null);
					}
				} else if (if_block2) {
					if_block2.d(1);
					if_block2 = null;
				}

				if (!input1_updating && (changed.keyboard || changed.i || changed.j)) input1.value = ctx.keyboard.buttons[ctx.i][ctx.j].action.payload;

				if (!ctx.validPayload) {
					if (!if_block3) {
						if_block3 = create_if_block_4(component, ctx);
						if_block3.c();
						if_block3.m(div1, null);
					}
				} else if (if_block3) {
					if_block3.d(1);
					if_block3 = null;
				}

				if (changed.keyboard || changed.i || changed.j) {
					each1_value = ["primary", "default", "negative", "positive"];

					for (var i = 0; i < each1_value.length; i += 1) {
						const child_ctx = get_each1_context(ctx, each1_value, i);

						if (each1_blocks[i]) {
							each1_blocks[i].p(changed, child_ctx);
						} else {
							each1_blocks[i] = create_each_block(component, child_ctx);
							each1_blocks[i].c();
						}
						each1_blocks[i].i(each1_anchor.parentNode, each1_anchor);
					}
					for (; i < each1_blocks.length; i += 1) outroBlock_1(i, 1);
				}

				if (changed.keyboard) input2.checked = ctx.keyboard.one_time;

				var previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type(ctx);
				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(changed, ctx);
				} else {
					if_block4.o(function() {
						if_blocks[previous_block_index].d(1);
						if_blocks[previous_block_index] = null;
					});

					if_block4 = if_blocks[current_block_type_index];
					if (!if_block4) {
						if_block4 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](component, ctx);
						if_block4.c();
					}
					if_block4.m(div7, null);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				outrocallback = callAfter(outrocallback, 4);

				each0_blocks = each0_blocks.filter(Boolean);
				const countdown = callAfter(outrocallback, each0_blocks.length);
				for (let i = 0; i < each0_blocks.length; i += 1) outroBlock(i, 0, countdown);

				each1_blocks = each1_blocks.filter(Boolean);
				const countdown_1 = callAfter(outrocallback, each1_blocks.length);
				for (let i = 0; i < each1_blocks.length; i += 1) outroBlock_1(i, 0, countdown_1);

				if (buttons) buttons._fragment.o(outrocallback);

				if (if_block4) if_block4.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div7);
				}

				destroyEach(each0_blocks, detach);

				if (if_block0) if_block0.d();
				removeListener(input0, "input", input0_input_handler);
				if (if_block1) if_block1.d();
				if (if_block2) if_block2.d();
				removeListener(input1, "input", input1_input_handler);
				if (if_block3) if_block3.d();

				destroyEach(each1_blocks, detach);

				buttons.destroy();
				removeListener(div3, "click", click_handler_1);
				removeListener(input2, "change", input2_change_handler);
				if_blocks[current_block_type_index].d();
			}
		};
	}

	// (20:4) {#each buttons as button, jj}
	function create_each_block_2(component, ctx) {
		var current;

		var button_initial_data = {
		 	label: ctx.button.action.label,
		 	color: ctx.button.color,
		 	select: ctx.i==ctx.ii&&ctx.j==ctx.jj?'1':'0'
		 };
		var button = new Button({
			root: component.root,
			store: component.store,
			data: button_initial_data
		});

		button.on("click", function(event) {
			component.set({i: ctx.ii,j: ctx.jj});
		});

		return {
			c: function create() {
				button._fragment.c();
			},

			m: function mount(target, anchor) {
				button._mount(target, anchor);
				current = true;
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				var button_changes = {};
				if (changed.keyboard) button_changes.label = ctx.button.action.label;
				if (changed.keyboard) button_changes.color = ctx.button.color;
				if (changed.i || changed.j) button_changes.select = ctx.i==ctx.ii&&ctx.j==ctx.jj?'1':'0';
				button._set(button_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (button) button._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				button.destroy(detach);
			}
		};
	}

	// (24:3) {#if keyboard.buttons[ii].length < 4}
	function create_if_block_8(component, ctx) {
		var div;

		return {
			c: function create() {
				div = createElement("div");
				div.textContent = "+";
				div._svelte = { component, ctx };

				addListener(div, "click", click_handler);
				div.className = "button-add svelte-1egbdsg";
				addLoc(div, file$5, 23, 41, 733);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
			},

			p: function update(changed, _ctx) {
				ctx = _ctx;
				div._svelte.ctx = ctx;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler);
			}
		};
	}

	// (17:2) {#each keyboard.buttons as buttons, ii}
	function create_each_block_1(component, ctx) {
		var div, each_anchor, text, current;

		var each_value = ctx.buttons;

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block_2(component, get_each_context(ctx, each_value, i));
		}

		function outroBlock(i, detach, fn) {
			if (each_blocks[i]) {
				each_blocks[i].o(() => {
					if (detach) {
						each_blocks[i].d(detach);
						each_blocks[i] = null;
					}
					if (fn) fn();
				});
			}
		}

		var buttons = new Buttons({
			root: component.root,
			store: component.store,
			slots: { default: createFragment() }
		});

		var if_block = (ctx.keyboard.buttons[ctx.ii].length < 4) && create_if_block_8(component, ctx);

		return {
			c: function create() {
				div = createElement("div");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
				buttons._fragment.c();
				text = createText("\n\t\t\t");
				if (if_block) if_block.c();
				div.className = "row svelte-1egbdsg";
				addLoc(div, file$5, 17, 2, 471);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].i(buttons._slotted.default, null);
				}

				append(buttons._slotted.default, each_anchor);
				buttons._mount(div, null);
				append(div, text);
				if (if_block) if_block.m(div, null);
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.keyboard || changed.i || changed.j) {
					each_value = ctx.buttons;

					for (var i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(changed, child_ctx);
						} else {
							each_blocks[i] = create_each_block_2(component, child_ctx);
							each_blocks[i].c();
						}
						each_blocks[i].i(each_anchor.parentNode, each_anchor);
					}
					for (; i < each_blocks.length; i += 1) outroBlock(i, 1);
				}

				if (ctx.keyboard.buttons[ctx.ii].length < 4) {
					if (!if_block) {
						if_block = create_if_block_8(component, ctx);
						if_block.c();
						if_block.m(div, null);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				outrocallback = callAfter(outrocallback, 2);

				each_blocks = each_blocks.filter(Boolean);
				const countdown = callAfter(outrocallback, each_blocks.length);
				for (let i = 0; i < each_blocks.length; i += 1) outroBlock(i, 0, countdown);

				if (buttons) buttons._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				destroyEach(each_blocks, detach);

				buttons.destroy();
				if (if_block) if_block.d();
			}
		};
	}

	// (27:4) {#if keyboard.buttons.length < 10}
	function create_if_block_7(component, ctx) {
		var div;

		function click_handler_1(event) {
			component.addRow();
		}

		return {
			c: function create() {
				div = createElement("div");
				div.textContent = "Добавить";
				addListener(div, "click", click_handler_1);
				div.className = "button-add svelte-1egbdsg";
				addLoc(div, file$5, 26, 38, 857);
			},

			m: function mount(target, anchor) {
				insert(target, div, anchor);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(div);
				}

				removeListener(div, "click", click_handler_1);
			}
		};
	}

	// (33:8) {#if keyboard.buttons[i][j].action.label===""}
	function create_if_block_6(component, ctx) {
		var b;

		return {
			c: function create() {
				b = createElement("b");
				b.textContent = "Пустой текст!";
				b.className = "note svelte-1egbdsg";
				setStyle(b, "color", "#db3b3b");
				addLoc(b, file$5, 32, 54, 1138);
			},

			m: function mount(target, anchor) {
				insert(target, b, anchor);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(b);
				}
			}
		};
	}

	// (34:8) {#if keyboard.buttons[i][j].action.label.length > 41}
	function create_if_block_5(component, ctx) {
		var b;

		return {
			c: function create() {
				b = createElement("b");
				b.textContent = "Слишком много символов!";
				b.className = "note svelte-1egbdsg";
				setStyle(b, "color", "#db3b3b");
				addLoc(b, file$5, 33, 61, 1261);
			},

			m: function mount(target, anchor) {
				insert(target, b, anchor);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(b);
				}
			}
		};
	}

	// (40:8) {#if !validPayload}
	function create_if_block_4(component, ctx) {
		var b;

		return {
			c: function create() {
				b = createElement("b");
				b.textContent = "Невалидный JSON!";
				b.className = "note svelte-1egbdsg";
				setStyle(b, "color", "#db3b3b");
				addLoc(b, file$5, 39, 27, 1526);
			},

			m: function mount(target, anchor) {
				insert(target, b, anchor);
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(b);
				}
			}
		};
	}

	// (46:10) {#each ["primary", "default", "negative", "positive"] as color}
	function create_each_block(component, ctx) {
		var current;

		var button_initial_data = {
		 	label: ctx.keyboard.buttons[ctx.i][ctx.j].color==ctx.color?'X':'',
		 	color: ctx.color
		 };
		var button = new Button({
			root: component.root,
			store: component.store,
			data: button_initial_data
		});

		button.on("click", function(event) {
			component.updateColor(event.color);
		});

		return {
			c: function create() {
				button._fragment.c();
			},

			m: function mount(target, anchor) {
				button._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var button_changes = {};
				if (changed.keyboard || changed.i || changed.j) button_changes.label = ctx.keyboard.buttons[ctx.i][ctx.j].color==ctx.color?'X':'';
				button._set(button_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (button) button._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				button.destroy(detach);
			}
		};
	}

	// (65:2) {:else}
	function create_else_block(component, ctx) {
		var select, option0, option1, option2, select_updating = false, text_3, current_block_type_index, if_block, if_block_anchor, current;

		function select_change_handler() {
			select_updating = true;
			component.set({ select: selectValue(select) });
			select_updating = false;
		}

		var if_block_creators = [
			create_if_block_1,
			create_if_block_2,
			create_if_block_3
		];

		var if_blocks = [];

		function select_block_type_1(ctx) {
			if (ctx.select=="JSON") return 0;
			if (ctx.select=="Golang") return 1;
			if (ctx.select=="Golang-vksdk") return 2;
			return -1;
		}

		if (~(current_block_type_index = select_block_type_1(ctx))) {
			if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](component, ctx);
		}

		return {
			c: function create() {
				select = createElement("select");
				option0 = createElement("option");
				option0.textContent = "JSON";
				option1 = createElement("option");
				option1.textContent = "Golang";
				option2 = createElement("option");
				option2.textContent = "Golang vksdk";
				text_3 = createText("\n\n    ");
				if (if_block) if_block.c();
				if_block_anchor = createComment();
				option0.__value = "JSON";
				option0.value = option0.__value;
				addLoc(option0, file$5, 66, 6, 2310);
				option1.__value = "Golang";
				option1.value = option1.__value;
				addLoc(option1, file$5, 67, 6, 2351);
				option2.__value = "Golang-vksdk";
				option2.value = option2.__value;
				addLoc(option2, file$5, 68, 6, 2396);
				addListener(select, "change", select_change_handler);
				if (!('select' in ctx)) component.root._beforecreate.push(select_change_handler);
				select.className = "header svelte-1egbdsg";
				addLoc(select, file$5, 65, 4, 2260);
			},

			m: function mount(target, anchor) {
				insert(target, select, anchor);
				append(select, option0);
				append(select, option1);
				append(select, option2);

				selectOption(select, ctx.select);

				insert(target, text_3, anchor);
				if (~current_block_type_index) if_blocks[current_block_type_index].m(target, anchor);
				insert(target, if_block_anchor, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				if (!select_updating && changed.select) selectOption(select, ctx.select);

				var previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type_1(ctx);
				if (current_block_type_index === previous_block_index) {
					if (~current_block_type_index) if_blocks[current_block_type_index].p(changed, ctx);
				} else {
					if (if_block) {
						if_block.o(function() {
							if_blocks[previous_block_index].d(1);
							if_blocks[previous_block_index] = null;
						});
					}

					if (~current_block_type_index) {
						if_block = if_blocks[current_block_type_index];
						if (!if_block) {
							if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](component, ctx);
							if_block.c();
						}
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					} else {
						if_block = null;
					}
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (if_block) if_block.o(outrocallback);
				else outrocallback();

				current = false;
			},

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(select);
				}

				removeListener(select, "change", select_change_handler);
				if (detach) {
					detachNode(text_3);
				}

				if (~current_block_type_index) if_blocks[current_block_type_index].d(detach);
				if (detach) {
					detachNode(if_block_anchor);
				}
			}
		};
	}

	// (62:2) {#if errorValid}
	function create_if_block(component, ctx) {
		var h3, text1, pre, text2, current;

		return {
			c: function create() {
				h3 = createElement("h3");
				h3.textContent = "Ошибки";
				text1 = createText("\n    ");
				pre = createElement("pre");
				text2 = createText(ctx.errorValid);
				addLoc(h3, file$5, 62, 4, 2202);
				addLoc(pre, file$5, 63, 4, 2222);
			},

			m: function mount(target, anchor) {
				insert(target, h3, anchor);
				insert(target, text1, anchor);
				insert(target, pre, anchor);
				append(pre, text2);
				current = true;
			},

			p: function update(changed, ctx) {
				if (changed.errorValid) {
					setData(text2, ctx.errorValid);
				}
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d: function destroy$$1(detach) {
				if (detach) {
					detachNode(h3);
					detachNode(text1);
					detachNode(pre);
				}
			}
		};
	}

	// (76:36) 
	function create_if_block_3(component, ctx) {
		var current;

		var golang_vksdk_initial_data = { keyboard: ctx.keyboard };
		var golang_vksdk = new Golang_vksdk({
			root: component.root,
			store: component.store,
			data: golang_vksdk_initial_data
		});

		return {
			c: function create() {
				golang_vksdk._fragment.c();
			},

			m: function mount(target, anchor) {
				golang_vksdk._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var golang_vksdk_changes = {};
				if (changed.keyboard) golang_vksdk_changes.keyboard = ctx.keyboard;
				golang_vksdk._set(golang_vksdk_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (golang_vksdk) golang_vksdk._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				golang_vksdk.destroy(detach);
			}
		};
	}

	// (74:30) 
	function create_if_block_2(component, ctx) {
		var current;

		var golang_initial_data = { keyboard: ctx.keyboard };
		var golang = new Golang({
			root: component.root,
			store: component.store,
			data: golang_initial_data
		});

		return {
			c: function create() {
				golang._fragment.c();
			},

			m: function mount(target, anchor) {
				golang._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var golang_changes = {};
				if (changed.keyboard) golang_changes.keyboard = ctx.keyboard;
				golang._set(golang_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (golang) golang._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				golang.destroy(detach);
			}
		};
	}

	// (72:4) {#if select=="JSON"}
	function create_if_block_1(component, ctx) {
		var current;

		var json_initial_data = { keyboard: ctx.keyboard };
		var json = new Json({
			root: component.root,
			store: component.store,
			data: json_initial_data
		});

		return {
			c: function create() {
				json._fragment.c();
			},

			m: function mount(target, anchor) {
				json._mount(target, anchor);
				current = true;
			},

			p: function update(changed, ctx) {
				var json_changes = {};
				if (changed.keyboard) json_changes.keyboard = ctx.keyboard;
				json._set(json_changes);
			},

			i: function intro(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: function outro(outrocallback) {
				if (!current) return;

				if (json) json._fragment.o(outrocallback);
				current = false;
			},

			d: function destroy$$1(detach) {
				json.destroy(detach);
			}
		};
	}

	function App(options) {
		this._debugName = '<App>';
		if (!options || (!options.target && !options.root)) {
			throw new Error("'target' is a required option");
		}

		init(this, options);
		this._state = assign({}, options.data);

		this._recompute({ keyboard: 1, i: 1, j: 1 }, this._state);
		if (!('keyboard' in this._state)) console.warn("<App> was created without expected data property 'keyboard'");
		if (!('i' in this._state)) console.warn("<App> was created without expected data property 'i'");
		if (!('j' in this._state)) console.warn("<App> was created without expected data property 'j'");


		if (!('select' in this._state)) console.warn("<App> was created without expected data property 'select'");
		this._intro = !!options.intro;

		this._fragment = create_main_fragment$5(this, this._state);

		if (options.target) {
			if (options.hydrate) throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(App.prototype, protoDev);
	assign(App.prototype, methods);

	App.prototype._checkReadOnly = function _checkReadOnly(newState) {
		if ('validPayload' in newState && !this._updatingReadonlyProperty) throw new Error("<App>: Cannot set read-only property 'validPayload'");
		if ('errorValid' in newState && !this._updatingReadonlyProperty) throw new Error("<App>: Cannot set read-only property 'errorValid'");
	};

	App.prototype._recompute = function _recompute(changed, state) {
		if (changed.keyboard || changed.i || changed.j) {
			if (this._differs(state.validPayload, (state.validPayload = validPayload(state)))) changed.validPayload = true;
		}

		if (changed.keyboard) {
			if (this._differs(state.errorValid, (state.errorValid = errorValid(state)))) changed.errorValid = true;
		}
	};

	var raw_keyboard = localStorage.getItem('keyboard');

	if (raw_keyboard) {
	  var keyboard = JSON.parse(raw_keyboard);
	} else {
	  var keyboard = {
	    one_time: false,
	    buttons: [
	      [
	        {
	          action: {
	            type: 'text',
	            payload: '{"button": "1"}',
	            label: 'Red'
	          },
	          color: 'negative'
	        },
	        {
	          action: {
	            type: 'text',
	            payload: '{"button": "2"}',
	            label: 'Green'
	          },
	          color: 'positive'
	        }
	      ],
	      [
	        {
	          action: {
	            type: 'text',
	            payload: '{"button": "3"}',
	            label: 'White'
	          },
	          color: 'default'
	        },
	        {
	          action: {
	            type: 'text',
	            payload: '{"button": "4"}',
	            label: 'Blue'
	          },
	          color: 'primary'
	        }
	      ]
	    ]
	  };
	}

	const app = new App({
		target: document.body,
		data: {
			keyboard: keyboard,
	    i:0,
	    j:0,
	    errorValid: "",
	    select: "JSON"
		}
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map
