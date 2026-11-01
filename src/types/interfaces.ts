import { Endpoint } from './enums';
import { ApiStatus, Nullable, RequestOptions } from './types';

/**
 * News source returned by the `/sources` endpoint.
 */
export interface Source {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: string;
    readonly language: string;
    readonly country: string;
}

/**
 * Minimal source shape required by the view:
 * `id` for the attribute, `name` for the label.
 */
export type SourcePreview = Readonly<Pick<Source, 'id' | 'name'>>;

/**
 * Source nested in an article (`article.source`).
 */
export interface ArticleSource {
    readonly id: Nullable<string>;
    readonly name: string;
}

/**
 * Article returned by the `/everything` endpoint.
 */
export interface Article {
    readonly source: ArticleSource;
    readonly author: Nullable<string>;
    readonly title: string;
    readonly description: Nullable<string>;
    readonly url: string;
    readonly urlToImage: Nullable<string>;
    readonly publishedAt: string;
    readonly content: Nullable<string>;
}

/** Data required to render the "Read More" link. */
export type ArticleLink = Pick<Article, 'title' | 'url'>;

/** Response of the `/sources` endpoint. */
export interface SourcesResponse {
    readonly status: ApiStatus;
    readonly sources?: ReadonlyArray<Source>;
}

/** Response of the `/everything` endpoint. */
export interface EverythingResponse {
    readonly status: ApiStatus;
    readonly totalResults?: number;
    readonly articles?: ReadonlyArray<Article>;
}

/** Request parameters accepted by `Loader.getResp`. */
export interface RequestParams {
    readonly endpoint: Endpoint;
    readonly options?: RequestOptions;
}