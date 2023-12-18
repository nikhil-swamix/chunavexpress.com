<script>
	export let data;
	import SinglePost from '../../../components/SinglePost.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// console.log(data);

	let langpref;

	$: {
		langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
	}
	console.log($page.url);
	let body = langpref == 'hindi' ? data.docs[0].body_hindi : data.docs[0].body_english;
	let description = body.root.children[0].children[0].text
</script>

<svelte:head>
	<!-- Replace these values with your specific metadata -->
	<title>{data.docs[0].title}</title>
	<meta property="og:title" content={data.docs[0].title} />
	<meta property="og:description" content="{description}" />
	<meta property="og:image" content={data.docs[0].meta.image.url} />
	<meta property="og:url" content="{$page.url.href}" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class=" row mx-0 px-lg-3">
	<div class="col-12 col-lg-3 pt-3 px-lg-5">
		<!-- <h3 class="pb-1"><i class="fa-solid fa-fire text-danger" /> Trending Posts</h3> -->
	</div>
	<div class="col-12 col-lg-6 px-lg-3">
		{#key langpref}
			{#each data.docs as doc}
				<SinglePost {doc} {langpref} />
			{/each}
		{/key}
	</div>
</div>
