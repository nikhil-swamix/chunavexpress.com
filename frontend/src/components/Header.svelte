<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Autoplay } from 'swiper/modules';
	import { page } from '$app/stores';
	import langAvailability from '$lib/stores/langAvailability.js';
	Swiper.use([Autoplay]);
	let langpref;

	// if homepage lang availability true english and hindi

	if ($page.url.pathname == '/') {
		$langAvailability.hindi = true;
		$langAvailability.english = true;
	}

	let menuCategories = [
		{ name: 'Home', icon: 'fa-fw fa-solid fa-bolt', link: '/' },
		{ name: 'Politics', icon: 'fa-fw fa-solid fa-scale-unbalanced', link: '/categories/politics' },
		{ name: 'Loksabha 2024', icon: 'fa-fw fa-solid fa-landmark-dome', link: '/categories/loksabha' }
		// { name: 'Assembly Elections 2023', icon: 'fa-fw fa-solid fa-landmark', link: './' },
		// { name: 'Legislative Assembly', icon: 'fa-fw fa-solid fa-gavel', link: './' },
		// { name: 'Municipal Corporation', icon: 'fa-fw fa-brands fa-old-republic', link: './' },
		// { name: 'Panchayat', icon: 'fa-fw fa-solid fa-chess-king', link: './' },
		// { name: 'UP Elections', icon: 'fa-fw fa-solid fa-bullhorn', link: './' }
	];
	function getLangPref() {
		langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
	}
	let categoryTranslator = {
		home: 'घर',
		politics: 'राजनीति',
		'loksabha 2024': 'लोकसब्हा',
		'assembly-elections-2023': 'असेंसि राजनीति 2023'
	};

	onMount(() => {
		new Swiper('.swiper', {
			slidesPerView: 'auto',


			freeMode: true,
			loop: false,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
				stopOnLastSlide: false
			},
			breakpoints: {
				768: {
					spaceBetween: 25
				}
			}
		});
	});
	$: {
		langpref = $page.url.searchParams.get('lang') == 'en' ? 'english' : 'hindi';
	}
	getLangPref();
</script>

<header id="mvp-main-head-wrap" class="">
	<nav id="mvp-main-nav-top" class="row w-100 m-0 p-0">
		<div class="social-bar d-flex p-0 py-2">
			<div class="col-md-auto col-12 mx-md-auto mx-0 ps-lg-3 branding pt-2 px-0">
				<a href="/">
					<img src="/logo-min.webp" alt="Chunavexpress" class="m-0 rounded-2 img-fluid me-lg-3" height="64" width="auto" />
				</a>
				<h1 class=" d-flex align-items-center justify-content-center m-0 px-lg-2">
					<span class="text-danger me-lg-3 px-lg-0 px-2"> Chunav Express </span>
					<div id="langpref" class="d-inline ms-lg-4">
						<div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
							{#if $langAvailability.english}
								<a class="btn btn-{langpref == 'english' ? 'dark' : 'outline-dark'}" href="?lang=en">English</a>
							{/if}
							{#if $langAvailability.hindi}
								<a class="btn btn-{langpref == 'hindi' ? 'dark' : 'outline-dark'}" href="?lang=hi">हिंदी</a>
							{/if}
						</div>
					</div>
				</h1>
				<div class="col-md-auto d-flex mx mx-md-auto mb-md-0 align-items-center">
					<a href="https://www.facebook.com/ChunavExpress1?mibextid=ZbWKwL" target="_blank"><span class="text-black mx-2 fab fa-facebook-f" /></a>
					<a href="https://twitter.com/Chunav_express" target="_blank"><span class="text-black mx-2 fab fa-twitter" /></a>
					<a href="https://www.instagram.com/chunavexpress/?igshid=ZDdkNTZiNTM%3D" target="_blank"><span class="text-black mx-2 fab fa-instagram" /></a>
					<!-- <a href="https://www.youtube.com/@chunavexpress" target="_blank"><span class="mvp-nav-soc-but fab fa-youtube" /></a> -->
					<!-- <span class="text-dark ms-2 badge bg-dark text-danger"> Follow</span> -->
				</div>
			</div>
		</div>

		<div class="  px-lg-5">
			<div class=" rounded-2 shadow-sm px-1 px-lg-0 bg-danger">
				<div class="d-flex rounded-2 shadow-sm bg-danger ">
					<div class="  swiper ">
						<div class="swiper-wrapper overflow-visible">
							<div class="swiper-slide">
								<li class="menu-item"><a href="/" class="text-white">Home</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item"><a href="/latest" class="text-white">Latest</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item"><a href="/categories/politics" class="text-white">Politics</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item"><a href="/categories/by-elections" class="text-white">By-Elections</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item"><a href="/categories/lok-sabha-elections-2024" class="text-white">Lok Sabha Elections 2024</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item"><a href="/categories/assembly-elections-2024" class="text-white">Assembly Elections 2024</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item"><a href="/categories/election-results" class="text-white">Election Results</a></li>
							</div>
							<div class="swiper-slide">
								<li class="menu-item">
									<a href="https://www.youtube.com/@chunavexpress" target="blank" class="text-white">
										<i class="fab fa-youtube"></i> Youtube
									</a>
								</li>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>

<style lang="less">
	.text-danger {
		color: #b71c1c !important;
	}
	.bg-danger {
		background-color: #b71c1c !important;
	}
	.swiper {
		overflow-y: visible !important;
		z-index: 999 !important;
	}
	.dropdown-menu {
		z-index: 999 !important;
	}
	#langpref .btn {
		@media (max-width: 768px) {
			font-size: 0.75em;
		}
	}

	.swiper-slide {
		padding: 0.5em 0.5em;
		display: flex;
		align-items: center;
		width: fit-content;
		// background-color: #000;

		a:visited {
			opacity: 1;
			text-decoration: none;
			transition: color 0.25s;
			color: #000000;
		}
	}

	.branding {
		display: flex;
		align-items: center;
		justify-content: center;
		h1 {
			font-size: 2em;
			margin: 0;
			line-height: 1em;
			text-transform: uppercase;
			font-family: 'Montserrat';
			@media (max-width: 768px) {
				font-size: 1em;
			}
		}
		h2 {
			font-family: 'oswald';
			font-weight: 200;
			text-transform: uppercase;
		}
	}

	.branding img {
		width: auto;
		height: 2.5em;
		margin: 0 1em;
	}

	#mvp-main-nav-top .social-bar {
		.mvp-nav-soc-but {
			background: rgba(255, 255, 255, 0.5);
			color: #000;
			border-radius: 0.5em;
			font-size: 1em;

			width: 2em;
			height: 2em;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.menu {
		display: flex;
		margin: 0 !important;
		align-items: center;
		padding: 0;
		* {
			transition: all 0.25s !important;
		}
	}
	.menu-item {

		padding: 0;
		// box-shadow: 0 0 0.2em #000;
		a,
		button {
			font-family: 'Oswald';
			font-weight: 400 !important;
			font-size: 1em !important;
			text-transform: uppercase;
			// margin-right: 1em;
			color: #000000;
		}
	}
	.menu-item a::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0 ;
		width: 100%; /* Adjust as necessary */
		height: 0.2em; /* Height of the bar */
		background-color: white;
		transform: scaleX(0);
		transition: transform 0.25s ease;
	}

	.menu-item a:hover::after {
		transform: scaleX(1);
	}
</style>
