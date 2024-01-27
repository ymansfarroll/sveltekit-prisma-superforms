<script lang="ts">
	import { getContext } from 'svelte';
	import ProductItem from './product-item.svelte';
	import { PRODUCT_INCLUDE_PROPERTIES } from '$lib/shared/helpers/constants';
	import {
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		Heading,
		Checkbox,
		Button
	} from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';
	import type { CheckStatus } from '$lib/entities/types';

	// Retrieve product list context.
	const products: Writable<Product[]> = getContext('ProductList');
	const headers = Object.keys(PRODUCT_INCLUDE_PROPERTIES);

	// Checked products.
	let checkedProducts: CheckStatus = {};
	$products.forEach((product) => {
		checkedProducts[product.uuid] = false;
	});

	// Manage the product insertions and deletions.
	const deleteCheckedProducts = (): void => {
		const uuids: string[] = [];
		for (const [key, value] of Object.entries(checkedProducts)) {
			if (value) {
				uuids.push(key);
			}
		}
		checkedProducts = {};
		$products = $products.filter((product) => !uuids.includes(product.uuid));
	};

	const searchForCheckProduct = (checkedProducts: CheckStatus): boolean => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return !Object.entries(checkedProducts).some(([uuid, checked]) => checked);
	};

	$: isDisabled = searchForCheckProduct(checkedProducts);
</script>

<div class="flex">
	<Heading tag="h2" customSize="text-4xl font-extrabold" class="mb-8"
		>Warehouse product detailed list</Heading
	>
	<div class="grid place-content-center">
		<Button disabled={isDisabled} on:click={deleteCheckedProducts}>Unregister</Button>
	</div>
</div>
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
				bind:checked={checkedProducts[product.uuid]}
			/>
		{/each}
	</TableBody>
</Table>
