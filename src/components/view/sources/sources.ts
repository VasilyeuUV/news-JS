import { SourcePreview } from '../../../types/interfaces';
import { getElement, getTemplateFragment } from '../../../utils/dom';
import './sources.css';

/**
 * Renders the source buttons into the `.sources` container.
 *
 * Each button keeps the source id in `data-source-id`, which the controller
 * reads when the user clicks it.
 */
class Sources {
    /**
     * Replaces the current buttons with the given sources.
     *
     * @param data - sources returned by the `/sources` endpoint
     */
    public draw(data: ReadonlyArray<SourcePreview>): void {
        const container = getElement<HTMLElement>('.sources');
        const fragment = document.createDocumentFragment();

        data.forEach((item: SourcePreview): void => {
            const button = getTemplateFragment('#sourceItemTemp');

            getElement<HTMLElement>('.source__item-name', button).textContent = item.name;
            getElement<HTMLElement>('.source__item', button).dataset.sourceId = item.id;

            fragment.append(button);
        });

        container.append(fragment);
    }
}

export default Sources;
