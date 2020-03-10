import { TemplateInformations, TemplateGetKeys, TemplateMatch, TemplateGetMatchs, TemplateReplaceKeys } from './Template'
import { Type } from './Utils'

export interface ComponentParameters {
	selector: string
	extends?: string
	template?: string
	style?: string
	useShadow?: boolean
}

const createTemplate = (html: string, style?: string): HTMLTemplateElement => {
	const template = document.createElement('template')
	html = html || ''
	template.innerHTML = style ? `<style>${style}</style>${html}` : html
	return template
}

const scanTemplatedElements = (component: HTMLElement): any => {
	let containsVariable: any = {}
	const nbChilds = component.childNodes.length
	for (let i = 0; i < nbChilds; ++i) {
		const element = component.childNodes[i]
		if (element.nodeType == 3) {
			const keys = TemplateGetKeys(element.nodeValue)
			keys.forEach(key => {
				if (!containsVariable[key]) containsVariable[key] = []
				containsVariable[key].push({
					element: element,
					template: element.nodeValue
				})
			})
		}
		if (element instanceof HTMLElement)
			containsVariable = { ...containsVariable, ...scanTemplatedElements(element) }
	}
	return containsVariable
}

const completeTemplatedElements = (component: HTMLElement, templatedElementsData?: any[]) => {
	templatedElementsData = templatedElementsData || []
	templatedElementsData.forEach(templatedElementData => {
		let text = templatedElementData.template
		const matchs = TemplateGetMatchs(text)
		matchs.forEach(match => {
			text = text.replace(match.sample, (component as any)[match.key])
		})
		templatedElementData.element.nodeValue = text
	})
}

export const Component = (config: ComponentParameters) => {
	if (config.selector.indexOf('-') <= 0) throw new Error('You need at least 1 dash in the component element name.')
	return <T extends Type<HTMLElement>>(component: T) => {
		const template = createTemplate(config.template, config.style)

		const init = component.prototype.init || function() { }
		component.prototype.connectedCallback = function() {
			const clone = document.importNode(template.content, true)
			if (config.useShadow)
				this.attachShadow({ mode: 'open' }).appendChild(clone)
			else
				this.appendChild(clone)
			component.prototype.constructor.__variables__ = scanTemplatedElements(this)
			init.call(this)
			component.prototype.constructor.__isInitialized__ = true
			completeTemplatedElements(this,
				Object.keys(component.prototype.constructor.__variables__)
					.map(key => component.prototype.constructor.__variables__[key])
					.reduce((acc, cur) => [...acc, ...cur], []))
		}

		const destroy = component.prototype.destroy || function() { }
		component.prototype.disconnectedCallback = () => destroy.call(this)

		if (!component.prototype.constructor.hasOwnProperty('__attributes__'))
			component.prototype.constructor.__attributes__ = []

		Object.defineProperty(component.prototype.constructor, 'observedAttributes', {
			get() {
				return this.__attributes__;
			}
		})

		const update = component.prototype.update || function() { }
		Object.assign(component.prototype, {
			attributeChangedCallback(name: string, oldValue: any, newValue: any) {
				if (oldValue === newValue) return;
				(this as any)["__" + name] = newValue
				if (component.prototype.constructor.__isInitialized__) {
					update.call(this)
					completeTemplatedElements(this, component.prototype.constructor.__variables__[name])
				}
			}
		})

		if (typeof config.extends !== 'undefined')
			window.customElements.define(config.selector, component, { extends: config.extends })
		else
			window.customElements.define(config.selector, component)
	}
}

export const Attribute = () => {
	return <T extends HTMLElement>(component: T, propertyKey: string) => {
		if (!component.constructor.hasOwnProperty('__attributes__'))
			(component.constructor as any).__attributes__ = [];
		(component.constructor as any).__attributes__.push(propertyKey)

		Object.defineProperty(component, propertyKey, {
			get() {
				return (this as any)["__" + propertyKey]
			},
			set(value: any) {
				(this as any)["__" + propertyKey] = value
				if (value)
					this.setAttribute(propertyKey, value)
				else
					this.removeAttribute(propertyKey);
			},
			enumerable: true
		})
	}
}
