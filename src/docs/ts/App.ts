import { Component, Input, Router } from 'ts/ModularDom'
import html from './App.html'
// import css from './App.css'

@Component({
	selector: 'app-main',
	template: html,
	style: 'h1 { color: red }'
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
		const span = this.querySelector("span")
		if (span)
			span.innerHTML = this.test
	}
}
