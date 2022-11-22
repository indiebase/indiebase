/* eslint-disable @typescript-eslint/ban-types */
import passport from '@fastify/passport';

export abstract class PassportSerializer {
  abstract serializeUser(user: any, done: Function);
  abstract deserializeUser(payload: any, done: Function);

  constructor() {
    const passportInstance = this.getPassportInstance();

    passportInstance.registerUserSerializer((user, done) =>
      this.serializeUser(user, done)
    );
    passportInstance.registerUserDeserializer((payload, done) =>
      this.deserializeUser(payload, done)
    );
  }

  getPassportInstance() {
    return passport;
  }
}
