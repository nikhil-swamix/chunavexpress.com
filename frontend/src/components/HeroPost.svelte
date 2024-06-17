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

<div class="mx-auto mb-3">
	<div class="card-body">
		<h5 class="card-title text-danger text-capitalize">{doc.category?.[0].title}</h5>
		<a href="https://chunavexpress.com/post/{doc.slug}" target="_blank" class="text-black"><h2 class="card-title">{@html title}</h2></a>
		<span class="card-text text-end" ><small>{readingTime} min{readingTime > 1 ? 's' : ''} read</small> </span>
	</div>
	<img src={doc?.banner?.url} class="card-img-top rounded-3 shadow my-lg-3" alt={title} />
</div>

<style>
	/* Add any additional styles here if needed */
</style>
