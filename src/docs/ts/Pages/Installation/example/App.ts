import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

class App extends Body {
	constructor() {
		super()
		this.update()
	}

	render(): Elem[] {
		return View`
			div class: container-fluid {
				h4 "Hello World"
				p "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			}
		`
	}
}

document.addEventListener('DOMContentLoaded', () => { new App() })
