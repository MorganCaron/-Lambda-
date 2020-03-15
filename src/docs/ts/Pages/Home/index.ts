import { Component } from 'ts/ModularDom'
import 'docs/ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'home-page',
	classes: 'container px-0',
	template: html,
	style: css
})
export class Home extends HTMLElement {
}
