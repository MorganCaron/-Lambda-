import { Elem, Layout, Body, Tag, View, Reactive, Router, Writer, WriterOptions } from 'ModularDom'

const text = new Reactive("")
text.subscribe(() => {
	console.log("A character has been modified")
})

const writer = new Writer(text)
