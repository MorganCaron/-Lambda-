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
		if (config.style) config.template = `<style>${config.style}</style>${config.template}`
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
				update.call(this)
			}
		})

		if (typeof config.extends !== 'undefined')
			window.customElements.define(config.selector, component, { extends: config.extends })
		else
			window.customElements.define(config.selector, component)
	}
}

export const Input = () => {
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
