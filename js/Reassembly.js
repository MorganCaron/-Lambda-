class Text {
	constructor(content) { this.el = document.createTextNode(content) }
	render() { return this.el }
}

class HtmlObject {
	constructor(element) { this.el = element }
	found() { return this.el != null }
	delete() { if (this.el) this.el.remove() }

	setAttrs(attrs) {
		if (this.el)
			for (const attr in attrs)
				this.el.setAttribute(attr, attrs[attr])
	}

	clearChilds() {
		while (this.el.firstChild)
			this.el.removeChild(this.el.firstChild)
	}

	addChilds(childs) {
		childs.forEach((child) => {
			this.el.appendChild(child.el)
		})
	}

	setContent(content) {
		if (!this.el) return

		if (content == '') content = []
		else if (typeof content == 'string')
			content = [new Text(content)]
		if (!Array.isArray(content))
			content = []

		this.clearChilds()
		this.addChilds(content)
	}
}

class Selector extends HtmlObject {
	constructor(query) { super(document.querySelector(query)) }
}

class Element extends HtmlObject {
	constructor(name, content = '', attrs = {}) {
		super(document.createElement(name))
		this.setAttrs(attrs)
		this.setContent(content)
	}
}

class Layout extends Element {
	constructor(name, attrs = {}) { super(name, '', attrs) }
	update() { this.setContent(this.render()) }
}

class Link extends Element {
	constructor(attrs = {}) { super('link', '', attrs) }
}

class Div extends Element {
	constructor(content, attrs = {}) { super('div', content, attrs) }
}

class Header extends Element {
	constructor(content, attrs = {}) { super('header', content, attrs) }
}

class Footer extends Element {
	constructor(content, attrs = {}) { super('footer', content, attrs) }
}

class Nav extends Element {
	constructor(content, attrs = {}) { super('nav', content, attrs) }
}

class Section extends Element {
	constructor(content, attrs = {}) { super('section', content, attrs) }
}

class Article extends Element {
	constructor(content, attrs = {}) { super('article', content, attrs) }
}

class Aside extends Element {
	constructor(content, attrs = {}) { super('aside', content, attrs) }
}

class Blockquote extends Element {
	constructor(content, attrs = {}) { super('blockquote', content, attrs) }
}

class Pre extends Element {
	constructor(content, attrs = {}) { super('pre', content, attrs) }
}

class Code extends Element {
	constructor(content, attrs = {}) { super('code', content, attrs) }
}

class H1 extends Element {
	constructor(content, attrs = {}) { super('h1', content, attrs) }
}

class H2 extends Element {
	constructor(content, attrs = {}) { super('h2', content, attrs) }
}

class H3 extends Element {
	constructor(content, attrs = {}) { super('h3', content, attrs) }
}

class H4 extends Element {
	constructor(content, attrs = {}) { super('h4', content, attrs) }
}

class H5 extends Element {
	constructor(content, attrs = {}) { super('h5', content, attrs) }
}

class H6 extends Element {
	constructor(content, attrs = {}) { super('h6', content, attrs) }
}

class P extends Element {
	constructor(content, attrs = {}) { super('p', content, attrs) }
}

class Strong extends Element {
	constructor(content, attrs = {}) { super('strong', content, attrs) }
}

class Small extends Element {
	constructor(content, attrs = {}) { super('small', content, attrs) }
}

class Span extends Element {
	constructor(content, attrs = {}) { super('span', content, attrs) }
}

class Ul extends Element {
	constructor(content, attrs = {}) { super('ul', content, attrs) }
}

class Li extends Element {
	constructor(content, attrs = {}) { super('li', content, attrs) }
}

class Br extends Element {
	constructor(attrs = {}) { super('br', '', attrs) }
}

class Hr extends Element {
	constructor(attrs = {}) { super('hr', '', attrs) }
}

class A extends Element {
	constructor(content, attrs = {}, func = null) {
		super('a', content, attrs)
		if (func) {
			this.el.addEventListener('click', (event) => {
				event.preventDefault()
				func(event)
			}, false)
		}
	}
}

class Button extends Element {
	constructor(content, func = null, attrs = {}) {
		super('button', content, attrs)
		if (func)
			this.el.addEventListener('click', func, false)
	}
}

class Input extends Element {
	constructor(content, func, attrs = {}) {
		super('input', '', { value: content, ...attrs })
		this.el.addEventListener('input', func, false)
	}
}

class Style extends Element {
	constructor(name, content) {
		super('style', content, { id: name, type: 'text/css' })
	}
}

class HeadElement extends Selector {
	constructor() {
		super('head')

		const queries = [
			'meta[name="viewport"]',
			'meta[charset]',
			'style#base'
		]
		queries.forEach(query => {
			let elements = document.querySelectorAll(query)
			elements.forEach(element => {
				if (element) element.remove()
			})
		})

		this.addChilds([
			new Element('meta', '', {
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			}),
			new Element('meta', '', { charset: 'UTF-8' }),
			new Style('baseStyle', 'html{scroll-behavior:smooth}body{margin:0}*,*::before,*::after{box-sizing:border-box}')
		])
	}

	setStyle(name, ast) {
		new Selector('style#' + name).delete()
		this.addChilds([new Style(name, ast)])
	}
}

class BodyElement extends HtmlObject {
	constructor() {
		super(document.body)
		this.el.innerHTML = ''
	}
}

let Head = new HeadElement()
let Body = new BodyElement()
