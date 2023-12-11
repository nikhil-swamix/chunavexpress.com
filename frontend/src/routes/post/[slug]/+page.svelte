<script>
	export let data;
	import SinglePost from '../../../components/SinglePost.svelte';
	import { onMount } from 'svelte';

	// console.log(data);

	let langpref;
	let updateLangpref = (pref) => {
		langpref = pref;
		window.localStorage['langpref'] = pref;
		// console.log('langpref', langpref);
		return langpref;
	};
	onMount(() => {
		langpref = localStorage.getItem('langpref') || 'english';
	});
</script>

<div class=" row mx-0 px-lg-3">
	<div class="col-12 col-lg-3 pt-3 px-lg-5">
		<!-- <h3 class="pb-1"><i class="fa-solid fa-fire text-danger" /> Trending Posts</h3> -->
	</div>
	<div class="col-12 col-lg-6 px-lg-3">
		<div class="d-flex w-100 align-self-lg-start align-items-center col-lg-3 py-3 pb-lg-0 px-0 px-lg-0 text-center">
			<h3 class=" p-lg-0 m-0">Latest News in</h3>
			<div class=" d-inline">
				<div class="btn-group btn-group-sm ms-2" role="group" aria-label="Basic radio toggle button group">
					<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={langpref == 'english'} on:click={() => (langpref = updateLangpref('english'))} />
					<label class="btn btn-outline-dark" for="btnradio1">English</label>

					<input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={langpref == 'hindi'} on:click={() => (langpref = updateLangpref('hindi'))} />
					<label class="btn btn-outline-dark" for="btnradio2">हिंदी </label>
				</div>
			</div>
		</div>
		{#key langpref}
			{#each data.docs as doc}
				<SinglePost {doc} />
			{/each}
		{/key}
	</div>
</div>
