class GlitchExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.update()
		Glitch.text(this.el.querySelector('p.glitch'))
	}

	render() {
		return [
			new P('Glitch', { class: 'glitch' })
		]
	}
}

class GlitchPage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/GlitchPage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Glitch.js'),
			new P('Glitch.js is a JavaScript library for .'),
			new H3('Example'),
			new GlitchExample(),
			new H3('Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
