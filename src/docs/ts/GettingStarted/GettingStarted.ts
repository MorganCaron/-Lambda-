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
			div class: row {
				div class: col-md-4 {
					p class: lead {
						"ModularDom is a TypeScript framework designed to facilitate the creation of " strong "single-page web applications" "." br;
						"The framework only manages the application interface, considered as " strong "the view in the MVC model" "."
					}
				}
				div class: col-md-4 {
					p class: lead {
						"It stands out from its competitors by its " strong "ease of use" ", its " strong "performance" ", and " a click: ${() => Router.navigate('flip-animations')} { strong "the touch of magic" } " it adds to projects." br;
						"ModularDom works with a " strong "virtual DOM" " and updates the rendering in the browser only when necessary."
					}
				}
				div class: col-md-4 {
					p class: lead "This site is entirely designed with ModularDom."
					${new Menu()}
				}
			}
		`
	}
}
