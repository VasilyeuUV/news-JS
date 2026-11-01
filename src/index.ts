import App from './components/app/app';
import './global.css';

/** Single application instance; the bundle only loads the entry point once. */
const app = new App();

app.start();
