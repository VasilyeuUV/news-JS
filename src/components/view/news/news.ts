import { Article, ArticleLink } from '../../../types/interfaces';
import { getElement, getTemplateFragment } from '../../../utils/dom';
import { formatDate } from '../../../utils/format';
import './news.css';

/**
 * Renders news cards into the `.news` container.
 *
 * Only the first ten articles are shown: the API returns far more, but the page
 * is not meant to be an endless feed.
 */
class News {
    /**
     * Replaces the current list with the given articles.
     *
     * @param data - articles returned by the `/everything` endpoint
     */
    public draw(data: ReadonlyArray<Article>): void {
        const news = data.length >= 10 ? data.filter((_item: Article, index: number): boolean => index < 10) : data;
        const container = getElement<HTMLElement>('.news');
        const fragment = document.createDocumentFragment();

        news.forEach((item: Article, index: number): void => {
            const card = getTemplateFragment('#newsItemTemp');
            const cardItem = getElement<HTMLElement>('.news__item', card);

            if (index % 2) {
                cardItem.classList.add('alt');
            }

            const photo = getElement<HTMLElement>('.news__meta-photo', card);

            if (item.urlToImage) {
                photo.style.backgroundImage = `url(${item.urlToImage})`;
            }

            getElement<HTMLElement>('.news__meta-author', card).textContent = item.author ?? item.source.name;
            getElement<HTMLElement>('.news__meta-date', card).textContent = formatDate(item.publishedAt);

            getElement<HTMLElement>('.news__description-title', card).textContent = item.title;
            getElement<HTMLElement>('.news__description-source', card).textContent = item.source.name;
            getElement<HTMLElement>('.news__description-content', card).textContent = item.description;

            this.setReadMoreLink(card, item);

            fragment.append(card);
        });

        container.innerHTML = '';
        container.append(fragment);
    }

    /**
     * Points the "Read More" link of the card to the original article.
     *
     * @param card - fragment with the rendered card
     * @param article - article the link should lead to
     */
    private setReadMoreLink(card: DocumentFragment, article: ArticleLink): void {
        const link = getElement<HTMLAnchorElement>('.news__read-more a', card);

        link.href = article.url;
        link.title = article.title;
    }
}

export default News;
