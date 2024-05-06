import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./auth-types";
import AuthError from "./auth-errors";

function authChecker (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const user = req.user;
    if(!user) {
        throw AuthError.Unauthorized();
    }
    next();
}

export default authChecker;