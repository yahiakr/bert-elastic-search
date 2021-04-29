import { AccessControl } from "accesscontrol";

/**
 * this is Role Based Access Control configuration
 */
let cAny = { "create:any": ["*"] };
let rAny = { "read:any": ["*"] };
let uAny = { "update:any": ["*"] };
let dAny = { "delete:any": ["*"] };

let cruAny = {...cAny, ...rAny, ...uAny};
let crudAny = {...cruAny, ...dAny};

let grantsObject = {

  client: {
    text: crudAny,
  },
  
};

export const accessControl = new AccessControl(grantsObject);