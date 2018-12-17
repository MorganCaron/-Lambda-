class FetchPage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/FetchPage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Fetch.js'),
			new P('Fetch.js is a JavaScript library for file request.'),
			new H3('Example & Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
