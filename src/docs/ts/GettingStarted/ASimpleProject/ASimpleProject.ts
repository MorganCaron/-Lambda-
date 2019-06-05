import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../../../ModularDom'
import * as Prism from 'prismjs'
import { Menu } from '../Menu'
import ASimpleProjectHTML from './HTML.txt'
import ASimpleProjectTS from './TS.txt'

export class ASimpleProject extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
			h3 { a click: ${() => Router.navigate('getting-started')} "Getting started" }
			${new Menu()}
			h2 "A Simple Project"
			p class: lead {
				"The main component of a ModularDom project is the class inheriting Body." br;
				"Each component is updated by calling its " code class: lang-js "update()" " method. It is therefore " strong "necessary to call it in the constructor" "." br;
				"All ModularDom components must implement a " code class: lang-js "render()" " method that " strong "returns what should be displayed" "." br;
				"The syntax used to generate HTML is specific to ModularDom. It is inspired by the SCSS language."
			}
			div class: row {
				div class: col-lg-6 {
					h4 "index.html"
					pre class: lang-html {
						code "${ASimpleProjectHTML}"
					}
				}
				div class: col-lg-6 {
					h4 "App.ts"
					pre class: lang-js {
						code "${ASimpleProjectTS}"
					}
				}
			}
			
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
