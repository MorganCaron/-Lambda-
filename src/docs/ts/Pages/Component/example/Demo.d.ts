import { Elem, Layout } from 'ModularDom';
declare type Article = {
    title: string;
    description: string;
    image: string;
};
export declare class Demo extends Layout {
    articles: Article[];
    constructor();
    render(): Elem[];
}
export {};
//# sourceMappingURL=Demo.d.ts.map