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

<div class=" mb-3  d-flex flex-column overflow-hidden">
	<div class="image-container">
		<img src={doc?.banner?.url} class="card-img-top" alt="Post Thumbnail" />
		<span class="reading-time">{readingTime} min read</span>
	</div>
	<div class="card-body p-2">
		<a href={`https://chunavexpress.com/post/${doc.slug}`} target="_blank" class="text-black">
			<h2 class="card-title">{@html title}</h2>
		</a>
		<span class="card-subtitle text-black-50 text-nano"> Chunavexpress Staff </span>
		<!-- <p class="card-text">{@html summary}</p> -->
	</div>
</div>

<style>
	.card-title {
		font-size: 1.2em;
	}
	.card {
		max-width: 100%;
	}
	.card-img-top {
		width: 100%;
		object-fit: cover;
	}
	.card-body {
		padding: 1.25rem;
	}
	.card-text {
		font-size: 1em;
		color: #666;
	}
	.text-nano {
		font-size: 0.8em;
	}
	.image-container {
		position: relative;
	}
	.reading-time {
		position: absolute;
		bottom: 8px;
		right: 8px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.9em;
	}
</style>
