import type { Cost } from '$lib/entities/product/types';

export class Product implements Cost {
	constructor(
		// Own properties.
		public readonly id: number,
		public provider: string,
		// Cost interface-like properties.
		public category: string,
		public amount: number,
		public date: Date | string,
		public file: string
	) {}
}
