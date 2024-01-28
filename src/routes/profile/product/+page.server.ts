import { _request } from '$lib/shared/helpers';
import { ProductModelValidation } from '$lib/entities';
import { superValidate, message } from 'sveltekit-superforms/server';
import { PRODUCT_TAB_CONSTRAINTS } from '$lib/shared/helpers/constants.js';

export async function load(event) {
	const superValidatedProduct = await superValidate(ProductModelValidation);

	const queryContraints = _request.buildQueryParams(PRODUCT_TAB_CONSTRAINTS.all);
	const response = await event.fetch(`/api/v1/product${queryContraints}`, {
		method: 'GET'
	});

	// Destructure products from response.
	const { data: initialProducts } = await response.json();
	return {
		initialProducts,
		superValidatedProduct
	};
}

export const actions = {
	create: async (event) => {
		const superValidatedProduct = await superValidate(event.request, ProductModelValidation);

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
