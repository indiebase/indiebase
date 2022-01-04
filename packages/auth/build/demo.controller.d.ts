import { ILogger } from '@midwayjs/logger';
export declare class UserController {
    logger: ILogger;
    userService: any;
    register(body: any): Promise<void>;
    login(body: any): Promise<void>;
}
