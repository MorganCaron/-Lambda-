interface Route {
    regex: string;
    controller: () => void;
}
declare class RouterController {
    routes: Route[];
    root: string;
    mode: string;
    currentFragment: string;
    interval: number;
    constructor(mode?: string);
    clearSlashes(path: string): string;
    getFragment(): string;
    add(regex: string, controller: () => void): void;
    remove(regex: string): void;
    check(path?: string): void;
    listen(): void;
    navigate(path: string): void;
}
export declare const Router: RouterController;
export {};
