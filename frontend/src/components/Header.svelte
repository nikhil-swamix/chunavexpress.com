<script>
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Autoplay } from 'swiper/modules';
	Swiper.use([Autoplay]);

	let menuCategories = [
		{ name: 'Latest News', icon: 'fa-fw fa-solid fa-bolt', link: '/' },
		{ name: 'Politics', icon: 'fa-fw fa-solid fa-scale-unbalanced', link: '/category/politics' },
		{ name: 'Loksabha Elections 2024', icon: 'fa-fw fa-solid fa-landmark-dome', link: '/category/loksabha-elections-2024' }
		// { name: 'Assembly Elections 2023', icon: 'fa-fw fa-solid fa-landmark', link: './' },
		// { name: 'Legislative Assembly', icon: 'fa-fw fa-solid fa-gavel', link: './' },
		// { name: 'Municipal Corporation', icon: 'fa-fw fa-brands fa-old-republic', link: './' },
		// { name: 'Panchayat', icon: 'fa-fw fa-solid fa-chess-king', link: './' },
		// { name: 'UP Elections', icon: 'fa-fw fa-solid fa-bullhorn', link: './' }
	];

	onMount(() => {
		var swiper = new Swiper('.swiper', {
			slidesPerView: 'auto',
			freeMode: true,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
				stopOnLastSlide: false
			}
		});
	});
</script>

<header id="mvp-main-head-wrap" class="">
	<nav id="mvp-main-nav-top" class="row m-0 w-100 m-0">
		<div class="social-bar d-flex flex-wrap">
			<div class="col-md-auto mx-md-auto mx-0 ps-lg-3 branding pt-2">
				<a href="/">
					<img src="/logo-min.webp" alt="Chunavexpress" class="m-0 rounded-2 img-fluid" height="auto" width="32" />
				</a>
				<h1 class=" px-lg-3 d-flex align-items-center justify-content-center m-0">
					<span class="text-danger"> ChunavExpress </span>
					<!-- <div class="spinner-grow mx-1" style="width: 1rem; height: 1rem" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
					com -->
				</h1>
				<div class="col-md-auto d-flex mx mx-md-auto mb-md-0 align-items-center">
					<a href="https://www.facebook.com/ChunavExpress1?mibextid=ZbWKwL" target="_blank"><span class="mvp-nav-soc-but fab fa-facebook-f" /></a>
					<a href="https://twitter.com/Chunav_express" target="_blank"><span class="mvp-nav-soc-but fab fa-twitter" /></a>
					<a href="https://www.instagram.com/chunavexpress/?igshid=ZDdkNTZiNTM%3D" target="_blank"><span class="mvp-nav-soc-but fab fa-instagram" /></a>
					<a href="https://www.youtube.com/@chunavexpress" target="_blank"><span class="mvp-nav-soc-but fab fa-youtube" /></a>
					<!-- <span class="text-dark ms-2 badge bg-dark text-danger"> Follow</span> -->
				</div>
			</div>
		</div>

		<div class="  px-2 pt-3">
			<div id="mvp-main-nav-bot-cont" class="mvp-main-box border rounded-2 shadow-sm container">
				<div class="swiper w-auto w-lg-100">
					<!-- Additional required wrapper -->
					<div class="swiper-wrapper">
						<!-- Slides -->
						{#each menuCategories as category}
							<div class="swiper-slide">
								<li class="menu-item">
									<a href={category.link} target="blank" class="">
										<i class={category.icon} />
										{category.name}
									</a>
								</li>
							</div>
						{/each}
						<div class="swiper-slide">
							<li class="menu-item">
								<div class="dropdown">
									<button class="btn dropdown-toggle p-0 m-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">Assembly Elections 2023</button>
									<ul class="dropdown-menu position-absolute">
										<li><a class="dropdown-item" target="blank" href="/categories/madhyapradesh-elections">Madhya Pradesh</a></li>
										<li><a class="dropdown-item" target="blank" href="/categories/chhattisgarh-elections">Chhattisgarh</a></li>
										<li><a class="dropdown-item" target="blank" href="/categories/rajasthan-elections">Rajasthan</a></li>
										<li><a class="dropdown-item" target="blank" href="/categories/telangana-elections">Telangana</a></li>
										<li><a class="dropdown-item" target="blank" href="/categories/mizoram-elections">Mizoram</a></li>
									</ul>
								</div>
							</li>
						</div>
						<div class="swiper-slide">
							<li class="menu-item">
								<a href="https://www.youtube.com/@chunavexpress" target="blank" class="text-danger">
									<i class="fab fa-youtube" />
									Youtube
								</a>
							</li>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>

<style lang="less">
	.text-danger {
		color: #dc3545 !important;
	}
	.swiper {
		// overflow: visible !important;
		z-index: 999 !important;
	}
	.dropdown-menu {
		z-index: 999 !important;
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
			transition: color 0.25s, background 0.25s, opacity 0.25s;
			color: #000000;
		}
	}
	.branding h1 {
		font-size: 2em;
		margin: 0;
		// font-weight: 100;
		line-height: 1em;
		text-transform: uppercase;
		@media (max-width: 768px) {
			font-size: 1.2em;
		}
	}
	#mvp-main-nav-top .social-bar {
		.mvp-nav-soc-but {
			background: rgba(255, 255, 255, 0.15);
			color: #000;
			border-radius: 0.5em;
			font-size: 1.2em;
			// margin-left: 10px;
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
		border-radius: 0.25em;
		padding: 0;
		// box-shadow: 0 0 0.2em #000;
		a,
		button {
			font-family: 'Oswald';
			font-weight: 600 !important;
			font-size: 1em !important;
			text-transform: uppercase;
			// margin-right: 1em;
			color: #000000;
		}
	}
</style>
