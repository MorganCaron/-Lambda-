import { Component, Router } from 'ts/ModularDom'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'main-menu',
	template: html,
	style: css,
	useShadow: false
})
export class Menu extends HTMLElement {

	init() {
		const router = document.querySelector('app-router') as Router
		this.querySelectorAll('a').forEach(button => {
			const href = button.getAttribute('href')
			button.addEventListener("click", (event) => {
				event.preventDefault()
				router.navigate(href)
			})
		})
	}

}
