export class Reactive<T> {
	dependencies: Reactive<any>[]
	_value: T
	_updateFunction: () => void

	constructor(value?: T) {
		this.dependencies = []
		this._value = value
	}

	depend(dependency: Reactive<any>): void {
		this.dependencies.push(dependency)
	}

	subscribe(func: () => void) {
		this._updateFunction = func
	}

	update(): void {
		if (this._updateFunction)
			this._updateFunction()
		this.dependencies.forEach(dependency => {
			dependency.update()
		})
	}

	set value(val: T) {
		this._value = val
		this.update()
	}
	get value(): T {
		return this._value
	}
}
