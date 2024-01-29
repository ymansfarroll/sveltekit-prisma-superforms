/*
    [version=version] was used in order to build release-based route management.
    For short, just v+1 will be used. 
*/

import { json } from '@sveltejs/kit';
import { prisma } from '$lib/shared/prisma/client';
import { SUCCESSFUL_REQUEST_STATUS } from '$lib/shared/helpers/constants';

// GET: /api/v+number/category
export async function GET({ request }): Promise<Response> {
	const categories = await prisma.category.findMany({
		select: {
			name: true
		}
	});

	// Return json response to client.
	return json({
		acknowledged: true,
		status: SUCCESSFUL_REQUEST_STATUS,
		data: categories,
		method: request.method
	});
}
