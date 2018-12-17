class Relevancy {
	constructor(loadFunc = undefined, unloadFunc = undefined) {
		this.registeredNodes = []
		this.openedNodes = []
		this.connections = []
		this.currentNode = undefined
		this.loadFunc = loadFunc
		this.unloadFunc = unloadFunc
	}

	add(node) {
		if (!this.exists(node))
			this.registeredNodes.push(node)
	}

	remove(node) {
		const index = this.registeredNodes.indexOf(node)
		if (index != -1)
			this.registeredNodes.splice(index, 1)
		this.connections = this.connections.filter(connection => connection.first !== node && connection.second !== node)
	}

	exists(node) {
		return this.registeredNodes.includes(node)
	}

	connect(node0, node1) {
		this.add(node0)
		this.add(node1)
		this.connections.push({
			first: node0,
			second: node1
		})
		this.connections.push({
			first: node1,
			second: node0
		})
	}

	disconnect(node0, node1) {
		this.connections = this.connections.filter(connection => !(
			(connection.first === node0 && connection.second === node1) ||
			(connection.first === node1 && connection.second === node0)
		))
	}

	connected(node0, node1) {
		return this.connections.filter(connection => connection.first === node0 && connection.second === node1).length != 0
	}

	loaded(node) {
		this.openedNodes.push(node)
	}

	unloaded(node) {
		const index = this.openedNodes.indexOf(node)
		if (index != -1)
			this.openedNodes.splice(node, 1)
	}

	open(node) {
		this.add(node)
		this.openedNodes.push(node)
		this.currentNode = node
	}

	get node() {
		return this.currentNode
	}

	get nodes() {
		return this.openedNodes
	}

	update() {
		if (this.loadFunc != undefined) {
			const open = this.registeredNodes.filter(node => {
				const connected = this.currentNode == undefined || this.connected(node, this.currentNode)
				const opened = this.openedNodes.includes(node)
				return connected && !opened
			})
			if (open.length != 0)
				this.loadFunc(open)
		}
		if (this.unloadFunc != undefined) {
			const close = this.registeredNodes.filter(node => {
				const connected = this.currentNode == undefined || this.connected(node, this.currentNode)
				const opened = this.openedNodes.includes(node)
				return !connected && opened
			})
			if (close.length != 0)
				this.unloadFunc(close)
		}
	}
}
