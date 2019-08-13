import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class HomePage extends Layout {
	constructor() {
		super(Tag`div class: 'container-fluid pt-3'`)
		this.update()
	}

	render(): Elem[] {
		return View`
			div class: "row" {
				div class: col-md-6 {
					h3 "What is ModularDom ?"
					p class: lead {
						"ModularDom is a TypeScript framework designed to facilitate the creation of " strong "single-page web applications" "." br;
						"The framework only manages the application interface, considered as " strong "the view in the MVC model" "."
					}
				}
				div class: col-md-6 {
					h3 "Why use it ?"
					p class: lead {
						"It stands out from its competitors by its " strong "ease of use" ", its " strong "performance" ", and " strong { a click: ${() => Router.navigate('animations')} "a touch of magic" } "." br;
						"ModularDom works with a virtual DOM. " strong "All pages are cached" " and " strong "the rendering is updated only if necessary" "."
					}
				}
			}
		`
	}
}
