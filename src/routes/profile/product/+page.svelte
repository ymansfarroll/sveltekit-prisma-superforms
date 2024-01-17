<script>
	export let data;
</script>

<div>
	<h1>Products</h1>
	<div>
		{#each data.products as product}
			<p>{product.id}</p>
		{/each}
	</div>
</div>
