# Reddit API Proxy (Cloudflare Worker)

Proxies requests to Reddit's OAuth2 API with edge caching and CORS headers.

## Setup

### 1. Create a Reddit app

1. Go to https://www.reddit.com/prefs/apps
2. Click **create app** or **create another app**
3. Fill in:
   - **name**: `KOTD Boss Viewer`
   - **type**: `web app`
   - **redirect uri**: `http://localhost` (not used but required)
4. Note the **client ID** (under the app name) and **client secret**

### 2. Deploy the Worker

```bash
npm install -g wrangler      # if not already installed
cd worker
wrangler login
wrangler secret put CLIENT_ID       # paste your Reddit client ID
wrangler secret put CLIENT_SECRET   # paste your Reddit client secret
wrangler deploy
```

After deployment, you'll get a URL like `https://reddit-proxy.your-subdomain.workers.dev`.

### 3. Update the site

In both `js/list.js` and `refresher/refresher.js`, change:

```js
const API_BASE_URL = 'https://api.reddit.com';
```

to:

```js
const API_BASE_URL = 'https://reddit-proxy.your-subdomain.workers.dev';
```

## How it works

1. The browser calls the Worker URL with the same path/query as the Reddit API
2. The Worker strips the `_` cache-busting param and checks Cloudflare's edge cache
3. If cached (TTL: 30s), it returns the cached response with CORS headers
4. If not cached, it authenticates via OAuth2 `client_credentials` and fetches from `oauth.reddit.com`
5. The response is cached at the edge and returned with CORS headers

This keeps 403s and token refreshes off the critical path for cached requests.
