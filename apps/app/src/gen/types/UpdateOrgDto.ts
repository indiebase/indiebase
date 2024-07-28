export type UpdateOrgDto = {
    /**
     * @description Organization name
     * @default "publish"
     * @type string
    */
    name: string;
    /**
     * @default "dev@indiebase.com"
     * @type string | undefined
    */
    contactEmail?: string;
    /**
     * @default "xxxxxx"
     * @type string | undefined
    */
    description?: string;
    /**
     * @description Organization icon url
     * @default "https://api-dev.indiebase.deskbtm.com/favicon.ico"
     * @type string | undefined
    */
    avatarUrl?: string;
};