import { VDOMText, VDOMObject, VDOMElem } from './VDom';
export declare const View: (literals: TemplateStringsArray, ...placeholders: (string | number | VDOMObject | VDOMText | (VDOMObject | VDOMText)[] | EventListener)[]) => (VDOMObject | VDOMText)[];
export declare const Tag: (literals: TemplateStringsArray, ...placeholders: (string | EventListener)[]) => VDOMElem;
