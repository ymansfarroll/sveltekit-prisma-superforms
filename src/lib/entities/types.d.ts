export interface Cost {
	category: string;
	amount: number;
	date: Date | string;
	file: string;
}

export interface Constraint {
	maximum: number;
}

export type CheckStatus = {
	[uuid: string]: boolean;
};

export type QueryContraint = {
	[key: string]: string;
};

export type ProductTabQueryConstraint = {
	[key: string]: object;
};

// export type UntaintedModel = Omit<Product, PRODUCT_EXCLUDED_PROPERTIES>;
// export type PickedModel = Pick<Product, (typeof PRODUCT_INCLUDE_PROPERTIES)[number]>;
