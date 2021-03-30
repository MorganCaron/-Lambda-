import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

export class Header extends Layout {
	title: Reactive<string>
	writer: Writer

	constructor() {
		super(Tag`header`)
		this.title = new Reactive('<ModularDom/>')
		this.title.subscribe(this.update.bind(this))
		this.update()

		this.writer = new Writer(this.title)
		const writerOptions: WriterOptions = {
			interval: 100,
			replace: true
		}
		const writerHelloWorld = () => this.writer.write("Hello World !", writerOptions, () => setTimeout(writerVoid, 1000))
		const writerVoid = () => this.writer.write("</>", writerOptions, writerModularDom)
		const writerModularDom = () => this.writer.write("<ModularDom/>", writerOptions, () => setTimeout(writerHelloWorld, 5000))
		setTimeout(writerHelloWorld, 5000)
	}

	render(): Elem[] {
		return View`
			div class: 'tilt-right-5 darkcyan' {
				h1 click: ${() => Router.navigate('')} "${this.title.value}"
			}
		`
	}
}
