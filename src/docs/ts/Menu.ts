import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'

export class Menu extends Layout {
	constructor() {
		super(Tag`nav class: 'muted flex-column'`)
		this.update()
	}

	render() {
		return View`
			ul {
				li { a click: ${() => Router.navigate('a-simple-project')} "A Simple Project" }
				li { a click: ${() => Router.navigate('component')} "Component" }
				li { a click: ${() => Router.navigate('view-syntax')} "View Syntax" }
				li { a click: ${() => Router.navigate('reactivity')} "Reactivity" }
				li { a click: ${() => Router.navigate('router')} "Router" }
				li { a click: ${() => Router.navigate('writer')} "Writer" }
				li { a click: ${() => Router.navigate('magical-animations')} "Magical Animations" }
			}
		`
	}
}
