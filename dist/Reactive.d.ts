export declare class Reactive<T> {
    dependencies: Reactive<any>[];
    _value: T;
    _updateFunction: () => void;
    constructor(value?: T);
    depend(dependency: Reactive<any>): void;
    subscribe(func: () => void): void;
    update(): void;
    value: T;
}
