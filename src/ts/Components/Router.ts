import { Component, Input } from '../Core/Component'
import { Router, Route } from '../Core/Router'
import { Type } from '../Core/Utils'

interface ComponentRoute {
	path: string
	component: Type<HTMLElement>
}

@Component({
	selector: 'app-router'
})
class RouterComponent extends HTMLElement {

	@Input() routes: ComponentRoute[]

	router = new Router({
		mode: 'hash'
	})

	init() {
		this.routes.forEach(route => this.router.add({
			path: route.path,
			controller: (...parameters: any[]) => {
				this.appendChild(new route.component(parameters))
			}
		}))
	}

}

export { RouterComponent as Router, ComponentRoute as Route }
