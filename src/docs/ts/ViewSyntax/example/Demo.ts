import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class Demo extends Layout {
	constructor() {
		super(Tag`div class: demo`)
		this.update()
	}

	render(): Elem[] {
		return View`
			div class: container-fluid {
				h4 "Title"
				p class: lead "Simple line"
				hr;
				p {
					"Multi lines" br;
					"Multi lines" br;
					"Multi lines"
				}
			}
		`
	}
}
