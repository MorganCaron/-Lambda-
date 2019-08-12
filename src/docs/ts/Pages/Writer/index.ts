import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class WriterPage extends Layout {
	constructor() {
		super(Tag`div`)
		this.update()
	}

	render() {
		return View`
			h2 "Writer"
			p class: lead {
				"The framework is finished, but this documentation is not yet finished." br;
				"Come back in a few days, this page will be written." br;
				"Thanks," br; br; "Morgan."
			}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
