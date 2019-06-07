import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import * as Prism from 'prismjs'
import { Menu } from '../Menu'
import IndexHtml from '!!raw-loader!./example/index.html'
import AppTs from '!!raw-loader!./example/App.ts'

export class ASimpleProjectPage extends Layout {
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
				h2 "A Simple Project"
				p class: lead {
					"The main component of a ModularDom project is the class inheriting Body." br;
					"Each component is updated by calling its " code class: lang-js "update()" " method. It is therefore " strong "necessary to call it in the constructor" "." br;
					"All ModularDom components must implement a " code class: lang-js "render()" " method that " strong "returns what should be displayed" "." br;
					"The syntax used to generate HTML is specific to ModularDom. It is inspired by the SCSS language."
				}
				h3 "Demo"
				div class: demo {
					h1 "Hello World"
					div class: container {
						p "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
					}
				}
				h3 "Source Code"
				h4 "index.html"
				pre class: lang-html {
					code "${IndexHtml}"
				}
				h4 "App.ts"
				pre class: lang-js {
					code "${AppTs}"
				}
			}
		}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
