// Hands-on code to get familiar with typescript.
import type { Cost } from '$lib/entities/types';

export class Product implements Cost {
	constructor(
		// Own properties.
		private _provider: string,

		public readonly uuid: string,
		public name: string,
		// Cost interface-like properties.
		public category: string,
		public amount: number,
		public date: Date | string,
		public file: string
	) {}

	get provider(): string {
		return this._provider;
	}
	set provider(updatedProvider: string) {
		this._provider = updatedProvider;
	}
}
