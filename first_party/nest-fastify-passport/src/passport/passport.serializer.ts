/* eslint-disable @typescript-eslint/ban-types */
import passport from '@fastify/passport';

export abstract class PassportSerializer {
  abstract serializeUser(user: any, req: any);
  abstract deserializeUser(payload: any, req: any);

  constructor() {
    const passportInstance = this.getPassportInstance();

    passportInstance.registerUserSerializer((user, req) =>
      this.serializeUser(user, req)
    );
    passportInstance.registerUserDeserializer((payload, req) =>
      this.deserializeUser(payload, req)
    );
  }

  getPassportInstance() {
    return passport;
  }
}
