import { Elem, Layout, Reactive, Writer, WriterOptions } from 'ModularDom';
export declare class Demo extends Layout {
    writer: Writer;
    writerOptions: WriterOptions;
    code: Reactive<string>;
    animationInProgress: Reactive<boolean>;
    constructor();
    launchAnimation(): void;
    render(): Elem[];
    afterRender(): void;
}
//# sourceMappingURL=Demo.d.ts.map