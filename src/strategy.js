"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_oauth2_1 = __importDefault(require("passport-oauth2"));
const utils = __importStar(require("./utils"));
class Strategy extends passport_oauth2_1.default {
    constructor(options, verify) {
        const domain = utils.getDomainForEnvironment(options);
        let opts = {
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
        }
        else {
            opts.pkce = true;
            opts.state = true;
        }
        super(opts, verify);
        this.name = "zaikio";
        this.domain = domain;
        this.environment = options.environment;
    }
    userProfile(accessToken, done) {
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
exports.default = Strategy;
