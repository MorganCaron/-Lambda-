import { Component } from 'ts/ModularDom'
import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'documentation-page',
	template: html,
	style: css
})
export class Documentation extends HTMLElement {
}
