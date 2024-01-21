<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { z } from 'zod';
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	import { Input, Label, type InputType } from 'flowbite-svelte';
	import { InvalidForm } from '..';

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	export let sort: InputType;

	const { value, errors } = formFieldProxy(form, field);
</script>

<div>
	<Label for="product-date" class="mb-2">Product date:</Label>
	<Input
		type={sort}
		id="product-date"
		name={field}
		aria-invalid={$errors ? 'true' : undefined}
		bind:value={$value}
	/>
</div>
{#if $errors}<InvalidForm message={$errors} />{/if}
