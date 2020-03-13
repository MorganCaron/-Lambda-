import { Component, Router } from 'ts/ModularDom'
import { Home, Demo, Documentation } from './Pages'
import './Layouts'

import html from './App.html'

@Component({
	selector: 'app-main',
	template: html
})
class App extends HTMLElement {

	router: Router

	init() {
		this.router = this.querySelector('app-router') as Router

		[
			{ path: '', component: Home },
			{ path: 'demo', component: Demo },
			{ path: 'documentation', component: Documentation }
		].forEach(route => this.router.addRoute(route))
		this.router.listen()
	}

}
