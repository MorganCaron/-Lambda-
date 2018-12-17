class Stylize {
	static nestingTree(tree, parentSelector = '') {
		if (typeof tree !== 'object')
			return {}
		let nestedTree = {}
		for (const selectorOrAttribute in tree) {
			const value = tree[selectorOrAttribute]
			const isSelector = (typeof value == 'object')
			const isValue = (typeof value == 'string' || typeof value == 'number')
			if (isSelector) {
				let selector = selectorOrAttribute
				if (selector[0] == '@')
					nestedTree[selector] = this.nestingTree(value)
				else {
					selector = selector.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
					const spaceBetweenSelectors = (parentSelector != '' && !">:".includes(selector[0])) ? ' ' : ''
					const completeSelector = parentSelector + spaceBetweenSelectors + selector
					nestedTree = { ...nestedTree, ...this.nestingTree(value, completeSelector) }
				}
			}
			else if (isValue) {
				const attribute = selectorOrAttribute.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
				if (!(parentSelector in nestedTree))
					nestedTree[parentSelector] = {}
				if (typeof value == 'string')
					nestedTree[parentSelector][attribute] = value
				else
					nestedTree[parentSelector][attribute] = value.toString() + 'px'
			}
			else
				throw 'Incorrect key in the css tree'
		}
		return nestedTree
	}

	static treeToCss(tree, indent = false, baseIndent = 0) {
		const tab = (indent ? '\t' : '')
		const space = (indent ? ' ' : '')
		const CRLF = (indent ? '\n' : '')
		let nestedTree = this.nestingTree(tree)
		let css = ''
		for (const selector in nestedTree) {
			const attributes = nestedTree[selector]
			if (selector != '')
				css += tab.repeat(baseIndent) + selector + space + '{' + CRLF
			if (selector != '' && selector[0] == '@')
				css += this.treeToCss(attributes, indent, baseIndent + 1)
			else for (const attribute in attributes)
				css += tab.repeat(baseIndent + 1) + attribute + ':' + space + attributes[attribute] + ';' + CRLF
			if (selector != '')
				css += tab.repeat(baseIndent) + '}' + CRLF
		}
		return css
	}
}
