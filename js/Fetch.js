class Fetch {
	static importTextFile(filename, callback) {
		fetch(filename).then(response => {
			if (response.status !== 200) {
				throw "Can't read file. Status Code: " + response.status
				return
			}
			response.text().then(content => {
				callback(content)
			})
		})
	}

	static importJsonFile(filename, callback) {
		fetch(filename).then(response => {
			if (response.status !== 200) {
				throw "Can't read file. Status Code: " + response.status
				return
			}
			response.json().then(content => {
				callback(content)
			})
		})
	}
}
