import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'

export class Menu extends Layout {
	constructor() {
		super(Tag`nav class: 'muted flex-column'`)
		this.update()
	}

	render() {
		return View`
		h3 "Getting Started"
		ul {
			li { a click: ${() => Router.navigate('installation')} "Installation" }
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
