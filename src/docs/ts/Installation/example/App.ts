import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'

class App extends Body {
	constructor() {
		super()
		this.update()
	}

	render() {
		return View`
			h4 "Hello World"
			p "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		`
	}
}

document.addEventListener('DOMContentLoaded', () => { new App() })
