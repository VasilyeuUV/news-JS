import { EverythingResponse, SourcesResponse } from '../../types/interfaces';
import News from './news/news';
import Sources from './sources/sources';

/**
 * View facade: hides the concrete components from the application entry point.
 *
 * The controller hands over raw API responses, and the view decides which
 * component renders them.
 */
export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    /**
     * Renders the articles of the `/everything` response.
     *
     * @param data - response of the `/everything` endpoint
     */
    public drawNews(data: EverythingResponse): void {
        this.news.draw(data.articles ?? []);
    }

    /**
     * Renders the sources of the `/sources` response.
     *
     * @param data - response of the `/sources` endpoint
     */
    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources ?? []);
    }
}

export default AppView;
