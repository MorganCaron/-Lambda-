class StylizeExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.scssTree = {
			'body > .container': {
				'a:hover': {
					color: 'white',
					backgroundColor: 'black'
				}
			},
			p: {
				fontSize: 20
			}
		}
		this.cssTree = Stylize.nestingTree(this.scssTree)
		this.css = Stylize.treeToCss(this.cssTree, 1)
		this.cssMin = Stylize.treeToCss(this.cssTree)

		this.update()
	}

	render() {
		return [
			new H4('SCSS Tree'),
			new Pre(JSON.stringify(this.scssTree, null, 4)),
			new H4('CSS Tree'),
			new Pre(JSON.stringify(this.cssTree, null, 4)),
			new H4('CSS'),
			new Pre(this.css),
			new H4('CSS Min'),
			new Pre(this.cssMin)
		]
	}
}

class StylizePage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/StylizePage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Stylize.js'),
			new P('Stylize.js is a JavaScript library for building CSS.'),
			new H3('Example'),
			new StylizeExample(),
			new H3('Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
