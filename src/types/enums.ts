/**
 * HTTP methods used when calling the News API.
 */
export enum HttpMethod {
    /** Read-only request. */
    GET = 'GET',
    /** Request that modifies data (not used in the current app version). */
    POST = 'POST',
}

/**
 * News API v2 endpoints.
 * @see https://newsapi.org/docs/endpoints
 */
export enum Endpoint {
    /** List of available news sources. */
    SOURCES = 'sources',
    /** Articles filtered by source and/or search query. */
    EVERYTHING = 'everything',
}

/**
 * Response codes the app handles explicitly:
 * they are logged to the console before the error is thrown.
 */
export enum HttpStatus {
    /** Invalid or missing API key. */
    UNAUTHORIZED = 401,
    /** Requested resource was not found. */
    NOT_FOUND = 404,
}
