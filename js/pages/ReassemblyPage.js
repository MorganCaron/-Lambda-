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
		this.update()

	}

	render() {
		return [
			new H2('Reassembly.js'),
			new P('Reassembly.js is a JavaScript library for building HTML.'),
			new P('Manipulate your HTML elements as lists of javascript objects.'),

			new H3('Example'),
			new P('This HTML code, as well as the entire site, has been written in pure Javascript, without HTML.'),
			new ReassemblyExample(),

			new H3('Getting Started'),
			new P('The body tag must be empty. Javascript will fill it with elements.'),
			new H4('HTML'),
			new Pre(`<!DOCTYPE html>
<html>
	<head>
		<script type="text/javascript" src="js/Reassembly.js" defer></script>
		<script type="text/javascript" src="js/App.js" defer></script>
	</head>
	<body>
	</body>
</html>`, { class: 'example' }),
			new H4('JavaScript'),
			new Pre(`class App {
	constructor() {
		this.render()
	}

	render() {
		Body.setContent([])
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let app = new App()
}, false)`, { class: 'example' }),

			new H3('Tutorial'),
			new P('Displaying simple elements'),
			new H4('JavaScript'),
			new Pre(`class App {
	constructor() {
		this.render()
	}

	render() {
		Body.setContent([
			new H1('Title'),
			new P('Paragraphe'),
			new Ul([
				new Li('First'),
				new Li('Second')
			])
		])
	}
}`, { class: 'example' }),

			new P('Encapsulation'),
			new H4('JavaScript'),
			new Pre(`new P([
	new Text('Hello '),
	new Br(),
	new A('World', { href: '#' })
])`, { class: 'example' }),

			new P('Adding attributes'),
			new H4('JavaScript'),
			new Pre(`new H1('Title', { id: 'mainTitle', class: 'text-center bold' })`, { class: 'example' }),

			new P('Creating a layout'),
			new H4('JavaScript'),
			new Pre(`class Navbar extends Layout {
	constructor() {
		super('nav', { class: 'navbar' })
		this.update()
	}

	render() {
		return [
			new A('Home', { href: '/home' }),
			new A('About', { href: '/about' }),
			new A('Contact', { href: '/contact' })
		]
	}
}

class App {
	constructor() {
		this.render()
	}

	render() {
		Body.setContent([
			new Navbar(),
			new H1('Title'),
			new P('Paragraphe'),
			new Ul([
				new Li('First'),
				new Li('Second')
			])
		])
	}
}`, { class: 'example' }),

			new P('Callback function for tags <a>, <button> and <input>'),
			new H4('JavaScript'),
			new Pre(`new A('A', { href: '#' }, () => { console.log('click <a>') }),
new Button('Button', () => { console.log('click <button>') }, { class: 'yourClasses' }),
new Input('Input', () => { console.log('input <input>') }, { class: 'yourClasses' })`, { class: 'example' }),

			new P('Adding style'),
			new H4('JavaScript'),
			new Pre(`class App {
	constructor() {
		Head.setStyle('MainStyle', \`
		body {
			background-color: blue;
		}
		\`)
		this.render()
	}

	render() {
		Body.setContent([])
	}
}`, { class: 'example' })
		]
	}
}
