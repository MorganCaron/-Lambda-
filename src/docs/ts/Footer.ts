import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'

export class Footer extends Layout {
	constructor() {
		super(Tag`footer class: 'default text-center'`)
		this.update()
	}

	render() {
		return View`
			hr;
			p "This site is fully realized with the libraries presented"
			button click: ${() => Router.navigate('getting-started')} class: "btn mr-2" "Getting started"
			a href: 'https://github.com/MorganCaron/ModularDom' class: btn "Download on Github"
			p { "Created by " a href: 'https://github.com/MorganCaron' "Morgan Caron" }
		`
	}
}
