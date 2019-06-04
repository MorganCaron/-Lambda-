import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'
import 'nootstrap'
import 'prism-themes/themes/prism-atom-dark'
import '../sass/Style'
import { Header, Footer, Home, GettingStarted } from './Layouts'

class App extends Body {
	page: Reactive<Elem>

	constructor() {
		super()
		this.page = new Reactive()
		this.page.subscribe(this.update.bind(this))

		Router.mode = 'hash'
		Router.add('', () => { this.page.value = new Home() })
		Router.add('getting-started', () => { this.page.value = new GettingStarted() })
		Router.listen()
	}

	render() {
		if (!this.page.value) return []
		return View`
			${new Header()}
			${this.page.value}
			${new Footer()}
		`
	}
}

document.addEventListener('DOMContentLoaded', () => { new App() }, false)
