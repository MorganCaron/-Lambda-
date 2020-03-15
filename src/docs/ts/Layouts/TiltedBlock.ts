import { Component } from 'ts/ModularDom'

@Component({
	selector: 'tilted-block',
	classes: 'ml-3 tilt-right-3',
	extends: 'h2'
})
export class TiltedBlock extends HTMLHeadingElement {

	baseContent: string

	init() {
		this.innerHTML = `<span>${this.baseContent}</span>`
	}

}
