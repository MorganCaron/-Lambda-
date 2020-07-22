import { Component, Router, Flip } from 'ts/ModularDom'
import { Home, Demo, Tutorial, Documentation } from './Pages'
import './Layouts'

import html from './App.html'

@Component({
	selector: 'app-main',
	classes: 'container',
	template: html
})
class App extends HTMLElement {

	private m_flip: Flip = new Flip()

	init() {
		const router = this.querySelector('md-router') as Router
		router.mode = 'hash';

		router.beforePageChanging = () => this.m_flip.save(this)
		router.afterPageChanging = () => this.m_flip.play({ duration: 500, easing: 'ease-in-out' })

		Array(
			{ path: '', component: Home },
			{ path: 'demo', component: Demo },
			{ path: 'tutorial', component: Tutorial },
			{ path: 'documentation', component: Documentation }
		).forEach(route => router.addRoute(route))
		router.listen()
	}

}
