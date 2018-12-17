class NewsArticle extends Layout {
	constructor(title, content) {
		super('article')
		this.title = title
		this.content = content
		this.update()
	}

	render() {
		return [
			new H4(this.title),
			new P(this.content)
		]
	}
}

class ReassemblyExample extends Layout {
	constructor() {
		super('section', { class: 'example' })
		this.articles = [
			{
				title: 'Lorem Ipsum',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			},
			{
				title: 'Lorem Ipsum',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			},
			{
				title: 'Lorem Ipsum',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			}
		]
		this.update()
	}

	render() {
		return this.articles.map(article => new NewsArticle(article.title, article.content))
	}
}

class ReassemblyPage extends Layout {
	constructor() {
		super('div')
		this.code = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/ReassemblyPage.js', code => {
			this.code = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Reassembly.js'),
			new P('Reassembly.js is a JavaScript library for building HTML.'),
			new H3('Example'),
			new ReassemblyExample(),
			new H3('Source code'),
			new Pre(this.code, { class: 'example' })
		]
	}
}
