import { Component } from 'ts/ModularDom'
import { Menu } from '.'

@Component({
	selector: 'header-layout',
	template: `
	<h1 class="text-center">{{ name }}</h1>
	<menu-layout></menu-layout>
	<hr>`
})
export class Header extends HTMLElement {

	name: string

	init() {
		this.name = '<ModularDom/>'
	}

}
