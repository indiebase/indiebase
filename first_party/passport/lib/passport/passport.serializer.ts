/* eslint-disable @typescript-eslint/ban-types */
import passport from '@fastify/passport';
import { type FastifyRequest } from 'fastify';

export abstract class PassportSerializer {
  abstract serializeUser(user: any, req: FastifyRequest);
  abstract deserializeUser(payload: any, req: FastifyRequest);

  constructor() {
    const passportInstance = this.getPassportInstance();

    passportInstance.registerUserSerializer(async (user, req) =>
      this.serializeUser(user, req as any)
    );
    passportInstance.registerUserDeserializer(async (payload, req) =>
      this.deserializeUser(payload, req as any)
    );
  }

  getPassportInstance() {
    return passport;
  }
}
