import { Component } from '../Core/Component'
import { Router, RouterMode } from '../Core/Router'
import { Type } from '../Core/Utils'

interface ComponentRoute {
	path: string
	component: Type<HTMLElement>
}

@Component({
	selector: 'app-router'
})
class RouterComponent extends HTMLElement {

	router: Router = new Router({
		mode: 'hash'
	})

	set mode(mode: RouterMode) {
		this.router.mode = mode
	}

	get mode(): RouterMode {
		return this.router.mode
	}

	addRoute(route: ComponentRoute): void {
		this.router.addRoute({
			path: route.path,
			controller: (...parameters: any[]) => {
				this.innerHTML = ''
				this.appendChild(new route.component(parameters))
			}
		})
	}

	removeRoute(path: string): void {
		this.router.removeRoute(path)
	}

	listen(): void {
		this.router.listen()
	}

	navigate(path: string = ''): void {
		this.router.navigate(path)
	}

}

export { RouterComponent as Router, ComponentRoute as Route }
