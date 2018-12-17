class TemplateExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.template = 'Hello, my name is {name}.'
		this.text = Template.build(this.template, { name: 'Morgan' })
		this.update()
	}

	render() {
		return [
			new P(this.template),
			new P(this.text)
		]
	}
}

class TemplatePage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/TemplatePage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Template.js'),
			new P('Template.js is a JavaScript library for templating HTML, CSS, texts, etc.'),
			new H3('Example'),
			new TemplateExample(),
			new H3('Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
