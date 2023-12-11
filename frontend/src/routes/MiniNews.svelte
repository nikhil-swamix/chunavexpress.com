<!-- REFERENCE
<script>
	export let doc;
	let body = []; // html strings rendered

	doc.body.root.children.map((item) => {
		let render = '';
		let isBold = item.children[0].format == 1 ? 'fw-bold lead' : '';
		let spacer = 'mb-4';

		if (item.type === 'paragraph') {
			render = `<p class="${isBold} ${spacer}">${item.children[0].text}</p>`;
		} else if (item.type === 'image') {
			render = `<img src=${item.url} alt=${item.alt} />`;
		} else if (item.type === 'heading') {
			render = `<${item.tag} class="${spacer} ">${item.children[0].text}</${item.tag}>`;
		} else if (item.type === 'list') {
			render = `<${item.tag} class="${spacer}">${item.children[0].text}</${item.tag}>`;
		}

		body.push(render);

		return body;
	});
</script>

<div class="card px-lg-2 border-0">
	<div class="post-head">
		<h1 class="">{doc.title || ''}</h1>
		<p class="my-3 text-black-50">
			Author {doc.author.username || ''}, Last Updated On : {doc.updatedAt.split('T')[0] || ''}
		</p>
	</div>
	<img src={doc.banner.url} class="card-img-top rounded-4" alt="..." />

	<div class="card-body px-0 text-justify">
		{#each body as item}
			{@html item}
		{/each}
		  <p class="card-text">{content || ''}</p>
		<a href="#" class="btn btn-primary">Go somewhere</a> 
	</div>
</div>

<style lang="less">
	p {
		font-size: 1em !important;
	}
</style>

-->

<script>
	export let doc;
	let body = []; // html strings rendered

	doc.body.root.children.map((item) => {
		let render = '';
		let isBold = item.children[0].format == 1 ? 'fw-bold lead' : '';
		let spacer = 'mb-4';

		if (item.type === 'paragraph') {
			render = `<p class="${isBold} ${spacer}">${item.children[0].text}</p>`;
		} else if (item.type === 'image') {
			render = `<img src=${item.url} alt=${item.alt} />`;
		} else if (item.type === 'heading') {
			render = `<${item.tag} class="${spacer} ">${item.children[0].text}</${item.tag}>`;
		} else if (item.type === 'list') {
			render = `<${item.tag} class="${spacer}">${item.children[0].text}</${item.tag}>`;
		}

		body.push(render);

		return body;
	});
</script>

<div class="card">
	<div class="row g-0">
		<div class="col-md-4">
			<img src={image_url} alt="News Image" class="img-fluid" />
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<h5 class="card-title">{news_title}</h5>
				<p class="card-text">{news_description}</p>
				<p class="card-text"><small class="text-muted">{published_on}</small></p>
			</div>
		</div>
	</div>
</div>
