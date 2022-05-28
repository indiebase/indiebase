export const CASBIN_OPTIONS = Symbol('CASBIN_OPTIONS');
export const CASBIN_ROLES = Symbol('CASBIN_ROLES');

export enum ACCESS {
  create,
  read,
  update,
  delete,
}
