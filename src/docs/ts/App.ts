import 'prism-themes/themes/prism-atom-dark'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'
import { Header, Footer, Menu } from './Layouts'
import { HomePage, InstallationPage, ComponentPage, ViewSyntaxPage, ReactivityPage, RouterPage, AnimationsPage, WriterPage } from './Pages'

class App extends Body {
	page: Reactive<Elem>

	constructor() {
		super()
		this.page = new Reactive()
		this.page.subscribe(this.update.bind(this))

		Router.mode = 'hash'
		Router.add('', () => { this.page.value = new HomePage() })
		Router.add('installation', () => { this.page.value = new InstallationPage() })
		Router.add('component', () => { this.page.value = new ComponentPage() })
		Router.add('view-syntax', () => { this.page.value = new ViewSyntaxPage() })
		Router.add('reactivity', () => { this.page.value = new ReactivityPage() })
		Router.add('router', () => { this.page.value = new RouterPage() })
		Router.add('writer', () => { this.page.value = new WriterPage() })
		Router.add('animations', () => { this.page.value = new AnimationsPage() })
		Router.listen()
	}

	render(): Elem[] {
		if (!this.page.value) return []
		return View`
			${new Header()}
			div class: container-fluid {
				div class: row {
					div class: 'col-lg-3 no-gutters' {
						${new Menu()}
					}
					div class: col-lg-9 {
						${this.page.value}
					}
				}
			}
			${new Footer()}
		`
	}
}

document.addEventListener('DOMContentLoaded', () => { new App() })
