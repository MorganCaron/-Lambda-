import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import { Card } from './Card'

type Article = {
	title: string,
	description: string,
	image: string
}

class App extends Body {

	articles: Article[]

	constructor() {
		super()
		this.articles = [
			{ title: 'Title', description: 'Description', image: 'url' },
			{ title: 'Title', description: 'Description', image: 'url' },
			{ title: 'Title', description: 'Description', image: 'url' }
		]
		this.update()
	}

	render() {
		return View`
			h1 "Cards"
			div class: container {
				div class: row {
					div class: "col-lg-3 col-md-4 col-sm-6" {
						${this.articles.flatMap(article => View`
						div class: "col-lg-3 col-md-4 col-sm-6" {
							${new Card(article.title, article.description, article.image)}
						}`)}
					}
				}
			}
		`
	}
}

document.addEventListener('DOMContentLoaded', () => { new App() })
