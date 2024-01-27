import type { Product, Prisma } from '@prisma/client';

export const // ZOD constants.

	ZOD_STRING_FIELD_MIN_CONSTRAINT = 5,
	ZOD_FABRICATION_DATE_ERROR = 'INVALID_FABRICATION_DATE'; // Random error, change it in prod environment.

export const // Prisma constants.

	TAKE_PAGINATION_PARAMETER = 10,
	// Just technical test use case.
	PRODUCT_INCLUDE_PROPERTIES: Prisma.ProductSelect = {
		name: true,
		amount: true,
		status: true,
		provider: true,
		// nested field.
		category: {
			select: {
				name: true
			}
		}
	},
	PRODUCT_EXCLUDED_PROPERTIES: (keyof Product)[] = []; // Ex: ['createdAt', 'updatedAt']
