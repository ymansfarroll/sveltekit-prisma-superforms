import type { Product, Prisma } from '@prisma/client';
import type { ProductTabQueryConstraint } from '$lib/entities/types';

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

export const PRODUCT_TAB_CONSTRAINTS: ProductTabQueryConstraint = {
	all: {
		deletedAt: null
	},
	available: {
		deletedAt: null,
		status: true
	},
	'no-available': {
		deletedAt: null,
		status: false
	},
	deleted: {
		// Workaround to parse at the time to shape the query parameters.
		deletedAt: JSON.stringify({
			not: null
		})
	}
};

export const SUCCESSFUL_REQUEST_RESPONSE = {
	POST: 'RECORD_CREATION_SUCCEEDED',
	PUT: 'RECORD_UPDATE_SUCCEEDED',
	DELETE: 'RECORD_DELETION_SUCCEEDED'
};

export const SUCCESSFUL_REQUEST_STATUS = 200;
