import { ConfidentialOptions, StrategyOptions } from "./types";
export declare function isConfidentialOptions(object: any): object is ConfidentialOptions;
export declare function getDomainForEnvironment({ environment }: StrategyOptions): "hub.sandbox.zaikio.com" | "hub.zaikio.com";
