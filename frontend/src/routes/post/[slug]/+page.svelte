<script lang="ts">
	export let data;
	import SinglePost from '../../../components/SinglePost.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import langAvailability from '$lib/stores/langAvailability.js';
	let langpref, title, description, body;
	console.log(data.docs[0].body_english);

	$langAvailability.hindi = Boolean(data.docs[0].body_hindi);
	$langAvailability.english = Boolean(data.docs[0].body_english);

	langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
	body = langpref == 'hindi' ? data.docs[0].body_hindi : data.docs[0].body_english;
	console.log(data);
	let imgurl = `https://chunavexpress.com${data.docs[0].meta.image?.url}`;

	$: {
		title = langpref == 'hindi' ? data.docs[0].title_hindi : data.docs[0].title;
		description = data.docs[0].meta.description;
		console.log(langpref, $langAvailability);
	}

	onMount(() => {
		if (langpref == 'hindi' && !$langAvailability.hindi) {
			langpref = 'english';
		} else if (langpref == 'english' && !$langAvailability.english) {
			langpref = 'hindi';
		}
	});

	let schema = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		headline: data.docs[0].title,
		image: [imgurl],
		datePublished: data?.docs[0]?.createdAt,
		dateModified: data?.docs[0]?.updatedAt,
		author: [
			{
				'@type': 'Person',
				name: 'Editor',
				url: 'https://chunavexpress.com'
			}
		],

		description: description
	};
	let schemaMeGadhaHa = `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;
</script>

<svelte:head>
	<!-- Replace these values with your specific metadata -->
	<title>{title}</title>
	<meta property="og:site_name" content="Chunav Express" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="https://chunavexpress.com{data.docs[0].meta.image?.url}" />
	<meta property="og:image:secure_url" content="https://chunavexpress.com{data.docs[0].meta.image?.url}" />
	<meta property="og:image:alt" content={description} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="description" content={description} />

	{@html schemaMeGadhaHa}
</svelte:head>

<div class=" row mx-0 px-lg-3">
	<div class="col-12 col-lg-6 mx-lg-auto pt-3 px-lg-5">

		{#key langpref}
			{#each data.docs as doc}
				<SinglePost {doc} {langpref} />
			{/each}
		{/key}
		<!-- <h3 class="pb-1"><i class="fa-solid fa-fire text-danger" /> Trending Posts</h3> -->
	</div>
</div>
