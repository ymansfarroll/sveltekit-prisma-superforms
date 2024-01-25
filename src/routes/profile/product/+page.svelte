<script lang="ts">
	export let data;
	import { ProductManagementPage } from '$lib/pages';
	import { setProductFormContext, setProductListContext } from '$lib/context/index.js';

	const { initialProducts, superValidatedProduct } = data;
	// Set product contexts.
	setProductListContext(initialProducts);
	setProductFormContext(superValidatedProduct);
</script>

<ProductManagementPage />
