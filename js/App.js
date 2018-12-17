class EmptyPage extends Layout {
	constructor() {
		super('div')
		this.update()
	}

	render() {
		return [
			new H2('Coming soon')
		]
	}
}

class SiteHeader extends Layout {
	constructor(page) {
		super('header', { class: 'secondary' })
		this.page = page
		this.update()
	}

	render() {
		return [
			new H1('<λ/>', { class: 'text-center' }),
			new Nav([
				new A('Home', { href: '#' }, () => { this.page.change(HomePage) }),
				new A('Reassembly.js', { href: '#' }, () => { this.page.change(ReassemblyPage) }),
				new A('Reactive.js', { href: '#' }, () => { this.page.change(ReactivePage) }),
				new A('Stylize.js', { href: '#' }, () => { this.page.change(StylizePage) }),
				new A('Fetch.js', { href: '#' }, () => { this.page.change(FetchPage) }),
				new A('Template.js', { href: '#' }, () => { this.page.change(TemplatePage) }),
				new A('Router.js', { href: '#' }, () => { this.page.change(EmptyPage) }),
				new A('SyntaxColorizer.js', { href: '#' }, () => { this.page.change(EmptyPage) }),
				new A('Progressive.js', { href: '#' }, () => { this.page.change(EmptyPage) }),
				new A('Glitch.js', { href: '#' }, () => { this.page.change(EmptyPage) })
			], { class: 'navbar' })
		]
	}
}

class SiteFooter extends Layout {
	constructor() {
		super('footer', { class: 'lead text-right' })
		this.update()
	}

	render() {
		return [
			new Hr(),
			new P([
				new Strong('This site is fully realized with the libraries presented'), new Br(),
				new A('Download on Github', { href: 'https://github.com/MorganCaron/Reassembly.js', class: 'btn m-5' })
			], { class: 'text-center' }),
			new Text('Created by '),
			new A('Morgan Caron', { href: 'https://morgancaron.fr/cv' }),
			new Text('.')
		]
	}
}

class App {
	constructor() {
		this.page = new Reactive()
		this.page.update = this.render.bind(this)
		this.page.change(HomePage)

		Fetch.importTextFile('css/utils.css', css => {
			Head.setStyle('Utils', css)
		})

		const Colors = {
			default: {
				backgroundColor: '#eee',
				color: '#111'
			},
			muted: {
				backgroundColor: 'rgba(49,52,57,0.3)',
				color: 'white'
			},
			primary: {
				backgroundColor: '#008CBA',
				color: 'white'
			},
			secondary: {
				backgroundColor: '#313439',
				color: 'white'
			}
		}

		Fetch.importTextFile('css/theme.css', template => {
			const css = Template.build(template, {
				'default': Stylize.treeToCss(Colors.default),
				'muted': Stylize.treeToCss(Colors.muted),
				'primary': Stylize.treeToCss(Colors.primary),
				'secondary': Stylize.treeToCss(Colors.secondary)
			}, '[', ']')
			Head.setStyle('Theme', css)
		})

		Head.setStyle('App', Stylize.treeToCss({
			'body>header': {
				padding: '.1rem',
			},
			'.navbar': {
				display: 'flex',
				flexDirection: 'column',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: '1rem',
				'>a': {
					padding: '.5rem',
					textDecoration: 'none',
					transition: 'all .15s ease-in-out',
					transitionProperty: 'background-color',
					':hover': {
						backgroundColor: 'rgba(255, 255, 255, .1)'
					}
				}
			},
			'.example': {
				margin: '0 0 1rem',
				padding: '.5rem',
				border: '2px solid darkcyan',
				'a': {
					margin: '.5rem'
				}
			},
			'@media(min-width: 576px)': {
				'.navbar': {
					flexDirection: 'row'
				}
			}
		}))
	}

	render() {
		Body.setContent([
			new SiteHeader(this.page),
			new Div([
				new this.page.value(),
				new SiteFooter()
			], { class: 'container default' })
		])
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let app = new App()
}, false)
