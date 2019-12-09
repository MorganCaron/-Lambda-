import { Elem, Attributes, VDOMText, VDOMObject, VDOMElem } from './VDom'

class ModularDomParser {
	values: (string | Elem | EventListener)[]
	indexValue: number
	indexChar: number

	currentValue(): (string | Elem | EventListener) {
		return this.values[this.indexValue]
	}
	currentString(): string {
		return this.currentValue() as string
	}
	currentChar(): string {
		return (this.currentValue() as string)[this.indexChar]
	}

	isSpace(char: string): boolean {
		return ' \t\n'.includes(char)
	}
	isChar(char: string): boolean {
		return /[\.@_\-0-9A-Za-z]/.test(char)
	}
	isString(): boolean {
		return (typeof this.currentValue() === 'string')
	}
	isVDOMText(): boolean {
		return (this.currentValue() instanceof VDOMText)
	}
	isEndOfString(): boolean {
		return this.indexChar >= this.currentString().length
	}
	isEndOfValues(): boolean {
		return this.indexValue >= this.values.length
	}

	gotoNextValue(): void {
		if (!this.isEndOfValues()) {
			++this.indexValue
			this.indexChar = 0
		}
	}
	getNextWord(): string {
		let word = ''
		while (!this.isEndOfString() && this.isChar(this.currentChar())) {
			word += this.currentChar()
			++this.indexChar
		}
		return word
	}

	parseCommentary(): void {
		const typeCommentary = this.currentChar()
		++this.indexChar
		if (typeCommentary == '/') {
			const length = this.currentString().substring(this.indexChar).indexOf('\n')
			if (length != -1)
				this.indexChar += length + 1
		}
		else if (typeCommentary == '*') {
			const length = this.currentString().substring(this.indexChar).indexOf('*/')
			if (length != -1)
				this.indexChar += length + 2
		}
		this.parseSpace()
	}

	parseSpace(): void {
		while (!this.isEndOfString() && this.isSpace(this.currentChar()))
			++this.indexChar
		if (this.indexChar + 1 < this.currentString().length && this.currentChar() == '/' && '/*'.includes(this.currentString()[this.indexChar + 1])) {
			++this.indexChar
			this.parseCommentary()
			if (this.isEndOfString())
				this.gotoNextValue()
		}
	}

	parseQuote(): string {
		const quoteType = this.currentChar()
		if (!"'\"".includes(quoteType))
			throw new Error(`Syntax error: Character " ou ' is missing.`)
		++this.indexChar
		let quotation = ''
		const isQuote = () => (!this.isEndOfString() && this.currentChar() === quoteType)
		const nextValueIsAString = () => (this.indexValue + 1 < this.values.length && typeof this.values[this.indexValue + 1] === 'string')
		while (!this.isEndOfValues() && this.isString() && !isQuote()) {
			if (!this.isEndOfString()) {
				if (this.currentChar() === '\\') {
					++this.indexChar
					if (this.isEndOfString())
						throw new Error(`Syntax error: Character \\ must be followed by a character to escape.`)
				}
				quotation += this.currentChar()
				++this.indexChar
			}
			else if (nextValueIsAString()) {
				quotation += this.values[++this.indexValue] as string
				this.gotoNextValue()
			}
		}
		if (this.isEndOfValues() || !isQuote())
			throw new Error(`Syntax error: A closing brace ${quoteType} is missing after "${quotation}".`)
		++this.indexChar
		return quotation
	}

	parseValue(): string | EventListener {
		this.parseSpace()
		if (!this.isEndOfString() && "'\"".includes(this.currentChar()))
			return this.parseQuote()
		if (this.isEndOfString()) {
			this.gotoNextValue()
			const currentValue = this.currentValue()
			if (typeof currentValue !== 'function')
				throw new Error('Syntax error: The placeholder is not a function.')
			this.gotoNextValue()
			return currentValue as EventListener
		}
		return this.getNextWord()
	}

	parseAttributes(): Attributes {
		let attrs: Attributes = {}
		while (!this.isEndOfString() && this.isChar(this.currentChar())) {
			const attr = this.getNextWord()
			this.parseSpace()
			if (this.isEndOfString() || this.currentChar() !== ':')
				throw new Error(`Syntax error: Character ':' is missing after "${attr}" attribute.`)
			++this.indexChar
			attrs[attr] = this.parseValue()
			this.parseSpace()
		}
		return attrs
	}

