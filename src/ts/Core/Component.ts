import { Type } from './Utils'
// import { Reactive } from './Reactive'

export interface ComponentParameters {
	selector: string
	extends?: string
	template?: string
	style?: string
	useShadow?: boolean
}

export const Component = (config: ComponentParameters) => {
	if (config.selector.indexOf('-') <= 0) throw new Error('You need at least 1 dash in the component element name.')
	return <T extends Type<HTMLElement>>(component: T) => {

		const template = document.createElement('template')
		if (config.style) config.template = `<style>${config.style}</style> ${config.template}`
		template.innerHTML = config.template || ''

		const init = component.prototype.init || function() { }
		component.prototype.connectedCallback = function() {
			const clone = document.importNode(template.content, true)
			if (config.useShadow)
				this.attachShadow({ mode: 'open' }).appendChild(clone)
			else
				this.appendChild(clone)
			init.call(this)
		}

		const destroy = component.prototype.destroy || function() { }
		component.prototype.disconnectedCallback = () => destroy.call(this)

		if (typeof config.extends !== 'undefined')
			window.customElements.define(config.selector, component, { extends: config.extends })
		else
			window.customElements.define(config.selector, component)
		
		// component.prototype.constructor.observedAttributes = []
		Object.defineProperty(component.constructor, 'observedAttributes', {
			get(): Array<string> {
				return ['test']//this.__observedAttributes
			},
			set(value: string) {
				this.__observedAttributes = value
			},
			enumerable: true
		})
	}
}

export const Input = () => {
	return (component: any, propertyKey: string) => {
		/*
		if (!component.observedAttributes.includes(propertyKey))
			component.observedAttributes.push(propertyKey)
		*/
		//component["__" + propertyKey] = new Reactive<Object.getOwnPropertyDescriptor(component, propertyKey)>
		Object.defineProperty(component, propertyKey, {
			get() {
				return this["__" + propertyKey]
			},
			set(value: any) {
				this["__" + propertyKey] = value
			}
		})
	}
}
