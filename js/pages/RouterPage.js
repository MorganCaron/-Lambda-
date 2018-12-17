class RouterExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.update()
	}

	render() {
		return [
			new H4('Router')
		]
	}
}

class RouterPage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/RouterPage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Router.js'),
			new P('Router.js is a JavaScript library for .'),
			new H3('Example'),
			new RouterExample(),
			new H3('Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
