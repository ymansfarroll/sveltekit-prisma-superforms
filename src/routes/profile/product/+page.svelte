<script lang="ts">
	export let data;
	import { ProductManagementPage } from '$lib/pages';
	import {
		setProductFormContext,
		setProductListContext,
		setCategorySelectContext
	} from '$lib/context';

	const { initialProducts, superValidatedProduct, initialCategories } = data;
	// Set product contexts.
	setProductListContext(initialProducts);
	setCategorySelectContext(initialCategories);
	setProductFormContext(superValidatedProduct);
</script>

<ProductManagementPage />
