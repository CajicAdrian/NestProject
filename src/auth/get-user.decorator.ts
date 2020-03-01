import { User } from './user.entity';
import { createParamDecorator } from "@nestjs/common";

export const getUser = createParamDecorator((data, req): User => {
    return req.user;
});