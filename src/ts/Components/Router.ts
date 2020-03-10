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

	router = new Router({
		mode: 'hash'
	})

	set routes(routes: ComponentRoute[]) {
		routes.forEach(route => this.router.add({
			path: route.path,
			controller: (...parameters: any[]) => {
				this.innerHTML = ''
				this.appendChild(new route.component(parameters))
			}
		}))
		this.router.listen()
	}

}

export { RouterComponent as Router, ComponentRoute as Route }
