import { Flip } from './Flip'
import { xor } from './Utils'

export type Elem = (VDOMObject | VDOMText)
export type Attributes = { [key: string]: string | EventListener }

export class VDOMText {
	el: Text
	constructor(content: string = '') { this.el = document.createTextNode(content) }
	render(): Text { return this.el }
}

export class VDOMObject {
	el: Element

	constructor(element: Element) { this.el = element }
	found() { return this.el != null }
	delete() { if (this.el) this.el.remove() }

	setAttrs(attrs: Attributes): void {
		if (this.el)
			for (const attr in attrs) {
				if (typeof attrs[attr] === 'string')
					this.el.setAttribute(attr, attrs[attr] as string)
				else {
					this.el.addEventListener(attr, (...event) => {
						event[0].preventDefault();
						const listener = attrs[attr] as EventListener
						listener(...event)
					})
					if (attr === 'click' && this.el.tagName === 'A')
						this.el.setAttribute('href', '#')
				}
			}
	}

	clearChilds(): void {
		while (this.el.firstChild)
			this.el.removeChild(this.el.firstChild)
	}

	addChilds(childs: Elem[]): void {
		childs.forEach((child) => {
			this.el.appendChild(child.el)
		})
	}

	setContent(content: string | Elem[]): void {
		if (!this.el) return
		let contentArray: Elem[] = []
		if (typeof content === 'string' && content !== '')
			contentArray = [new VDOMText(content)]
		else if (Array.isArray(content))
			contentArray = content
		this.clearChilds()
		this.addChilds(contentArray)
	}
}

export class VDOMElem extends VDOMObject {
	constructor(name: string, content: string | Elem[] = '', attrs: Attributes = {}) {
		super(document.createElement(name))
		this.setAttrs(attrs)
		this.setContent(content)
	}
}

export class Layout extends VDOMObject {
	constructor(elem: VDOMElem) { super(elem.el) }
	update(): void {
		this.setContent(this.render())
		this.afterRender()
	}
	render(): Elem[] {
		console.log(`${name}.render() not implemented`)
		return []
	}
	afterRender() { }
}

class Head extends VDOMObject {
	constructor() {
		super(document.querySelector('head'))

		const queries = [
			'meta[name="viewport"]',
			'meta[charset]'
		]
		queries.forEach(query => {
			document.querySelectorAll(query).forEach(element => {
				if (element) element.remove()
			})
		})

		this.addChilds([
			new VDOMElem('meta', '', {
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			}),
			new VDOMElem('meta', '', { charset: 'UTF-8' })
		])
	}
}

export class Body extends VDOMObject {
	head: Head
	animationOptions: KeyframeAnimationOptions

	constructor(animationOptions: KeyframeAnimationOptions = undefined) {
		super(document.body)
		this.animationOptions = { duration: 500, easing: 'ease-in-out', ...animationOptions }
		this.el.innerHTML = ''
		this.head = new Head()
	}

	compareTagName(node0: Node, node1: Node) {
		if (xor(node0 instanceof Element, node1 instanceof Element))
			return false
		if (node0 instanceof Text)
			return (node0.wholeText == (node1 as Text).wholeText)
		if (node0 instanceof Element)
			return (node0.tagName == (node1 as Element).tagName)
		return false
	}

	updateAttributes(oldElem: Element, newElem: Element) {
		const oldAttrs = Array.from(oldElem.attributes)
		const newAttrs = Array.from(newElem.attributes)
		oldAttrs.forEach(oldAttr => {
			const attrName = oldAttr.name
			if (!newElem.hasAttribute(attrName))
				oldElem.removeAttribute(attrName)
		})
		newAttrs.forEach(newAttr => {
			const attrName = newAttr.name
			const newValue = newElem.getAttribute(attrName)
			if (!oldElem.hasAttribute(attrName) || oldElem.getAttribute(attrName) !== newElem.getAttribute(attrName))
				oldElem.setAttribute(attrName, newValue)
		})
	}

	updateChilds(parent: Element, newElems: Element[]): void {
		const oldElems = Array.from(parent.children)
		const oldLength = oldElems.length
		const newLength = newElems.length
		const flip = new Flip()
		flip.save(parent)
		for (let i = 0; i < oldLength || i < newLength; ++i) {
			const oldElem = parent.children[i]
			const newElem = newElems[i]
			if (!oldElem && newElem) {
				const newChild = parent.appendChild(newElem) as Element
				newChild.animate([{ opacity: 0 }, { opacity: 1 }], { ...this.animationOptions, fill: 'both' })
			}
			else if (oldElem && !newElem)
				parent.removeChild(oldElem)
			else if (!this.compareTagName(oldElem, newElem) || oldElem.textContent !== newElem.textContent)
				parent.replaceChild(newElem, oldElem)
			else {
				this.updateAttributes(oldElem, newElem as Element)
				if (!oldElem.isEqualNode(newElem)) {
					if (newElem.children.length == 0 && oldElem.textContent !== newElem.textContent)
						oldElem.textContent = newElem.textContent
					else
						this.updateChilds(oldElem, Array.from((newElem as Element).children))
				}
			}
		}
		flip.play(this.animationOptions)
	}

	setContent(content: string | Elem[]): void {
		if (!this.el) return
		let contentArray: Elem[] = []
		if (typeof content === 'string' && content !== '')
			contentArray = [new VDOMText(content)]
		else if (Array.isArray(content))
			contentArray = content
		this.updateChilds(this.el, contentArray.map(elem => elem.el as Element))
	}

	update(): void {
		this.setContent(this.render())
		this.afterRender()
	}
	render(): Elem[] {
		console.log(`${name}.render() not implemented`)
		return []
	}
	afterRender() { }
}
