<script>
	export let data;

	import SinglePost from '../components/SinglePost.svelte';
	import { onMount } from 'svelte';
	import * as helpers from '$lib/helpers.js';
	import { page } from '$app/stores';

	let langpref;
	let showdocs;

	// doc['body_' + langpref]?.root?.children?.length
	// filter if lang not available

	$: {
		langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
		showdocs = data.docs.filter((doc) => doc['body_' + langpref]?.root?.children[0].children.length >= 1).slice(0, 12);
		console.log(showdocs.length, langpref);
	}
	// slice 12 posts
</script>

<section class="  container mx-auto">
	<div class="d-flex align-self-lg-start align-items-center justify-content-center py-2 px-lg-0 text-center"></div>
	{#key langpref}
		<div class="row g-0">
			{#each showdocs as doc}
				{#if doc['body_' + langpref]?.root?.children?.length >= 0}
					<div class=" col-lg-3 px-lg-3 my-2 border-0 d-block">
						<a class="card-text text-sm" href="/post/{doc.slug}">
							<div class="col-auto p-0" style="width: 100%; height:12em">
								<div class=" h-100 rounded" style="background-image: url('{doc.banner.url}');background-size: cover; background-position: center;" />
							</div>
							{#if langpref == 'hindi'}
								{doc.title_hindi}
							{:else}
								{doc.title}
							{/if}
						</a>
					</div>
				{/if}
			{/each}
		</div>
		<div class="row mx-0 px-0 my-lg-3 px-lg-2 pe-xxl-3">
			<h2 class="text-center bg-danger rounded text-white">LATEST POSTS</h2>
			<div class="col-lg px-1 mx-auto">
				{#each data?.docs as doc}
					<SinglePost {doc} bind:langpref />
				{/each}
			</div>
			<div class="col-lg-4 ps-lg-4 pe-lg-0 px-0">
				<div class="spon-content rounded-3 shadow overflow-hidden">
					<div class="card border-0">
						<div class="card-body p-0 position-relative">
							<img src="https://placehold.co/600x400?text=Chunavexpress" alt="this is a placeholder for custom ads network" height="360" />
							<div class="p-2">ads will beshown here.</div>
							<a href="./" class="btn btn-dark text-warning btn-sm py-0 position-absolute bottom-0 end-0 p-1 m-1 rounded-1">advt</a>
						</div>
					</div>
				</div>
				<h3 class="p-1 text-center rounded-2 mt-lg-3">Videos</h3>
				{#await helpers.getVideos()}
					<p>loading...</p>
				{:then videos}
					{#each videos as video}
						<div class="">
							<iframe
								class="rounded-4 overflow-hidden mt-lg-4"
								title="YouTube video player"
								id="ytplayer"
								type="text/html"
								width="100%"
								height="240"
								src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&controls=0`}
								frameborder="0"
							/>
						</div>
					{/each}
				{/await}
			</div>
		</div>
	{/key}
</section>

<style>
	a.card-text {
		font-size: 1em;
		color: #000;
		/* font-weight: 600; */
		line-height: 1.2em !important;
	}
</style>
