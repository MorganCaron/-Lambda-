import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'

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

	deleteArticle(index: number): void {
		this.articles.splice(index, 1)
		this.update()
	}

	render(): Elem[] {
		return View`
			div class: container-fluid {
				h4 "Cards"
				div class: row {
					${this.articles.flatMap((article: Article, index: number) => View`
					div class: "col-md-4 col-sm-6" {
						button click: ${() => this.deleteArticle(index)} "X"
						h5 "${article.title}"
						img src: "${article.image}" alt: "${article.title}";
						p "${article.description}"
					}`)}
				}
			}
		`
	}
}
