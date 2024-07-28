/**
 * @description The Health Check is successful
*/
export type Liveness200 = {
    /**
     * @type string | undefined
    */
    status?: string;
    /**
     * @type object
    */
    info?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    } | null;
    /**
     * @type object
    */
    error?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    } | null;
    /**
     * @type object | undefined
    */
    details?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    };
};
/**
 * @description The Health Check is not successful
*/
export type Liveness503 = {
    /**
     * @type string | undefined
    */
    status?: string;
    /**
     * @type object
    */
    info?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    } | null;
    /**
     * @type object
    */
    error?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    } | null;
    /**
     * @type object | undefined
    */
    details?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    };
};
/**
 * @description The Health Check is successful
*/
export type LivenessQueryResponse = {
    /**
     * @type string | undefined
    */
    status?: string;
    /**
     * @type object
    */
    info?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    } | null;
    /**
     * @type object
    */
    error?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    } | null;
    /**
     * @type object | undefined
    */
    details?: {
        [key: string]: {
            /**
             * @type string
            */
            status: string;
            [key: string]: any;
        };
    };
};
export type LivenessQuery = {
    Response: LivenessQueryResponse;
    Errors: Liveness503;
};