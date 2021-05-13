import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "./users.service";
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (authHeader && (authHeader as string).split(' ')[1]) {
            const token = (authHeader as string).split(' ')[1];
            const decoded: any = jwt.verify(token, SECRET);
            const user = await this.userService.findById(decoded.id);

            if (!user) {
                throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
            }

            req.user = user.user;
            next();
        } else {
            throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
        }


    }
}