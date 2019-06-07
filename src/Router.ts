interface Route {
	regex: string
	controller: () => void
}

class RouterController {
	routes: Route[]
	root: string
	mode: string
	currentFragment: string
	interval: number

	constructor(mode: string = undefined) {
		this.routes = []
		this.root = '/'
		this.mode = mode || !!(history.pushState) ? 'history' : 'hash'
		this.currentFragment = null
	}

	clearSlashes(path: string): string {
		return path.toString().replace(/\/$/, '').replace(/^\//, '')
	}

	getFragment(): string {
		let fragment = ''
		if (this.mode === 'history') {
			fragment = this.clearSlashes(decodeURI(location.pathname + location.search))
			fragment = fragment.replace(/\?(.*)$/, '')
			fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment
		} else {
			const match = window.location.href.match(/#(.*)$/)
			fragment = match ? match[1] : ''
		}
		return this.clearSlashes(fragment)
	}

	add(regex: string, controller: () => void): void {
		this.routes.push({ regex: regex, controller: controller })
	}

	remove(regex: string): void {
		for (let i = 0; i < this.routes.length; ++i) {
			const route = this.routes[i]
			if (regex.toString() === route.regex.toString())
				this.routes.splice(i, 1)
		}
	}

	check(path: string = null): void {
		const fragment = path || this.getFragment()
		for (let i = 0; i < this.routes.length; ++i) {
			const route = this.routes[i]
			let match = fragment.match('^' + route.regex + '$')
			if (match) {
				match.shift()
				route.controller.apply({}, match)
			}
		}
	}

	listen(): void {
		const updateRoute = () => {
			if (this.currentFragment !== this.getFragment()) {
				this.currentFragment = this.getFragment()
				this.check(this.currentFragment)
			}
		}
		clearInterval(this.interval)
		this.interval = window.setInterval(updateRoute.bind(this), 50)
	}

	navigate(path: string): void {
		path = path ? path : '';
		if (this.mode === 'history')
			history.pushState(null, null, this.root + this.clearSlashes(path))
		else
			window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path
		if (this.currentFragment !== this.getFragment()) {
			this.currentFragment = this.getFragment()
			this.check(this.currentFragment)
		}
	}
}

export const Router = new RouterController()
