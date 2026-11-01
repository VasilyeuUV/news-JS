import { EverythingResponse, SourcesResponse } from '../../types/interfaces';
import { getElement } from '../../utils/dom';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

/**
 * Application entry point: wires the controller and the view together.
 *
 * `App` owns both collaborators and exposes a single `start` method, so the
 * bundle entry point does not know how the pieces are constructed.
 */
class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    /**
     * Starts the application: loads the sources and subscribes to clicks on them.
     */
    public start(): void {
        const sourcesContainer = getElement<HTMLElement>('.sources');

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data: EverythingResponse): void => this.view.drawNews(data));
        });

        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
