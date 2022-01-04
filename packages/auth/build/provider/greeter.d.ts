import { helloworld } from '../domain/helloworld';
/**
 * package helloworld
 * service Greeter
 */
export declare class Greeter implements helloworld.Greeter {
    /**
     * Implements the SayHello RPC method.
     */
    sayHello(request: helloworld.HelloRequest): Promise<{
        message: string;
    }>;
}
