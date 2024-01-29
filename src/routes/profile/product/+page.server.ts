import { _request } from '$lib/shared/helpers';
import { ProductModelValidation } from '$lib/entities';
import { superValidate, message } from 'sveltekit-superforms/server';
import { PRODUCT_TAB_CONSTRAINTS } from '$lib/shared/helpers/constants';

import type { Category } from '@prisma/client';
import type { CategorySelectOption } from '$lib/entities/types';

export async function load(event) {
	const superValidatedProduct = await superValidate(ProductModelValidation);

	const queryContraints = _request.buildQueryParams(PRODUCT_TAB_CONSTRAINTS.all);
	// Fetch products.
	const productResponse = await event.fetch(`/api/v1/product${queryContraints}`, {
		method: 'GET'
	});
	// Destructure products from response.
	const { data: initialProducts } = await productResponse.json();

	// Fetch categories.
	const categoryReponse = await event.fetch('/api/v1/category');
	// Destructure categories from response.
	const { data: categories } = await categoryReponse.json();

	const initialCategories: CategorySelectOption[] = [];
	categories.forEach((category: Category, index: number) => {
		initialCategories.push({
			value: index + 1,
			name: category.name
		});
	});

	return {
		initialProducts,
		initialCategories,
		superValidatedProduct
	};
}

export const actions = {
	create: async (event) => {
		const superValidatedProduct = await superValidate(event.request, ProductModelValidation);
		console.log(superValidatedProduct.errors);
		if (!superValidatedProduct.valid) {
			// Check out later https://github.com/ciscoheat/sveltekit-flash-message.
			return message(superValidatedProduct, 'Invalid form data');
		}
		// Request to create a new product in database.
		const response = await event.fetch('/api/v1/product', {
			method: 'POST',
			body: JSON.stringify(superValidatedProduct.data)
		});

		if (!response.ok) {
			return message(superValidatedProduct, 'Product register failure');
		}
		const { data: product } = await response.json();
		return {
			superValidatedProduct,
			product
		};
	}
};
