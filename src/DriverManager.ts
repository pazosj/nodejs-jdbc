import { isObject, isString } from './Helper';
import { getInstance } from './jinst';

const java = getInstance();

const DM = 'java.sql.DriverManager';

export function getConnection(...args: any[]) {
  //allow for password to be a function
  if (typeof args[2] === 'function') {
    args[1].putSync('password', args[2]());
    args.pop();
  }

  // Add DM and 'getConnection' string onto beginning of args
  // (unshift in reverse order of desired order)
  args.unshift('getConnection');
  args.unshift(DM);

  // Forward modified arguments to java.callStaticMethod
  return java.callStaticMethod(...args);
}

export function getConnectionSync(...args: any[]) {
  //allow for password to be a function
  if (typeof args[2] === 'function') {
    args[1].putSync('password', args[2]());
    args.pop();
  }

  // Add DM and 'getConnection' string onto beginning of args
  // (unshift in reverse order of desired order)
  args.unshift('getConnection');
  args.unshift(DM);

  // Forward modified arguments to java.callStaticMethod
  return java.callStaticMethodSync(...args);
}

export function getLoginTimeout() {
  return java.callStaticMethodSync(DM, 'getLoginTimeout');
}

export function registerDriver(driver: string) {
  return java.callStaticMethodSync(DM, 'registerDriver', driver);
}

export function setLoginTimeout(seconds) {
  return java.callStaticMethodSync(DM, 'setLoginTimeout', seconds);
}
