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

	private m_flip: Flip = new Flip()
	private m_grabbedElement: HTMLElement = null

	init() {
		this.childNodes.forEach(node => {
			node.addEventListener('mousedown', event => {
				this.grab(node as HTMLElement, event as MouseEvent)
			})
			node.addEventListener('mouseup', () => {
				this.drop(node)
			})
		})
		document.addEventListener('mouseup', () => {
			this.drop()
		})
		document.addEventListener('mousemove', event => {
			this.moveGrabbedElementToMousePosition(event)
		})
	}

	private anElementIsGrabbed(): boolean {
		return (this.m_grabbedElement !== null)
	}

	private moveGrabbedElementToMousePosition(event: MouseEvent) {
		if (this.anElementIsGrabbed()) {
			this.m_grabbedElement.style.top = `${event.pageY - 50}px`
			this.m_grabbedElement.style.left = `${event.pageX - 50}px`
		}
	}

	private grab(element: HTMLElement, event: MouseEvent) {
		if (this.anElementIsGrabbed())
			return;
		this.m_grabbedElement = element
		this.m_flip.save(this)
		element.classList.add('grabbed')
		this.moveGrabbedElementToMousePosition(event)
		this.m_flip.play({ duration: 500, easing: 'ease-in-out' })
	}

	private drop(nextNode: Node = null) {
		if (!this.anElementIsGrabbed() || nextNode === this.m_grabbedElement)
			return;
		this.m_flip.save(this)
		this.m_grabbedElement.classList.remove('grabbed')
		this.m_grabbedElement.removeAttribute('style')
		if (nextNode !== null) {
			this.removeChild(this.m_grabbedElement)
			this.insertBefore(this.m_grabbedElement, nextNode);
		}
		this.m_flip.play({ duration: 500, easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' })
		this.m_grabbedElement = null
	}
}