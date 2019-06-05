import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../../ModularDom'

export class Menu extends Layout {
	constructor() {
		super(Tag`nav class: 'muted flex-column'`)
		this.update()
	}

	render() {
		return View`
			ul {
				li { a click: ${() => Router.navigate('a-simple-project')} "A Simple Project" }
				li { a click: ${() => Router.navigate('component')} "A Component" }
				li { a click: ${() => Router.navigate('view-syntax')} "The View Syntax" }
				li { a click: ${() => Router.navigate('reactivity')} "The Reactivity" }
				li { a click: ${() => Router.navigate('router')} "The Router" }
				li { a click: ${() => Router.navigate('flip-animations')} "FLIP Animations" }
				li { a click: ${() => Router.navigate('writer')} "The Writer" }
			}
		`
	}
}
