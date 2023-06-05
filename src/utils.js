"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainForEnvironment = exports.isConfidentialOptions = void 0;
function isConfidentialOptions(object) {
    return "clientSecret" in object;
}
exports.isConfidentialOptions = isConfidentialOptions;
function getDomainForEnvironment({ environment }) {
    if (environment === "sandbox") {
        return "hub.sandbox.zaikio.com";
    }
    else if (environment === "live") {
        return "hub.zaikio.com";
    }
    else {
        throw new Error("invalid environment");
    }
}
exports.getDomainForEnvironment = getDomainForEnvironment;
