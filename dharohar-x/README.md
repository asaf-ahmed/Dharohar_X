# Dharohar X

Dharohar X is a guide to India's monuments, traditions, food and crafts. Browse the collection, explore sites on a map, or open the 3D temple models on the AR pages.

## Run locally

You’ll need Node.js and npm. From this folder, run:

```sh
npm install
npm run dev
```

Vite prints the local address when the server starts. To make a production build, run `npm run build`; use `npm run preview` to view that build locally. On Windows, `run.bat` can install dependencies and start the dev server for you. On macOS or Linux, use `./run.sh`.

The install step tries to download the site's image assets. If that step cannot reach the internet, the rest of the site can still run; try `npm run fetch-images` again when a connection is available.

## Optional setup

### Map

The Explore page can show a live Google map. Copy `.env.example` to `.env.local` and add a Google Maps JavaScript API key as `VITE_GOOGLE_MAPS_API_KEY`. Without a key, the page uses its static map fallback. Restart the dev server after changing environment variables. Keep `.env.local` out of commits and shared build archives.

### AI guide and image identification

These features run with local fallback responses by default. To enable Groq responses, install and start the separate server:

```sh
cd server
npm install
```

Copy `server/.env.example` to `server/.env`, add your `GROQ_API_KEY`, then run:

```sh
npm start
```

The server listens on port 5000 by default. The frontend can be pointed to another address with `VITE_AI_API_URL` in `.env.local`.

## Deploy

The site and AI server are separate services. Build the site with `npm run build` and publish the generated `dist/` directory on a static host. The included `public/_redirects` file supports single-page routing on hosts that read Netlify-style redirects; configure equivalent fallback routing if your host does not.

Deploy `server/` as a Node service with `npm install` and `npm start`. Set `GROQ_API_KEY` in the host's secret environment settings, set `NODE_ENV=production`, and set `ALLOWED_ORIGINS` to the exact public frontend origin (for example, `https://your-site.example`). Do not upload `.env` files or put the Groq key in a `VITE_` variable.

Set `VITE_AI_API_URL` to the deployed AI server's public base URL in the frontend build environment, then rebuild the site. In production the frontend no longer tries `localhost` when this value is missing, and the backend refuses to start without an allowed frontend origin. For a live Google map, also set `VITE_GOOGLE_MAPS_API_KEY` in the frontend build environment.

## Where things live

- `src/pages/` contains the site's pages; `src/data/` holds monument, culture, cuisine and model information.
- `src/components/` contains shared interface components, including the 3D model viewer.
- `public/` contains static files such as audio and models. `server/` holds the optional AI backend.
- `SOURCES-AND-LICENSES.txt` lists credits and licensing information for project assets.
