// Hands-on code to get familiar with typescript.
export interface Cost {
	category: string;
	amount: number;
	date: Date | string;
	file: string;
}

export interface Constraint {
	maximum: number;
}
