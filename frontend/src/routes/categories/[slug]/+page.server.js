import { baseURL, mediaURL, fetchjson } from '$lib/helpers';

export async function load({ params }) {
	let url = `https://chunavexpress.com/api/posts?where[category.title][equals]=${params.slug}`;
	let data = await fetchjson(url);

	data.docs.map((post) => {
		if (post.banner) post.banner.url = mediaURL + post.banner.url;
		// https://source.unsplash.com/random/900x700/?fruit
		else post.banner = { url: '/elections/2.jpg' };
	});
	// console.log(data);
	return data;
}
