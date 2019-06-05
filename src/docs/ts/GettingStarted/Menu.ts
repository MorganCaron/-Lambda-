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
			}
		`
	}
}
