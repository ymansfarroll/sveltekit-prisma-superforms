<script lang="ts">
	export let data;
	import { setContext } from 'svelte';
	import { ProductManagementPage } from '$lib/pages';

	// Spread down the loaded data.
	setContext('productFormData', data.superValidatedProduct);
</script>

<ProductManagementPage />
