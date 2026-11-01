/**
 * News API response status: `ok` when data is returned, `error` otherwise.
 */
export type ApiStatus = 'ok' | 'error';

/**
 * A field the API may omit or return as `null`.
 */
export type Nullable<T> = T | null;

/**
 * Query parameters of a request. Some are set in `AppLoader` (the API key),
 * others belong to a specific call (`sources`, `pageSize`, etc.).
 */
export type RequestOptions = Partial<Record<string, string>>;

/**
 * Callback that receives the payload of a completed request.
 * @typeParam T - shape of the response for a specific endpoint
 * (`SourcesResponse` or `EverythingResponse`).
 */
export type Callback<T> = (data: T) => void;
