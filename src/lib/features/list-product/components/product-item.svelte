<script lang="ts">
	import { getContext } from 'svelte';
	import { RedStatus, GreenStatus } from '.';
	import { TableBodyCell, TableBodyRow, Checkbox } from 'flowbite-svelte';

	import type { Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';
	import type { CheckStatus } from '$lib/entities/types';

	export let value: Product;
	export let product: Product;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { uuid, ...cleanedProduct } = product;
	const entries = Object.entries(cleanedProduct);

	const getStatusComponent = (status: boolean) => {
		return status ? GreenStatus : RedStatus;
	};

	const checkedProducts: Writable<CheckStatus> = getContext('checkedProducts');
</script>

<TableBodyRow bind:value>
	<TableBodyCell class="!p-4">
		<Checkbox bind:checked={$checkedProducts[product.uuid]} />
	</TableBodyCell>
	{#each entries as [key, value]}
		<TableBodyCell>
			{#if key === 'status'}
				<svelte:component this={getStatusComponent(!!value)}></svelte:component>
			{:else}
				{value}
			{/if}
		</TableBodyCell>
	{/each}
</TableBodyRow>
