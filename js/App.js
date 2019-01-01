class ComingSoonPage extends Layout {
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

class Navbar extends Layout {
	constructor() {
		super('div', { class: 'navbar muted greyBackground' })
		this.update()
	}

	render() {
		return [
			new H1([new A('<λ/>', { href: '#' }, () => { router.navigate('') })], { class: 'text-center' }),
			new Nav([
				new A('Reassembly.js', { href: '#' }, () => { router.navigate('reassembly') }),
				new A('Reactive.js', { href: '#' }, () => { router.navigate('reactive') }),
				new A('Stylize.js', { href: '#' }, () => { router.navigate('stylize') }),
				new A('Fetch.js', { href: '#' }, () => { router.navigate('fetch') }),
				new A('Template.js', { href: '#' }, () => { router.navigate('template') }),
				new A('Relevancy.js', { href: '#' }, () => { router.navigate('relevancy') }),
				new A('Router.js', { href: '#' }, () => { router.navigate('router') }),
				new A('SyntaxColorizer.js', { href: '#' }, () => { router.navigate('syntaxcolorizer') }),
				new A('Progressive.js', { href: '#' }, () => { router.navigate('progressive') }),
				new A('Glitch.js', { href: '#' }, () => { router.navigate('glitch') })
			])
		]
	}
}

class Credits extends Layout {
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
		router.mode = 'hash'
		router.add('', () => { this.page.change(HomePage) })
		router.add('reassembly', () => { this.page.change(ReassemblyPage) })
		router.add('reactive', () => { this.page.change(ReactivePage) })
		router.add('stylize', () => { this.page.change(StylizePage) })
		router.add('fetch', () => { this.page.change(FetchPage) })
		router.add('template', () => { this.page.change(TemplatePage) })
		router.add('relevancy', () => { this.page.change(RelevancyPage) })
		router.add('router', () => { this.page.change(ComingSoonPage) })
		router.add('syntaxcolorizer', () => { this.page.change(ComingSoonPage) })
		router.add('progressive', () => { this.page.change(ProgressivePage) })
		router.add('glitch', () => { this.page.change(GlitchPage) })
		router.listen()

		Fetch.importTextFile('css/utils.css', css => {
			Head.setStyle('Utils', css)
		})

		const Colors = {
			darkgreyBackground: {
				background: "url('img/darkgrey-background.png')",
			},
			greyBackground: {
				background: "url('img/grey-background.png')",
			},
			darkcyan: {
				backgroundColor: 'darkcyan',
				color: 'white'
			},
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
				darkgreyBackground: Stylize.treeToCss(Colors.darkgreyBackground),
				greyBackground: Stylize.treeToCss(Colors.greyBackground),
				darkcyan: Stylize.treeToCss(Colors.darkcyan),
				default: Stylize.treeToCss(Colors.default),
				muted: Stylize.treeToCss(Colors.muted),
				primary: Stylize.treeToCss(Colors.primary),
				secondary: Stylize.treeToCss(Colors.secondary)
			}, '[', ']')
			Head.setStyle('Theme', css)
		})

		Head.setStyle('App', Stylize.treeToCss({
			'.navbar': {
				padding: '0 1rem',
				display: 'flex',
				flexDirection: 'column',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				h1: {
					margin: '0'
				},
				'nav': {
					margin: '.5rem 0',
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignItems: 'center',
					'a': {
						padding: '.5rem',
						':hover': {
							paddingTop: 'calc(.5rem - 2px)',
							borderTop: '2px solid currentColor'
						}
					}
				},
				'a': {
					textDecoration: 'none',
					transition: 'background-color .15s ease-in-out',
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
			'.windowsarea': {
				position: 'relative',
				width: '100%',
				minHeight: '200px',
				padding: '.5rem',
				overflow: 'hidden',
				userSelect: 'none',
				'.window': {
					width: '500px',
					height: '300px',
					border: '2px solid darkcyan',
					margin: '.5rem',
					'header': {
						display: 'flex',
						justifyContent: 'space-between'
					}
				}
			},
			'p.glitch': {
				margin: 0,
				fontSize: 40,
				fontWeight: 'normal'
			},
			'@media(min-width: 576px)': {
				'.navbar nav': {
					flexDirection: 'row'
				}
			},
			'@media(min-width: 768px)': {
				'.navbar': {
					flexDirection: 'row',
					justifyContent: 'space-between'
				}
			}
		}))
	}

	render() {
		Body.setContent([
			new Navbar(),
			new Div([
				new this.page.value(),
				new Credits()
			], { class: 'container default' })
		])
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let app = new App()
}, false)
