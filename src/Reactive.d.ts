export declare class Reactive<T> {
    dependencies: Reactive<any>[];
    _value: T;
    _updateFunction: (() => void) | undefined;
    constructor(value: T);
    depend(dependency: Reactive<any>): void;
    subscribe(func: () => void): void;
    update(): void;
    set value(val: T);
    get value(): T;
}
//# sourceMappingURL=Reactive.d.ts.map