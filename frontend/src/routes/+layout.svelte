<!-- add svelte head -->
<!-- <link rel="stylesheet" href="style.css" type="text/css" /> -->
<script>
	import '../lib/bootstrap.css';
	import '../lib/style.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div>
	<div id="mvp-site" class="" style="transform: none">
		<Header />
		<slot />
		<Footer />
	</div>
</div>

<style lang="less">
</style>
