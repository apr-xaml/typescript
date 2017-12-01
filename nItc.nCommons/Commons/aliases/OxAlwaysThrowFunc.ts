export type OxAlwaysThrowFunc = () => never;

export const OxAlwaysThrowFunc: OxAlwaysThrowFunc = () => { throw new Error(); }