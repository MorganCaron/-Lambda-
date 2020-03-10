import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'

import DemoTs from '!!raw-loader!./Demo.ts'

export class Demo extends Layout {
	writer: Writer
	writerOptions: WriterOptions
	code: Reactive<string>
	animationInProgress: Reactive<boolean>

	constructor() {
		super(Tag`div class: writer-demo`)
		this.code = new Reactive("")
		this.code.subscribe(this.update.bind(this))
		this.animationInProgress = new Reactive(false)
		this.animationInProgress.subscribe(this.update.bind(this))

		this.writer = new Writer(this.code)
		this.writerOptions = {
			interval: 20,
			replace: false
		}
		this.launchAnimation()
	}

	launchAnimation() {
		if (this.animationInProgress.value)
			return;
		this.animationInProgress.value = true
		this.code.value = ""
		this.writer.write(DemoTs, this.writerOptions, () => {
			this.animationInProgress.value = false
			this.update()
		})
	}

	render(): Elem[] {
		return View`
			${!this.animationInProgress.value ? View`button click: ${this.launchAnimation.bind(this)} class: btn "Restart"` : ''}
			pre class: lang-ts {
				code "${this.code.value}"
			}
			${!this.animationInProgress.value ? View`button click: ${this.launchAnimation.bind(this)} class: btn "Restart"` : ''}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
