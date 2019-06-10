import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import { HTMLElementEvent } from 'VDOM'
import * as Prism from 'prismjs'
import { Menu } from '../Menu'
import { Demo } from './example/Demo'
import DemoTs from '!!raw-loader!./example/Demo.ts'
import ReactiveTs from '!!raw-loader!Reactive.ts'

export class ReactivityPage extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
		div class: row {
			div class: col-lg-3 {
				${new Menu()}
			}
			div class: col-lg-9 {
				h2 "Reactivity"
				p class: lead {
					"The Reactive object allows you to add reactivity to your web-app." br;
					"Below you will find a list of methods and examples of use."
				}
				h3 "Methods"
				h4 "Reactive.ts"
				pre class: lang-ts {
					code "${ReactiveTs}"
				}
				hr;
				h3 "Demo"
				${new Demo()}
				h3 "Source Code"
				h4 "Demo.ts"
				pre class: lang-ts {
					code "${DemoTs}"
				}
			}
		}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
