class Progressive {
	static write(str, add, interval, callbackBetween, callbackAfter = null) {
		const addLetter = (str, add, interval, callbackBetween, callbackAfter) => {
			if (add && add.length)
				setTimeout(() => {
					str += add[0]
					callbackBetween(str)
					addLetter(str, add.slice(1), interval, callbackBetween, callbackAfter)
				}, interval, str, add, interval, callbackBetween, callbackAfter)
		}
		if (callbackAfter)
			setTimeout(callbackAfter, interval * (add.length + 1), str + add)
		addLetter(str, add, interval, callbackBetween, callbackAfter)
	}
}
