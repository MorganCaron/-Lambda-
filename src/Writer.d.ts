import { Reactive } from './Reactive';
export declare type WagnerFischerOptions = {
    replace: boolean;
};
export declare enum EWagnerFischerEdition {
    NoChange = 0,
    Insertion = 1,
    Substitution = 2,
    Deletion = 3
}
export declare type WagnerFischerResult = {
    distance: number;
    editions: EWagnerFischerEdition[];
};
export declare const wagnerFischer: (str1: string, str2: string, options: WagnerFischerOptions) => WagnerFischerResult;
export declare type WriterOptions = {
    duration?: number;
    interval?: number;
    replace: boolean;
};
export declare class Writer {
    target: Reactive<string>;
    constructor(string: Reactive<string>);
    write(newString: string, options: WriterOptions, callback?: (() => void) | undefined): void;
}
//# sourceMappingURL=Writer.d.ts.map