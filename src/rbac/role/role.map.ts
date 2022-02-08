// /**
//  * 默认角色
//  * @enum {String}
//  */
// export enum DefaultRoles {
//   /**
//    * 站长
//    */
//   SITE_OWNER = 'SITE_OWNER',
//   /**
//    * 比赛管理员
//    */
//   COMPETITION_ADMIN = 'COMPETITION_ADMIN',
//   /**
//    * 院系管理员
//    */
//   DEPARTMENT_ADMIN = 'DEPARTMENT_ADMIN',
// }

// export class MemoryRoles {
//   private static _mr: MemoryRoles;
//   private _r: RoleEntity[];

//   public static create() {
//     if (!this._mr) {
//       this._mr = new MemoryRoles();
//       return this._mr;
//     } else {
//       return this._mr;
//     }
//   }

//   public set(roles: RoleEntity[]) {
//     this._r = Array.from(roles);
//   }

//   public get() {
//     return this._r;
//   }

//   public clear() {
//     this._r = [];
//     return this._r;
//   }
// }
