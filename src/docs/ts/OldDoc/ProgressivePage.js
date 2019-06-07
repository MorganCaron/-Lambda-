class ProgressiveExample extends Layout {
	constructor() {
		super('div', { class: 'terminal' })
		this.lines = []
		this.update()

		this.newLine()
		Progressive.write('', 'Loading source code... ', 15, this.updateLastLine.bind(this), (str) => {
			setTimeout(() => {
				Fetch.importTextFile('js/pages/ProgressivePage.js', code => {
					Progressive.write(str, 'Done.', 15, this.updateLastLine.bind(this), () => {
						this.newLine()
						Progressive.write('', code, 1, this.updateLastLine.bind(this))
					})
				})
			}, 1000)
		})
	}

	newLine(content = '') {
		this.lines.push(new Pre(content, { class: 'line' }))
		if (this.lines.length > 15) {
			this.lines.shift()
			this.update()
		}
		else if (content != '')
			this.update()
	}

	updateLastLine(str) {
		this.lines[this.lines.length - 1].setContent(str)
		this.update()
	}

	render() {
		return this.lines
	}
}
