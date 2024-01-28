<script lang="ts">
	import ProductItem from './product-item.svelte';
	import { PRODUCT_INCLUDE_PROPERTIES } from '$lib/shared/helpers/constants';
	import { Table, TableHead, TableHeadCell, TableBody, Checkbox } from 'flowbite-svelte';

	import type { Product } from '@prisma/client';

	export let products: Product[];
	const headers = Object.keys(PRODUCT_INCLUDE_PROPERTIES);
</script>

<Table>
	<TableHead defaultRow={false}>
		<TableHeadCell class="!p-4">
			<Checkbox />
		</TableHeadCell>
		{#each headers as header}
			<TableHeadCell>{header}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each products as product, index (product.uuid)}
			<ProductItem {product} bind:value={products[index]} />
		{/each}
	</TableBody>
</Table>
