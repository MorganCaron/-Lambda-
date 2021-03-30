import { Elem, Layout, Reactive } from 'ModularDom';
import { HTMLElementEvent } from 'VDom';
export declare class Demo extends Layout {
    operand0: Reactive<number>;
    operand1: Reactive<number>;
    result: Reactive<number>;
    constructor();
    operand0Change(event: HTMLElementEvent<HTMLInputElement>): void;
    operand1Change(event: HTMLElementEvent<HTMLInputElement>): void;
    render(): Elem[];
}
//# sourceMappingURL=Demo.d.ts.map