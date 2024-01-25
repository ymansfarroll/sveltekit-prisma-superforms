import type { Product } from '@prisma/client';

export const // ZOD constants.

	ZOD_STRING_FIELD_MIN_CONSTRAINT = 5,
	ZOD_FABRICATION_DATE_ERROR = 'INVALID_FABRICATION_DATE'; // Random error, change it in prod environment.

export const // Prisma constants.

	// Just technical test use case.
	PRODUCT_INCLUDE_PROPERTIES = {
		name: true,
		amount: true,
		status: true,
		provider: true
	},
	PRODUCT_EXCLUDED_PROPERTIES: (keyof Product)[] = []; // Ex: ['createdAt', 'updatedAt']
