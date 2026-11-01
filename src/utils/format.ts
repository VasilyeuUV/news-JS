/**
 * Formats a News API date as `DD.MM.YYYY`.
 *
 * `publishedAt` arrives as ISO 8601 (`2024-02-12T07:18:51Z`) and the card shows
 * only the date part, so full date localisation is not needed here.
 *
 * @param isoDate - publication date, e.g. `2024-02-12T07:18:51Z`
 * @returns date in `DD.MM.YYYY`, or the input unchanged if it cannot be split
 *
 * @example
 * formatDate('2024-02-12T07:18:51Z'); // '12.02.2024'
 */
export function formatDate(isoDate: string): string {
    const [datePart] = isoDate.split('T');
    const [year, month, day] = datePart.split('-');

    if (!year || !month || !day) {
        return isoDate;
    }

    return `${day}.${month}.${year}`;
}