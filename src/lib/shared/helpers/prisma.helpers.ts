import Prisma, { prisma } from '$lib/shared/prisma/client';

export const applyProductSoftDeletion = async (filter: Prisma.ProductWhereInput): Promise<void> => {
	const constraints = Prisma.validator<Prisma.ProductWhereInput>()(filter);

	const productUpdatedData: Prisma.ProductUpdateInput = {
		deletedAt: new Date()
	};

	// Product soft-deletion.
	const updateProducts = prisma.product.updateMany({
		where: constraints,
		data: productUpdatedData
	});
	// Check out https://www.prisma.io/docs/orm/prisma-client/queries/transactions for further details.
	await prisma.$transaction([updateProducts]);
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
	// uuids-array for matched categoryId products.
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
	const updateProducts = prisma.product.updateMany({
		where: {
			uuid: {
				in: uuids
			}
		},
		data: productUpdatedData
	});
	// Check out https://www.prisma.io/docs/orm/prisma-client/queries/transactions for further details.
	await prisma.$transaction([updateProducts]);
};

// Check out https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields for further details.
export const excludeFieldsFromPrismaModel = <Model extends object, Key extends keyof Model>(
	model: Model,
	keys: Key[]
	// Valid UntaintedModel type.
): Omit<Model, Key> => {
	return Object.fromEntries(
		Object.entries(model).filter(([key]) => !keys.includes(key as Key))
	) as Omit<Model, Key>; // Valid UntaintedModel type.
};