	parseElement(): Elem | null {
		const value = this.values[this.indexValue]
		if (value instanceof VDOMText)
			return value
		if (typeof value === 'string') {
			if ('\'"'.includes(this.currentChar()))
				return new VDOMText(this.parseQuote())
			else {
				const tag = this.getNextWord()
				if (tag.length === 0 && this.isEndOfString())
					return null
				if (tag.length === 0)
					throw new Error(`Syntax error: Tag name is missing in "${value}".`)
				this.parseSpace()
				const attrs = this.parseAttributes()
				let content: string | Elem[]
				if (this.isEndOfString())
					throw new Error(`Syntax error: Missing element content or semicolon after "${tag} ${JSON.stringify(attrs)}"`)
				if ('\'"'.includes(this.currentChar()))
					content = this.parseQuote()
				else {
					if (this.currentChar() === ';') {
						++this.indexChar
						return new VDOMElem(tag, '', attrs)
					}
					if (this.currentChar() !== '{')
						throw new Error(`Syntax error: Character \'{\' or \';\' is missing  after "${tag} ${JSON.stringify(attrs)}"`)
					++this.indexChar
					content = this.parseBlock(true)
				}
				return new VDOMElem(tag, content, attrs)
			}
		}
		else if (value instanceof VDOMObject)
			return value
		else if (value === undefined || value === null)
			return null
		else
			throw new Error('Syntax error: Use of a function out of context')
	}

	parseBlock(untilBracket: boolean = false): Elem[] {
		let elems: Elem[] = []
		const jumpToNextElem = () => {
			if (!this.isEndOfValues() && this.isString()) {
				this.parseSpace()
				if (this.isEndOfString()) {
					this.gotoNextValue()
					jumpToNextElem()
				}
			}
		}
		jumpToNextElem()
		while (!this.isEndOfValues() && !(untilBracket && this.isString() && !this.isEndOfString() && this.currentChar() === '}')) {
			const element = this.parseElement()
			if (element)
				elems.push(element)
			if (typeof this.currentValue() !== 'string')
				this.gotoNextValue()
			jumpToNextElem()
		}
		if (untilBracket) {
			if (this.isEndOfValues() || !this.isString() || this.isEndOfString() || this.currentChar() !== '}')
				throw new Error(`Syntax error: Character \'}\' is missing at the end of "${this.values}".`)
			++this.indexChar
			this.parseSpace()
		}
		return elems
	}

	parseView(values: (string | Elem | EventListener)[]): Elem[] {
		this.values = values
		this.indexValue = 0
		this.indexChar = 0
		return this.parseBlock()
	}

	parseTag(values: (string | EventListener)[]): VDOMElem {
		this.values = values
		this.indexValue = 0
		this.indexChar = 0
		const tag = this.getNextWord()
		if (tag.length == 0)
			throw new Error('Syntax error: Tag name is missing.')
		this.parseSpace()
		const attrs = this.parseAttributes()
		return new VDOMElem(tag, '', attrs)
	}
}

export const View = (literals: TemplateStringsArray, ...placeholders: (number | string | Elem | Elem[] | EventListener)[]): Elem[] => {
	const convertPlaceholder = (placeholder: (number | string | Elem | Elem[] | EventListener)): (string | Elem | EventListener)[] => {
		if (typeof placeholder === 'number')
			return [placeholder.toString()]
		if (Array.isArray(placeholder)) {
			placeholder = placeholder.filter(elem => (elem != null && elem != undefined))
			return placeholder.length == 0 ? [''] : placeholder
		}
		if (placeholder == null || placeholder == undefined)
			return ['']
		return [placeholder]
	}
	let indexLiteral = 0
	const values = placeholders.map(elem => [literals[indexLiteral++], ...convertPlaceholder(elem)]).reduce(<T>(arr0: T[], arr1: T[]) => [...arr0, ...arr1], [])
	values.push(literals[indexLiteral])
	return new ModularDomParser().parseView(values)
}

export const Tag = (literals: TemplateStringsArray, ...placeholders: (string | EventListener)[]): VDOMElem => {
	let values: (string | EventListener)[] = []
	for (let i = 0; i < placeholders.length; ++i) {
		values.push(literals[i])
		values.push(placeholders[i])
	}
	values.push(literals[placeholders.length])
	return new ModularDomParser().parseTag(values)
}
