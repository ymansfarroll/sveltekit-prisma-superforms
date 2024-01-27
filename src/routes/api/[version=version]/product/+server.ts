/*
    [version=version] was used in order to build release-based route management.
    For short, just v+1 will be used. 
*/

import { json } from '@sveltejs/kit';
import { prisma } from '$lib/shared/prisma/client';
import {
	PRODUCT_INCLUDE_PROPERTIES,
	TAKE_PAGINATION_PARAMETER
} from '$lib/shared/helpers/constants.js';

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
	// Return json response to client.
	return json({
		acknowledged: true,
		status: 200,
		data: newDatabaseProduct,
		method: request.method
	});
}

// GET: /api/v+number/product
export async function GET({ url, request }): Promise<Response> {
	const skip = url.searchParams.get('skip') || 0;

	const nestedProductObjects = await prisma.product.findMany({
		skip: +skip, // Same as Number(skip).
		take: TAKE_PAGINATION_PARAMETER,
		where: {
			// Verify absence of previous soft deletions.
			deletedAt: null
		},
		select: {
			uuid: true,
			...PRODUCT_INCLUDE_PROPERTIES
		}
	});

	const products = nestedProductObjects.map((nestedProductObject) => ({
		...nestedProductObject,
		category: nestedProductObject.category.name
	}));

	// Return json response to client.
	return json({
		acknowledged: true,
		status: 200,
		data: products,
		method: request.method
	});
}
