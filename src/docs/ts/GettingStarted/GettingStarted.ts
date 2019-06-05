import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../../ModularDom'
import { Menu } from './Menu'

export class GettingStarted extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
			h3 "Getting started"
			${new Menu()}
		`
	}
}
