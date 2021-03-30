import { Elem, Layout } from 'ModularDom';
declare type Article = {
    title: string;
    description: string;
    image: string;
};
export declare class ComponentPage extends Layout {
    articles: Article[];
    constructor();
    render(): Elem[];
    afterRender(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map