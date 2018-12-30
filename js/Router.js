class Router {
	constructor(mode = null) {
		this.routes = []
		this.root = '/'
		this.mode = mode || !!(history.pushState) ? 'history' : 'hash'
		this.currentFragment = null
	}

	clearSlashes(path) {
		return path.toString().replace(/\/$/, '').replace(/^\//, '')
	}

	getFragment() {
		let fragment = ''
		if (this.mode === 'history') {
			fragment = this.clearSlashes(decodeURI(location.pathname + location.search))
			fragment = fragment.replace(/\?(.*)$/, '')
			fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment
		} else {
			const match = window.location.href.match(/#(.*)$/);
			fragment = match ? match[1] : '';
		}
		return this.clearSlashes(fragment)
	}

	add(regex, func) {
		this.routes.push({ regex: regex, function: func })
	}

	remove(regex) {
		for (let i = 0; i < this.routes.length; ++i) {
			const route = this.routes[i]
			if (regex.toString() === route.regex.toString())
				this.routes.splice(i, 1)
		}
	}

	check(path = null) {
		const fragment = path || this.getFragment()
		for (let i = 0; i < this.routes.length; ++i) {
			const route = this.routes[i]
			let match = fragment.match(route.regex)
			if (match) {
				match.shift()
				route.function.apply({}, match)
			}
		}
	}

	listen() {
		const func = () => {
			if (this.currentFragment !== this.getFragment()) {
				this.currentFragment = this.getFragment()
				this.check(this.currentFragment)
			}
		}
		clearInterval(this.interval)
		this.interval = setInterval(func.bind(this), 50)
	}

	navigate(path) {
		path = path ? path : '';
		if (this.mode === 'history')
			history.pushState(null, null, this.root + this.clearSlashes(path))
		else
			window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path
	}
}
let router = new Router()
