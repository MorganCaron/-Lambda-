export class Flip {
	elements: {
		element: Element,
		rect: DOMRect
	}[]

	constructor() {
		this.elements = []
	}

	save(parent: Element) {
		this.elements = []
		Array.from(parent.childNodes).forEach(element => {
			if (element instanceof Element)
				this.elements.push({
					element: element,
					rect: element.getBoundingClientRect() as DOMRect
				})
		})
	}

	play(options: KeyframeAnimationOptions) {
		this.elements.forEach(pair => {
			const startPos = pair.rect
			const endPos = pair.element.getBoundingClientRect() as DOMRect
			if (endPos.width && endPos.height) {
				const deltaX = startPos.x - endPos.x
				const deltaY = startPos.y - endPos.y
				if (pair.element.animate && (deltaX || deltaY))
					pair.element.animate([{
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
