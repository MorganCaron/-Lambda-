class Template {
	static build(template, datas, leftSeparator = '{', rightSeparator = '}') {
		let render = template
		for (const key in datas)
			render = render.split(leftSeparator + key + rightSeparator).join(datas[key])
		return render
	}
}
