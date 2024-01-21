// Hands-on code to get familiar with typescript.
import type { Constraint } from '../types';

export class Category implements Constraint {
	constructor(
		// Own properties.
		public readonly id: number,
		public name: string,
		// Constraint interface-like properties.
		public maximum: number
	) {}
}
