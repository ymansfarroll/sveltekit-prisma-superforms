<script lang="ts">
	import { getContext } from 'svelte';
	import ProductItem from './product-item.svelte';
	import { PRODUCT_INCLUDE_PROPERTIES } from '$lib/shared/helpers/constants';
	import { Table, TableHead, TableHeadCell, TableBody, Checkbox } from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';
	import type { CheckStatus } from '$lib/entities/types';

	// Retrieve product list context.
	const products: Writable<Product[]> = getContext('ProductList');
	const headers = Object.keys(PRODUCT_INCLUDE_PROPERTIES);

	const checkedProducts: Writable<CheckStatus> = getContext('checkedProducts');
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
		{#each $products as product (product.uuid)}
			<ProductItem
				{product}
				bind:value={$products[0]}
				bind:checked={$checkedProducts[product.uuid]}
			/>
		{/each}
	</TableBody>
</Table>
