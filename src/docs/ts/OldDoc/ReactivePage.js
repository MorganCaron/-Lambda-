class ReactivePage extends Layout {
	constructor() {
		super('div')
		this.heroesCode = 'loading...'
		this.update()

		Fetch.importTextFile('js/pages/ReactivePages/MathExample.js', code => {
			this.mathCode = code
			this.update()
		})

		Fetch.importTextFile('js/pages/ReactivePages/HeroesExample.js', code => {
			this.heroesCode = code
			this.update()
		})
	}

	render() {
		return [
			new H2('Reactive.js'),
			new P('Reactive.js is a JavaScript library adding reactivity.'),
			new H3('Example _ Math'),
			new MathExample(),
			new H3('Source code _ Math'),
			new Pre(this.mathCode, { class: 'example' }),
			new H3('Example _ Heroes'),
			new HeroesExample(),
			new H3('Source code _ Heroes'),
			new Pre(this.heroesCode, { class: 'example' })
		]
	}
}
