import { Component } from 'ts/ModularDom'

@Component({
	selector: 'main-footer',
	template: `
	<hr>
	<p class="text-center">
		This site is realized with <a href="https://morgancaron.github.io/Nootstrap/">Nootstrap</a> & ModularDom<br>
		Created by <a href="https://github.com/MorganCaron" target="_blank">Morgan Caron</a>
	</p>`
})
export class Footer extends HTMLElement { }
