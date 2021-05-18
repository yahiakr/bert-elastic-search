import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from "joi";
import fs from "fs";
import asyncHandler from "express-async-handler";
// import { requireAuth } from "@middlewares/auth.middleware";
// import { checkAccess } from "@middlewares/checkAccess.middleware";

const express = require("express");
const router = express.Router();

/**
 * directory where all API routes are located
 */
let routesDir = "src/routes";

/**
 * A validation middleware, where it takes joi schema object as arguments,
 * to validate it against req.body, req.query, req.params, req.header, if validation
 * fails, a custom error will be throw based on what's written in the validation object
 */
function validateMiddleware(validate: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let key of Object.keys(validate)) {

            // parse nested query object
            if (key === "query") {
                try {
                    if (req[key].query) req[key].query = JSON.parse(req[key].query as string);
                    if (req[key].sort) req[key].sort = JSON.parse(req[key].sort as string);
                } catch (error) {
                    throw new Error(error);
                }
            }
            if (!Joi.isSchema(validate[key])) validate[key] = Joi.object(validate[key]);
            await validate[key].validateAsync(req[key as keyof Request]);
        }
        next();
    };
}

/**
 * Generate routes based on nested folders inside 'routes' directory, each directory
 * ends with a files named as http verb (get, post, put , delete, update),
 * these files follows the pattern verb#explanation.js (ex: get#user profile.js, post#client-login.js)
 * where the 'verb' will be used as http request method, and the 'explanation' will be used in the documentation,
 * and the directory will be used as route path
 */

function generateRoutes(dir: string) {
    fs.readdirSync(dir).forEach((filename: String) => {
        const path = `${dir}/${filename}`;
        const stat = fs.statSync(path);
        
        if (stat && stat.isDirectory()) {
            generateRoutes(path); // if it's still directory keep diving until we find a files
        } else if (stat.isFile()) {

            // regular expression to check a valid file format
            const fileNameFormat = /(get|put|post|delete)#[\w\s-]+\.ts/;
            if (filename.match(fileNameFormat)) {
                let [method, friendlyName] = filename.split("#"); // extract the method (http verb) the file name

                friendlyName = friendlyName.slice(0, -3); // trim the .ts extension from the file name
                const requestUrl = dir.split(`${routesDir}`)[1].replace(/#/g, ":"); // use directory path as request url
                const controller = require(`${path}`); // export controller object from the files at the end of the directory "path"

                const handler = controller.handler; // the route handler : here where the most business logic happens ex: manipulate database , data traitment, ...
                const permissions = controller.permissions; // routes permissions ex : public, admin, client , ...
                const validate = controller.validate; // validation object: is Joi schema used to validate body, params, headers, query
                const description = controller.description || "No description";
                const responses = controller.responses;
                const preMiddleware = controller.preMiddleware && Array.isArray(controller.preMiddleware) ? controller.preMiddleware : [];
                
                // if routes is not with public permission, needs to be protected
                // if (!permissions.includes("public")) preMiddleware.unshift(requireAuth, checkAccess(permissions));

                const expressHandler = () => async (req: Request, res: Response) => {
                    const response = await handler(req);
                    if (!response) {
                        res.status(204).send();
                    } else {
                        res.json(response);
                    }
                };

                router[method](requestUrl, ...preMiddleware, asyncHandler(validateMiddleware(validate)), asyncHandler(expressHandler()));
            }
        }
    });
}

/**
 * bind the router into express instance
 */
function bindRouter(app: any) {
    // Generate routes based on routes folder tree, and set them on the router object
    generateRoutes(routesDir);
    
    // TODO: Generate API documentation

    // Bind the router the express app instance
    app.use("/api", router);
}

export default bindRouter;