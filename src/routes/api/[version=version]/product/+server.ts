/*
    [version=version] was used in order to build release-based route management.
    For short, just v+1 will be used. 
*/

import { json } from '@sveltejs/kit';
import { prisma } from '$lib/shared/prisma/client';

// POST: /api/v+number/product
export async function POST({ request }): Promise<Response> {
	// FormData to JSON process.
	const product = await request.json();
	const newDatabaseProduct = await prisma.product.create({
		data: product
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
export async function GET({ request }): Promise<Response> {
	const products = await prisma.product.findMany({
		where: {
			amount: {
				//  greater than > 0
				gt: 0
			},
			status: true
		}
	});
	// Return json response to client.
	return json({
		acknowledged: true,
		status: 200,
		data: products,
		method: request.method
	});
}
