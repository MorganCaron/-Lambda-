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

export const TemplateEngine = (code: string, data: Object) => {
    const openSymbol = '{{'
    const closeSymbol = '}}'
    const regex = new RegExp(openSymbol + '(.+?)?' + closeSymbol, 'g')
    let match: RegExpExecArray
    while (match = regex.exec(code)) {
        code = code.replace(match[0], data[match[1]])
    }
    return code
}
