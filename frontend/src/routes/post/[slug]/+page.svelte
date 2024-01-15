<script>
	export let data;
	import SinglePost from '../../../components/SinglePost.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import langAvailability from '$lib/stores/langAvailability.js';
	let langpref, title, description, body;

	$langAvailability.hindi = Boolean(data.docs[0].body_hindi)
	$langAvailability.english = Boolean(data.docs[0].body_english)
	console.log($langAvailability);


	langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
	body = langpref == 'hindi' ? data.docs[0].body_hindi : data.docs[0].body_english;

	$: {
		title = langpref == 'hindi' ? data.docs[0].title_hindi : data.docs[0].title;
		description = body?.root.children[0].children[0]?.text;
		// console.log(langpref, $langAvailability);
	}
</script>

<svelte:head>
	<!-- Replace these values with your specific metadata -->
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={data.docs[0].meta.image?.url} />
	<meta property="og:image:alt" content={data.docs[0].meta.image?.alt} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class=" row mx-0 px-lg-3">
	<div class="col-12 pt-3 px-lg-5">
		{#if body?.root?.children[0].children.length < 1}
			<h2 class="py-5 text-center my-5">
				<!-- fa cross mark -->
				<i class="fa-solid fa-circle-exclamation text-danger" />
				Sorry This post is not available in {langpref}
			</h2>
		{:else}
			<div class="col-12 col-lg-8 px-lg-3 mx-auto">
				{#key langpref}
					{#each data.docs as doc}
						<SinglePost {doc} {langpref} />
					{/each}
				{/key}
			</div>
			<!-- else content here -->
		{/if}
		<!-- <h3 class="pb-1"><i class="fa-solid fa-fire text-danger" /> Trending Posts</h3> -->
	</div>
</div>
