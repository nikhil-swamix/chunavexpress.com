<script>
	export let data;

	import SinglePostMini from '../components/SinglePostMini.svelte';
	import EditorPostMini from '../components/EditorPostMini.svelte';
	import PostHeadline from '../components/PostHeadline.svelte';
	import HeroPost from '../components/HeroPost.svelte';
	import PostSectionCard from '../components/PostSectionCard.svelte';
	import { onMount } from 'svelte';
	import * as helpers from '$lib/helpers.js';
	import { page } from '$app/stores';
	import Swiper from 'swiper';
	import { Navigation, Pagination } from 'swiper/modules';
	import 'swiper/css';
	// import 'swiper/css/pagination';

	let langpref;
	let showdocs;
	let editorPicks = [];
	let AssemblyElectionPosts = [];
	let videos = [];

	let data_copy = JSON.parse(JSON.stringify(data));

	for (let i = 0; i < data_copy.docs.length; i++) {
		if (data_copy.docs[i].editorPick) {
			editorPicks.push(data_copy.docs[i]);
			delete data_copy.docs[i];
		}
	}
	// remove empty items
	data_copy.docs = data_copy.docs.filter((doc) => doc);
	let heroPost = data_copy.docs.slice(0, 1)[0];

	// console.log('hp', heroPost);

	$: {
		langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
		showdocs = data_copy.docs.filter((doc) => doc['body_' + langpref]?.root?.children[0].children.length >= 1).slice(0, 12);
		data_copy.docs = removeLangEmptyPosts();
	}
	async function getAssemblyElectionsPosts() {
		let data = await fetch('https://chunavexpress.com/api/posts?where[category.title][equals]=Assembly Elections 2024').then((res) => res.json());
		data.docs.map((post) => {
			if (post.banner) post.banner.url = 'https://chunavexpress.com' + post.banner.url;
			else post.banner = { url: '/elections/2.jpg' };
		});

		AssemblyElectionPosts = data.docs;
		// console.log(AssemblyElectionPosts)
	}
	function removeLangEmptyPosts() {
		return data_copy.docs.filter((doc) => doc['body_' + langpref]?.root?.children[0].children.length >= 1);
	}

	onMount(async () => {
		await getAssemblyElectionsPosts();
		// assembly-elections-swiper
		new Swiper('.assembly-elections-swiper', {
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 10,
			freeMode: true,
			pagination: {
				el: '.swiper-paginationse'
				// dynamicBullets: true
			},
			breakpoints: {
				768: {
					slidesPerView: 3
				}
			}
		});
		new Swiper('.swiper', {
			slidesPerView: 'auto',
			freeMode: true,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: true,
				stopOnLastSlide: false
			}
		});
		new Swiper('.swiper-ticker', {
			// Optional parameters
			slidesPerView: 2,
			spaceBetween: 0,
			// centeredSlides: true,
			speed: 10000,
			autoplay: {
				delay: 0
			},
			loop: true,

			allowTouchMove: false,
			disableOnInteraction: true,
			breakpoints: {
				// When window width is >= 768px
				768: {
					slidesPerView: 5
				}
			}
		});
		videos = await helpers.getVideos();
		new Swiper('.swipergallery', {
			slidesPerView: 1, // Default for mobile
			freeMode: true,
			loop: true,
			direction: 'horizontal',
			autoplay: {
				delay: 2000,
				disableOnInteraction: true,
				stopOnLastSlide: false
			},
			mousewheel: {
				enabled: true,
				releaseOnEdges: true
			},

			speed: 100,

			breakpoints: {
				// When window width is >= 768px
				768: {
					slidesPerView: 5
				}
			}
		});
	});
</script>

