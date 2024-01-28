<script lang="ts">
	import { ProductList, TabSpinner } from '.';
	import { writable } from 'svelte/store';
	import { _request } from '$lib/shared/helpers';
	import { getContext, setContext } from 'svelte';
	import { Heading, Button, Tabs, TabItem } from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';
	import type { CheckStatus } from '$lib/entities/types';

	import { PRODUCT_TAB_CONSTRAINTS } from '$lib/shared/helpers/constants';

	// Retrieve product list context.
	const productStore: Writable<Product[]> = getContext('ProductList');

	const checkedProducts: CheckStatus = {};
	$productStore.forEach((product) => {
		checkedProducts[product.uuid] = false;
	});

	const checkedProductStore = writable<CheckStatus>(checkedProducts);
	setContext('checkedProducts', checkedProductStore);

	// Manage the product deletions.
	const deleteCheckedProducts = async (): Promise<void> => {
		const uuids: string[] = [];
		for (const [key, value] of Object.entries($checkedProductStore)) {
			if (value) {
				uuids.push(key);
			}
		}

		// Database deletion.
		await fetch(`/api/v1/product/?uuids=${uuids.join(',')}`, {
			method: 'DELETE'
		});

		$checkedProductStore = {};
		$productStore = $productStore.filter((product) => !uuids.includes(product.uuid));
	};

	const searchForCheckedProduct = (checkedProducts: CheckStatus): boolean => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return !Object.entries(checkedProducts).some(([uuid, checked]) => checked);
	};
	$: isDisabled = searchForCheckedProduct($checkedProductStore);

	// Tab switch management.
	let selected: string = 'all';

	const retrieveSelectedProductTabData = async (selected: string): Promise<Product[]> => {
		const queryContraints = _request.buildQueryParams(PRODUCT_TAB_CONSTRAINTS[selected]);

		if (selected !== 'all') {
			let response;
			response = await fetch(`/api/v1/product/${queryContraints}`, {
				method: 'GET'
			});
			// Destructure products from response.
			const { data: products } = await response.json();
			return products;
		}
		return $productStore;
	};

	$: promise = retrieveSelectedProductTabData(selected);
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
	<TabItem open title="All" on:click={() => (selected = 'all')}>
		{#if selected === 'all'}
			<ProductList products={$productStore} />
		{/if}
	</TabItem>
	<TabItem title="Available" on:click={() => (selected = 'available')}>
		{#if selected === 'available'}
			{#await promise}
				<TabSpinner />
			{:then products}
				<ProductList {products} />
			{/await}
		{/if}
	</TabItem>
	<TabItem title="N/A" on:click={() => (selected = 'no-available')}>
		{#if selected === 'no-available'}
			{#await promise}
				<TabSpinner />
			{:then products}
				<ProductList {products} />
			{/await}
		{/if}
	</TabItem>
	<TabItem title="Deleted" on:click={() => (selected = 'deleted')}>
		{#if selected === 'deleted'}
			{#await promise}
				<TabSpinner />
			{:then products}
				<ProductList {products} />
			{/await}
		{/if}
	</TabItem>
	<TabItem disabled>
		<span slot="title" class="text-gray-400 dark:text-gray-500">Soon!</span>
	</TabItem>
</Tabs>
