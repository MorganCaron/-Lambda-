import { Component } from 'ts/ModularDom'

@Component({
	selector: 'main-footer',
	template: `
	<p class="text-center">
		This site is realized with ModularDom<br>
		Created by <a href="https://github.com/MorganCaron" target="_blank">Morgan Caron</a>
	</p>`
})
export class Footer extends HTMLElement { }
