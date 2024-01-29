<script lang="ts">
	import { getContext } from 'svelte';
	import { InvalidForm, GenericInput } from '.';
	import { Input, Label, Select, Button, Toggle } from 'flowbite-svelte';
	import { superForm, formFieldProxy, type FormResult } from 'sveltekit-superforms/client';

	import type { Readable, Writable } from 'svelte/store';
	import type { Product } from '@prisma/client';
	import type { ProductSchema } from '$lib/entities';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { CategorySelectOption } from '$lib/entities/types';
	import type { ActionData } from '../../../routes/profile/product/$types';

	let categorySelectOptions: Readable<CategorySelectOption[]> = getContext('CategorySelectList');

	// Retrieve product form context.
	const productFormData: SuperValidated<ProductSchema> = getContext('productFormData');
	const productStore: Writable<Product[]> = getContext('ProductList');

	const productSuperForm = superForm(productFormData, {
		resetForm: true,

		// Events management.
		onResult(event) {
			const result = event.result as FormResult<ActionData>;
			if (result.type === 'success' && result.data?.product) {
				const createdProduct = result.data?.product;
				$productStore = [...$productStore, createdProduct];
				event.formEl.reset();
			}
		}
	});
	// It's quite easy to mix up which form ur using each time, so the pattern super+Model+Form will be used from now on.
	const { form: superProductStore, errors: productErrors, enhance } = productSuperForm;

	// Proxies management.
	const status = 'status';
	const { value: proxyStatusValue } = formFieldProxy(productSuperForm, status);
	$: boolValue = proxyStatusValue as Writable<boolean>;
</script>

<form method="POST" use:enhance action="?/create">
	<div class="mx-auto flex w-9/12 flex-col space-y-4">
		<div>
			<Label for="product-provider" class="mb-2">Product provider:</Label>
			<Input
				type="text"
				id="product-provider"
				name="provider"
				placeholder="Ex: Microsoft"
				aria-invalid={$productErrors.name ? 'true' : undefined}
				bind:value={$superProductStore.provider}
			/>
			{#if $productErrors.provider}<InvalidForm message={$productErrors.provider} />{/if}
		</div>

		<div>
			<Label for="product-name" class="mb-2">Product name:</Label>
			<Input
				type="text"
				id="product-name"
				name="name"
				placeholder="Ex: Intel Core i7-9700K"
				aria-invalid={$productErrors.name ? 'true' : undefined}
				bind:value={$superProductStore.name}
			/>
			{#if $productErrors.name}<InvalidForm message={$productErrors.name} />{/if}
		</div>
		<div>
			<Label for="amount" class="mb-2">Product amount (in-place):</Label>
			<Input
				type="number"
				id="product-amount"
				min="0"
				max="10000"
				name="amount"
				bind:value={$superProductStore.amount}
			/>
		</div>
		<div>
			<Label for="product-category" class="mb-2">Product category:</Label>
			<Select
				id="product-category"
				items={$categorySelectOptions}
				placeholder="Choose an option ..."
				name="categoryId"
				bind:value={$superProductStore.categoryId}
			/>
		</div>
		<GenericInput form={productSuperForm} field="date" sort="date" />
		<Toggle size="small" name="status" bind:checked={$boolValue}>Product status</Toggle>
		<Button type="submit">Register product</Button>
	</div>
</form>
