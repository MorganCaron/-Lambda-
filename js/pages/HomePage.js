class Window extends Layout {
	constructor(caption) {
		super('div', { class: 'window default' })
		this.caption = caption
		this.move = false
		this.update()

		this.el.addEventListener('mousedown', event => {
			this.el.style.zIndex = 3
		}, false)
		document.addEventListener('mouseup', event => {
			this.move = false
			if (this.el.style.zIndex > 0)
				--this.el.style.zIndex
		}, false)

		let header = this.el.querySelector('header')
		header.addEventListener('mousedown', event => {
			const domRect = this.el.getBoundingClientRect()
			this.move = true
			this.anchorX = event.clientX - domRect.left
			this.anchorY = event.clientY - domRect.top
		}, false)
		document.addEventListener('mousemove', event => {
			if (this.move) {
				const windowsArea = this.el.closest('.windowsarea')
				this.el.style.position = 'absolute'
				this.el.style.left = event.clientX - this.anchorX - windowsArea.offsetLeft + 'px'
				this.el.style.top = event.clientY - this.anchorY - windowsArea.offsetTop + 'px'
			}
		}, false)

	}

	close() {
	}

	render() {
		return [
			new Header([
				new H4(this.caption),
				new Button('X', this.close.bind(this), { class: 'darkcyan' })
			], { class: 'darkcyan' }),
			new Text('content')
		]
	}
}

class HomePage extends Layout {
	constructor() {
		super('div')
		this.windows = []
		this.update()
	}

	openWindow() {
		this.windows.push(new Window('Settings'))
		this.update()
	}

	render() {
		return [
			new H2('Welcome'),
			new Button('Demo', this.openWindow.bind(this), { class: 'secondary' }),
			new Div(this.windows, { class: 'windowsarea secondary' })
		]
	}
}
