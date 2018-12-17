class MathExample extends Layout {
	constructor() {
		super('div', { class: 'example' })
		this.operand0 = new Reactive(2)
		this.operand1 = new Reactive(5)
		this.result = new Reactive()
		this.operand0.depend(this.result)
		this.operand1.depend(this.result)
		this.result.update = () => {
			this.result.value = parseInt(this.operand0.value, 10) + parseInt(this.operand1.value, 10)
			this.el.querySelector('.result').innerHTML = this.operand0.value + ' + ' + this.operand1.value + ' = ' + this.result.value
		}

		this.update()
		this.result.update()
	}

	operand0Change(event) {
		this.operand0.change(event.target.value)
	}

	operand1Change(event) {
		this.operand1.change(event.target.value)
	}

	render() {
		return [
			new H4('Addition'),
			new P('Operand 0:'),
			new Input(this.operand0.value, this.operand0Change.bind(this), { type: 'number' }),
			new P('Operand 1:'),
			new Input(this.operand1.value, this.operand1Change.bind(this), { type: 'number' }),
			new P(this.operand0.value + ' + ' + this.operand1.value + ' = ' + this.result.value, { class: 'result' })
		]
	}
}
