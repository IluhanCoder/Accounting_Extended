import { Request } from "express"
import { IncomingHttpHeaders } from 'http'
import User from "../user/user-type"

export type RegCredantials = {
    nickname: string,
    name: string,
    surname: string,
    lastname: string,
    admin: string,
    workTime: string,
    departament: string,
    password: string
}

export type LoginCredentials = {
    nickname: string,
    password: string
}

interface CustomHeaders extends IncomingHttpHeaders {
    authorization?: string;
}

export interface AuthenticatedRequest extends Request {
    user?: User,
    headers: CustomHeaders;
}