import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'
import { Menu } from './Menu'

export class Home extends Layout {
	constructor() {
		super(Tag`div class: 'container text-center'`)
		this.update()
	}

	render() {
		return View`
			p class: lead "A new way of thinking the web"
			button click: ${() => Router.navigate('getting-started')} class: btn "Getting started"
			p "This site is fully realized with the libraries presented"
		`
	}
}
