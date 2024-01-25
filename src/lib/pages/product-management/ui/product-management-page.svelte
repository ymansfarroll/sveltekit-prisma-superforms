<script lang="ts">
	import { SubmitProduct } from '$lib/components';
	import { ProductList } from '$lib/features/list-product/components';
</script>

<div class="container-fluid flex pt-8">
	<div class="w-3/12">
		<SubmitProduct />
	</div>
	<div class="mx-auto w-auto">
		<ProductList />
	</div>
</div>
