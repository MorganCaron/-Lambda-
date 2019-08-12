import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'
import { Demo } from './example/Demo'

import DemoTs from '!!raw-loader!./example/Demo.ts'
import ReactiveTs from '!!raw-loader!Reactive.ts'

export class ReactivityPage extends Layout {
	constructor() {
		super(Tag`div`)
		this.update()
	}

	render() {
		return View`
			h2 "Reactivity"
			p class: lead {
				"Reactivity consists in " strong "propagating information from a reactive source" " (modification of a variable, user input, etc.) " strong "to the elements dependent on this source" " (from causes to consequences)." br;
				"It is very popular for creating pages that automatically update when data is changed." br;
			}
			p class: lead {
				"ModularDom allows you to " strong "create reactive sources" " and " strong "attach functions" " to them." br;
				"These functions will be " strong "performed when the value is changed" "." br;
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
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
