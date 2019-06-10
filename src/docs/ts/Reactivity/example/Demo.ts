import { Elem, Layout, Body, Tag, View, Reactive, Router } from 'ModularDom'
import { HTMLElementEvent } from 'VDOM'

export class Demo extends Layout {

	operand0: Reactive<number>
	operand1: Reactive<number>
	result: Reactive<number>

	constructor() {
		super(Tag`div class: demo`)

		this.operand0 = new Reactive(2)
		this.operand1 = new Reactive(3)
		this.result = new Reactive(0)
		this.operand0.depend(this.result)
		this.operand1.depend(this.result)
		this.result.subscribe(() => {
			const result = this.operand0.value + this.operand1.value
			this.el.querySelector('.result').innerHTML = this.operand0.value + ' + ' + this.operand1.value + ' = ' + result
		})

		this.update()
		this.result.update()
	}

	operand0Change(event: HTMLElementEvent<HTMLInputElement>) {
		this.operand0.value = parseInt(event.target.value, 10)
	}

	operand1Change(event: HTMLElementEvent<HTMLInputElement>) {
		this.operand1.value = parseInt(event.target.value, 10)
	}

	render() {
		return View`
			div class: container-fluid {
				h4 "Addition"
				p class: lead "Operand 0:"
				input type: number input: ${this.operand0Change.bind(this)} value: "${this.operand0.value}";
				p class: lead "Operand 1:"
				input type: number input: ${this.operand1Change.bind(this)} value: "${this.operand1.value}";
				p class: "lead result" ""
			}
		`
	}
}
