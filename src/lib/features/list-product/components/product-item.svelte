<script lang="ts">
	import { RedStatus, GreenStatus } from '.';
	import { TableBodyCell, TableBodyRow, Checkbox } from 'flowbite-svelte';

	import type { Product } from '@prisma/client';

	export let value: Product;
	export let checked: boolean;
	export let product: Product;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { uuid, ...cleanedProduct } = product;
	const entries = Object.entries(cleanedProduct);

	const getStatusComponent = (status: boolean) => {
		return status ? GreenStatus : RedStatus;
	};
</script>

<TableBodyRow bind:value>
	<TableBodyCell class="!p-4">
		<Checkbox bind:checked />
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
