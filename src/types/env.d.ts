/**
 * Environment variables injected by dotenv-webpack at build time.
 * Declared explicitly because Node types are not included in the program.
 */
declare const process: {
    readonly env: {
        readonly API_URL: string;
        readonly API_KEY: string;
    };
};
