/**
 * Returns the first element matching the selector.
 *
 * Used instead of `document.querySelector` so callers do not need non-null
 * assertions: when the markup and the code disagree, failing fast with a
 * readable error is better than a cryptic `null` failure somewhere else.
 *
 * @typeParam T - expected element type, e.g. `HTMLAnchorElement`
 * @param selector - CSS selector of the element
 * @param root - subtree to search in, defaults to `document`
 * @returns the matched element
 * @throws if no element matches the selector
 *
 * @example
 * const container = getElement<HTMLElement>('.news');
 */
export function getElement<T extends Element>(selector: string, root: ParentNode = document): T {
    const element = root.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }

    return element;
}

/**
 * Clones the content of a `<template>` element into a detached document fragment.
 *
 * Cards are appended to the fragment first and inserted into the DOM once,
 * which keeps the browser from re-rendering the list for every article.
 *
 * @param selector - CSS selector of the template, e.g. `#newsItemTemp`
 * @returns a detached fragment with the cloned template content
 * @throws if the template is missing
 */
export function getTemplateFragment(selector: string): DocumentFragment {
    const template = getElement<HTMLTemplateElement>(selector);

    return template.content.cloneNode(true) as DocumentFragment;
}