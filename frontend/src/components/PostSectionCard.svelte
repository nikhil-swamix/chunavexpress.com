<script>
	export let doc;
	export let langpref;
	let title = '';
	let summary = '';
	let fulltext = '';
	let body;
	let readingTime = 0;

	// Default text content
	const defaultContent = { root: { children: [{ text: '' }] } };

	if (langpref === 'hindi') {
		title = doc.title_hindi || doc.meta.title;
		body = doc.body_hindi || defaultContent;
		fulltext = body?.root?.children?.map((item) => item.children?.map((leaf) => leaf?.text || leaf.children?.[0]?.text || '')).join(' ');
		summary = fulltext.slice(0, 180);
	} else {
		title = doc.title;
		body = doc.body_english || defaultContent;
		fulltext = body.root.children.map((item) => item.children?.map((leaf) => leaf?.text || leaf.children?.[0]?.text || '')).join(' ');
		summary = fulltext.slice(0, 180);

		// Calculate reading time
	}
	readingTime = Math.round(fulltext.split(' ').length / 200);

</script>

<div class="card mt-2">
	<!-- Optional thumbnail image -->
	{#if doc?.banner?.url}
		<img src={doc.banner.url} class="card-img-top" alt="Post Thumbnail" />
	{/if}

	<div class="card-body">
		<div class="card-subtitle text-danger text-capitalize fw-semibold">
			{doc.category?.[0].title}
		</div>
		<a href="https://chunavexpress.com/post/{doc.slug}" target="_blank" class="text-black text-capitalize">
			<h5 class="card-title fw-semibold">{@html title}</h5>
		</a>
        <div><span class="card-text text-end" ><small>{readingTime} min{readingTime > 1 ? 's' : ''} read</small> </span></div>
		<!-- Optional publication date and author information -->
		<!-- <span class="card-subtitle text-black-50 text-nano">Chunavexpress Staff on {new Date(doc.updatedAt).toLocaleDateString()} </span> -->
		<!-- <p class="card-text">{@html summary}</p> -->
	</div>
</div>

<style>
	.card-body {
		position: relative;
	}
	.text-nano {
		font-size: 0.9rem;
	}
</style>
