let baseURL = 'https://chunavexpress.com/api';
let mediaURL = 'https://chunavexpress.com';

export async function fetchjson(url) {
	let data = await (await fetch(url)).json();
	return data;
}

export async function getVideos() {
	// let url = 'http://localhost:3000/api/youtube';
	let url = 'https://chunavexpress.com/api/youtube';
	const res = await fetch(url);
	const data = await res.json();
	// console.log(data);
	return data.docs;
}

export async function latestPosts() {
	// http://localhost:3000/api/posts
	let data = await (await fetch(baseURL + '/posts')).json();
	// console.log(data);
	data.docs.map((post) => {
		if (post.banner) post.banner.url = mediaURL + post.banner.url;
		// https://source.unsplash.com/random/900x700/?fruit
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
