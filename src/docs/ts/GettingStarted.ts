import { Elem, Layout, Body, Tag, View, Reactive, Router } from '../../ModularDom'
import * as Prism from 'prismjs'
import { Menu } from './Layouts'
import gettingStartedHTML from './Examples/GettingStarted/HTML.txt'
import gettingStartedTS from './Examples/GettingStarted/TS.txt'

export class GettingStarted extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
			${new Menu()}
			h2 "Getting started"
			div class: container {
				h4 "index.html"
				pre class: language-html {
					code "${gettingStartedHTML}"
				}
				h4 "App.ts"
				pre class: language-js {
					code "${gettingStartedTS}"
				}
			}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
