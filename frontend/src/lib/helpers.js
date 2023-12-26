let baseURL = 'https://chunavexpress.com/api';
let mediaURL = 'https://chunavexpress.com';

export async function fetchjson(url) {
	let data = await (await fetch(url)).json();
	return data;
}

export async function getVideos() {
	// let url = 'http://localhost:3000/api/youtube';
	let url = 'https://chunavexpress.com/api/youtube?limit=20';
	const res = await fetch(url);
	const data = await res.json();
	// add intentional 3000ms delay
	await new Promise((r) => setTimeout(r, 5000));

	return data.docs;
}

export async function latestPosts() {
	// http://localhost:3000/api/posts
	let data = await (await fetch(baseURL + '/posts?limit=12')).json();
	// console.log(data);
	data.docs.map((post) => {
		if (post.banner) post.banner.url = mediaURL + post.banner.url;
		else post.banner = { url: '/elections/2.jpg' };
	});

	return data;
}

export async function load() {
	let data = await fetch(baseURL + '/posts?depth=1');
	let json = await data.json();
	// console.log(json);
	return {
		json
	};
}

export { baseURL, mediaURL };
