<script>
	export let data;
	import SinglePost from '../../../components/SinglePost.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as helpers from '$lib/helpers.js';

	let langpref;
	let updateLangpref = (pref) => {
		langpref = pref;
		window.localStorage['langpref'] = pref;
		// console.log('langpref', langpref);
		return langpref;
	};
	$: {
		$page.url.searchParams.get('lang') == 'en' ? (langpref = 'english') : (langpref = 'hindi');
	}
	onMount(() => {
		langpref = localStorage.getItem('langpref') || 'english';
	});
</script>

<div class=" row d-flex justify-content-center px-lg-3">
	<div class="col-12 col-lg-8 px-lg-3">
		<div class="d-flex w-100 align-self-lg-start align-items-center col-lg-3 py-3 pb-lg-0 px-0 px-lg-0 text-center">
			<h3 class=" p-lg-0 m-0">
				Showing {data.docs.length} Posts from
				<button class="btn btn-danger p-1">
					{$page.params.slug}
				</button>
			</h3>
		</div>
		{#key langpref}
			{#each data.docs as doc}
				<SinglePost {doc} {langpref} />
			{/each}
		{/key}
	</div>
	<div class="col-lg-3 pt-lg-3">
		<h3 class="pb-1"><i class="fa-solid fa-fire text-danger" /> Trending Now</h3>
		{#await helpers.getVideos()}
			<p>loading...</p>
		{:then videos}
			{#each videos.slice(0, 3) as video}
				<div class=" mt-lg-3">
					<iframe
						class="rounded-4 overflow-hidden"
						title="YouTube video player"
						id="ytplayer"
						type="text/html"
						width="100%"
						height="240"
						src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0`}
						frameborder="0"
					/>
				</div>
			{/each}
		{/await}
	</div>
</div>
