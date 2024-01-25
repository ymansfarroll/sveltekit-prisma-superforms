<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';

	import type { Product } from '@prisma/client';

	export let product: Product;
	$: values = Object.values(product);
</script>

<TableBodyRow>
	{#each values as value}
		<TableBodyCell>{value}</TableBodyCell>
	{/each}
</TableBodyRow>
