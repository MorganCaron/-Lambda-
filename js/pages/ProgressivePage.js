class ProgressiveExample extends Layout {
	constructor() {
		super('div', { class: 'terminal' })
		this.lines = []
		this.update()

		Head.setStyle('Terminal', '@keyframes blinker{50%{opacity:0}}' + Stylize.treeToCss({
			'.terminal': {
				width: '100%',
				minHeight: '200px',
				overflow: 'hidden',
				backgroundColor: 'black',
				color: 'white',
				fontFamily: 'monospace',
				'.line': {
					margin: 0,
					':last-child::after': {
						content: "'█'",
						animation: 'blinker .7s step-start infinite',
						color: 'white'
					}
				}
			}
		}))

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

class ProgressivePage extends Layout {
	constructor() {
		super('div')
		this.update()


	}

	render() {
		return [
			new H2('Progressive.js'),
			new P('Progressive.js is a JavaScript library for file request.'),
			new H3('Example & Source code'),
			new ProgressiveExample()
		]
	}
}
