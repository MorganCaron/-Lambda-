export class Reactive<T> {
	dependencies: Reactive<any>[]
	_value: T
	_updateFunction: (() => void) | undefined

	constructor(value: T) {
		this.dependencies = []
		this._value = value
	}

	// Defines a reactive variable that depends on the current variable.
	depend(dependency: Reactive<any>): void {
		this.dependencies.push(dependency)
	}

	// Defines a function to call during updates
	subscribe(func: () => void) {
		this._updateFunction = func
	}

	// Updates the reactive variable and all the variables that depend on it.
	update(): void {
		if (this._updateFunction)
			this._updateFunction()
		this.dependencies.forEach(dependency => {
			dependency.update()
		})
	}

	// Defines the value of the reactive variable
	set value(val: T) {
		this._value = val
		this.update()
	}

	// Returns the value of the reactive variable
	get value(): T {
		return this._value
	}
}
