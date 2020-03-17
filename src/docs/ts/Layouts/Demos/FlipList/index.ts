import { Component } from 'ts/ModularDom'
import 'docs/ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'flip-list',
	template: html,
	style: css
})
export class FlipList extends HTMLElement {
}
