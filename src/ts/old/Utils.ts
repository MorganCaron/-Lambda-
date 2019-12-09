export const xor = (lhs: boolean, rhs: boolean) => (lhs ? !rhs : rhs)

export type Zipped<A, B> = { first: A, second: B }[]

export const zip = <A, B>(first: A[], second: B[]): Zipped<A, B> => {
	const zipped: { first: A, second: B }[] = []
	for (let i = 0; i < Math.min(first.length, second.length); ++i)
		zipped.push({ first: first[i], second: second[i] })
	return zipped
}

export const flatify = <T>(array: any[]): T[] => array.reduce((flat: T[], toFlatten: T | any[]) => flat.concat(Array.isArray(toFlatten) ? flatify(toFlatten) : toFlatten), [])
