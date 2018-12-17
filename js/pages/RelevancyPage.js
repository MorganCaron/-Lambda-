class RelevancyExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.relevancy = new Relevancy(this.load.bind(this), this.unload.bind(this))
		this.relevancy.connect('Fruits', 'Apple')
		this.relevancy.connect('Fruits', 'Orange')
		this.relevancy.connect('Fruits', 'Cherry')
		this.relevancy.connect('Fruits', 'Banana')

		this.relevancy.connect('Colors', 'Red')
		this.relevancy.connect('Colors', 'Orange')
		this.relevancy.connect('Colors', 'Green')
		this.relevancy.connect('Colors', 'Yellow')

		this.relevancy.connect('Apple', 'Red')
		this.relevancy.connect('Apple', 'Yellow')
		this.relevancy.connect('Apple', 'Green')

		this.relevancy.connect('Cherry', 'Red')
		this.relevancy.connect('Banana', 'Yellow')

		this.relevancy.open('Fruits')
		setInterval(() => { this.relevancy.update() }, 10);
		this.update()
	}

	load(items) {
		items.forEach(item => {
			this.relevancy.loaded(item)
		})
		this.update()
	}

	unload(items) {
		items.forEach(item => {
			this.relevancy.unloaded(item)
		})
		this.update()
	}

	render() {
		return [
			new H4(this.relevancy.node),
			new Ul(this.relevancy.nodes.map(node =>
				new Li([
					new A(node, { href: '#' }, () => {
						this.relevancy.open(node)
					})
				])
			))
		]
	}
}

class RelevancyPage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/RelevancyPage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Relevancy.js'),
			new P('Relevancy.js is a JavaScript library for building CSS.'),
			new H3('Example'),
			new RelevancyExample(),
			new H3('Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
