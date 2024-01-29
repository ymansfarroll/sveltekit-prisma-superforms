import { setContext } from 'svelte';
import { readable } from 'svelte/store';

import type { CategorySelectOption } from '$lib/entities/types';

export const setCategorySelectContext = (categoryList: CategorySelectOption[]): void => {
	const categories = readable(categoryList);
	setContext('CategorySelectList', categories);
};
