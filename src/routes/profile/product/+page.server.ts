import prisma from '$lib/shared/prisma/client';

export async function load() {
	const products = await prisma.product.findMany({
		where: {
			amount: {
				//  greater than > 0
				gt: 0
			}
		}
	});
	return {
		products
	};
}
