import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class HomePage extends Layout {
	constructor() {
		super(Tag`div class: 'container text-center'`)
		this.update()
	}

	render() {
		return View`
			div class: "row text-left" {
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
						"ModularDom works with a " strong "virtual DOM" " and updates the rendering in the browser only when necessary."
					}
				}
			}
		`
	}
}
