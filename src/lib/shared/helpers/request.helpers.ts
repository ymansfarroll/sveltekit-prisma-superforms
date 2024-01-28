export const buildQueryParams = (constraints: object): string => {
	let queryContraints = '?';
	Object.entries(constraints).forEach(([key, value]) => {
		// Same as queryContraints += ...
		queryContraints = queryContraints.concat(`${key}=${value}&`);
	});
	return queryContraints.slice(0, -1); // Strip the last &.
};
