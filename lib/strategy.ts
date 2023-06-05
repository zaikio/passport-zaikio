import OAuth2Strategy from "passport-oauth2";

import { EnvironmentName, StrategyOptions } from "./types";
import * as utils from "./utils";

export default class Strategy extends OAuth2Strategy {
  domain: string;
  environment: EnvironmentName;

  constructor(options: StrategyOptions, verify: OAuth2Strategy.VerifyFunction) {
    const domain = utils.getDomainForEnvironment(options);

    let opts: OAuth2Strategy.StrategyOptions = {
      clientID: options.clientID,
      authorizationURL: `https://${domain}/oauth/authorize`,
      tokenURL: `https://${domain}/oauth/access_token`,
      callbackURL: options.callbackURL,
      scope: [...(options.scopes || []), "zaikio.person.r"],
      clientSecret: "",
      passReqToCallback: false,
      pkce: false,
      state: false,
    };

    if (utils.isConfidentialOptions(options)) {
      opts.clientSecret = options.clientSecret;
    } else {
      opts.pkce = true;
      opts.state = true;
    }

    super(opts, verify);

    this.name = "zaikio";
    this.domain = domain;
    this.environment = options.environment;
  }

  userProfile(accessToken: string, done: Function) {
    return fetch(`https://${this.domain}/api/v1/person`, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.json())
    .then(user => done(null, user))
    .catch(error => done(error, null));
  }
}
