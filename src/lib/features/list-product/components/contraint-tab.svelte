<script lang="ts">
	import { ProductList } from '.';
	import { writable } from 'svelte/store';
	import { getContext, setContext } from 'svelte';
	import { Heading, Button, Tabs, TabItem } from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';
	import type { CheckStatus } from '$lib/entities/types';

	// Retrieve product list context.
	const products: Writable<Product[]> = getContext('ProductList');

	const checkedProducts: CheckStatus = {};
	$products.forEach((product) => {
		checkedProducts[product.uuid] = false;
	});

	const checkedProductStore = writable<CheckStatus>(checkedProducts);
	setContext('checkedProducts', checkedProductStore);

	// Manage the product insertions and deletions.
	const deleteCheckedProducts = (): void => {
		const uuids: string[] = [];
		for (const [key, value] of Object.entries($checkedProductStore)) {
			if (value) {
				uuids.push(key);
			}
		}
		$checkedProductStore = {};
		$products = $products.filter((product) => !uuids.includes(product.uuid));
	};

	const searchForCheckedProduct = (checkedProducts: CheckStatus): boolean => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return !Object.entries(checkedProducts).some(([uuid, checked]) => checked);
	};

	$: isDisabled = searchForCheckedProduct($checkedProductStore);
</script>

<div class="flex">
	<Heading tag="h2" customSize="text-4xl font-extrabold" class="mb-8"
		>Warehouse product detailed list</Heading
	>
	<div class="grid place-content-center">
		<Button disabled={isDisabled} on:click={deleteCheckedProducts}>Unregister</Button>
	</div>
</div>

<Tabs style="underline">
	<TabItem open title="All">
		<ProductList />
	</TabItem>
	<TabItem title="Available">
		<ProductList />
	</TabItem>
	<TabItem title="N/A">
		<ProductList />
	</TabItem>
	<TabItem title="Deleted">
		<ProductList />
	</TabItem>
	<TabItem disabled>
		<span slot="title" class="text-gray-400 dark:text-gray-500">Soon!</span>
	</TabItem>
</Tabs>
