import { RequestOptions } from '../../types/types';
import Loader from './loader';

/**
 * Loader configured with the API credentials from the environment.
 */
class AppLoader extends Loader {
    constructor() {
        const options: RequestOptions = { apiKey: process.env.API_KEY };
        super(process.env.API_URL, options);
    }
}

export default AppLoader;
