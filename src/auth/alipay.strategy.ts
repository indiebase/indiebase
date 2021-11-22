import { BootStrategy, WebPassportStrategyAdapter } from '@midwayjs/passport';
import { Strategy, StrategyOptions } from 'passport-alipay2';

@BootStrategy({
  async useParams({ configuration }): Promise<StrategyOptions> {
    return {
      app_id: '2021000117635184',
      alipay_public_key: `
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjMrqc3kfrzpcg8sw4XGlg6tj9xjlsX1e+yAhzhUiUmQe5FBtoRFYvYrLJOmfLWUlhQtcMo3eEwVagsGc34j88diabxRAywc2LmT/hKyp9zAgfshJaxclEUFnnm+v21TYY1+hI3aE3Yh5mTRZTyJ5SffUna2T1Uf5UOh2v43lacxGdU9Rq3xLlsDFZecvqTEnyIojO9pmfTx/G4hShsOjJ5ISciRWvs8MjoHBk6FXc8NgyN9TZSzQA2/r19Vd3OLRN9OMJfllOvLI42fUQNW7zqADKHtBycQkFreWNnCM9LwRaCGUehpEJH6BU29mdi3fkeaSrU8PbCLGNpej81MX+QIDAQAB
      -----END PUBLIC KEY-----
      `,
      private_key: `
      -----BEGIN RSA PRIVATE KEY-----
      MIIEpAIBAAKCAQEAg0racCGPgQNc++6XkE4rTNrb2FgeAcPjSi9+L33InltDapYa69Ovt0j35tv886OGq1dXxcWqy3cHY2lEMNOR195iQStTZSFip6vJbPB1sbYJ8Mm7keYc1Qj6D8a6kPtdGmVf63X7VOQxlYuAHGOySDeehDu/SpDc1td7v0Ta9VdlpGwViIyidmNVgGsiJinhHvGEBhVjKFaRn0goKjPC1lRpCrGl9O8pqoNu/ViFodArzUjdMxf7ueUYchkUKR8dGDkbmggShlEyzWURMBvNqNh+Z/p942XIUVEuQBqo53HE2BRqZENr2qjp6lisw6Sx6KeliGIUiooqV0wTdq61hwIDAQABAoIBAAT+ivKrBCd3NklLGS7fGlyREr3XFEUi63l99wHdeg00EYtzbFC+O7fwKaX5hlTKSqwn5WnbjBSzUW+hqHtnAOxCRGCQQlrde0A/k6j2OLPq5dPoCJ+TLlOYRNLmz2AGf9MqOgzd7xKan5w9s0DhNf3zR69mCm/OtOfjSIzNFLsyaq6Zk7balPa6YuenJYcDdy8OiO6wO+NMyMktUzg33HMOURMu3ZL35RtkNHotLqaokL8j+RwY5bHNYu1Pt9JIsv+LXFgle6x1X0uv70RN/vc6X4ZqBDdd1z7kEjp2O55Ofb9vYxGUtZyw1UT2rRHdPfRvk84o0KXpYwmP2niVqkECgYEA3yB/DieX3sES5El6/WUTgNPkLNiiJDi2NDgzmV5YJfYsdZSwTrab0niZWMtR7pRzUAoYg7TANGu8Vwuol2Ee0Ga7EgtfY1Y2zbwedUiPvRCTsWhqEU6xk4r3U7lpLiWwNPYIKboNWbzph7riM1QJHJqxJ0eiQ4vVk5z9SWBrBeECgYEAlqK0nwED+yCwfiYx2FaZ5gqX3fu7eorsco9s1A3693RbsS0aa+aVDYnitOlBWFOUKlk+fqjAiouO2suFN3eLGqjUaLJPKMajZ7szNK3PTCFsqzxm+fE4Mw6B/gBUpEo3cRWVSej54EWLbYB9JUeHEHXAP9iPeGdXJftsQeDaWGcCgYEAvAIvzQeDqojZmE5qOdXPZ0AkBb3MceTvcnTg1Zxvfh0+PR06qjiod+JypCU+NmAUAh9fpKrLQeB95ILIXjXRtxy5CG1YxOVCbHzU1VJ8+3xaVqR6q3a5nm78FCoo/F95aEbfffltgm3yARJxw3pN6zJVj5mGmo/bOPSRYCDETUECgYBGVMtuXeQE8ZtWGvE06CJM9O85VtqO+aQyTOLsE2b0+KADFmL6tBstyg5Ol4XJ/qP0Ldzu+E2FomldoJ6fajJJjUA3beFl0XDj8tSSqQBbtFNvk/Eki8rIk+J/vJnIZ1qBcylT6/IXE4Fo7BACQuY9+ix74toBxoY7FqvSCnEHywKBgQCR/+VqlkizOa2xGF5z9T07CeqPmCTmtuzCBsregZfaljG26Vrd/6z8qwcxaegkeA2w92RuwRwwC8NyQB2N2Qab19YiRJ5aKlTDP/xnJq5Q6yH5vZIi49akkLGcV1loKIudwyrz+4IidA/J+77lrZ9sjyzi4pk8KIpFgbctHbDmxw==
      -----END RSA PRIVATE KEY-----
      `,
      callbackURL: `https://127.0.0.1:6666/auth1/alipay-cb`,
      scope: 'auth_user',
    };
  },
})
export class AlipayStrategy extends WebPassportStrategyAdapter(Strategy, 'alipay') {
  async verify(...payload) {
    return payload;
  }
}
