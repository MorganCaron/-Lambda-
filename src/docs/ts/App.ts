import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'
import 'nootstrap'
import 'prism-themes/themes/prism-atom-dark'
import '../sass/Style'
import { Header } from './Header'
import { Footer } from './Footer'
import { Home } from './Home'
import { GettingStarted } from './GettingStarted/GettingStarted'
import { ASimpleProject } from './GettingStarted/ASimpleProject/ASimpleProject'

class App extends Body {
	page: Reactive<Elem>

	constructor() {
		super()
		this.page = new Reactive()
		this.page.subscribe(this.update.bind(this))

		Router.mode = 'hash'
		Router.add('', () => { this.page.value = new Home() })
		Router.add('getting-started', () => { this.page.value = new GettingStarted() })
		Router.add('a-simple-project', () => { this.page.value = new ASimpleProject() })
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

document.addEventListener('DOMContentLoaded', () => { new App() })
