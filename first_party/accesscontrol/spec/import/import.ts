import { AccessControl } from '../../src';

console.log(AccessControl);
const ac = new AccessControl();
ac.grant('user').createAny('resource');
console.log(ac.getGrants());
