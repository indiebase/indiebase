export type ErrResponseSchema = {
    /**
     * @description Response logical code
     * @type number
    */
    code: number;
    /**
     * @description Response http code
     * @type number
    */
    statusCode: number;
    /**
     * @description Error responses message
     * @type object | undefined
    */
    message?: object;
    /**
     * @description Error responses timestamp
     * @type string, date-time
    */
    timestamp: string;
    /**
     * @description Error responses api path
     * @type string
    */
    path: string;
};