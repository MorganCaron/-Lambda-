interface Route {
    regex: string;
    controller: () => void;
}
declare class RouterController {
    routes: Route[];
    root: string;
    _mode: 'history' | 'hash';
    currentFragment: string | null;
    constructor(mode?: 'history' | 'hash' | undefined);
    set mode(mode: 'history' | 'hash');
    get mode(): 'history' | 'hash';
    clearSlashes(path: string): string;
    getFragment(): string;
    openFragment(fragment: string): void;
    add(regex: string, controller: (...args: any[]) => void): void;
    remove(regex: string): void;
    check(regexPath: string): boolean;
    listen(): void;
    navigate(path: string): void;
}
export declare const Router: RouterController;
export {};
//# sourceMappingURL=Router.d.ts.map