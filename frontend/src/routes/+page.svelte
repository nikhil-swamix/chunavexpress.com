<script>
	export let data;

	import SinglePost from '../components/SinglePost.svelte';
	import { onMount } from 'svelte';
	import * as helpers from '$lib/helpers.js';
	let langpref = '';
	let updateLangpref = (pref) => {
		langpref = pref;
		window.localStorage['langpref'] = pref;
		return langpref;
	};
	async function initializeLangpref() {
		if (window.localStorage['langpref']) {
			langpref = window.localStorage['langpref'];
		}
		return langpref;
		console.log(langpref);
	}

	// onMount(initializeLangpref);
</script>

<section class="  container mx-auto">
	<div class="d-flex align-self-lg-start align-items-center justify-content-center py-4 px-lg-0 text-center">
		<h3 class=" p-lg-0 m-0">Language</h3>
		<div class=" d-inline">
			<div class="btn-group btn-group-sm ms-2" role="group" aria-label="Basic radio toggle button group">
				<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={langpref == 'english'} on:click={() => (langpref = updateLangpref('english'))} />
				<label class="btn btn-outline-dark" for="btnradio1">English</label>

				<input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={langpref == 'hindi'} on:click={() => (langpref = updateLangpref('hindi'))} />
				<label class="btn btn-outline-dark" for="btnradio2">हिंदी </label>
			</div>
		</div>
		<!-- <hr class="text-secondary" /> -->
		<!-- <hr /> -->
		<br />
	</div>
	<div class="row g-0">
		{#each data?.docs as doc}
			<div class=" col-lg-3 px-lg-3 my-2 border-0 d-block">
				<a class="card-text text-sm" href="https://chunavexpress.com/post/{doc.slug}">
					<div class="col-auto p-0" style="width: 100%; height:12em">
						<div class=" h-100 rounded" style="background-image: url('{doc.banner.url}');background-size: cover; background-position: center;" />
					</div>
					{doc.title_hindi || doc.title}
				</a>
			</div>
		{/each}
	</div>
	<h2 class="text-center">नवीनतम पोस्ट्स - Latest Posts</h2>
	<div class="row mx-0 px-0 my-lg-5 px-lg-2 pe-xxl-3">
		<div class="col-lg px-1 mx-auto">
			{#key langpref}
				{#await initializeLangpref()}
					<p>loading...</p>
				{:then langpref}
					{#each data?.docs as doc}
						<SinglePost {doc} {langpref} />
					{/each}
				{/await}
			{/key}
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
</section>

<style>
	a.card-text {
		font-size: 1em;
		color: #000;
		/* font-weight: 600; */
		line-height: 1.2em !important;
	}
</style>
