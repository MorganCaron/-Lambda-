interface HTMLElementRect {
	node: HTMLElement
	rect: DOMRect
}

export class Flip {
	elements: HTMLElementRect[]

	constructor() {
		this.elements = []
	}

	save(element: HTMLElement) {
		this.elements = []
		element.childNodes.forEach(node => {
			if (node instanceof HTMLElement)
				this.elements.push({
					node: node,
					rect: node.getBoundingClientRect()
				})
		})
	}

	play(options: KeyframeAnimationOptions) {
		this.elements.forEach(pair => {
			const startPos = pair.rect
			const endPos = pair.node.getBoundingClientRect()
			if (endPos.width && endPos.height) {
				const deltaX = startPos.x - endPos.x
				const deltaY = startPos.y - endPos.y
				if (pair.node.animate && (deltaX || deltaY))
					pair.node.animate([{
						transformOrigin: 'top left',
						transform: `translate(${deltaX}px, ${deltaY}px)`
					}, {
						transformOrigin: 'top left',
						transform: 'none'
					}], { ...options, fill: 'both' })
			}
		})
	}
}
