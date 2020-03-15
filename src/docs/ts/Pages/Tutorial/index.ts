import { Component } from 'ts/ModularDom'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'tutorial-page',
	template: html,
	style: css
})
export class Tutorial extends HTMLElement {
}
