import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'
import { Card } from './Card'

type Article = {
	title: string,
	description: string,
	image: string
}

export class Demo extends Layout {

	articles: Article[]

	constructor() {
		super(Tag`div class: demo`)
		this.articles = [
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=1' },
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=2' },
			{ title: 'Title', description: 'Description', image: 'https://picsum.photos/400/300?random=3' }
		]
		this.update()
	}

	render(): Elem[] {
		return View`
			div class: container-fluid {
				h4 "Cards"
				div class: row {
					${this.articles.flatMap(article => View`
					div class: "col-md-4 col-sm-6" {
						${new Card(article.title, article.description, article.image)}
					}`)}
				}
			}
		`
	}
}
