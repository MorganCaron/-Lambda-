class HeroesPage extends Layout {
	constructor(page, heroes) {
		super('div')
		this.heroes = heroes
		this.update()
	}

	render() {
		return [
			new H4('Heroes'),
			new Ul(this.heroes.value.map(hero => new Li(hero)))
		]
	}
}

class NewHeroPage extends Layout {
	constructor(page, heroes) {
		super('div')
		this.page = page
		this.heroes = heroes

		this.hero = new Reactive('')
		this.hero.update = () => {
			this.el.querySelector('.updateName').innerHTML = this.hero.value
		}
		this.update()
	}

	inputChange(event) {
		this.hero.change(event.target.value)
	}

	buttonClick() {
		this.heroes.change([...this.heroes.value, this.hero.value])
		this.page.change(HeroesPage)
	}

	render() {
		return [
			new H4('New Hero'),
			new P([
				new Text('Name: '),
				new Span(this.hero.value, { class: 'updateName' })
			]),
			new Input(this.hero.value, this.inputChange.bind(this)),
			new Button('Ok', this.buttonClick.bind(this))
		]
	}
}

class HeroesExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.page = new Reactive(HeroesPage)
		this.page.update = this.update.bind(this)

		this.heroes = new Reactive(['Narco', 'Bombasto', 'Magneta'])
		this.heroes.update = this.update.bind(this)
		this.update()
	}

	render() {
		return [
			new Nav([
				new A('Heroes', { href: '#' }, () => { this.page.change(HeroesPage) }),
				new A('New Hero', { href: '#' }, () => { this.page.change(NewHeroPage) })
			]),
			new this.page.value(this.page, this.heroes)
		]
	}
}
