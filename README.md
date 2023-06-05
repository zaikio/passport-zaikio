# passport-zaikio

[Passport](https://www.passportjs.org/) strategy for authenticating with
[Zaikio](https://www.zaikio.com/) using [OAuth 2.0](https://www.passportjs.org/features/oauth2/).

This module lets you authenticate using Zaikio in your Node.js applications.
By plugging into Passport, Sign In with Zaikio can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme)-style middleware,
including [Express](https://expressjs.com/).

## Install

Currently this package is only available through GitHub.

```sh
$ npm install --save zaikio/passport-zaikio
```

## Usage

```js
const passport = require("passport");
const Zaikio = require("passport-zaikio");

passport.use(new Zaikio.Strategy({
    callbackUrl: "http://127.0.0.1:3000/auth/zaikio/callback",
    clientID: "2314d3b5-4e7d-45d7-8411-1d454057e1f8",
    environment: "sandbox",
  },
  (accessToken, refreshToken, profile, cb) =>
    User.findOrCreate(profile).then(user => done(null, user)).catch(err => done(err, null))
));
```

The Strategy name is `zaikio` and can then be used as follows:

```js
const express = require("express");
const router = express.Router();

// other configuration

router.use(passport.authenticate("zaikio"));
router.get("/", (req, res) => {
  res.render("secure_template", { user: req.user });
});

app.use("/secure", router);
```

Please see [Passport](https://www.passportjs.org/) for comprehensive documentation on how
to use and setup Passport within your project.

## Getting Started

OAuth applications on the Zaikio platform can either be _confidential_ - where the application
hosting environment is adequately able to store configuration secrets, or _unconfidential_ where
the environment cannot safely be trusted.

Examples of the former would include SaaS platforms running in the cloud, and examples of the
latter would include on-premise software or single-tenant installations of applications.

Going to our [developer sandbox](https://hub.sandbox.zaikio.com) enables you to sign up and create
an application. Your applications oAuth credentials can be configured from

Once you have decided which of these categories your application fits into, you can create and configure
an application accordingly.

![app configuration](https://github.com/zaikio/passport-zaikio/blob/main/docs/credentials.png?raw=true)

To enable credentials for _unconfidential_ mode, make sure you toggle the mode of the credential.

![app configuration](https://github.com/zaikio/passport-zaikio/blob/main/docs/credentials-toggle.png?raw=true)


## Configuration Options

### Shared Options

| name | type | required | description |
| - | - | - | - |
| clientID | string | true | The identifier of the credentials for the App from the Zaikio hub |
| environment | enum | true | "sandbox" or "live" depending on which environment you are targeting |
| callbackURL | string | true | The URL to callback to after the oAuth handshake - this must be set in the Hub |
| scopes | string[] | true | An array of scopes to request. We always will request `zaikio.person.r` |

### Confidential Apps

| name | type | required | description |
| - | - | - | - |
| clientSecret | string | true | The secret of the credentials for the App |

### Unconfidential Apps

These apps have no special configuration options. Providing the standard configurations object will result
in the app being configured using PKCE for unconfidential mode operation.

## Support

Please open issues here for support, with this project or, if you are part of our Slack Community, then
reach out to our development team there for speedy assistance.
