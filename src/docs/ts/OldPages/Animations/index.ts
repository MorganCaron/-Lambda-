import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'
import { Demo } from './example/Demo'

import DemoTs from '!!raw-loader!./example/Demo.ts'

export class AnimationsPage extends Layout {
	constructor() {
		super(Tag`div class: container-fluid`)
		this.update()
	}

	render(): Elem[] {
		return View`
			h2 "Animations"
			p class: lead {
				"During rendering, ModularDom notices that " strong "elements are already present" ". In this case, it animates the element so that " strong "it moves to its new position" "." br;
				br;
				"The following examples are structured to correspond to this type of animation. The code is made visible so that you see that " strong "no animation is planned" "."
			}
			h3 "Demo"
			${new Demo()}
			h3 "Source Code"
			h4 "Demo.ts"
			pre class: lang-ts {
				code "${DemoTs}"
			}
			hr;
			p class: lead {
				"The framework is finished, but this documentation is not yet finished." br;
				"Come back in a few days, this page will be written." br;
				"Thanks," br; br; "Morgan."
			}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
