import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class Menu extends Layout {
	constructor() {
		super(Tag`nav class: 'sticky muted'`)
		this.update()
	}

	render(): Elem[] {
		return View`
			h3 "Documentation"
			ul {
				li click: ${() => Router.navigate('')} class: "${Router.check('') ? 'current' : ''}" "Home"
				li click: ${() => Router.navigate('installation')} class: "${Router.check('installation') ? 'current' : ''}" "Installation"
				li click: ${() => Router.navigate('component')} class: "${Router.check('component') ? 'current' : ''}" "Component"
				li click: ${() => Router.navigate('view-syntax')} class: "${Router.check('view-syntax') ? 'current' : ''}" "View Syntax"
				li click: ${() => Router.navigate('reactivity')} class: "${Router.check('reactivity') ? 'current' : ''}" "Reactivity"
				li click: ${() => Router.navigate('router')} class: "${Router.check('router(\\/(.*)\\/edit\\/(.*))?') ? 'current' : ''}" "Router"
				li click: ${() => Router.navigate('writer')} class: "${Router.check('writer') ? 'current' : ''}" "Writer"
				li click: ${() => Router.navigate('animations')} class: "${Router.check('animations') ? 'current' : ''}" "Animations"
			}
		`
	}
}
