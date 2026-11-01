import { Endpoint } from '../../types/enums';
import { EverythingResponse, SourcesResponse } from '../../types/interfaces';
import { Callback } from '../../types/types';
import AppLoader from './appLoader';

/**
 * Application controller: turns user actions into News API requests.
 */
class AppController extends AppLoader {
    /**
     * Requests the list of available news sources.
     * @param callback - receives the `/sources` response
     */
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>({ endpoint: Endpoint.SOURCES }, callback);
    }

    /**
     * Requests articles of the source that was clicked.
     * @param event - click event delegated from the sources container
     * @param callback - receives the `/everything` response
     */
    public getNews(event: MouseEvent, callback: Callback<EverythingResponse>): void {
        const newsContainer = event.currentTarget as HTMLElement;
        const target = event.target as HTMLElement | null;
        const sourceItem = target?.closest<HTMLElement>('.source__item');

        if (!sourceItem || !newsContainer.contains(sourceItem)) {
            return;
        }

        const sourceId = sourceItem.dataset.sourceId;

        if (!sourceId || newsContainer.dataset.source === sourceId) {
            return;
        }

        newsContainer.dataset.source = sourceId;
        const options = { sources: sourceId };

        super.getResp<EverythingResponse>({ endpoint: Endpoint.EVERYTHING, options }, callback);
    }
}

export default AppController;
