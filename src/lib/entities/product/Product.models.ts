import { z as validator } from 'zod';
import sveltekitAppHelpers from '$lib/shared/helpers/index';
import type { Cost } from '../types';

export class Product implements Cost {
	constructor(
		// Own properties.
		private _provider: string,

		public readonly uuid: string,
		public name: string,
		public status: string,
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

export const ProductModelValidation = validator.object({
	// For short, just one error message will be included.
	provider: validator.string().min(sveltekitAppHelpers._state.ZOD_STRING_FIELD_MIN_CONSTRAINT),
	name: validator.string().min(sveltekitAppHelpers._state.ZOD_STRING_FIELD_MIN_CONSTRAINT),
	category: validator.string().min(sveltekitAppHelpers._state.ZOD_STRING_FIELD_MIN_CONSTRAINT),
	// gte: 0 provided to allow zero amount, because this amount might increase later.
	amount: validator.number().nonnegative(),
	status: validator.boolean().optional(),
	// Ensure products made before the current date.
	date: validator.date().max(new Date(), {
		message: sveltekitAppHelpers._state.ZOD_FABRICATION_DATE_ERROR
	}),
	file: validator.string()
});
