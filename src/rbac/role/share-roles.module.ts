// import {
//   Module,
//   DynamicModule,
//   Global,
//   Abstract,
//   Type,
//   ForwardReference,
// } from '@nestjs/common';
// export const ROLES_TOKEN = '_ROLES_TOKEN_';

// @Global()
// @Module({})
// export class ShareRolesModule {
//   public static forRoot(roles: any): DynamicModule {
//     return {
//       module: ShareRolesModule,
//       providers: [
//         {
//           provide: ROLES_TOKEN,
//           useValue: roles,
//         },
//       ],
//       exports: [
//         {
//           provide: ROLES_TOKEN,
//           useValue: roles,
//         },
//       ],
//     };
//   }

//   public static forRootAsync(options: {
//     imports?: Array<
//       Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
//     >;
//     inject?: Array<Type<any> | string | symbol | Abstract<any> | Function>;
//     useFactory: (...args: any) => any;
//     grantsEndpoint?: string;
//   }): DynamicModule {
//     const provider = {
//       provide: ROLES_TOKEN,
//       useFactory: options.useFactory,
//       inject: options.inject || [],
//     };

//     return {
//       imports: [...(options.imports || [])],
//       module: ShareRolesModule,
//       providers: [provider],
//       exports: [provider],
//     };
//   }
// }
