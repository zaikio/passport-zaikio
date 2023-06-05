import OAuth2Strategy from "passport-oauth2";
import { EnvironmentName, StrategyOptions } from "./types";
export default class Strategy extends OAuth2Strategy {
    domain: string;
    environment: EnvironmentName;
    constructor(options: StrategyOptions, verify: OAuth2Strategy.VerifyFunction);
    userProfile(accessToken: string, done: Function): Promise<any>;
}
