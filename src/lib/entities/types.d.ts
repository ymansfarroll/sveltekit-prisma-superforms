export interface Cost {
	category: string;
	amount: number;
	date: Date | string;
	file: string;
}

export interface Constraint {
	maximum: number;
}

// export type UntaintedModel = Omit<Product, PRODUCT_EXCLUDED_PROPERTIES>;
// export type PickedModel = Pick<Product, (typeof PRODUCT_INCLUDE_PROPERTIES)[number]>;
