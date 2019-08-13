import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class Footer extends Layout {
	constructor() {
		super(Tag`footer class: 'text-center'`)
		this.update()
	}

	render(): Elem[] {
		return View`
			hr;
			p {
				"This site is realized with "
				a href: 'https://morgancaron.github.io/Nootstrap/' target: _blank "Nootstrap"
				" & ModularDom"
			}
			button click: ${() => Router.navigate('installation')} class: "btn mr-2" "Get Started"
			a href: 'https://github.com/MorganCaron/ModularDom' class: btn "Download on Github"
			p { "Created by " a href: 'https://github.com/MorganCaron' target: _blank "Morgan Caron" }
		`
	}
}
