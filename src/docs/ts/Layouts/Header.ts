import { Component } from 'ts/ModularDom'
import { Menu } from '.'

@Component({
	selector: 'main-header',
	template: `
	<h1 class="text-center">{{ name }}</h1>
	<main-menu></main-menu>`
})
export class Header extends HTMLElement {

	name: string

	init() {
		this.name = '<ModularDom/>'
	}

}
