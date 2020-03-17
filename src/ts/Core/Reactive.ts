export class Reactive<T> {
	private dependencies: Reactive<any>[]
	private __value: T
	private __updateFunction: () => void

	constructor(value?: T) {
		this.dependencies = []
		this.__value = value
	}

	// Defines a reactive variable that depends on the current variable.
	depend(dependency: Reactive<any>): void {
		this.dependencies.push(dependency)
	}

	// Defines a function to call during updates
	subscribe(func: () => void) {
		this.__updateFunction = func
	}

	// Updates the reactive variable and all the variables that depend on it.
	update(): void {
		if (this.__updateFunction)
			this.__updateFunction()
		this.dependencies.forEach(dependency => {
			dependency.update()
		})
	}

	// Defines the value of the reactive variable
	set value(val: T) {
		this.__value = val
		this.update()
	}

	// Returns the value of the reactive variable
	get value(): T {
		return this.__value
	}
}
