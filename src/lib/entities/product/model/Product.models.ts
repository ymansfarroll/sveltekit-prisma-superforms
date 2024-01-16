import type { Cost } from '$lib/entities/product/types';

export class Product implements Cost {
	constructor(
		public category: string,
		public amount: number,
		public date: Date | string,
		public file: string
	) {}
}
