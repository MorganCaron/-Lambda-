import { Component, Attribute, Router } from 'ts/ModularDom'
import html from './App.html'
import css from '!!raw-loader!./App.css'
import { HomePage } from './Pages'

@Component({
	selector: 'app-main',
	template: html,
	style: css
})
class App extends HTMLElement {

	@Attribute() test: string

	init() {
		const router = this.querySelector('app-router') as Router
		router.routes = [
			{ path: '', component: HomePage }
		]
		setInterval(
			() => {
				if (this.test == "A")
					this.test = "B"
				else
					document.querySelector("app-main").setAttribute("test", "A")
			}, 1000)
	}
}
