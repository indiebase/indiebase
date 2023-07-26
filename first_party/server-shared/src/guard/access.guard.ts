// import { FastifyRequest } from 'fastify';
// import {
//   ACCESS_META,
//   CasbinService,
//   IAccessOptions,
// } from '@indiebase/nest-casbin';
// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AccessGuard implements CanActivate {
//   constructor(
//     private readonly casbin: CasbinService,
//     private readonly reflector: Reflector,
//   ) {}

//   getAccess(context: ExecutionContext) {
//     return this.reflector.get<IAccessOptions[]>(
//       ACCESS_META,
//       context.getHandler(),
//     );
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const access = this.getAccess(context);

//     const req = context.switchToHttp().getRequest<FastifyRequest>();
//     const { user } = req.session as any;

//     if (!user?.loggedIn) {
//       throw new UnauthorizedException({ message: 'Please login' });
//     }

//     // No @UseAccess() will pass directly.
//     if (!access) return true;

//     const domain =
//       (req.body as any)?.packageName ??
//       (req.body as any)?.domain ??
//       (req.query as any)?.packageName ??
//       (req.query as any)?.domain ??
//       req.headers?.['package-name'] ??
//       req.headers?.['domain'] ??
//       req.hostname;

//     for (const item of access) {
//       const { action, resource, possess } = item;
//       if (resource.indexOf('_') < 0) {
//         throw new Error(
//           `Resource ${resource} needs prefix to divide groups e.g. groupName_xxxxx`,
//         );
//       }

//       if (possess) {
//         return possess(context, req, user);
//       }

//       const hasPermission = await this.casbin.e.enforce(
//         user.username,
//         domain,
//         resource,
//         action,
//       );

//       if (!hasPermission) {
//         return false;
//       }
//     }

//     return true;
//   }
// }
