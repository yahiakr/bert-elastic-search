import { Request, Response, NextFunction } from 'express';
import Error from 'http-errors';
import { accessControl } from "@shared/accessControl";
import { Query, Permission } from 'accesscontrol';

/**
 * this access control middleware , it check the user req.client.roles ability to
 * to apply an action to a given resource, action and resource extracted from actionResource
 * example : read.ac_client means action is read and resource is ac_client, which check whether the client
 * with roles in req.client.roles is able to read from ac_client or no
 */
export function checkAccess(actionResource: String) {
  return function (req: Request, res: Response, next: NextFunction) {

    if (!req.user || !req.user.roles) throw Error(400, "USER_HAS_NO_ROLES");

    const [action, resource] = actionResource.split(".");

    let permission = accessControl.can(req.user.roles)[action as keyof Query](resource) as Permission;

    if (!permission.granted) next(Error(403, "Your not authorized to this resource"));
    next();
  };
}