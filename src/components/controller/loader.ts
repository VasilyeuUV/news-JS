import { Endpoint, HttpMethod, HttpStatus } from '../../types/enums';
import { RequestParams } from '../../types/interfaces';
import { Callback, RequestOptions } from '../../types/types';

/**
 * Base HTTP client for the News API.
 *
 * Builds request URLs, performs `fetch` calls and forwards the parsed JSON to a
 * callback. Subclasses only decide which endpoint they work with.
 */
class Loader {
    /** Base API URL, e.g. `https://newsapi.org/v2/`. */
    protected readonly baseLink: string;
    /** Parameters added to every request, e.g. the API key. */
    protected readonly options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    /**
     * Sends a GET request to the endpoint and passes the response to the callback.
     *
     * @typeParam T - expected response shape of the endpoint
     * @param params - endpoint name and request-specific query parameters
     * @param callback - receives the parsed response body
     */
    public getResp<T>({ endpoint, options = {} }: RequestParams, callback: Callback<T>): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    /**
     * Throws on unsuccessful responses so the error reaches the `catch` block.
     *
     * @param res - response returned by `fetch`
     * @returns the same response when it is successful
     * @throws if `res.ok` is `false`
     */
    protected errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.UNAUTHORIZED || res.status === HttpStatus.NOT_FOUND) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw new Error(res.statusText);
        }

        return res;
    }

    /**
     * Builds the request URL from the base link, endpoint and query parameters.
     *
     * @param options - parameters of the current request
     * @param endpoint - API endpoint to call
     * @returns absolute URL with the encoded query string
     */
    protected makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        const params: string[] = [];

        Object.keys(urlOptions).forEach((key: string): void => {
            const value = urlOptions[key];

            if (value) {
                params.push(`${key}=${encodeURIComponent(value)}`);
            }
        });

        return `${this.baseLink}${endpoint}?${params.join('&')}`;
    }

    /**
     * Performs the request and routes the result to the callback or the console.
     *
     * @typeParam T - expected response shape of the endpoint
     * @param method - HTTP method to use
     * @param endpoint - API endpoint to call
     * @param callback - receives the parsed response body
     * @param options - extra query parameters of the request
     */
    private load<T>(method: HttpMethod, endpoint: Endpoint, callback: Callback<T>, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((error: unknown) => console.error(error));
    }
}

export default Loader;
