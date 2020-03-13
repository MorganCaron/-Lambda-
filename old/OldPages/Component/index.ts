import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'
import { Demo } from './example/Demo'

import CardTs from '!!raw-loader!./example/Card.ts'
import DemoTs from '!!raw-loader!./example/Demo.ts'

type Article = {
	title: string,
	description: string,
	image: string
}

export class ComponentPage extends Layout {

	articles: Article[]

	constructor() {
		super(Tag`div class: container-fluid`)
		this.articles = [
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=1' },
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=2' },
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=3' }
		]
		this.update()
	}

	render(): Elem[] {
		return View`
			h2 "Component"
			p class: lead {
				"A component must " strong "inherit the Layout class" br;
				"Call the " strong "super constructor" " by defining a " strong "tag name" br;
				"Each component is updated by calling its " code class: lang-ts "update()" " method. It is therefore " strong "necessary to call it in the constructor" "." br;
				"All ModularDom components must implement a " code class: lang-ts "render()" " method that " strong "returns what should be displayed" "." br;
				strong "The syntax" " of the " strong "super constructor" " and the " code class: lang-ts "render()" " method is explained in the " strong { a click: ${() => Router.navigate('view-syntax')} "View Syntax" } " section."
			}
			h3 "Demo"
			${new Demo()}
			h3 "Source Code"
			h4 "Card.ts"
			pre class: lang-ts {
				code "${CardTs}"
			}
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
