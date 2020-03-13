import { Component } from 'ts/ModularDom'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'menu-layout',
	template: html,
	style: css,
	useShadow: false
})
export class Menu extends HTMLElement { }
