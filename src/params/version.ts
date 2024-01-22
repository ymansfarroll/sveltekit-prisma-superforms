import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// match: v + integer > 0
	return /^v(?=[1-9]\d*$)\d+$/.test(param);
};
