import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'
import { Writer, WriterOptions } from '../../Writer'

export class Header extends Layout {
	title: Reactive<string>
	writer: Writer

	constructor() {
		super(Tag`header class: 'darkcyan text-center'`)
		this.title = new Reactive('<ModularDom/>')
		this.title.subscribe(this.update.bind(this))
		this.update()

		const writer = new Writer(this.title)
		const writerOptions: WriterOptions = {
			interval: 100,
			replace: true
		}
		const writerHelloWorld = () => writer.write("Hello World !", writerOptions, () => setTimeout(writerVoid, 1000))
		const writerVoid = () => writer.write("</>", writerOptions, writerModularDom)
		const writerModularDom = () => writer.write("<ModularDom/>", writerOptions, () => setTimeout(writerHelloWorld, 5000))
		setTimeout(writerHelloWorld, 5000)
	}

	render() {
		return View`
			h1 click: ${() => Router.navigate('')} "${this.title.value}"
		`
	}
}
