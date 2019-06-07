import { Reactive } from './Reactive'

export type WagnerFischerOptions = {
	replace: boolean
}

export enum EWagnerFischerEdition {
	NoChange,
	Insertion,
	Substitution,
	Deletion
}

export type WagnerFischerResult = {
	distance: number,
	editions: EWagnerFischerEdition[]
}

export const wagnerFischer = (str1: string, str2: string, options: WagnerFischerOptions): WagnerFischerResult => {
	let distances: number[][] = []
	for (let i = 0; i <= str1.length; ++i) distances[i] = [i]
	for (let i = 0; i <= str2.length; ++i) distances[0][i] = i
	for (let j = 1; j <= str2.length; ++j)
		for (let i = 1; i <= str1.length; ++i) {
			if (str1[i - 1] === str2[j - 1])
				distances[i][j] = distances[i - 1][j - 1]
			else {
				const deletion = distances[i - 1][j]
				const insertion = distances[i][j - 1]
				if (options.replace) {
					const substitution = distances[i - 1][j - 1]
					distances[i][j] = Math.min(deletion, insertion, substitution) + 1
				}
				else
					distances[i][j] = Math.min(deletion, insertion) + 1
			}
		}

	let i = str1.length, j = str2.length, editions: EWagnerFischerEdition[] = []
	while (i !== 0 && j !== 0) {
		if (str1[i - 1] === str2[j - 1]) {
			editions.unshift(EWagnerFischerEdition.NoChange)
			--i
			--j
		}
		else if (distances[i - 1][j] < distances[i][j - 1]) {
			editions.unshift(EWagnerFischerEdition.Deletion)
			--i
		}
		else if (options.replace && distances[i - 1][j] === distances[i][j - 1]) {
			editions.unshift(EWagnerFischerEdition.Substitution)
			--i
			--j
		}
		else {
			editions.unshift(EWagnerFischerEdition.Insertion)
			--j
		}
	}
	if (i === 0 && j > 0)
		while (j-- > 0)
			editions.unshift(EWagnerFischerEdition.Insertion)
	else if (j === 0 && i > 0)
		while (i-- > 0)
			editions.unshift(EWagnerFischerEdition.Deletion)

	return {
		distance: distances[str1.length][str2.length],
		editions: editions
	}
}

export type WriterOptions = {
	duration?: number,
	interval?: number,
	replace: boolean
}

export class Writer {
	target: Reactive<string>

	constructor(string: Reactive<string>) {
		this.target = string
	}

	write(newString: string, options: WriterOptions, callback: () => void): void {
		const wagnerFischerResult = wagnerFischer(this.target.value, newString, { replace: options.replace })
		if (!wagnerFischerResult.distance) return
		const interval = options.duration ? options.duration / wagnerFischerResult.distance : options.interval
		let posSrc = 0, posDest = 0
		for (let i = 0; i < wagnerFischerResult.editions.length; ++i) {
			const edition = wagnerFischerResult.editions[i]
			if (edition === EWagnerFischerEdition.Insertion)
				setTimeout((posSrc, posDest) => {
					this.target.value = this.target.value.substring(0, posDest) + newString[posSrc] + this.target.value.substr(posDest)
				}, (i + 1) * interval, posSrc, posDest)
			else if (edition === EWagnerFischerEdition.Substitution)
				setTimeout((posSrc, posDest) => {
					this.target.value = this.target.value.substring(0, posDest) + newString[posSrc] + this.target.value.substr(posDest + 1)
				}, (i + 1) * interval, posSrc, posDest)
			else if (edition === EWagnerFischerEdition.Deletion)
				setTimeout((posSrc, posDest) => {
					this.target.value = this.target.value.substring(0, posDest) + this.target.value.substr(posDest + 1)
				}, (i + 1) * interval, posSrc, posDest)
			if (edition !== EWagnerFischerEdition.Deletion) {
				++posDest
				++posSrc
			}
		}
		setTimeout(callback, wagnerFischerResult.distance * interval)
	}
}
