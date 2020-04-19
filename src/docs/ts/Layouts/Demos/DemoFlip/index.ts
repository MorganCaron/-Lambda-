import { Component, Flip } from 'ts/ModularDom'
import 'docs/ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'demo-flip',
	template: html,
	style: css
})
export class DemoFlip extends HTMLElement {

	flip: Flip = new Flip()
	grabbedElement: HTMLElement = null

	init() {
		this.childNodes.forEach(node => {
			node.addEventListener('click', (event: MouseEvent) => {
				if (this.grabbedElement === null)
					this.drag(node as HTMLElement, event)
				else
					this.dropBefore(node)
			})
		})
		document.addEventListener('mousemove', event => {
			if (this.grabbedElement !== null) {
				this.grabbedElement.style.top = `${event.pageY + 10}px`
				this.grabbedElement.style.left = `${event.pageX + 10}px`
			}
		})
	}

	drag(element: HTMLElement, event: MouseEvent) {
		if (this.grabbedElement !== null)
			return;
		this.grabbedElement = element
		this.flip.save(this)
		element.style.position = 'absolute'
		element.style.top = `${event.pageY + 10}px`
		element.style.left = `${event.pageX + 10}px`
		document.body.style.cursor = 'grabbing'
		this.flip.play({ duration: 500, easing: 'ease-in-out' })
		this.appendChild(element)
	}

	dropBefore(node: Node) {
		if (this.grabbedElement === null || node === this.grabbedElement)
			return;
		this.flip.save(this)
		this.grabbedElement.style.position = 'initial'
		this.grabbedElement.style.top = '0'
		this.grabbedElement.style.left = '0'
		document.body.style.cursor = 'initial'
		this.removeChild(this.grabbedElement)
		this.insertBefore(this.grabbedElement, node);
		this.flip.play({ duration: 500, easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' })
		this.grabbedElement = null
	}
}
