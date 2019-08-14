import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

import AppTs from '!!raw-loader!../../App.ts'
import MenuTs from '!!raw-loader!../../Layouts/Menu.ts'

export class RouterPage extends Layout {
	parameters: string[]

	constructor(parameters: string[]) {
		super(Tag`div class: container-fluid`)
		this.parameters = parameters
		this.update()
	}

	render(): Elem[] {
		return View`
			h2 "Router"
			p class: lead {
				"You can create multi-page sites with a state machine. The routing system allows you to make sure that " strong "the page is in adequacy with the url" "." br;
				"A " code class: lang-ts "Router" " instance allows you to interact with the routing system " strong "from anywhere in your project" "."
			}
			p class: lead {
				code class: lang-ts "Router.mode" " defines the chosen routing mode. " strong "\\"history\\"" " is the " strong "default mode" "." br;
				"But " strong "if url rewriting is not supported" ", the " strong "\\"hash\\"" " mode will be chosen. This mode adds the " strong "\\"#\\" character before the url" " (which is the case with this documentation)."
			}
			p class: lead {
				"You can " strong "define routes" " with the " code class: lang-ts "Router.add()" " method and " strong "remove routes" " with " code class: lang-ts "Router.remove()" "." br;
				"The call of the " code class: lang-ts "listen()" " method activates the listening of the url. This method activates the url monitoring " strong "to open the corresponding page if it is modified" "." br; br;
				"Here is the routing management code of this documentation:"
			}
			h3 "App.ts"
			pre class: lang-ts {
				code "${AppTs}"
			}
			p class: lead {
				"Don't pay attention to the " code class: lang-ts "Router.add('router...)" " line, it's a little special, " strong "we'll talk about it again at the end of this page" "." br;
				br;
				"Now let's see how to " strong "navigate from page to page" "." br;
				"To do this, simply call the " code class: lang-ts "Router.navigate" " method." br;
				"The " code class: lang-ts "Router.check" " method allows you to " strong "manually check the page url" " if necessary." br; br;
				"Here is the menu code on the left of this documentation:"
			}
			h3 "Menu.ts"
			pre class: lang-ts {
				code "${MenuTs}"
			}
			p class: lead {
				"The routing system also supports the " strong "regex format" ". Click on this button to see this:"
			}
			button click: ${() => Router.navigate('router/4/edit/2')} class: btn "Go to a page using regular expressions"
			${this.parameters.filter(parameter => parameter != undefined).length > 0 ? View`
			p class: lead {
				"Tada! The url has changed to router/4/edit/2" br;
				"And here's what we get from variables:" br;
				${this.parameters.flatMap(parameter => View`
					"- ${parameter}" br;
				`)}
			}
			` : ''}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
