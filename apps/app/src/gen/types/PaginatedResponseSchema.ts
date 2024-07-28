export type PaginatedResponseSchema = {
    /**
     * @description Total items
     * @type number
    */
    total: number;
    /**
     * @description Current page
     * @type number
    */
    pageIndex: number;
    /**
     * @description Page size
     * @type number
    */
    pageSize: number;
    /**
     * @description Last page
     * @type number
    */
    lastPage: number;
    /**
     * @description Previous page
     * @type number
    */
    prevPage: number;
    /**
     * @description Next page
     * @type number
    */
    nextPage: number;
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