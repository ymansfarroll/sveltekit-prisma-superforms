import { setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { ProductSchema } from '$lib/entities';
import type { SuperValidated } from 'sveltekit-superforms';
import type { Product } from '@prisma/client';

export const setProductListContext = (productList: Product[]): void => {
	const products = writable(productList);
	setContext('ProductList', products);
};

export const setProductFormContext = (productFormData: SuperValidated<ProductSchema>): void => {
	setContext('productFormData', productFormData);
};
