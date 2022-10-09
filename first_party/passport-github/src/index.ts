/**
 * Copyright https://github.com/cfsghost/passport-github/blob/master/lib/strategy.js
 * Copyright 2022 Han
 *
 */

import * as OAuth2Strategy from 'passport-oauth2';
import * as retry from 'async-retry';

const InternalOAuthError = OAuth2Strategy.InternalOAuthError;
const parse = function (json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  let profile: any = {};
  profile.id = String(json.id);
  profile.nodeId = json.node_id;
  profile.displayName = json.name;
  profile.username = json.login;
  profile.profileUrl = json.html_url;
  if (json.email) {
    profile.emails = [{ value: json.email }];
  }
  if (json.avatar_url) {
    profile.photos = [{ value: json.avatar_url }];
  }
  return profile;
};

export class Strategy extends OAuth2Strategy {
  override name = 'github';
  _userProfileURL = 'https://api.github.com/user';
  _userEmailURL = 'https://api.github.com/user/emails';
  _allRawEmails = false;
  _retries = 1;

  constructor(options, verify) {
    options = options || {};
    options.authorizationURL =
      options.authorizationURL || 'https://github.com/login/oauth/authorize';
    options.tokenURL =
      options.tokenURL || 'https://github.com/login/oauth/access_token';
    options.scopeSeparator = options.scopeSeparator || ',';
    options.customHeaders = options.customHeaders || {};

    if (!options.customHeaders['User-Agent']) {
      options.customHeaders['User-Agent'] =
        options.userAgent || 'passport-github';
    }
    super(options, verify);
    this.name = options.name || 'github';
    this._userProfileURL =
      options.userProfileURL || 'https://api.github.com/user';
    this._userEmailURL =
      options.userEmailURL || 'https://api.github.com/user/emails';
    this._oauth2.useAuthorizationHeaderforGET(true);
    this._allRawEmails = options.allRawEmails || false;
    this._retries = options.retries;
  }

  override userProfile(accessToken, done) {
    let self = this;

    const requestOauth = async (bail) =>
      new Promise((resolve) => {
        this._oauth2.get(
          this._userProfileURL,
          accessToken,
          function (err, body, _res) {
            if (err) {
              bail(new Error('Unauthorized'));
              return;
            } else {
              resolve(body);
            }
          },
        );
      });

    retry(requestOauth, {
      retries: this._retries,
    })
      .then((body) => {
        console.log(body);
        let json;

        try {
          json = JSON.parse(body as string);
        } catch (ex) {
          return done(new Error('Failed to parse user profile'));
        }

        const profile = parse(json);
        profile.provider = 'github';
        profile._raw = body;
        profile._json = json;

        let canAccessEmail = false;
        let scopes = (self as any)._scope;
        if (typeof scopes === 'string') {
          scopes = scopes.split((self as any)._scopeSeparator);
        }
        if (Array.isArray(scopes)) {
          canAccessEmail = scopes.some(function (scope) {
            return scope === 'user' || scope === 'user:email';
          });
        }
        if (!canAccessEmail) {
          return done(null, profile);
        }
        self._oauth2.get(
          self._userEmailURL,
          accessToken,
          function (err, body, res) {
            if (err) {
              return done(
                new InternalOAuthError('Failed to fetch user emails', err),
              );
            }

            const json = JSON.parse(body as string);

            if (!json || !json.length) {
              return done(new Error('Failed to fetch user emails'));
            }

            if (self._allRawEmails) {
              profile.emails = json.map(function (email) {
                email.value = email.email;
                delete email.email;
                return email;
              });
            } else {
              for (let index in json) {
                if (json[index].primary) {
                  profile.emails = [{ value: json[index].email }];
                  break;
                }
              }
            }

            done(null, profile);
          },
        );
      })
      .catch((err) => {
        done(new InternalOAuthError('Failed to fetch user profile', err));
      });
  }
}
