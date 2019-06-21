export declare type Elem = (VDOMObject | VDOMText);
export declare type Attributes = {
    [key: string]: string | EventListener;
};
export interface HTMLElementEvent<T extends HTMLElement> extends Event {
    target: T;
}
export declare class VDOMText {
    el: Text;
    constructor(content?: string);
    render(): Text;
}
export declare class VDOMObject {
    el: Element;
    constructor(element: Element);
    found(): boolean;
    delete(): void;
    setAttrs(attrs: Attributes): void;
    clearChilds(): void;
    addChilds(childs: Elem[]): void;
    setContent(content: string | Elem[]): void;
}
export declare class VDOMElem extends VDOMObject {
    constructor(name: string, content?: string | Elem[], attrs?: Attributes);
}
export declare class Layout extends VDOMObject {
    constructor(elem: VDOMElem);
    update(): void;
    render(): Elem[];
    afterRender(): void;
}
declare class Head extends VDOMObject {
    constructor();
}
export declare class Body extends VDOMObject {
    head: Head;
    animationOptions: KeyframeAnimationOptions;
    constructor(animationOptions?: KeyframeAnimationOptions);
    compareTagName(node0: Node, node1: Node): boolean;
    updateAttributes(oldElem: Element, newElem: Element): void;
    updateChilds(parent: Element, newElems: Element[]): void;
    setContent(content: string | Elem[]): void;
    update(): void;
    render(): Elem[];
    afterRender(): void;
}
export {};
