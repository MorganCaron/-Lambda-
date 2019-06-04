import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'

export class Footer extends Layout {
	constructor() {
		super(Tag`footer class: 'default text-center'`)
		this.update()
	}

	render() {
		return View`
			hr;
			a href: 'https://github.com/MorganCaron/ModularDom' class: btn "Download on Github"
			p { "Created by " a href: 'https://github.com/MorganCaron' "Morgan Caron" }
		`
	}
}
