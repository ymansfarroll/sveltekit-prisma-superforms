import Prisma, { prisma } from '$lib/shared/prisma/client';

export const applyProductSoftDeletion = async (
	filter: Prisma.ProductWhereUniqueInput
): Promise<void> => {
	const whereUniqueConstraints = Prisma.validator<Prisma.ProductWhereUniqueInput>()(filter);

	const productUpdatedData: Prisma.ProductUpdateInput = {
		deletedAt: new Date()
	};
	// Product soft-deletion.
	await prisma.product.update({
		where: {
			...whereUniqueConstraints,
			deletedAt: null
		},
		data: productUpdatedData
	});
};

export const applyCategorySoftDeletion = async (id: number): Promise<void> => {
	const products = await prisma.product.findMany({
		where: {
			categoryId: id,
			// NOT: [ { deletedAt: null } ] is valid as well.
			deletedAt: {
				not: null
			}
		}
	});
	// uuids-array for matched categoryId product.
	const uuids = products.map((product) => product.uuid);

	// Category soft-deletion.
	const categoryUpdatedData: Prisma.CategoryUpdateInput = {
		deletedAt: new Date()
	};
	await prisma.category.update({
		where: {
			id,
			deletedAt: null
		},
		data: categoryUpdatedData
	});
	// Category dependencies soft-deletion.
	const productUpdatedData: Prisma.CategoryUpdateInput = {
		deletedAt: new Date()
	};
	await prisma.product.updateMany({
		where: {
			uuid: {
				in: uuids
			}
		},
		data: productUpdatedData
	});
};
