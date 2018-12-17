class HomePage extends Layout {
	constructor() {
		super('div')
		this.update()
	}

	render() {
		return [
			new H2('Welcome')
		]
	}
}
