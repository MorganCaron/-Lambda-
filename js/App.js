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
		super('header', { class: 'muted' })
		this.page = page
		this.update()
	}

	render() {
		return [
			new H1([new A('<λ/>', { href: '#' }, () => { this.page.change(HomePage) })], { class: 'text-center' }),
			new Nav([
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
				new A('Download on Github', { href: 'https://github.com/MorganCaron/-Lambda-', class: 'btn m-5' })
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
				backgroundColor: 'rgba(49,52,57,.7)',
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
				padding: '0 1rem',
				display: 'flex',
				flexDirection: 'column',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				h1: {
					margin: '0'
				},
				'.navbar': {
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignItems: 'center',
					'a': {
						padding: '.5rem'
					}
				},
				'a': {
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
				'body>header .navbar': {
					flexDirection: 'row'
				}
			},
			'@media(min-width: 768px)': {
				'body>header': {
					flexDirection: 'row',
					justifyContent: 'space-between'
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
