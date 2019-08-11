import * as Prism from 'prismjs'

import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'
import { Menu } from '../../Layouts'
import { Demo } from './example/Demo'

import DemoTs from '!!raw-loader!./example/Demo.ts'

export class ViewSyntaxPage extends Layout {
	constructor() {
		super(Tag`div class: container`)
		this.update()
	}

	render() {
		return View`
		div class: row {
			div class: col-lg-3 {
				${new Menu()}
			}
			div class: col-lg-9 {
				h2 "View Syntax"
				p class: lead {
					"The syntax used to write the HTML is " strong "specific to ModularDom" ". It is " strong "inspired by the SCSS language" "." br;
				}
				p class: "lead text-center" {
					"The view syntax is as follows:" br;
					code class: lang-scss "tag attribute: \\"...\\" { ... }" br;
					
				}
				hr;
				p class: lead { strong "Empty HTML elements" " must end with a " strong "semicolon" }
				p class: text-center {
					code class: lang-scss "br;" " for " code class: lang-html "<br />" br;
					code class: lang-scss "input type: text;" " for " code class: lang-html "<input type=\\"text\\" />" br;
				}
				p class: lead { strong "Attributes" " are " strong "optional and cumulative" "." }
				p class: text-center {
					code class: lang-scss "p \\"Text\\"" " for " code class: lang-html "<p>Text</p>" br;
					code class: lang-scss "p class: Class1 \\"Text\\"" " for " code class: lang-html "<p class=\\"Class1\\">Text</p>"
				}
				p class: lead { strong "Quotation marks (' or \\")" " enclosing the attribute value are " strong "optional if it contains only the characters" " present in this regex: " strong "[@_\-0-9A-Za-z]" "." }
				p class: text-center {
					code class: lang-scss "p class: Class1 \\"Text\\"" " for " code class: lang-html "<p class=\\"Class1\\">Text</p>" br;
					code class: lang-scss "p class: \\"Class1 Class2\\" \\"Text\\"" " for " code class: lang-html "<p class=\\"Class1 Class2\\">Text</p>"
				}
				p class: lead { "The " strong "braces enclosing the content" " of the tag are also " strong "optional if the tag contains only one element" "." }
				p class: text-center {
					code class: lang-scss "p \\"Text\\"" " for " code class: lang-html "<p>Text</p>" br;
					code class: lang-scss "p { \\"Line1\\" br; \\"Line2\\" }" " for " code class: lang-html "<p>Line1<br />Line2</p>" br;
				}
				h3 "Demo"
				${new Demo()}
				h3 "Source Code"
				h4 "Demo.ts"
				pre class: lang-ts {
					code "${DemoTs}"
				}
			}
		}
		`
	}

	afterRender() {
		Prism.highlightAllUnder(this.el)
	}
}
