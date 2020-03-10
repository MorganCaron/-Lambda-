import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'

import IndexHtml from '!!raw-loader!./example/index.html'
import AppTs from '!!raw-loader!./example/App.ts'

export class InstallationPage extends Layout {
	constructor() {
		super(Tag`div class: container-fluid`)
		this.update()
	}

	render(): Elem[] {
		return View`
			h2 "Installation"
			p class: lead {
				strong "ModularDom needs TypeScript to work."
				" We recommend the use of " strong { a href: "https://webpack.js.org/" target: _blank "Webpack" " to compile the TypeScript." }
				" You will find " strong { "a tool to simplify the configuration of a Webpack project " a href: "https://github.com/MorganCaron/webpack-config-generator" target: _blank "here" } "."
			}
			h2 "A Simple Project"
			p class: lead {
				"The main component of a ModularDom project is " strong "the class inheriting Body" "." br;
				"Below is an example of a simple ModularDom project." br;
				"For " strong "more information about its structure and syntax" ", refer to the " strong { a click: ${() => Router.navigate('component')} "Component" } " section."
			}
			h3 "Demo"
			div class: demo {
				div class: container-fluid {
					h4 "Hello World"
					p "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				}
			}
			h3 "Source Code"
			h4 "index.html"
			pre class: lang-html {
				code "${IndexHtml}"
			}
			h4 "App.ts"
			pre class: lang-ts {
				code "${AppTs}"
			}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