<section class="  col-12 col-lg-10 px-lg-5 mx-auto">
	<div class="marquee flex-row pe-3 my-3">
		<span class="live-news d-flex align-items-center">
			<div class="text-danger ms-1 d-block d-lg-block col-lg-auto col-3 pe-2 text-nano"><span class="spinner-grow spinner-grow-sm text-danger mx-2" role="status"></span>Live News</div>
			<div class="swiper-ticker overflow-hidden">
				<div class="swiper-wrapper">
					{#each data_copy.docs as doc}
						<div class="swiper-slide w-auto">
							<div class=" border-end mx-1 pe-2">
								<a class="link-dark text-sm" href="/post/{doc.slug}">
									{#if langpref == 'hindi'}
										{doc.title_hindi}
									{:else}
										{doc.title}
									{/if}
								</a>
							</div>
						</div>
					{/each}
				</div>
				<div class="ticker-pagination"></div>
			</div>
		</span>
	</div>

	{#key langpref}
		<div class="row mx-0 px-0 my-lg-3 px-lg-2 pe-xxl-3">
			<!-- editor posts -->
			<div class="col-lg-3 ps-lg-0 px-2 pe-lg-3">
				<div class="px-2 px-lg-3 bg-warning-subtle pb-4 rounded-3">
					<h1 class="pt-2">Editor Picks</h1>
					{#each editorPicks as doc}
						<EditorPostMini {doc} bind:langpref />
					{/each}
				</div>
			</div>
			<div class="col-lg px-2 mx-auto py-3 py-lg-0">
				<HeroPost doc={heroPost} {langpref} />
				<hr>
				{#each data_copy?.docs.slice(1, 4) as doc}
					<SinglePostMini {doc} bind:langpref />
				{/each}
			</div>
			<div class="col-lg-3 px-lg-3  p-3 bg-warning-subtle ms-lg-3 rounded-3">
				<h4><i class="fa fa-newspaper text-danger fa-xs" aria-hidden="true" /> Latest News</h4>
				{#each data_copy?.docs.slice(4, 14) as doc}
					<PostHeadline {doc} bind:langpref />
				{/each}
			</div>
		</div>
	{/key}
</section>
<section>
	<div class="px-3 px-lg-3 pb-4 rounded-3">
		<h1 class="pt-5 text-danger px-lg-0">Assembly Elections 2024</h1>
		<div class="assembly-elections-swiper">
			<div class="swiper-wrapper">
				{#each AssemblyElectionPosts as doc}
					<div class="swiper-slide">
						<PostSectionCard {doc} bind:langpref />
					</div>
					<div class="swiper-slide">
						<PostSectionCard {doc} bind:langpref />
					</div>

				{/each}
			</div>
			<div class="text-center">
				<div class="swiper-paginationse"></div>
			</div>
		</div>
	</div>
</section>
<!-- videos section -->
<section>
	<div class="col-12 bg-dark py-lg-3 pb-5 my-lg-5">
		<h2 class="p-3 rounded-2 me-auto text-danger pb-lg-5">
			<img src="/logo-min.webp" alt="Chunavexpress" class="m-0 rounded-2 img-fluid me-lg-3 s-c1MG4BWNDc59" height="32" width="64" />Chunavexpress Videos
		</h2>
		<div class="swipergallery mb-5">
			<div class="swiper-wrapper">
				{#each videos as video}
					<div class="swiper-slide video-slide px-2">
						<a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" class="video-thumbnail">
							<img src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`} alt="Video Thumbnail" class="thumbnail-image" />
							<i class="fas fa-play-circle play-button"></i>
						</a>
					</div>
				{/each}
			</div>
			<!-- <div class="swiper-pagination"></div> -->
		</div>
	</div>
</section>

<style>
	.video-thumbnail {
		height: 200px; /* Set consistent height */
		overflow: hidden; /* Hide any overflow */
		position: relative;
	}

	.thumbnail-image {
		height: 100%; /* Make the image fill the height of the thumbnail */
		width: auto; /* Maintain aspect ratio */
		object-fit: cover; /* Ensure it covers the area */
	}

	.play-button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2em;
		color: white;
	}

	a.card-text {
		font-size: 1em;
		color: #000;
		line-height: 1.2em !important;
	}
	.swiper-wrapper {
		-webkit-transition-timing-function: linear !important;
		transition-timing-function: linear !important;
	}
	.text-nano {
		font-size: 0.75em;
	}
</style>
