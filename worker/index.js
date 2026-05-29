const REDDIT_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';
const REDDIT_API = 'https://oauth.reddit.com';
const CACHE_TTL = 5;

let token = null;
let tokenExpiry = 0;

async function getToken() {
	if (token && Date.now() < tokenExpiry - 60000) return token;

	const resp = await fetch(REDDIT_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'KOTD-Boss-Viewer/1.0 (by /u/linden_slam)',
		},
		body: 'grant_type=client_credentials',
	});

	if (!resp.ok) {
		throw new Error('Token request failed: ' + resp.status);
	}

	const data = await resp.json();
	token = data.access_token;
	tokenExpiry = Date.now() + data.expires_in * 1000;
	return token;
}

function addCorsHeaders(response) {
	const headers = new Headers(response.headers);
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type');
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: headers,
	});
}

function handleOptions() {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
		},
	});
}

function corsResponse(body, status) {
	return new Response(body, {
		status: status || 500,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Content-Type': 'text/plain',
		},
	});
}

async function handleRequest(event) {
	try {
		const request = event.request;
		if (request.method === 'OPTIONS') return handleOptions();

		const url = new URL(request.url);
		const cache = caches.default;

		const cacheUrl = new URL(url);
		cacheUrl.searchParams.delete('_');
		const cacheKey = new Request(cacheUrl.toString());

		let response = await cache.match(cacheKey);
		if (response) return addCorsHeaders(response);

		const token = await getToken();
		const redditUrl = REDDIT_API + url.pathname + cacheUrl.search;

		response = await fetch(redditUrl, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'User-Agent': 'KOTD-Boss-Viewer/1.0 (by /u/linden_slam)',
			},
		});

		if (response.ok) {
			const clonedResponse = new Response(response.clone().body, response.clone());
			clonedResponse.headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);
			event.waitUntil(cache.put(cacheKey, clonedResponse));
		}

		return addCorsHeaders(response);
	} catch (err) {
		return corsResponse('Proxy error: ' + err.message, 502);
	}
}

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event));
});
