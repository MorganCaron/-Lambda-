import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import * as Prism from 'prismjs'
import { Menu } from '../Menu'

export class RouterPage extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
		div class: row {
			div class: col-lg-3 {
				h3 { a click: ${() => Router.navigate('getting-started')} "Getting started" }
				${new Menu()}
			}
			div class: col-lg-9 {
				h2 "Coming Soon"
				p class: lead {
					"The framework is finished, but this documentation is not yet finished." br;
					"Come back in a few days, this page will be written." br;
					"Thanks," br; br; "Morgan."
				}
			}
		}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
