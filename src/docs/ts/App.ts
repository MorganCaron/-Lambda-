import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import 'nootstrap'
import 'prism-themes/themes/prism-atom-dark'
import '../sass/Style'
import { Header } from './Header'
import { Footer } from './Footer'
import { Home } from './Home'
import { InstallationPage, ComponentPage, ViewSyntaxPage, ReactivityPage, RouterPage, MagicalAnimationsPage, WriterPage } from './Pages'

class App extends Body {
	page: Reactive<Elem>

	constructor() {
		super()
		this.page = new Reactive()
		this.page.subscribe(this.update.bind(this))

		Router.mode = 'hash'
		Router.add('', () => { this.page.value = new Home() })
		Router.add('installation', () => { this.page.value = new InstallationPage() })
		Router.add('component', () => { this.page.value = new ComponentPage() })
		Router.add('view-syntax', () => { this.page.value = new ViewSyntaxPage() })
		Router.add('reactivity', () => { this.page.value = new ReactivityPage() })
		Router.add('router', () => { this.page.value = new RouterPage() })
		Router.add('writer', () => { this.page.value = new WriterPage() })
		Router.add('magical-animations', () => { this.page.value = new MagicalAnimationsPage() })
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
