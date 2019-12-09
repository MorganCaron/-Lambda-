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
		this.innerHTML += this.test
		console.log(this)
	}

	static get observedAttributes() {
		return ['test'];
	}

	attributeChangedCallback(name: string, oldValue: any, newValue: any) {
		this["__"  + name] = newValue
	}

}
