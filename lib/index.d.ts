type Config = {
    [key: string]: string | Config;
};
declare function decrypt<T extends string | Config>(config: T, password: string): T;
export { Config, decrypt };
