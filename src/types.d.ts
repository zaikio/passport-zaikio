export type EnvironmentName = "sandbox" | "live";
export interface Options {
    clientID: string;
    environment: EnvironmentName;
    callbackURL: string;
    scopes: string[];
}
export interface ConfidentialOptions extends Options {
    clientSecret: string;
}
export interface UnconfidentialOptions extends Options {
}
export type StrategyOptions = ConfidentialOptions | UnconfidentialOptions;
