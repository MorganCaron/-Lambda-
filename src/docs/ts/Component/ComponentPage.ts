import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import * as Prism from 'prismjs'
import { Menu } from '../Menu'
import { Card } from './example/Card'
import CardTs from '!!raw-loader!./example/Card.ts'
import AppTs from '!!raw-loader!./example/App.ts'

type Article = {
	title: string,
	description: string,
	image: string
}

export class ComponentPage extends Layout {

	articles: Article[]

	constructor() {
		super(Tag`div class: container`)
		this.articles = [
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=1' },
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=2' },
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=3' }
		]
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
				h2 "A Component"
				p class: lead {
					"A component must " strong "inherit the Layout class" br;
					"Call the super constructor by defining a " strong "tag name" br;
					"Each component is updated by calling its " code class: lang-js "update()" " method. It is therefore " strong "necessary to call it in the constructor" "." br;
					"All ModularDom components must implement a " code class: lang-js "render()" " method that " strong "returns what should be displayed" "." br;
					"The syntax used to generate HTML is specific to ModularDom. It is inspired by the SCSS language."
				}
				h3 "Demo"
				div class: demo {
					h1 "Cards"
					div class: container {
						div class: row {
							${this.articles.flatMap(article => View`
							div class: "col-lg-3 col-md-4 col-sm-6" {
								${new Card(article.title, article.description, article.image)}
							}`)}
						}
					}
				}
				h3 "Source Code"
				h4 "Carousel.ts"
				pre class: lang-js {
					code "${CardTs}"
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