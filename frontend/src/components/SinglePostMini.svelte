<script>
	import { onMount } from 'svelte';
	import md5 from 'md5';

	export let doc, langpref;
	let title = '';
	let summary = '';
	let checksum = md5(doc.meta.title || doc.title);
	let body;
	// console.log(doc)
	if (langpref === 'hindi') {
		title = doc.title_hindi || doc.meta.title;
		body = doc.body_hindi;
		summary = body.root.children
			.map((item) => item.children?.map((leaf) => leaf?.text || leaf?.children?.text))
			.join(' ')
			.slice(0, 180) + '...';
	} else {
		title = doc.title;
		body = doc.body_english;
		summary = body.root.children
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

<div class="card border-0 mb-3 border-bottom pb-2 d-flex flex-row ">
	<div class="card-body d-flex flex-column p-2">
		<div class="card-subtitle text-danger text-capitalize fw-semibold">{doc.category?.[0].title}</div>
		<a href="https://chunavexpress.com/post/{doc.slug}" target="_blank" class="text-black"><h2 class="card-title">{@html title}</h2></a>
		

		<span class="card-subtitle text-black-50 text-nano">Chunavexpress Staff on {new Date(doc.updatedAt).toLocaleDateString()} </span>
        
		<p class="card-text">{@html summary}</p>
		<div class="mt-auto">
			<!-- <a href="https://chunavexpress.com/post/{doc.slug}" target="_blank" class="btn btn-sm btn-outline-dark">Read More</a> -->
			
		</div>
	</div>
	<img src={doc?.banner?.url} class="card-img-left" alt="Post Thumbnail" width="180" />
</div>

<!-- 

{
  id: '663b6dcef913e277c1507108',
  title: ' Ex-Congress spokesperson Radhika Khera and Actor Shekhar Suman,join BJP',
  author: {
    id: '660a8431423b9ce20ac18fca',
    email: 'admin@chunavexpress.com',
    createdAt: '2023-10-25T19:57:10.036Z',
    updatedAt: '2024-06-10T19:25:10.292Z',
    loginAttempts: 0
  },
  category: [
    {
      id: '657ed505b82c86bafcdaa041',
      title: 'politics',
      createdAt: '2023-12-17T11:01:25.367Z',
      updatedAt: '2023-12-17T11:01:28.339Z'
    }
  ],
  banner: {
    id: '663b6dccf913e277c1507101',
    alt: 'Ex-Congress spokesperson Radhika Khera and Actor Shekhar Suman,join BJP',
    filename: 'Ex-Congress spokesperson Radhika Khera and Actor Shekhar Suman,join BJP.webp',
    mimeType: 'image/webp',
    filesize: 23206,
    width: 640,
    height: 360,
    sizes: { optimized: [Object] },
    createdAt: '2024-05-08T12:19:24.694Z',
    updatedAt: '2024-05-08T12:25:31.441Z',
    url: 'https://chunavexpress.com/media/Ex-Congress spokesperson Radhika Khera and Actor Shekhar Suman,join BJP.webp'
  },
  body_english: {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [Array],
      direction: 'ltr'
    }
  },
  slug: '-ex-congress-spokesperson-radhika-khera-and-actor-shekhar-sumanjoin-bjp',
  meta: {
    title: 'spokesperson Radhika Khera and Actor Shekhar Suman,join BJP',
    description: "Former Congress spokesperson Radhika Khera and actor Shekhar Suman joined the (BJP) on Tuesday at the party's headquarters in Delhi.",
    image: {
      id: '663b6f26f913e277c1507178',
      alt: 'Ex-Congress spokesperson Radhika Khera and Actor Shekhar Suman,join BJP',
      filename: 'Ex-Congress-spokesperson-Radhika-Khera-and-Actor-Shekhar-Suman,join-BJP-1.webp',
      mimeType: 'image/webp',
      filesize: 23206,
      width: 640,
      height: 360,
      sizes: [Object],
      createdAt: '2024-05-08T12:25:10.602Z',
      updatedAt: '2024-05-08T12:25:10.602Z',
      url: '/media/Ex-Congress-spokesperson-Radhika-Khera-and-Actor-Shekhar-Suman,join-BJP-1.webp'
    }
  },
  createdAt: '2024-05-08T12:19:26.287Z',
  updatedAt: '2024-05-08T12:30:16.603Z'
}

 -->

<style>
	.card-title {
		font-size: 1.2em;
		/* font-weight: 600 !important; */
	}
	.card {
		max-width: 100%;
	}

	.card-img-left {
		width: 150px;
		object-fit: cover;
	}

	.card-body {
		flex-grow: 1;
		padding: 1.25rem;
	}

	.card-text {
		font-size: 1em;
		color: #666;
	}

	.mt-auto {
		margin-top: auto;
	}
	.text-nano {
		font-size: 0.8em;
	}
	.text-pico {
		font-size: 0.5em;
        line-height: 1em;
	}
</style>
