import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ts/ModularDom'
import { Demo } from './example/Demo'

import WriterTs from '!!raw-loader!./example/Writer.ts'
import HeaderTs from '!!raw-loader!../../Layouts/Header.ts'

export class WriterPage extends Layout {
	constructor() {
		super(Tag`div class: container-fluid`)
		this.update()
	}

	render(): Elem[] {
		return View`
			h2 "Writer"
			p class: lead {
				"The " code class: lang-ts "Writer" " object allows you " strong "to write text or code character by character" "." br;
				"Its constructor takes a " code class: lang-ts "Reactive<string>" " object as a parameter " strong { a click: ${() => Router.navigate('reactivity')} "to let you execute the code you want" " between each character addition" } "." br;
			}
			pre class: lang-ts {
				code "${WriterTs}"
			}
			p class: lead {
				"This object proposes a " code class: lang-ts "write" " method." br;
			}
			pre class: lang-ts {
				code "write(newString: string, options: WriterOptions, callback: () => void = null): void"
			}
			p class: lead {
				"The " strong "first parameter" " is " strong "the desired text" "." br; br;
				"The " strong "second parameter" " is " strong "a list of options" " in which you can define a " strong "writing time or an interval between each character" "." br;
				"You can also " strong "enable or disable character replacement" ". Otherwise, it will replace in " strong "two steps" ", " strong "deleting" " the old character and then " strong "adding" " the new one." br; br;
				"The last parameter is a " strong "callback function" " that will be executed " strong "after the text is written" ". This last parameter is " strong "optional" "."
			}
			h3 "Demo & Source Code"
			p class: lead {
				"This demo displays its own source code. It shows how " strong "the Writer progressively displays the code" "."
			}
			${new Demo()}
			h3 "Bonus Demo & Source Code"
			p class: lead {
				"Here is also " strong "the source code of the header of this site" ", containing the animation that changes the title."
			}
			pre class: lang-ts {
				code "${HeaderTs}"
			}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
