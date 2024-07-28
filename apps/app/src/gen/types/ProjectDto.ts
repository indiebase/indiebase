export const projectDtoStatus = {
    "poc": "poc",
    "wip": "wip",
    "archive": "archive",
    "operating": "operating",
    "closed": "closed"
} as const;
export type ProjectDtoStatus = (typeof projectDtoStatus)[keyof typeof projectDtoStatus];
export type ProjectDto = {
    /**
     * @description Project ID
     * @type number
    */
    id: number;
    /**
     * @description Project name
     * @type string
    */
    name: string;
    /**
     * @description Project description
     * @type string | undefined
    */
    description?: string;
    /**
     * @description Contact email
     * @type string | undefined
    */
    contactEmail?: string;
    /**
     * @description Project avatar url
     * @type string | undefined
    */
    avatarUrl?: string;
    /**
     * @description Project card pinned order
     * @type number | undefined
    */
    pinnedOrder?: number;
    /**
     * @description Pin the project
     * @type boolean | undefined
    */
    pinned?: boolean;
    /**
     * @description Project status
     * @type string | undefined
    */
    status?: ProjectDtoStatus;
    /**
     * @description Fallback package name
     * @type string | undefined
    */
    packageName?: string;
    /**
     * @description Project github repository
     * @type string | undefined
    */
    githubRepo?: string;
    /**
     * @description X-Indiebase-Reference-Id, the ID for business
     * @type string
    */
    referenceId: string;
    /**
     * @description Project created timestamp
     * @type string, date-time
    */
    createdAt: string;
    /**
     * @description Project updated timestamp
     * @type string, date-time
    */
    updatedAt: string;
};