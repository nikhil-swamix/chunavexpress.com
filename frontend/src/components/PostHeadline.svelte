<script>
	import { onMount } from 'svelte';
	import md5 from 'md5';

	export let doc, langpref;
	let title = '';
	let summary = '';

	let body;
	// console.log(doc)
	if (langpref === 'hindi') {
		title = doc.title_hindi || doc.meta.title;
		body = doc.body_hindi;
		summary =
			body.root.children
				.map((item) => item.children?.map((leaf) => leaf?.text || leaf?.children?.text))
				.join(' ')
				.slice(0, 180) + '...';
	} else {
		title = doc.title;
		body = doc.body_english;
		summary =
			body.root.children
				.map((item) => item.children?.map((leaf) => leaf?.text || leaf.children[0]?.text))
				.join(' ')
				.slice(0, 180) + '...';
		// console.log(doc);
	}

	function copy2clipboard() {
		navigator.clipboard.writeText(`https://chunavexpress.com/post/${doc.slug}`);
		alert('Link Copied to Clipboard!');
	}
</script>
<div class="mt-2">
    <div class="card-subtitle text-danger text-capitalize fw-semibold ">{doc.category?.[0].title}</div>
    <a href="https://chunavexpress.com/post/{doc.slug}" target="_blank" class="text-black text-capitalize"><span class="fw-semibold">{@html title}</span></a>

</div>

<!-- <span class="card-subtitle text-black-50 text-nano">Chunavexpress Staff on {new Date(doc.updatedAt).toLocaleDateString()} </span> -->
<!-- <p class="card-text">{@html summary}</p> -->
<!-- <div class="mt-auto">
		<a href="https://chunavexpress.com/post/{doc.slug}" target="_blank" class="btn btn-sm btn-outline-dark">Read More</a>
	</div> -->

<!-- <img src={doc?.banner?.url} class="card-img-left" alt="Post Thumbnail" width="180" /> -->
