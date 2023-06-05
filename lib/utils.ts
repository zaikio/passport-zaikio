 import { ConfidentialOptions, StrategyOptions } from "./types";

 export function isConfidentialOptions(object: any): object is ConfidentialOptions {
   return "clientSecret" in object;
 }

 export function getDomainForEnvironment({ environment }: StrategyOptions) {
   if (environment === "sandbox") {
     return "hub.sandbox.zaikio.com";
   } else if (environment === "live") {
     return "hub.zaikio.com";
   } else {
     throw new Error("invalid environment");
   }
 }
