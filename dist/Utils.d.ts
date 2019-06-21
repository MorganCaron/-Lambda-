export declare const xor: (lhs: boolean, rhs: boolean) => boolean;
export declare type Zipped<A, B> = {
    first: A;
    second: B;
}[];
export declare const zip: <A, B>(first: A[], second: B[]) => {
    first: A;
    second: B;
}[];
export declare const flatify: <T>(array: any[]) => T[];
