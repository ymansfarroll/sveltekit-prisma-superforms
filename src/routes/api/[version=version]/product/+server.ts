/*
    [version=version] was used in order to build release-based route management.
    For short, just v+1 will be used. 
*/

import { json } from '@sveltejs/kit';
import { prisma } from '$lib/shared/prisma/client';
import {
	SUCCESSFUL_REQUEST_STATUS,
	TAKE_PAGINATION_PARAMETER,
	PRODUCT_INCLUDE_PROPERTIES,
	SUCCESSFUL_REQUEST_RESPONSE
} from '$lib/shared/helpers/constants.js';
import type { QueryContraint } from '$lib/entities/types.js';
import { applyProductSoftDeletion } from '$lib/shared/helpers/prisma.helpers';

// POST: /api/v+number/product
export async function POST({ request }): Promise<Response> {
	const product = await request.json();
	const newDatabaseProduct = await prisma.product.create({
		data: product,
		select: {
			uuid: true,
			...PRODUCT_INCLUDE_PROPERTIES
		}
	});

	// Workaround to level up the category name field.
	const newClientSideProduct = {
		...newDatabaseProduct,
		category: newDatabaseProduct.category.name
	};

	// Return json response to client.
	return json({
		acknowledged: true,
		status: SUCCESSFUL_REQUEST_STATUS,
		data: newClientSideProduct,
		method: request.method
	});
}

// GET: /api/v+number/product
export async function GET({ url, request }): Promise<Response> {
	// Parameters management.
	const constraints: QueryContraint = {};
	for (const [key, value] of url.searchParams.entries()) {
		constraints[key] = JSON.parse(value);
	}

	// Verify if skip exists, if so, get its value and delete it right after.
	const skip = constraints.skip || 0;
	delete constraints.skip;

	const nestedProductObjects = await prisma.product.findMany({
		skip: +skip, // Same as Number(skip).
		take: TAKE_PAGINATION_PARAMETER,
		// Spread the contraints over.
		where: constraints,
		select: {
			uuid: true,
			...PRODUCT_INCLUDE_PROPERTIES
		}
	});

	// Workaround to level up the category name field.
	const products = nestedProductObjects.map((nestedProductObject) => ({
		...nestedProductObject,
		category: nestedProductObject.category.name
	}));

	// Return json response to client.
	return json({
		acknowledged: true,
		status: SUCCESSFUL_REQUEST_STATUS,
		data: products,
		method: request.method
	});
}

// DELETE: /api/v+number/product
export async function DELETE({ url, request }): Promise<Response> {
	// Parameters management.
	const uuids = url.searchParams.get('uuids')?.split(',') || [];

	await applyProductSoftDeletion({
		uuid: {
			in: uuids
		}
	});
	// Return json response to client.
	return json({
		acknowledged: true,
		status: SUCCESSFUL_REQUEST_STATUS,
		response: SUCCESSFUL_REQUEST_RESPONSE.DELETE,
		method: request.method
	});
}
