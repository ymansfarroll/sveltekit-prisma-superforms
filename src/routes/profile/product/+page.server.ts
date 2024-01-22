import { superValidate, message } from 'sveltekit-superforms/server';
import { ProductModelValidation } from '$lib/entities';

export async function load(event) {
	const superValidatedProduct = await superValidate(ProductModelValidation);
	const response = await event.fetch('/api/v1/product', {
		method: 'GET'
	});
	// Destructure products from response.
	const { data: products } = await response.json();
	return {
		products,
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
		await event.fetch('/api/v1/product', {
			method: 'POST',
			body: JSON.stringify(superValidatedProduct.data)
		});
	}
};
