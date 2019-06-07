import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import { Menu } from '../Menu'

export class GettingStartedPage extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
			h3 "Getting started"
			p class: lead {
				strong "ModularDom needs TypeScript to work."
				" We recommend the use of " strong { a href: "https://webpack.js.org/" target: _blank "Webpack" " to compile the TypeScript." }
				" You will find a " strong { "Starter " a href: "https://github.com/MorganCaron/Webpack-Starter" target: _blank "here" }
			}
			${new Menu()}
		`
	}
}
