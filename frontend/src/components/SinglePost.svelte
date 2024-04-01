<script>
	import { onMount } from 'svelte';
	// import { Button, Popover } from 'sveltestrap';
	import md5 from 'md5';

	export let doc, langpref;
	// let langpref = 'hindi';
	let title = '';
	let body;
	let checksum = md5(doc.meta.title || doc.title);

	let spanrenderer = (s, cls = 'btn btn-outline-dark btn-sm py-0') => s.replace(/\d+/g, `<span class="${cls}">$&</span>`);
	let boldnum = (s) => s?.replace(/\d+/g, `<span class="fw-bold">$&</span>`);
	let lgSpacer = 'px-xxl-3 px-3';
	let renders = [];

	if (langpref == 'hindi') {
		title = doc.title_hindi || doc.meta.title;
		body = doc.body_hindi;
	} else {
		title = doc.title;
		body = doc?.body_english?.root.children.length > 1 && doc.body_english;
	}

	body?.root?.children?.map((item) => {
		if (item?.type == 'paragraph') {
			
			let sub_children = item.children?.map((leaf) => {
				let render = '';
				let isBold = leaf.format == 1 ? 'fw-bold lead' : '';
				let spacer = 'mb-4 easy-reader';
				let text = boldnum(leaf.text);
				if (leaf.type == 'linebreak') {
					return;
				}
	
				if (item.type === 'paragraph') {
					render = `<p class="${isBold} ${spacer}">${text}</p>`;
				} else if (item.type === 'image') {
					render = `<img src=${item.url} alt=${item.alt} />`;
				} else if (item.type === 'heading') {
					let text = spanrenderer(item.children[0].text, 'btn btn-dark px-2 py-0');
					render = `<${item.tag} class="${spacer} ">${text}</${item.tag}>`;
				} else if (item.type === 'list') {
					render = `<${item.tag} class="${spacer}">${item.children[0].text}</${item.tag} style="margin-left: 20px;">`;
				}
	
				renders.push(render);
			});
		
		} else if(item?.type == 'upload') { 
			renders.push(`
			<div class="col-12  px-lg-3 d-flex justify-content-center">
			<img src="https://chunavexpress.com${item?.value.url}" alt=${item?.value?.alt} />
			</div>
			`);

			
		}

		return renders;
	});
	function copy2clipboard () {
		navigator.clipboard.writeText(`https://chunavexpress.com/post/${doc.slug}`);
		alert('Link Copied to Clipboard!');
	}
	onMount(() => {
		// if (window.localStorage['langpref']) {
		// 	langpref = window.localStorage['langpref'];
		// }
		// console.log('body', body);
	});
</script>

{#if body}
	<div class="card border-2 mb-5 mt-lg-3 shadow">
		<div class="post-head {lgSpacer}">
			
			<a href="https://chunavexpress.com/post/{doc.slug}" target="single" type="button" class="" >
				<h2 class="pt-lg-2 py-2">{@html title}</h2>
				<!-- <i class="fa-solid fa-arrow-up-right-from-square" /> Open -->
			</a>
			<button type="button" id="popover{checksum}" class="btn btn-sm btn-dark" on:click={copy2clipboard}>
				<i class="fa-solid fa-link" /> Share
			</button>
			<!-- <Popover target="popover{checksum}" placement="bottom" title={`Share This Post`}>
				https://chunavexpress.com/post/{doc.slug}
			</Popover> -->

			<p class="mt-0 text-black">
				<!-- By {doc?.author?.email?.split('@')[0] || ''}, Last Updated On : {doc.updatedAt.split('T')[0] || ''} -->
			</p>
		</div>
		<!-- <hr /> -->
		<img src={doc?.banner?.url} class="card-img-top rounded shadow" alt="this is the prime  of post" height="400" width="auto" />
		<div class="card-body px-0 text-justify {lgSpacer}">
			{#each renders as item}
				{@html item}
			{/each}
		</div>
	</div>
{/if}

<style>
	:global(p.easy-reader) {
		font-size: 1.2em;
		line-height: 1.75em;
	}
	.card img {
		transform: scale(1.03);
		min-height: 10em;
		
	}
	h2{
		color: #000 !important;
	}
</style>
