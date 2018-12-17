class Reactive {
	constructor(value = undefined) {
		this.dependencies = []
		this.value = value
	}

	depend(dependency) {
		this.dependencies.push(dependency)
	}

	change(value = undefined) {
		if (value != undefined)
			this.value = value
		this.update()
		this.dependencies.forEach(dependency => {
			dependency.change()
		})
	}

	update() { }
}
