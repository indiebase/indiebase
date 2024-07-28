export const hackerDtoAccountStatus = {
    "inactive": "inactive",
    "active": "active"
} as const;
export type HackerDtoAccountStatus = (typeof hackerDtoAccountStatus)[keyof typeof hackerDtoAccountStatus];
export const hackerDtoVisibility = {
    "public": "public",
    "protected": "protected",
    "private": "private"
} as const;
export type HackerDtoVisibility = (typeof hackerDtoVisibility)[keyof typeof hackerDtoVisibility];
export type HackerDto = {
    /**
     * @description User ID
     * @type number
    */
    id: number;
    /**
     * @description User email
     * @type number
    */
    email: number;
    /**
     * @description User nickname
     * @type string | undefined
    */
    nickname?: string;
    /**
     * @description User avatar url
     * @type string | undefined
    */
    avatarUrl?: string;
    /**
     * @description Prefer language
     * @type string | undefined
    */
    language?: string;
    /**
     * @description Authentication Type
     * @type string | undefined
    */
    authnType?: string;
    /**
     * @description One time password secret
     * @type boolean | undefined
    */
    enabled2FA?: boolean;
    /**
     * @description Location of registration
     * @type string | undefined
    */
    location?: string;
    /**
     * @description Account status
     * @type string | undefined
    */
    accountStatus?: HackerDtoAccountStatus;
    /**
     * @description Role
     * @type string | undefined
    */
    role?: string;
    /**
     * @description User sign in timestamp
     * @type string | undefined
    */
    signInAt?: string;
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
    /**
     * @description Biography
     * @type string | undefined
    */
    bio?: string;
    /**
     * @description User visibility
     * @type string | undefined
    */
    visibility?: HackerDtoVisibility;
    /**
     * @description User homepage
     * @type string | undefined
    */
    homepage?: string;
    /**
     * @description Github username not nickname
     * @type string | undefined
    */
    githubUsername?: string;
};