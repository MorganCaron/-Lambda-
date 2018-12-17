class Writer {
	constructor(element) {
		this.element = element
	}

	write(str, interval, callback = null) {
		for (let i = 0; i < str.length; ++i) {
			setTimeout((element, str, index) => {
				element.innerHTML += str[index]
			}, interval * i, this.element, str, i)
		}
		if (callback)
			setTimeout(callback, interval * str.length)
	}
}
