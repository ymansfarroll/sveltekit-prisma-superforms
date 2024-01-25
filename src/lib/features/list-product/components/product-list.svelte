<script lang="ts">
	import { getContext } from 'svelte';
	import ProductItem from './product-item.svelte';
	import { PRODUCT_INCLUDE_PROPERTIES } from '$lib/shared/helpers/constants';
	import { Table, TableHead, TableHeadCell, TableBody } from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';

	// Retrieve product list context.
	const products: Writable<Product[]> = getContext('ProductList');
	const headers = Object.keys(PRODUCT_INCLUDE_PROPERTIES);
</script>

<Table>
	<TableHead defaultRow={false}>
		<tr>
			<TableHeadCell colspan="2">Warehouse product detailed list</TableHeadCell>
		</tr>
		<tr>
			{#each headers as header}
				<TableHeadCell>{header}</TableHeadCell>
			{/each}
		</tr>
	</TableHead>
	<TableBody>
		{#each $products as product}
			<ProductItem {product} />
		{/each}
	</TableBody>
</Table>

<TableHead>
	<tr> </tr>
</TableHead>
