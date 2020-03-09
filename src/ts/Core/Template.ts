/*
const initialState = {
    template: '',
    on: {}
}
  
const createReducer = args => (acc, currentString, index) => {
    const currentArg = args[index]
    
    if (currentArg && currentArg.type === "event")
        return {
            ...acc,
            on: { click: currentArg.click }
        }

    return {
        ...acc,
        template: acc.template + currentString + (args[index] || "")
    }
}

const createElement = tagName => (strings, ...args) => {
const { template, on } = strings.reduce(createReducer(args), initialState);

return {
type: "element",
template: h(tagName, { on }, template) // the second argument concerns attributes, properties and events
};
};
*/

export const TemplateInformations = {
	openSymbol: '{{',
	closeSymbol: '}}'
}

export const TemplateGetKeys = (src: string) => {
	const regex = new RegExp(TemplateInformations.openSymbol + ' *(.+?)? *' + TemplateInformations.closeSymbol, 'g')
	let match: RegExpExecArray
	let keys: string[] = []
	while (match = regex.exec(src))
		keys.push(match[1])
	return [...new Set(keys)]
}

export interface TemplateMatch {
	key: string
	sample: string
}
export const TemplateGetMatchs = (src: string): TemplateMatch[] => {
	const regex = new RegExp(TemplateInformations.openSymbol + ' *(.+?)? *' + TemplateInformations.closeSymbol, 'g')
	let match: RegExpExecArray
	let matchs: TemplateMatch[] = []
	while (match = regex.exec(src))
		matchs.push({ key: match[1], sample: match[0] })
	return matchs
}

export const TemplateReplaceKeys = (src: string, replacements: any) => {
	const regex = new RegExp(TemplateInformations.openSymbol + ' *(.+?)? *' + TemplateInformations.closeSymbol, 'g')
	let match: RegExpExecArray
	while (match = regex.exec(src))
		src = src.replace(match[0], replacements[match[1]])
	return src
}

/*
export const Template = () => {
	return <T extends HTMLElement>(component: T, propertyKey: string) => {
		if (!component.constructor.hasOwnProperty('__templates__'))
			(component.constructor as any).__templates__ = [];
		(component.constructor as any).__templates__.push(propertyKey)
	}
}
*/
