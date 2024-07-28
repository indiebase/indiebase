export type OrgDto = {
    /**
     * @description Organization ID
     * @type number
    */
    id: number;
    /**
     * @description Organization name
     * @type string
    */
    name: string;
    /**
     * @description Organization description
     * @type string | undefined
    */
    description?: string;
    /**
     * @description Contact email
     * @type string | undefined
    */
    contactEmail?: string;
    /**
     * @description Organization avatar url
     * @type string | undefined
    */
    avatarUrl?: string;
    /**
     * @description Indiebase associated with the Github organization
     * @type string | undefined
    */
    githubOrg?: string;
    /**
     * @description Organization homepage website
     * @type string | undefined
    */
    homepage?: string;
    /**
     * @description Organization owner id
     * @type string | undefined
    */
    ownerId?: string;
    /**
     * @description Organization created timestamp
     * @type string, date-time
    */
    createdAt: string;
    /**
     * @description Organization updated timestamp
     * @type string, date-time
    */
    updatedAt: string;
};