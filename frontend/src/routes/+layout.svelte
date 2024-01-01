<!-- add svelte head -->
<!-- <link rel="stylesheet" href="style.css" type="text/css" /> -->
<script>
	import { page } from '$app/stores';
	import '../lib/bootstrap.css';
	import '../lib/style.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	let langpref;
	$: {
		langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
	}
</script>

<div>
	{#key langpref}
		<div id="mvp-site" class="" style="transform: none">
			<Header />
			<slot />
			<Footer />
		</div>
	{/key}
</div>

<style lang="less">
</style>
