import { Component, Input, Router } from 'ts/ModularDom'
import html from './App.html'
import css from '!!raw-loader!./App.css'

@Component({
	selector: 'app-main',
	template: html,
	style: css
})
class App extends HTMLElement {

	@Input() test: string

	init() {
		setInterval(
			() => {
				if (this.test == "A")
					this.test = "B"
				else
					document.querySelector("app-main").setAttribute("test", "A")
			}, 1000)
	}

	update() {
		console.log(this.test)
	}
}
