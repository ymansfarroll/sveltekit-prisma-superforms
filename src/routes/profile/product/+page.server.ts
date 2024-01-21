import { prisma } from '$lib/shared/prisma/client';
import { superValidate, message } from 'sveltekit-superforms/server';
import { ProductModelValidation } from '$lib/entities';

export async function load() {
	const products = await prisma.product.findMany({
		where: {
			amount: {
				//  greater than > 0
				gt: 0
			},
			status: true
		}
	});
	const superValidatedProduct = await superValidate(ProductModelValidation);
	return {
		products,
		superValidatedProduct
	};
}

export const actions = {
	default: async (event) => {
		const superValidatedProduct = await superValidate(event.request, ProductModelValidation);
		if (!superValidatedProduct.valid) {
			// Check out later https://github.com/ciscoheat/sveltekit-flash-message.
			return message(superValidatedProduct, 'Invalid form data');
		}
	}
};
