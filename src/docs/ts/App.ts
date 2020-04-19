import { Component, Router } from 'ts/ModularDom'
import { Home, Demo, Tutorial, Documentation } from './Pages'
import './Layouts'

import html from './App.html'

@Component({
	selector: 'app-main',
	classes: 'container',
	template: html
})
class App extends HTMLElement {

	init() {
		const router = this.querySelector('md-router') as Router

		router.mode = 'hash';

		[
			{ path: '', component: Home },
			{ path: 'demo', component: Demo },
			{ path: 'tutorial', component: Tutorial },
			{ path: 'documentation', component: Documentation }
		].forEach(route => router.addRoute(route))
		router.listen()
	}

}
