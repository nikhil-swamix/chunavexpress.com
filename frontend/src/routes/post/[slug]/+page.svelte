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
		
		{#key langpref}
			{#each data.docs as doc}
				<SinglePost {doc} {langpref} />
			{/each}
		{/key}
	</div>
</div>
