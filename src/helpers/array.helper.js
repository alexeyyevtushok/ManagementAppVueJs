export const unObservable = item => JSON.parse(JSON.stringify(item));
export const compareArrays = (a1, a2) =>
  JSON.stringify(a1) === JSON.stringify(a2);
