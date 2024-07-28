export type OkedResponseSchema = {
    /**
     * @description Response logical code
     * @type number
    */
    code: number;
    /**
     * @description Response message
     * @type object | undefined
    */
    message?: object;
};