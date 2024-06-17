<div class="row g-0">
	<div class="swiper swipergallery">
		<div class="swiper-wrapper">
			{#each showdocs as doc}
				{#if doc['body_' + langpref]?.root?.children?.length >= 0}
					<div class="swiper-slide col-lg-3 pe-lg-3 my-2 border-0 d-block">
						<a class="card-text text-sm" href="/post/{doc.slug}">
							<div class="col-auto p-0" style="width: 100%; height:12em">
								<img class="h-100 w-100 rounded object-cover" src={doc.banner.url} alt="" />
							</div>
							<div class="p-2">
								{#if langpref == 'hindi'}
									{doc.title_hindi}
								{:else}
									{doc.title}
								{/if}
							</div>
						</a>
					</div>
				{/if}
			{/each}
		</div>
		<div class="swiper-pagination" />
	</div>
</div>
