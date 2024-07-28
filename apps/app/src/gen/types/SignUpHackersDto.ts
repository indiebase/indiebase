export type SignUpHackersDto = {
    /**
     * @description Hacker account email
     * @default "dev@indiebase.com"
     * @type string
    */
    email: string;
    /**
     * @description Hacker account username
     * @default "indiebase-dev"
     * @type string
    */
    username: string;
    /**
     * @description Hacker account password, the password needs to be converted to SHA256 for transfer
     * @default "9b1ddbbcf45a850c792465c816bb43423fe9dc6383b6fbc3a16d25be907e3988"
     * @type string
    */
    password: string;
};