# News JS → TypeScript

News portal built on the [News API](https://newsapi.org/): a list of sources and
the latest articles of the selected source.

## Requirements

-   Node.js 18+

## Install

```bash
npm install
```

## API modes

The API configuration is injected at build time by `dotenv-webpack` from a
mode-specific env file (see `webpack.config.js`, `--env envFile=…`).

| Mode                      | Command               | Env file                       | Endpoint                                   |
| ------------------------- | --------------------- | ------------------------------ | ------------------------------------------ |
| development, static mocks | `npm start`           | `.env.development` (committed) | `https://rss-news-api.onrender.com/mocks/` |
| local, real data          | `npm run start:local` | `.env.local`                   | `https://newsapi.org/v2/`                  |
| production                | `npm run build`       | `.env.production`              | `https://rss-news-api.onrender.com/`       |

`.env.local` and `.env.production` are not tracked — copy `.env.example` and
put your own key from https://newsapi.org/register there. The deployed version
goes through the RS School CORS proxy, because News API serves requests only
from `localhost`.

The mocks return a static dataset (100 articles of one source), so switching
sources is visible only in `npm run start:local` and on the deployed build.

## Scripts

| Script                | Action                                  |
| --------------------- | --------------------------------------- |
| `npm start`           | dev server on mocks                     |
| `npm run start:local` | dev server with the real API            |
| `npm run build`       | production bundle into `dist/`          |
| `npm run deploy`      | build and publish `dist/` to `gh-pages` |
| `npm run typecheck`   | `tsc --noEmit`                          |
| `npm run lint`        | ESLint for `.ts`                        |
| `npm run format`      | Prettier for `src/`                     |
