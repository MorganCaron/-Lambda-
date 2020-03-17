import { Component, Reactive, Writer, WriterOptions } from 'ts/ModularDom'
import 'docs/ts/Layouts'

import html from './index.html'

@Component({
	selector: 'main-header',
	template: html
})
export class Header extends HTMLElement {

	h1: string
	reactive: Reactive<string>
	writer: Writer

	init() {
		this.h1 = '<ModularDom/>'
	}

}
