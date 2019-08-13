import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class Menu extends Layout {
	constructor() {
		super(Tag`nav class: 'sticky muted'`)
		this.update()
	}

	render(): Elem[] {
		return View`
			h3 "Getting Started"
			ul {
				li click: ${() => Router.navigate('')} "Home"
				li click: ${() => Router.navigate('installation')} "Installation"
				li click: ${() => Router.navigate('component')} "Component"
				li click: ${() => Router.navigate('view-syntax')} "View Syntax"
				li click: ${() => Router.navigate('reactivity')} "Reactivity"
				li click: ${() => Router.navigate('router')} "Router"
				li click: ${() => Router.navigate('writer')} "Writer"
				li click: ${() => Router.navigate('animations')} "Animations"
			}
		`
	}
}
